import { ITask } from "../constants/constants";

export const checkRequiredField = (inputRequired: string, fieldName: string) => {
    if (inputRequired === '') {
      alert(fieldName + ' is required!');
      return false;
    }
    return true;
  }

export const compareDateTask = (task1: ITask, task2: ITask) => {
    if (new Date(task1.taskDueDate) > new Date(task2.taskDueDate))
      return 1
    else if (new Date(task1.taskDueDate) < new Date(task2.taskDueDate)) {
      return -1
    } else return 0
  }
