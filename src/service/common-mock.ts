import { UnlockResp, UnlockTestResp } from '../types';

export function unlock(): Promise<UnlockResp> {
    return Promise.resolve({
        code: 200,
        msg: 'success',
        data: {
            unlockId: 12
        }
    });
}
export function unlockTest(): Promise<UnlockTestResp> {
    return Promise.resolve({
        code: 200,
        msg: 'success',
        data: {
            checkId: 12
        }
    });
}