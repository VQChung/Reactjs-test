import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ACTION, FORMAT_DATE_TIME, ITask, TASK_PRIORITY } from '../constants/constants';
import { v1 as uuidv1 } from 'uuid';
import moment from 'moment';

interface ICreEditTask {
  taskProps?: any;
  excuteActionTask: (currentTask: ITask, actionType: string) => void;
  isUpdateTask: boolean;
}

const CreateEditTask: React.FC<ICreEditTask> = (props) => {
  const taskProps = props.taskProps;
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDes, setTaskDes] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState(TASK_PRIORITY[1]);

  useEffect(() => {
    if (!_.isNil(taskProps)) {
      setTaskTitle(taskProps.taskTitle)
      setTaskDes(taskProps.taskDes)
      setTaskDueDate(taskProps.taskDueDate)
      setTaskPriority(taskProps.taskPriority)
    } else {
      setTaskDueDate(moment().format(FORMAT_DATE_TIME.YYYYMMDD))
      setTaskPriority(TASK_PRIORITY[1])
    }
  }, []);

  const handleOnChangePriority = (event: any) => {
    const taskPrio = { value: '', label: '' }
    taskPrio.value = event.value
    taskPrio.label = event.label
    setTaskPriority(taskPrio)
  }

  const AddEditTask = () => {
    const currentTask = {
      taskId: taskProps ? taskProps.taskId : uuidv1(),
      taskTitle,
      taskDes,
      taskDueDate,
      taskPriority
    }
    props.excuteActionTask(currentTask, props.isUpdateTask ? ACTION.EDIT : ACTION.ADD);
  }

  return (
    <div className="content-add-edit-task">
      <input className="mr-b20 wd-80"
        placeholder="Add new Task..."
        defaultValue={!_.isNil(taskProps) ? taskProps.taskTitle : taskTitle}
        onBlur={(event) => setTaskTitle(event.target.value)} />
      <div className="description mr-b20">
        <label>Description</label>
        <textarea defaultValue={!_.isNil(taskProps) ? taskProps.taskDes : taskDes}
          onBlur={(event) => setTaskDes(event.target.value)}></textarea>
      </div>
      <div className="option-task mr-b20">
        <div className="option-task-item">
          <label>Due Date</label>
          <input type="date"
            defaultValue={taskDueDate}
            min={moment().format(FORMAT_DATE_TIME.YYYYMMDD)}
            onBlur={(event) => setTaskDueDate(event.target.value)} />
        </div>
        <div className="option-task-item">
          <label>Priority</label>
          <Select
            value={taskPriority}
            isSearchable={false}
            onChange={(event) => handleOnChangePriority(event)}
            options={TASK_PRIORITY}></Select>
        </div>
      </div>
      <button className="btn btn-add-edit btn-green wd-80 mr-t20" onClick={AddEditTask}>{props.isUpdateTask ? 'Update' : 'Add'}</button>
    </div>
  )
}

export default CreateEditTask;