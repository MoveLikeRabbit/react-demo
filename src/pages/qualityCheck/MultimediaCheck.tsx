import React from 'react';
import { getCheckData } from '../../service/qualityCheck';
import logger from '../../lib/log';
import '../../style/qualityCheck.less';

import { RouteComponentProps } from "react-router";
import Toast from "../../components/Toast";

interface MultimediaProps {
    checkId: number;
    deviceSN: string;
}

interface MultimediaCheckState {
    videoResultStatus: number;
}

const resultStates: { [key: number]: string } = {
    0: 'unusual',
    1: 'normal',
    10: 'nodata',
};
const resultTexts: { [key: number]: string } = {
    0: '不正常',
    1: '正常',
    10: '暂无数据'
};
export default class MultimediaCheck extends React.Component<RouteComponentProps<MultimediaProps>, MultimediaCheckState> {
    checkId: number;
    deviceSN: string;
    count: number;
    constructor(props: RouteComponentProps<MultimediaProps>) {
        super(props);
        this.checkId = Number(props.match.params.checkId);
        this.deviceSN = props.match.params.deviceSN;
        this.count = 0;
        this.state = {
            videoResultStatus: 10
        };
        this.gotoNextUrl = this.gotoNextUrl.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    gotoNextUrl() {
        if (this.state.videoResultStatus === 10) {
            return Toast('未获得测试结果，请退出重试或联系技术！')
        }
        this.props.history.push(`/qualitycheck/result/${this.deviceSN}/${this.state.videoResultStatus}`)
    }

    getData() {
        this.count++;
        getCheckData(this.checkId).then(res => {
            if (res.data.videoResultStatus === null) {
                if (this.count <= 2) {
                    Toast('测试结果生成中...', 5000, () => {
                        this.getData();
                    });
                } else {
                    Toast('请求超时');
                }
            } else {
                this.setState({
                    videoResultStatus: res.data.videoResultStatus
                })
            }
        }).catch(err => {
            logger.error('get-mediaCheckData-failed', err);
            Toast(err.msg || '获取数据失败');
        })
    }

    render() {
        const { videoResultStatus } = this.state;
        return (
            <div className="multimedia-check" id="container">
                <div className="block-warp">
                    <h2>设备视频:</h2>
                    <div className="video multi-box">
                        <h3 className={"desc " + resultStates[videoResultStatus]}>
                            {'视频功能' + resultTexts[videoResultStatus]}
                        </h3>
                    </div>
                </div>
                <div className="footer">
                    <div className="button-wrap">
                        <button type="button"
                                className="footer-button"
                                onClick={this.gotoNextUrl}>下一步
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}