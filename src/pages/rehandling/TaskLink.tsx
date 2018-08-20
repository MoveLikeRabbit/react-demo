import React from 'react';
import { Link } from 'react-router-dom';

import { getTaskList } from '../../service/rehandling';

import { TaskModel } from '../../types';

import Task from './components/Task';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';

import logger from '../../lib/log';

import { TaskState } from '../../constants/variables';

interface TaskListState {
    tasks: TaskModel[];
    loading: boolean;
}

export default class TaskLink extends React.Component<{}, TaskListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tasks: [],
            loading: true
        };
    }

    componentDidMount() {
        getTaskList()
            .then(res => {
                this.setState({
                    tasks: res.data.filter(item => {
                        return item.status === TaskState.waiting;
                    }),
                    loading: false
                })
            })
            .catch(err => {
                logger.error('get-taskList-failed', err);
                this.setState({
                    loading: false
                });
                Toast(err.msg || '获取数据失败');
            });
    }

    render() {
        const { tasks, loading } = this.state;
        return (
            <div>
                {loading && <Loading> </Loading>}
                {tasks.length > 0 ?
                    <div className="link">
                        {tasks.map((task, index) => {
                            return (
                                <Link key={index} to={`/rehandling/change/${task.rackId}/20`}>
                                    <Task task={task}/>
                                </Link>
                            )
                        })}
                    </div>
                    : <h3 className="empty-list">路线暂无待换装任务!</h3>
                }
            </div>


        )
    }
}

