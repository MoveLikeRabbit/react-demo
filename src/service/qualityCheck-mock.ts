import { MultimediaCheckResp, OnlineStatusResp } from '../types';
import { get } from "../lib/fetch";


export function getCheckData(): Promise<MultimediaCheckResp> {
    return Promise.resolve({
        code: 200,
        msg: '',
        data: {
            videoResultStatus: 1
        }
    })
}

export function submit() {
    return Promise.resolve({
        code: 200,
        msg: '',
        data: {}
    })
}

export function getOnlineStatus(): Promise<OnlineStatusResp> {
    return Promise.resolve({
        code: 200,
        msg: '',
        data: { onlineStatus: 1 }
    })
}