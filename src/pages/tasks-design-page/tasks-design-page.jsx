import "./tasks-design-page.scss";
import React from 'react';
import randomColor from 'randomcolor';

const TASKS_COUNT = 30;

class MOCK_TASK {
  constructor() {
    this.color = randomColor({
      luminosity: `light`,
      format: `rgba`,
      alpha: 0.4,
    });
    this.name = `<Название задачи>`;
    this.stepsCount = `<количество>`;
    this.duration = `<продолжительность>`;
  }
}

const TASKS_MOCK = new Array(TASKS_COUNT).fill(``).map(() => new MOCK_TASK());

const showAll = false;

export default function MainPage() {
  return (
    <>
      <div className="tasks-desing__header">
        <h1>Задачи</h1>
        <span>{`Всего задач: <количество задач>`}</span>
      </div>
      <section className="tasks-desing__tasks">

        {showAll && (
        <ul className="tasks-desing__tasks-list">
          {TASKS_MOCK.map((task) => (
            <li key={Math.random()} className="tasks-desing__tasks-list-item" style={{backgroundColor: task.color}}>
              <p>{task.name}</p>
              <span>{`Количество шагов: ${task.stepsCount}`}</span>
              <span>{`Продолжительность: ${task.duration}`}</span>
            </li>
          ))}
        </ul>
        )}
        {!showAll && (
        <div>
          <p>{`<Название задачи>`}</p>
          <p>Шаг</p>
          <span>{`Количество шагов: <количество>`}</span>
          <span>{`Продолжительность: <продолжительность>`}</span>

        </div>
        )}
      </section>
    </>
  );
}
