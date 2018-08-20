import React from 'react';
import { getTaskList, getRackId } from '../../service/rehandling';
import { uuidRegex } from '../../constants/variables';
import { setTitle, setRRButton, scanQRCode } from "../../lib/native-api";

import Toast from '../../components/Toast';
import Confirm from '../../components/Confirm';
import Task from './components/Task';
import Loading from '../../components/Loading';

import '../../style/rehandling.less';
import logger from '../../lib/log';

import { TaskModel } from '../../types';
import { RouteComponentProps } from "react-router";

interface TaskListState {
    tasks: TaskModel[];
    menuVisible: boolean;
    loading: boolean;
}

export default class TaskList extends React.Component<RouteComponentProps<{}>, TaskListState> {

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            tasks: [],
            menuVisible: false,
            loading: true
        };
        this.scanCode = this.scanCode.bind(this);
        this.notFind = this.notFind.bind(this);
    }

    componentDidMount() {
        getTaskList()
            .then(res => {
                this.setState({
                    tasks: res.data,
                    loading: false
                })
            })
            .catch(err => {
                logger.error('get-taskList-failed', err);
                Toast(err.msg || '获取数据失败');
                this.setState({
                    loading: false
                })
            });
        setTitle('智能设备换装');
        setRRButton('. . .', 'text', () => {
            this.setState({
                menuVisible: !this.state.menuVisible
            })
        });
    }

    scanCode() {
        scanQRCode().then(res => {
            if (!uuidRegex.test(res.content)) {
                Toast('这不是货架的二维码!');
                return;
            }
            const uuid = (res.content.match(uuidRegex) || [])[0];
            getRackId(uuid).then(res => {
                const rackId = res.data.rackId;
                const result = this.state.tasks.find(task => {
                    return +task.rackId === +rackId;
                });
                if (result === undefined) {
                    Toast('该货架不在您的路线中!');
                    return;
                }
                if (result && result.status !== 10) {
                    Toast('该货架的换装任务已完成!');
                    return;
                }
                this.props.history.push(`/rehandling/change/${rackId}/10`);
            }).catch(err => {
                Toast(err.msg || '获取rackId失败')
            });
        }).catch(res => {
            if (res === 'fail') {
                Toast('扫码失败，请重试');
            }
        })

    }

    notFind() {
        this.setState({
            menuVisible: false
        });
        Confirm({
            message: '只有在冰箱找不到时才可使用本功能',
            callback: () => {
                this.props.history.push("/rehandling/link");
            }
        })
    }

    render() {
        const { tasks, menuVisible, loading } = this.state;
        return (
            <main>
                {loading && <Loading> </Loading>}
                {tasks.length > 0 ?
                    <div className="task-list">
                        <div className="content">
                            {tasks.map((task, index) => {
                                return (
                                    <Task task={task} key={index}/>
                                )
                            })}
                        </div>
                        {menuVisible && <RenderMenu notFindMethod={this.notFind}/>}
                        <div className="footer">
                            <div className="button-wrap">
                                <button type="button"
                                        onClick={this.scanCode}
                                        className="footer-button">
                                    扫描老冰柜二维码
                                </button>
                            </div>
                        </div>
                    </div>
                    : <h3 className="empty-list">路线暂无换装任务!</h3>
                }
            </main>
        )
    }
}

interface RenderMenuProps {
    notFindMethod: () => void;
}

const RenderMenu = (props: RenderMenuProps) => {
    const { notFindMethod } = props;
    return (
        <ul className="drop-down-menu">
            <li onClick={notFindMethod}>找不到设备</li>
        </ul>
    )
};
