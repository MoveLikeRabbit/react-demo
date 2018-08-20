import React from 'react';
import { completeChange } from '../../service/rehandling';
import { unlockTest } from '../../service/common';
import { unlockResultState } from '../../constants/variables';
import Toast from '../../components/Toast';
import Uploader from '../../components/Uploader';

import logger from '../../lib/log';
import {
    ButtonState,
    ButtonTextOfState,
    ButtonDisabledOfState,
    UnlockBtnTextOfState
} from '../../constants/ButtonState';
import { RouteComponentProps } from "react-router";

interface CheckState {
    oldRackId: number;
    newUuid: string;
    picUrl: string;
    unlockResult: number;
    unlockBtnState: ButtonState;
    submitBtnState: ButtonState;
}

interface CheckProps {
    oldRackId: number;
    newUuid: string;
}

export default class Check extends React.Component<RouteComponentProps<CheckProps>, CheckState> {
    hasUnlocked = false;

    constructor(props: RouteComponentProps<CheckProps>) {
        super(props);
        this.state = {
            oldRackId: Number(this.props.match.params.oldRackId),
            newUuid: this.props.match.params.newUuid,
            picUrl: '',
            unlockResult: 0,
            unlockBtnState: ButtonState.Ready,
            submitBtnState: ButtonState.Ready
        };
        this.unlock = this.unlock.bind(this);
        this.submit = this.submit.bind(this);
    }

    getUnlockBtnDisabled() {
        return ButtonDisabledOfState[this.state.unlockBtnState];
    }

    getUnlockBtnText() {
        return UnlockBtnTextOfState[this.state.unlockBtnState];
    }

    getSubmitBtnDisabled() {
        return ButtonDisabledOfState[this.state.submitBtnState];
    }

    getSubmitBtnText() {
        return ButtonTextOfState[this.state.submitBtnState];
    }

    unlock() {
        if (this.getUnlockBtnDisabled()) {
            return Toast('正在开门...')
        }
        this.setState({
            unlockBtnState: ButtonState.Loading
        });
        this.hasUnlocked = true;
        // 接口改变暂时废弃
        unlockTest({ deviceSN: this.state.newUuid })
            .then(() => {
                this.setState({
                    unlockResult: unlockResultState.success,
                    unlockBtnState: ButtonState.Loaded,
                });
                Toast('开锁成功')
            })
            .catch(err => {
                logger.error('unlock-failed', err);
                this.setState({
                    unlockBtnState: ButtonState.Error
                });
                Toast(err.msg || '开锁失败')
            })
    }

    submit() {
        if (this.getSubmitBtnDisabled()) {
            return Toast('正在提交...')
        }
        const { oldRackId, newUuid, picUrl, unlockResult } = this.state;
        if (!picUrl) {
            return Toast('请先上传图片！')
        }
        if (!this.hasUnlocked) {
            return Toast('请测试开门！')
        }
        this.setState({
            submitBtnState: ButtonState.Submitting
        });
        completeChange({ oldRackId, newUuid, picUrl, unlockResult })
            .then(() => {
                Toast('提交成功', 2000, () => {
                    this.props.history.push('/rehandling/tasklist');
                })
            })
            .catch(err => {
                logger.error('rehandling-complete-failed', err);
                Toast(err.msg || '提交失败');
                this.setState({
                    submitBtnState: ButtonState.Error
                });
            })
    }

    handleChange(url: string) {
        this.setState({
            picUrl: url
        })
    }

    render() {
        const { picUrl } = this.state;
        return (
            <div>
                <div className="block-warp content">
                    <h3>请确定以下操作均已完成：</h3>
                    <ol>
                        <li>电源已经连接</li>
                        <li>点击测试开门按钮，扫描二维码后，确认开锁功能正常</li>
                        <li>拍照上传换装完成的冰柜照片</li>
                    </ol>
                    <Uploader
                        url={picUrl}
                        label=""
                        className="pic"
                        source="camera"
                        onChange={url => {
                            this.handleChange(url)
                        }}
                    />
                </div>
                <div className="footer">
                    <div className="button-wrap">
                        <button type="button"
                                className="footer-button-normal"
                                onClick={this.unlock}
                                disabled={this.getUnlockBtnDisabled()}>{this.getUnlockBtnText()}
                        </button>
                        <button type="button"
                                className="footer-button"
                                onClick={this.submit}
                                disabled={this.getSubmitBtnDisabled()}>{this.getSubmitBtnText()}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}