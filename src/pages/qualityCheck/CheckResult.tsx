import React, { ChangeEvent } from 'react';
import { submit } from '../../service/qualityCheck';
import Toast from '../../components/Toast';
import { RouteComponentProps } from "react-router";
import logger from '../../lib/log';

interface CheckResultState {
    deviceSN: string;
    unlockResult: number;
    videoResult: number;
    audioResult: number;
}

type ElementsWithChangeEvent = HTMLInputElement | HTMLSelectElement;

interface CheckResultProps {
    uuid: string;
    videoStatus: number;
}

const results = [{
    desc: '开锁功能',
    name: 'unlockResult'
}, {
    desc: '视频功能',
    name: 'videoResult',
}, {
    desc: '音频功能',
    name: 'audioResult'
}];
const options = [{
    label: ' ', //未选择
    value: 10
}, {
    label: '正常',
    value: 1
}, {
    label: '有问题',
    value: 0
}];
export default class CheckResult extends React.Component<RouteComponentProps<CheckResultProps>, CheckResultState> {
    constructor(props: RouteComponentProps<CheckResultProps>) {
        super(props);
        this.state = {
            deviceSN: props.match.params.uuid,
            unlockResult: 10,
            videoResult: Number(props.match.params.videoStatus),
            audioResult: 10
        };
        this.handleValueChange = this.handleValueChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit() {
        const { unlockResult, videoResult, audioResult } = this.state;
        if (unlockResult === 10 || videoResult === 10 || audioResult === 10) {
            Toast('请检查遗漏项');
            return
        }
        submit(this.state).then(() => {
            Toast('提交成功', 1500, () => {
                this.props.history.push('/entries')
            })
        }).catch(err => {
            Toast(err.msg || '提交失败');
            logger.error('submit-checkResult-failed', err);
        })
    }

    handleValueChange(e: ChangeEvent<ElementsWithChangeEvent>): void {
        const name = e.target.name, value = Number(e.target.value);
        // There is a bug in typescript,
        // refers to https://github.com/Microsoft/TypeScript/issues/13948, maybe fixed in v3.0.
        // Using any as the workaround
        this.setState({
            [name as any]: value
        });
    }

    render() {
        return (
            <div className="check-result" id="container">
                <h2 className="title">检查结果</h2>
                <ul className="result-list">
                    {
                        results.map((result, index) => {
                            return (
                                <li key={'result' + index} className="result-item">
                                    <div className="result-item-inner">
                                        <span className="function">{result.desc}</span>
                                        <select className="select"
                                                name={result.name}
                                                onChange={this.handleValueChange}
                                                disabled={result.name === 'videoResult'}
                                                required
                                                defaultValue={result.name === 'videoResult'? this.state.videoResult.toString() : ''}>
                                            {options.map((opt, key) => {
                                                return <option value={opt.value}
                                                               key={'option' + key}>
                                                    {opt.label}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="footer">
                    <div className="button-wrap">
                        <button type="button" onClick={this.submit} className="footer-button"> 提交
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}