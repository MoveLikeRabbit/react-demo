import React from 'react';
import '../../../style/rehandling.less';
import { TaskStateText } from '../../../constants/variables';
import { TaskModel } from '../../../types';

interface TaskProps {
    task: TaskModel
}

import { TaskState } from '../../../constants/variables';

export default function Task(props: TaskProps) {
    const { status, rackName, address, publishDate, area, serialNum } = props.task;
    return (
        <div className="task-item">
            <p>
                <span
                    className={`state ${status === TaskState.waiting ? 'undone' : 'done'}`}>{TaskStateText[status]}</span>
                <span className="rackName">{rackName}</span>
            </p>
            <p className="address">{address}</p>
            <p className="other-info ">
                <span>{publishDate}</span>
                <span>{area}</span>
                <span>{serialNum}</span>
            </p>
        </div>
    )
}



