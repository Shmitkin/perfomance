import {extend} from "../utils.js";

import mockTasksRequest from "./mock-tasks-request.js";

const initialState = {
  tasks: [],
  loading: false,
  tasksCount: 0,
};

const ActionType = {
  SET_TASKS: `SET_TASKS`,
  SET_TASKS_LOADING_STATUS: `SET_TASKS_LOADING_STATUS`,
  SET_TASKS_COUNT: `SET_TASKS_COUNT`,
  SAVE_EDITED_TASK: `SAVE_EDITED_TASK`,
};

const ActionCreator = {
  setTasks: (data) => ({
    type: ActionType.SET_TASKS,
    payload: data,
  }),

  setTasksLoadingStatus: (loading) => ({
    type: ActionType.SET_TASKS_LOADING_STATUS,
    payload: loading,
  }),

  setTasksCount: (count) => ({
    type: ActionType.SET_TASKS_COUNT,
    payload: count,
  }),

  saveEditedTask: (editedTask) => ({
    type: ActionType.SAVE_EDITED_TASK,
    payload: editedTask,
  }),

  addEmptyStepToTask: (taskId) => ({
    type: ActionType.ADD_EMPTY_STEP_TO_TASK,
    payload: taskId,
  }),

  deleteTaskStep: (taskId, stepId) => ({
    type: ActionType.DELETE_TASK_STEP,
    payload: {taskId, stepId},
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_TASKS:
      return extend(state, {tasks: action.payload});

    case ActionType.SET_TASKS_LOADING_STATUS:
      return extend(state, {loading: action.payload});

    case ActionType.SET_TASKS_COUNT:
      return extend(state, {tasksCount: action.payload});

    case ActionType.SAVE_EDITED_TASK: {
      const index = state.tasks.findIndex((item) => item.id === action.payload.id);
      let editedTasks = [];

      if (index !== -1) {
        editedTasks = state.tasks.slice(0, index).concat(action.payload).concat(state.tasks.slice(index + 1));
      } else {
        editedTasks = state.tasks.slice();
        editedTasks.push(action.payload);
      }
      return extend(state, {tasks: editedTasks});
    }

    default: return state;
  }
};

const Operation = {
  loadTasks: () => (dispatch) => {
    dispatch(ActionCreator.setTasksLoadingStatus(true));
    dispatch(ActionCreator.setTasks(mockTasksRequest.result));
    dispatch(ActionCreator.setTasksCount(mockTasksRequest.total_count));
    dispatch(ActionCreator.setTasksLoadingStatus(false));
  },

  saveEditedTask: (editedTask) => (dispatch) => {
    // типо айди присываеваем если новая задача как на серваке
    if (editedTask.id === null) {
      editedTask.id = Math.random();
    }

    dispatch(ActionCreator.setTasksLoadingStatus(true));
    dispatch(ActionCreator.saveEditedTask(editedTask));
    dispatch(ActionCreator.setTasksLoadingStatus(false));
  },

};

export {ActionCreator, ActionType, Operation, reducer, initialState};
