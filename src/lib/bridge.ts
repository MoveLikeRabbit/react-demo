import * as base from '@lingshou/jsb-base';

const { bridge, UPLOAD_ALL, UPLOAD_PHOTO, UPLOAD_ALBUM } = base;

const weixinRegex = /MicroMessenger/i;
const WEIXIN = 'weixin';
const APP = 'app';
const OTHER = 'other';

bridge.deploy('XBLAPP', 'sharp', 'rabbit');

export const PlatformType = { WEIXIN, APP, OTHER};

export const platform = (() => {
    if (weixinRegex.test(navigator.userAgent)) {
        return WEIXIN;
    }

    if (bridge.isApp()) {
        return APP;
    }

    return OTHER;
})();

export const isApp = bridge.isApp();

export const uploadType = {
    UPLOAD_ALL,
    UPLOAD_PHOTO,
    UPLOAD_ALBUM
};

export default bridge;
