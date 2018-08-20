import { post } from "../lib/fetch";
import {
    UnlockReq,
    UnlockTestResp
} from '../types';


export function unlockTest(params: UnlockReq) {
    return post<UnlockTestResp, UnlockReq>('/smart/deploy/common/qualityCheck', params)
}