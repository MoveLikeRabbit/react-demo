import { get, post } from '../lib/fetch';
import {
    TaskListResp,
    CompanyInfoResp,
    CompanyInfoReq,
    CompleteRehandlingReq,
    CompleteRehandlingResp,
    getRackIdResp
} from '../types';

export function getTaskList() {
    return get<TaskListResp>('/smart/deploy/switch/task');
}

export function getCompanyInfo(params: CompanyInfoReq) {
    return post<CompanyInfoResp, CompanyInfoReq>('/smart/deploy/switch/deviceInfo', params)
}

export function completeChange(params: CompleteRehandlingReq) {
    return post<CompleteRehandlingResp, CompleteRehandlingReq>('/smart/deploy/switch/complete', params)
}

export function getRackId(uuid: string) {
    return get<getRackIdResp>(`/smart/deploy/common/uuidToRackId?uuid=${uuid}`);
}