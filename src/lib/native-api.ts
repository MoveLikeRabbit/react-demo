import bridge, { isApp, PlatformType, platform, uploadType } from './bridge';

export { PlatformType, platform };

let isReady = false;
const readyCallbacks: Array<Function> = [];

interface NativeResponse {
    retCode: number;
    resultType?: number;
    /* tslint:disable-next-line:no-any */
    content?: any;
    /* tslint:disable-next-line:no-any */
    data?: any;
    picUrl?: string;
    /* tslint:disable-next-line:no-any */
    value?: any;
}

function setReady() {
    isReady = true;
    for (const cb of readyCallbacks) {
        setTimeout(cb, 0);
    }
}


/**
 * 扫描二维码
 * */

export function scanQRCode() {
    return new Promise<NativeResponse>((resolve, reject) => {
        switch (platform) {
            case PlatformType.APP:
                bridge.scanQRCode({
                    success: (res: NativeResponse) => {
                        resolve(res);
                    },
                    error: (res: NativeResponse) => {
                        if (res.resultType === 1) {
                            reject('cancel');
                        } else if (res.resultType === 2) {
                            reject('fail');
                        }
                    }
                });
                break;
            default:
                break;
        }
    })
}

/**
 * url跳转 直接新开webview
 * @param {string} link url地址
 */
export function toLocation(link: string) {
    if (isApp) {
        return bridge.openScheme(link);
    }
    location.href = link;
}


export function nativeLogin() {
    return new Promise((resolve, reject) => {
        if (!isApp) {
            reject({
                retCode: 203
            });
            return;
        }
        bridge.login({
            handle: (res: NativeResponse) => {
                if (res.retCode === 101) {
                    resolve(res);
                } else {
                    reject(res);
                }
            }
        });
    });
}

/**
 * 设置标题栏标题
 * @param title
 */
export function setTitle(title: string): boolean {
    if (!isApp) {
        document.title = title;
        return false;
    }
    bridge.setTitle(title, {});
    return true;
}

/**
 * 设置标题栏第四个按钮
 * @param content
 *   1. 内容可以是文本,
 *   2. base64内容(`data:image/png;base64,`头不需要, base64的图片大小控制为 尺寸44X44(icon本身22X22)的三倍图，即132X132的画布，66X66的icon大小),
 *   3. 指定ICON(H5_Search（搜索）、H5_Back（返回）、H5_Custom_Back（返回图标+文字）、H5_Share（分享）)
 * @param type 类型 base64|icon|text
 * @param handle 按钮被点击回调
 */
export function setRRButton(content: string | null,
                            type: string,
                            handle?: Function): boolean {
    if (!isApp) {
        return false;
    }
    bridge.setRRButton(content, type, (res: NativeResponse) => {
        handle && handle(res);
    });
    return true;
}


/**
 * 上传图片(相册选择/拍照), 目前只支持一张
 * @param opt
 *     success | Function | (res = {}){
 *         res.picUrl //上传成功后的资源地址
 *     }
 *     fail | Function | 上传失败回调
 *     cancel | Function | 取消上传回调
 *     uploadUrl | String | 上传地址, 有默认上传地址
 *     maxSize | Number | 上传文件大小, 默认500KB
 *     type | Enum | 上传类型 (所有, 相册, 拍摄), 默认为所有, 枚举常量 (UploadImageAll, UploadImagePhoto, UploadImageAlbum)
 */

export function uploadImage(options: {
    maxSize?: number;
    /**
     * use uploadType
     *
     * @type {number}
     */
    type: number;
}): Promise<{
    retCode: number;
    data?: string;
    picUrl?: string;
}> {
    if (!bridge.isApp()) {
        return Promise.reject({
            retCode: 0
        });
    }

    const opt = Object.assign(
        {
            maxSize: 100,
            type: uploadType.UPLOAD_ALL
        },
        options
    );

    return new Promise((resolve, reject) => {
        bridge.uploadImage({
            maxSize: opt.maxSize,
            type: opt.type,
            success: (res: {
                retCode: number;
                data?: string;
                picUrl?: string;
            }) => {
                if (res.retCode === 310) {
                    resolve(res);
                } else if (res.retCode === 311) {
                    reject(res);
                } else if (res.retCode === 312) {
                    reject(res);
                }
            },
            handle: (res: {
                retCode: number;
                data?: string;
                picUrl?: string;
            }) => {
                if (res.retCode === 310) {
                    resolve(res);
                } else if (res.retCode === 311) {
                    reject(res);
                } else if (res.retCode === 312) {
                    reject(res);
                }
            },
            fail: (res: {
                retCode: number;
                data?: string;
                picUrl?: string;
            }) => {
                reject(res);
            }
        });
    });
}

setReady();
