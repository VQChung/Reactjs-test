import React, { useState } from 'react';
import { ACTION, ITask } from '../constants/constants';
import CreateEditTask from './create-edit-task';

interface ITaskItemList {
    currentTask: ITask
    excuteActionTask: (currentTask: ITask, actionType: string) => void
    updateListTaskChecked: (taskChecked: ITask, isCheck: boolean) => void
    isChecked: boolean
}

const TaskItemList: React.FC<ITaskItemList> = (props) => {
    const [isShowDetail, setIsShowDetail] = useState(false);

    const removeTaskItemList = () => {
        props.excuteActionTask(props.currentTask, ACTION.REMOVE)
    }

    return (
        <li className="item">
            <div className="item-action">
                <label className="checkbox-container">{props.currentTask.taskTitle}
                            <input type="checkbox" onChange={(event) => props.updateListTaskChecked(props.currentTask, event.target.checked)} checked={props.isChecked}/>
                    <span className="checkmark"></span>
                </label>
                <div className="item-action-button">
                    <button className="btn btn-action btn-iris-blue w-100px mr-r10" onClick={() => setIsShowDetail(!isShowDetail)}>Detail</button>
                    <button className="btn btn-action btn-red w-100px" onClick={removeTaskItemList}>Remove</button>
                </div>
            </div>
            {isShowDetail && <CreateEditTask taskProps={props.currentTask} excuteActionTask={props.excuteActionTask} isUpdateTask={true}/>}
        </li>
    )
}

export default TaskItemList;