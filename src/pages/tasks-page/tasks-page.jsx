import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Operation as TasksOperation} from "../../store/tasks/tasks.js";
import {getTasks, getTasksCount} from "../../store/tasks/selectors.js";

import StepItem from './step-item.jsx';

const emptyTask = {
  name: ``,
  id: null,
  duration: ``,
  steps: [],
  color: `#B5F2EA`,
  startDate: ``,
  startTime: ``,
};

export default function TasksPage() {
  const dispatch = useDispatch();

  const tasks = useSelector(getTasks);
  const tasksCount = useSelector(getTasksCount);

  const [currentTask, setCurrentTask] = useState(null);

  const deleteStepInCurrentTask = (stepId) => {
    // 3. Ищем индекс шага который нужно удалить
    const stepIndex = currentTask.steps.findIndex((item) => item.id === stepId);
    // 4. Копируем остаток массива после индекса задачи чтобы переписать их id
    const stepsToEditIndex = currentTask.steps.slice(stepIndex + 1);
    // 5. Перепишем id в задачах в массиве созданом на шаге 4 и скопируем их в новый массив
    const stepsWithEditedIndex = stepsToEditIndex.map((step) => ({...step, id: step.id - 1}));
    // 6. Создадим новый массив который равен копии исходного до индекса и массива из шага 5
    const editedStepsArray = currentTask.steps.slice(0, stepIndex).concat(stepsWithEditedIndex);
    // 7. Присвоим отредактированный массив на шаге 6 в копию задачи созданной на шаге 2
    setCurrentTask((prevState) => ({...prevState, steps: editedStepsArray}));
  };

  const addStepToCurrentTask = () => {
    const emptyStep = {
      name: ``,
      id: currentTask.steps.length + 1,
      endpoint: ``,
      type: ``,
      params: [],
      error: ``,
      new: true,
    };
    setCurrentTask((prevState) => ({...prevState, steps: prevState.steps.concat(emptyStep)}));
  };

  useEffect(() => {
    // временное условие чтобы сохранялись данные при переключении между вкладками
    if (tasks.length === 0) {
      dispatch(TasksOperation.loadTasks());
    }
  }, [dispatch, tasks]);

  const onSaveStepButtonClickHandler = (editedStep) => {
    const steps = currentTask.steps.slice();
    let editedSteps = [];
    const index = steps.findIndex((step) => step.id === editedStep.id);
    if (index !== -1) {
      editedSteps = steps.slice(0, index).concat({...editedStep, new: false}).concat(steps.slice(index + 1));
    } else {
      editedSteps = steps.slice().concat(editedStep);
    }
    setCurrentTask((prevState) => ({...prevState, steps: editedSteps}));
  };

  return (
    <div className="tasks-page-container">
      <div className="task-area">
        <p className="task-area__title">
          {`Всего задач ${tasksCount}`}
        </p>
        <div className="task-area__list">
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => { setCurrentTask(task); }}
              className="task-area__list-item task-area__task-button"
            >
              <span>{`Название: ${task.name}`}</span>
              <span>{`Шагов: ${task.steps.length}`}</span>
              <span>{`Продолжительность: ${task.duration} минут`}</span>
            </button>
          ))}
        </div>
        <button className="task-area__button" type="button" onClick={() => { setCurrentTask(emptyTask); }}>Добавить задачу</button>
      </div>

      <div className="current-task-area">
        {currentTask === null && <p>Выберите задачу или создайте новую</p>}
        {currentTask !== null && (
        <>
          <label className="current-task-area__title">
            <span>Название задачи:</span>
            <input
              value={currentTask.name}
              onChange={(evt) => setCurrentTask((prevState) => ({...prevState, name: evt.target.value}))}
            />
          </label>

          <label className="current-task-area__title">
            <span>Продолжительность:</span>
            <input
              value={currentTask.duration}
              type="number"
              onChange={(evt) => setCurrentTask((prevState) => ({...prevState, duration: Number(evt.target.value)}))}
            />
          </label>

          <ul className="current-task-area__list">
            {currentTask.steps.map((step) => (
              <StepItem
                currentStep={step}
                key={step.id}
                onSaveButtonClick={onSaveStepButtonClickHandler}
                onStepDeleteButtonClick={deleteStepInCurrentTask}
              />
            ))}
          </ul>
          <button
            className="current-task-area__button"
            type="button"
            onClick={addStepToCurrentTask}
          >
            Добавить шаг
          </button>
          <button
            className="current-task-area__button"
            type="button"
            onClick={() => { dispatch(TasksOperation.saveEditedTask(currentTask)); setCurrentTask(null); }}
          >
            Сохранить
          </button>
          <button className="current-task-area__button" type="button" onClick={() => { setCurrentTask(null); }}>Отменить</button>
        </>
        )}
      </div>
    </div>
  );
}
