export const TASK_PRIORITY = [
    {value: '0', label: 'low'},
    {value: '1', label: 'normal'},
    {value: '2', label: 'high'}
]

export const ACTION = {
    ADD: 'add',
    EDIT: 'edit',
    REMOVE: 'remove',
    DONE: 'done',
    REMOVE_ALL: 'remove all'
}
export interface ITask {
    taskId: string,
    taskTitle: string,
    taskDes: string,
    taskDueDate: any;
    taskPriority: {
        value: string,
        label: string
    }
}

export const FORMAT_DATE_TIME = {
    YYYYMMDD: 'YYYY-MM-DD'
}

export const TIMEOUT_SEARCH_TASK = 300;