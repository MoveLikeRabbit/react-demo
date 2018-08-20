interface StatusModel {
    [key: number]: string;
}

export const TaskStateText: StatusModel = {
    10: '待换装',
    20: '已换装'
};

export const TaskState = {
    Changed: 20,
    waiting: 10
};

export const uuidRegex = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;

export const DeviceState = {
    online: 1,
    offline: 0
};

export const unlockResultState = {
    success: 1,
    fail: 0
};