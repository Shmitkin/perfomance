import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {getTasks} from "../../store/tasks/selectors.js";
import {Operation as TasksOperation} from "../../store/tasks/tasks.js";

const DAY_NAMES = [
  `Понедельник`,
  `Вторник`,
  `Среда`,
  `Четверг`,
  `Пятница`,
  `Суббота`,
  `Воскресенье`,
];

const tasksSheduled = [
  {id: 1, name: `task1`, startDate: `26.01.2021`, startTime: 20, duration: 180},
  {id: 2, name: `task2`, startDate: `26.01.2021`, startTime: 9, duration: 520},
  {id: 3, name: `task3`, startDate: `29.01.2021`, startTime: 19, duration: 120},
  {id: 4, name: `task4`, startDate: `26.01.2021`, startTime: 3, duration: 120},
  {id: 5, name: `task5`, startDate: `27.01.2021`, startTime: 18, duration: 180},
];

const ROW_MAP = [
  {dayName: DAY_NAMES[moment().day()], date: moment().format(`DD.MM.YYYY`), tasks: []},
  {dayName: DAY_NAMES[moment().add(1, `days`).day()], date: moment().add(1, `days`).format(`DD.MM.YYYY`), tasks: []},
  {dayName: DAY_NAMES[moment().add(2, `days`).day()], date: moment().add(2, `days`).format(`DD.MM.YYYY`), tasks: []},
  {dayName: DAY_NAMES[moment().add(3, `days`).day()], date: moment().add(3, `days`).format(`DD.MM.YYYY`), tasks: []},
  {dayName: DAY_NAMES[moment().add(4, `days`).day()], date: moment().add(4, `days`).format(`DD.MM.YYYY`), tasks: []},
  {dayName: DAY_NAMES[moment().add(5, `days`).day()], date: moment().add(5, `days`).format(`DD.MM.YYYY`), tasks: []},
  {dayName: DAY_NAMES[moment().add(6, `days`).day()], date: moment().add(6, `days`).format(`DD.MM.YYYY`), tasks: []},
];

const TIME_MAP = [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440];

const tasksToWeek = (tasks) => ROW_MAP.map((day) => {
  const tasksInDay = tasks.slice().filter((task) => moment(task.startDate).format(`DD.MM.YYYY`) === day.date);
  return {...day, tasks: tasksInDay};
});

const tasksWeeked = tasksToWeek(tasksSheduled);

const mapTasksToCalendar = (days) => days.map((day) => {
  const timeMapping = [];
  day.tasks.forEach((task) => {
    const tr = TIME_MAP.map((time) => {
      if ((parseInt(task.startTime) * 60 < time) && (parseInt(task.startTime) * 60 + task.duration >= time)) {
        return {
          type: `filled`,
          taskId: task.id,
          taskName: task.name,
          color: task.color,
        };
      }
      return {type: `empty`};
    });
    timeMapping.push(tr);
  });
  return {...day, timeGraph: timeMapping};
});

const mappedTasks = mapTasksToCalendar(tasksWeeked);

const tasksToTr = (toTrTasks) => {
  const tasksMapped = [];
  let counter = 0;

  toTrTasks.forEach((interval, index, arr) => {
    if (interval.type === `empty`) {
      tasksMapped.push(interval);
      counter = 0;
    } else if (arr[index + 1] && interval.taskId === arr[index + 1].taskId) {
      counter += 1;
    } else if (arr[index + 1] && interval.taskId !== arr[index + 1].taskId) {
      tasksMapped.push({...interval, size: counter + 1});
    }
  });
  return tasksMapped;
};

const getTasksTr = (tasks) => tasks.map((item) => ({...item, trLayout: item.timeGraph.map(tasksToTr)}));

// console.log(getTasksTr());

export default function ShedulerPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // временное условие чтобы сохранялись данные при переключении между вкладками
    if (tasks.length === 0) {
      dispatch(TasksOperation.loadTasks());
    }
  }, [dispatch, tasks]);

  const getTasksDiagram = () => {
    console.log(getTasksTr(mapTasksToCalendar(tasksToWeek(tasks))));
    return getTasksTr(mapTasksToCalendar(tasksToWeek(tasks)));
  };

  return (
    <section className="sheduler">
      <div className="sheduler__tasks">
        <h2>Задачи</h2>
        <ul className="sheduler__tasks-list">
          {tasks.map((task) => (
            <li
              className="sheduler__task"
              key={task.id}
              style={{backgroundColor: task.color}}
              onClick={() => { setSelectedTask(task); }}

            >
              <span>{`Название: ${task.name}`}</span>
              <span>{`Шагов: ${task.steps.length}`}</span>
              <span>{`Продолжительность: ${task.duration}`}</span>
            </li>
          ))}
        </ul>
      </div>

      {selectedTask !== null && (
      <div className="sheduler__current-task" style={{backgroundColor: `${selectedTask.color}`}}>
        <h3>{selectedTask.name}</h3>
        <span>{`Продолжительность: ${selectedTask.duration} минут`}</span>
        <div className="sheduler__current-task-start-time">
          <label>
            Старт задачи:
            <input
              type="date"
              value={selectedTask.startDate}
              onChange={(evt) => setSelectedTask((prevState) => ({...prevState, startDate: evt.target.value}))}
            />
            <input
              type="time"
              value={selectedTask.startTime}
              onChange={(evt) => setSelectedTask((prevState) => ({...prevState, startTime: evt.target.value}))}
            />
          </label>
          <button
            type="button"
            onClick={() => { dispatch(TasksOperation.saveEditedTask(selectedTask)); }}
          >
            Сохранить

          </button>
        </div>
      </div>
      )}

      <div className="sheduler__diagram-area">
        <h2>Календарь</h2>
        <table className="sheduler__diagram">
          <thead className="sheduler__diagram-head">
            <tr className="sheduler__table-head-row">
              <td className="sheduler__table-col" />
              {new Array(24).fill(``).map((item, i) => (
                <td
                  className="sheduler__table-col"
                  key={`head-${Math.random()}`}
                >
                  {i}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {getTasksDiagram().map((item) => (
              <>
                {item.trLayout.length === 0 && (
                <tr className="sheduler__table-head-row" key={`body-row-${Math.random()}`}>
                  <td className="sheduler__table-col">{`${item.dayName} (${item.date})`}</td>
                  {new Array(24).fill(``).map(() => (
                    <td
                      className="sheduler__table-col"
                      key={`body-col-${Math.random()}`}
                    />
                  ))}
                </tr>
                )}
                {item.trLayout.map((trItem, index) => (
                  <tr className="sheduler__table-head-row" key={`body-row-${Math.random()}`}>
                    {index === 0 && <td className="sheduler__table-col" rowSpan={item.trLayout.length}>{`${item.dayName} (${item.date})`}</td>}
                    {trItem.map((oneItem) => (
                      <td
                        className="sheduler__table-col"
                        key={`body-col-${Math.random()}`}
                        colSpan={oneItem.size}
                        style={{backgroundColor: `${oneItem.color}`}}
                        onClick={() => { setSelectedTask(oneItem.color ? item.tasks[index] : null); }}
                      >
                        {oneItem.type === `empty` ? `` : oneItem.taskName }
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
