/**
 * 按钮状态
 * 
 * @export
 * @enum {number}
 */
export enum ButtonState {
    /**
     * 初始状态
     */
    Ready = 0,
    /**
     * 正在查询数据
     */
    Loading = 10,
    /**
     * 正在提交
     */
    Submitting = 10,
    /**
     * 已加载完毕/请求已返回
     */
    Loaded = 20,
    /**
     * 请求错误
     */
    Error = 30,
    /**
     * 正在跳转
     */
    Redirecting = 40
}

export const ButtonTextOfState = {
    [ButtonState.Ready] : '提交',
    [ButtonState.Loading] : '正在加载',
    [ButtonState.Submitting] : '正在提交',
    [ButtonState.Loaded] : '已加载',
    [ButtonState.Error] : '提交',
    [ButtonState.Redirecting] : '正在跳转...'
};

export const UnlockBtnTextOfState = {
    [ButtonState.Ready] : '测试开门',
    [ButtonState.Loading] : '正在开门...',
    [ButtonState.Loaded] : '测试开门',
    [ButtonState.Error] : '再次开门',
    [ButtonState.Submitting] : '正在提交',
    [ButtonState.Redirecting] : '正在跳转...'
};

export const ButtonDisabledOfState = {
    [ButtonState.Ready] : false,
    [ButtonState.Loading] : true,
    [ButtonState.Submitting] : true,
    [ButtonState.Loaded] : true,
    [ButtonState.Error] : false,
    [ButtonState.Redirecting] : true   
};