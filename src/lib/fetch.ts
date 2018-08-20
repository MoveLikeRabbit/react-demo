import 'whatwg-fetch';
import { nativeLogin } from './native-api';
import bridge from './bridge';

export function get<T>(url: string): Promise<T> {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(handleResponse);
}

export function post<T, K = {}>(url: string, params?: K): Promise<T> {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(params)
    }).then(handleResponse);
}

function handleResponse(res: Response) {
    if (res.ok) {
        return res.json().then(json => {
            const { code } = json;

            if (code === 200) {
                return json;
            }

            // 业务code非200时，在catch中处理
            throw json;
        });
    }

    // 未登录
    if (res.status === 401) {
        // invoke native login page
        nativeLogin().then(
            () => {
                bridge.jumpToScheme(location.href);
            },
            () => {
                alert('未登录，请先登录');
                bridge.closeWindow();
            }
        );
    }

    // 无权限
    if (res.status === 403) {
        // redirect to permission denied page
        location.href='/smart/deploy/noPrivilege'
    }

    throw {
        code: res.status || 0,
        msg: res.statusText || 'Unknown error'
    };
}