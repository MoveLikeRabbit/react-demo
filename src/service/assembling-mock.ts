import {
    MotherboardInfoResp,
    DeviceInfoReq,
    NoDataResp
} from '../types';

export function getMotherboardInfo(): Promise<MotherboardInfoResp> {
    return Promise.resolve({
        code: 200,
        msg: '',
        data: {
            brands: [
                "品牌1",
                "品牌2"
            ],
            types: [
                "类型1",
                "类型2"
            ]
        }
    });
}

export function submitDeviceInfo(): Promise<NoDataResp> {
    return Promise.resolve({
        code: 200,
        msg: '',
        data: null
    })
}

