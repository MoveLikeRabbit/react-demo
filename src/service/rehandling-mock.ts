import {
    TaskListResp,
    CompanyInfoResp,
    CompleteRehandlingResp,

} from '../types';

export function getTaskList(): Promise<TaskListResp> {
    return Promise.resolve({
        code: 200,
        msg: 'success',
        data: [{
            status: 10,
            rackName: '阿拉善-大冰柜1',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 123
        }, {
            status: 20,
            rackName: '阿拉善-大冰柜2',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 123
        }, {
            status: 10,
            rackName: '阿拉善-大冰柜1',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        }, {
            status: 20,
            rackName: '阿拉善-大冰柜2',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        }, {
            status: 10,
            rackName: '阿拉善-大冰柜1',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        }, {
            status: 20,
            rackName: '阿拉善-大冰柜2',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        }, {
            status: 10,
            rackName: '阿拉善-大冰柜1',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        }, {
            status: 20,
            rackName: '阿拉善-大冰柜2',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        },{
            status: 10,
            rackName: '阿拉善-大冰柜1',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        }, {
            status: 20,
            rackName: '阿拉善-大冰柜2',
            address: '阿拉善市人民路100号',
            area: '徐汇区',
            publishDate: '2018-10-10',
            serialNum: 'JLDJOI000011',
            rackId: 1234
        }]
    });
}

export function getCompanyInfo(): Promise<CompanyInfoResp> {
    return Promise.resolve({
        code: 200,
        msg: 'success',
        data: {
            companyName: "xxx",
            address: "阿拉善市人民路100号"
        }
    });
}

export function completeRehandling(): Promise<CompleteRehandlingResp> {
    return Promise.resolve({
        code: 200,
        msg: 'success',
        data: {}
    });
}

export function completeChange(): Promise<CompleteRehandlingResp> {
    return Promise.resolve({
        code: 200,
        msg: 'success',
        data: {}
    });
}

export function getRackId() {
    return Promise.resolve({
        code: 200,
        msg: 'success',
        data: {
            rackId: 123
        }
    });}