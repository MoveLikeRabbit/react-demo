import * as Cat from '@lingshou/browser-cat';
import { getLogger } from '@lingshou/logger';
const appName = 'xtools-smartrack-h5';
const logger = getLogger();
Cat.init(appName, `${location.pathname}${location.hash}`.replace(/\d+/ig, '${ObjectId}'));

class Log {
    basePath: string;
    constructor(basePath?: string) {
        this.basePath = basePath || `${appName}/`;
    }
    setUrl(path: string) {
        Cat.setPageUrl(this.basePath + path);
    }

    /* tslint:disable-next-line:no-any */
    error(msg: string, params?: any) {
        params.err = params.err ? JSON.stringify(params.err, Object.getOwnPropertyNames(params.err)) : '';
        const errMsg = {
            name: msg,
            message: JSON.stringify(params)
        };
        logger.error(msg, errMsg);
    }
    logTiming(type: string, duration: number) {
        Cat.logTiming(type, Number(duration || 0));
    }
}
export default new Log();