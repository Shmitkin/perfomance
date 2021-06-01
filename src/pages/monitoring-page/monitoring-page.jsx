import './monitoring-page.scss';
import React from 'react';

export default function MonitoringPage() {
  return (
    <>
      <section className="monitoring">
        <h3>Мониторинг выполнения</h3>
        <div>
          <p className="bold">Последние события</p>
          <p>
            <span className="bold">Предыдущая задача:</span>
            {` `}
            сделать бэкап не выполнена с ошибкой "ERR500", время начала 14:00, время окончания 14:05
          </p>
          <p>
            <span className="bold">Выполняется задача:</span>
            {` `}
            скопировать данные, время начала 13:00, расчетное время окончания 15:00
          </p>
          <p>
            <span className="bold">Следующая задача:</span>
            {` `}
            получить выгрузку, начнется 21.01.2021 в 09:00
          </p>
        </div>
        <table>
          <thead>
            <tr>
              <td>ID лога</td>
              <td>Задача</td>
              <td>Время начала задачи</td>
              <td>Время окончания выполнения</td>
              <td>Статус</td>
              <td>Действия</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>32</td>
              <td>Сделать бэкап</td>
              <td>21.01.2021 14:00</td>
              <td>21.01.2021 14:05</td>
              <td>Не выполнена</td>
              <td>
                <button type="button">Посмотреть задачу</button>
                <button type="button">Посмотреть ЛОГ выполнения</button>
              </td>
            </tr>
            <tr>
              <td>354</td>
              <td>Сделать бэкап</td>
              <td>21.01.2021 14:00</td>
              <td>21.01.2021 16:37</td>
              <td>Выполнена</td>
              <td>
                <button type="button">Посмотреть задачу</button>
                <button type="button">Посмотреть ЛОГ выполнения</button>
              </td>
            </tr>
            <tr>
              <td>32</td>
              <td>Сделать бэкап</td>
              <td>21.01.2021 14:00</td>
              <td>21.01.2021 16:37</td>
              <td>Выполнена</td>
              <td>
                <button type="button">Посмотреть задачу</button>
                <button type="button">Посмотреть ЛОГ выполнения</button>
              </td>
            </tr>
            <tr>
              <td>32</td>
              <td>Сделать бэкап</td>
              <td>21.01.2021 14:00</td>
              <td>21.01.2021 16:37</td>
              <td>Выполнена</td>
              <td>
                <button type="button">Посмотреть задачу</button>
                <button type="button">Посмотреть ЛОГ выполнения</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
