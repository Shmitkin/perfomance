import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.TASKS;

export const getTasks = (state) => state[NAME_SPACE].tasks;

export const getTasksCount = (state) => state[NAME_SPACE].tasksCount;
