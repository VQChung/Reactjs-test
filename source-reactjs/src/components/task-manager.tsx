import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ACTION, ITask, TIMEOUT_SEARCH_TASK } from '../constants/constants';
import { checkRequiredField, compareDateTask } from '../helpers/logic-utils';
import useTimeOut from '../helpers/use-time-out';
import CreateEditTask from './create-edit-task';
import TaskItemList from './task-item-list';

interface ITaskManager {
}

const TaskManager: React.FC<ITaskManager> = () => {

  const [listTaskChecked, setListTaskChecked] = useState<ITask[]>([]);
  const [textSearchTask, setTextSearchTask] = useState('')
  const textSearchTimeOut = useTimeOut(textSearchTask, TIMEOUT_SEARCH_TASK)
  const [listTask, setListTask] = useState<ITask[]>(() => {
    try {
      const data = getDataLocalStorage();
      return data;
    } catch (ex) {
      return Array<ITask>()
    }
  });

  useEffect(() => {
    FilTaskByTitle(textSearchTask)
  }, [textSearchTimeOut])

  /**
   * set data with localStorage 
   * @param data listTask
   */

  const setDataLocalStorage = (data: ITask[]) => {
    localStorage.setItem('listTask', JSON.stringify(data))
  }

  /**
   * get data from localStorage
   * @returns listTask
   */

  const getDataLocalStorage = () => {
    const listTaskGet = localStorage.getItem('listTask')
    if (!_.isNil(listTaskGet)) {
      return JSON.parse(listTaskGet);
    }
    return Array<ITask>();

  }

  /**
   * excute action add, remove, edit task 
   * @param currentTask 
   * @param actionType 
   */

  const excuteActionTask = (currentTask: ITask, actionType: string) => {
    switch (actionType) {
      case ACTION.ADD: {
        if (checkRequiredField(currentTask.taskTitle, 'Task title')) {
          listTask.push(currentTask);
          setDataLocalStorage(listTask)
        }
        break;
      }
      case ACTION.EDIT: {
        if (checkRequiredField(currentTask.taskTitle, 'Task title')) {
          const idx = listTask.findIndex(e => e.taskId === currentTask.taskId);
          if (idx >= 0) {
            listTask[idx] = currentTask;
          }
          setDataLocalStorage(listTask)
        }
        break;
      }
      case ACTION.REMOVE: {
        const idx = listTask.findIndex(e => e.taskId === currentTask.taskId);
        if (idx >= 0) {
          listTask.splice(idx, 1)
          setDataLocalStorage(listTask)
        }
        break;
      }
    }
    setListTask(_.cloneDeep(listTask.sort(compareDateTask)));
  }

  /**
   * remove task has checked in task item list
   * 
   */

  const removeTasksCheck = () => {
    const listTaskAfterDel = listTask.filter(e => !listTaskChecked.find(o => o.taskId === e.taskId))
    setListTask(listTaskAfterDel)
    setDataLocalStorage(listTaskAfterDel)
  }

  /**
   * search task by title
   * @param text text search
   * @returns listTask with condition search
   */

  const FilTaskByTitle = (text: string) => {
    if (_.isNil(text)) {
      setListTask(getDataLocalStorage())
    } else {
      const listTaskFil = getDataLocalStorage().filter((item: ITask) => item.taskTitle.includes(text))
      setListTask(listTaskFil)
    }
  }

  /**
   * push or remove task from listTask checked
   * @param taskChecked 
   * @param isChecked 
   */

  const updateListTaskChecked = (taskChecked: ITask, isChecked: boolean) => {
    const idx = listTaskChecked.findIndex(e => e.taskId === taskChecked.taskId)
    if (isChecked) {
      if (idx < 0) {
        listTaskChecked.push(taskChecked);
      }
    } else {
      if (idx >= 0) {
        listTaskChecked.splice(idx, 1)
      }
    }
    setListTaskChecked(_.cloneDeep(listTaskChecked))
  }

  /**
   * change status checked of task 
   * @param taskItem 
   * @returns true: checked, false: unchecked
   */

  const setCheckStatusTaskItem = (taskItem: ITask) => {
    return listTaskChecked.find(e => e.taskId === taskItem.taskId) ? true : false
  }

  return (
    <div className="wrap-container">
      <div className="wrap-container-create-edit h100vh">
        <h1 className="title">New Task</h1>
        <CreateEditTask
          excuteActionTask={excuteActionTask}
          isUpdateTask={false} />
      </div>
      <div className="wrap-container-list">
        <h1 className="title">To Do List</h1>
        <div className="enter-name-task">
          <input className="mr-b20 wd-100" placeholder="Search..." onChange={(event) => setTextSearchTask(event.target.value)} />
        </div>
        <ul className={listTaskChecked.length > 0 ? 'list-task calc-210' : 'list-task calc-145'}>
          {
            listTask.map((taskItem) => {
              return <TaskItemList
                currentTask={taskItem}
                excuteActionTask={excuteActionTask}
                updateListTaskChecked={updateListTaskChecked}
                isChecked={setCheckStatusTaskItem(taskItem)} />
            })
          }
        </ul>
        {listTaskChecked.length > 0 &&
          <div className="bulk-action">
            <label>Bulk action</label>
            <div className="item-action">
              <div className="item-action-button">
                <button className="btn btn-action btn-blue w-120px h-35 mr-r10">Done</button>
                <button className="btn btn-action btn-red h-35 w-120px" onClick={removeTasksCheck}>Remove</button>
              </div>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default TaskManager;
