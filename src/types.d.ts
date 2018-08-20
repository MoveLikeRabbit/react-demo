interface CommonResp {
    code: number;
    msg: string;
}

export interface NoDataResp extends CommonResp {
    data: null;
}

// Device assembling

export interface MotherboardInfoResp extends CommonResp {
    data: {
        brands: string[];
        types: string[];
    }
}

export interface DeviceInfoReq {
    [key: string]: string;
    boxSN: string;
    boardSN: string;
    boardBrand: string;
    boardType: string;
    saleLink: string;
}

// rehandling
interface RackId {
    rackId: number
}
export interface getRackIdResp extends CommonResp {
    data: RackId
}

export interface TaskModel {
    status: number;
    rackName: string;
    address: string;
    area: string;
    publishDate: string;
    serialNum: string;
    rackId: number;
}

export interface TaskListResp extends CommonResp {
    data: Array<TaskModel>
}

export interface CompanyInfo {
    companyName: string;
    address: string;
}

export interface CompanyInfoReq {
    rackId: number;
    type: number;
}

export interface CompanyInfoResp extends CommonResp {
    data: CompanyInfo
}

export interface CompleteRehandlingReq {
    oldRackId: number;
    newUuid: string;
    picUrl: string;
    unlockResult: number;
}

export interface CompleteRehandlingResp {
    data: {}
}

export interface UnlockResp {
    data: {
        unlockId: number
    }
}

export interface UnlockTestResp {
    data: {
        checkId: number
    }
}

export interface UnlockReq {
    deviceSN: string
}

// quality check

export interface MultimediaCheckModel {
    videoResultStatus:  number;
}

export interface MultimediaCheckResp extends CommonResp {
    data: MultimediaCheckModel
}

export interface CheckResultReq {
    deviceSN: string;
    unlockResult: number;
    videoResult: number;
    audioResult: number;
}

export interface OnlineStatusResp extends CommonResp {
    data: {
        onlineStatus: number
    }
}