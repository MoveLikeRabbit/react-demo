import React from 'react';
import { getOnlineStatus } from '../../service/qualityCheck';
import Toast from '../../components/Toast';
import Confirm from '../../components/Confirm';
import { setTitle, scanQRCode } from "../../lib/native-api";
import { unlockTest } from "../../service/common";
import { DeviceState } from '../../constants/variables';


import '../../style/qualityCheck.less';
import logger from '../../lib/log';

import { RouteComponentProps } from "react-router";

interface CheckStepsState {
    deviceSN: string;
    boxSN: '',
    onlineStatus: number | null;
    checkId: number | null;
}

export default class CheckSteps extends React.Component<RouteComponentProps<{}>, CheckStepsState> {
    hasUnlocked = false;

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            deviceSN: '',
            boxSN: '',
            onlineStatus: null,
            checkId: null
        };
        this.gotoNextUrl = this.gotoNextUrl.bind(this);
        this.unlock = this.unlock.bind(this);
    }

    componentDidMount() {
        scanQRCode().then((res) => {
            this.setState({
                deviceSN: res.content
            });
            this.getOnlineStatus()
        }).catch(res => {
            if (res === 'cancel') {
                history.go(-1);
            } else if (res === 'fail') {
                Toast('扫码失败，请重试');
            }
        });
        setTitle('智能设备质检');
    }

    getOnlineStatus() {
        getOnlineStatus(this.state.deviceSN).then(res => {
            this.setState({
                onlineStatus: res.data.onlineStatus,
            });
            if (this.state.onlineStatus === DeviceState.offline) {
                Confirm({
                    message: '设备不在线,请确保电源已连接并且SIM卡已插入',
                    showCancelBtn: false,
                    confirmText: '已检查并刷新页面',
                    callback: () => {
                        this.getOnlineStatus()
                    }
                })
            }

        }).catch(err => {
            Toast(err.msg || '获取设备在线状态失败');
            logger.error('get-onlineStatus-failed', err);
        })
    }

    gotoNextUrl() {
        if (!this.hasUnlocked) {
            return Toast('请先开锁！');
        }
        const { deviceSN, checkId } = this.state;
        Confirm({
            message: '请确认门已经关闭\n再继续下一步',
            callback: () => {
                this.props.history.push(`/qualitycheck/multimedia/${deviceSN}/${checkId}`)
            }
        })
    }

    unlock() {
        this.hasUnlocked = true;
        unlockTest({ deviceSN: this.state.deviceSN })
            .then(res => {
                this.setState({
                    checkId: res.data.checkId
                });
                Toast('开锁成功')
            })
            .catch(err => {
                logger.error('unlockText-failed', err);
                Toast(err.msg || '开锁失败')
            })
    }

    render() {
        const { deviceSN } = this.state;
        return (
            <div className="check-steps" id="container">
                <div>
                    <div className="block-warp">
                        <h3>设备信息</h3>
                        <p>
                            <span>设备SN：</span>
                            <span>{deviceSN}</span>
                        </p>
                    </div>
                    <div className="block-warp">
                        <h2>请按以下步骤操作</h2>
                        <ol className="steps">
                            <li>
                                点击按钮开锁、开门
                                <div className="unlock-box" onClick={this.unlock}>
                                    <div className="unlock icon"></div>
                                </div>
                            </li>
                            <li>关门后点击下一步</li>
                        </ol>
                        <p>如无法开门，请直接点击下一步</p>
                    </div>
                    <div className="footer">
                        <div className="button-wrap">
                            {/*<button type="button"*/}
                            {/*className="footer-button-normal"*/}
                            {/*onClick={this.unlock}>开锁*/}
                            {/*</button>*/}
                            <button type="button"
                                    onClick={this.gotoNextUrl}
                                    className="footer-button">下一步
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}


