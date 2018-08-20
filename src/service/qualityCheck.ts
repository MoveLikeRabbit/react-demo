import { get, post } from "../lib/fetch";
import {
    MultimediaCheckResp,
    CheckResultReq,
    CommonResp,
    OnlineStatusResp
} from '../types';



export function getCheckData(checkId: number) {
    return get<MultimediaCheckResp>(`/smart/deploy/qualityCheck/checkData?checkId=${checkId}`)
}

export function submit(params: CheckResultReq) {
    return post<CommonResp, CheckResultReq>('/smart/deploy/qualityCheck/result', params)
}

export function getOnlineStatus(deviceSN: string) {
    return get<OnlineStatusResp>(`/smart/qualityCheck/onlineStatus?deviceSN=${deviceSN}`)
}