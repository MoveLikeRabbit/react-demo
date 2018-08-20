import { get, post } from '../lib/fetch';
import {
    MotherboardInfoResp,
    DeviceInfoReq,
    NoDataResp
} from '../types';


export function getMotherboardInfo() {
    return get<MotherboardInfoResp>('/smart/deploy/assemble/boardInfo');
}

export function submitDeviceInfo(params: DeviceInfoReq) {
    return post<NoDataResp, DeviceInfoReq>('/smart/deploy/assemble/deviceInfo', params);
}