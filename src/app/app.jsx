import React from 'react';
import {useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {push} from 'connected-react-router';

import MainPage from "../pages/main-page/main-page.jsx";
import TasksPage from "../pages/tasks-page/tasks-page.jsx";
import ShedulerPage from "../pages/sheduler-page/sheduler-page.jsx";
import MonitoringPage from "../pages/monitoring-page/monitoring-page.jsx";
import TasksDesignPage from "../pages/tasks-design-page/tasks-design-page.jsx";

// для роутинга на гитхабе
const routePrefix = process.env.NODE_ENV === `production` ? `/dks-sheduler` : ``;

export default function App() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="main-container">
        <div className="header">
          <div className="header__menu">
            <button className="header__menu-item" type="button" onClick={() => { dispatch(push(`${routePrefix}/`)); }}>Главная</button>
            <button className="header__menu-item" type="button" onClick={() => { dispatch(push(`${routePrefix}/tasks`)); }}>Задачи</button>
            <button className="header__menu-item" type="button" onClick={() => { dispatch(push(`${routePrefix}/tasks-design`)); }}>Задачи дизайн</button>
            <button className="header__menu-item" type="button" onClick={() => { dispatch(push(`${routePrefix}/sheduler`)); }}>Планировщик</button>
            <button className="header__menu-item" type="button" onClick={() => { dispatch(push(`${routePrefix}/monitoring`)); }}>Мониторинг</button>
          </div>
          <button className="header__autorization-button" type="button">Авторизация</button>
        </div>
        <Switch>
          <Route exact path={`${routePrefix}/tasks`} component={TasksPage} />
          <Route exact path={`${routePrefix}/tasks-design`} component={TasksDesignPage} />
          <Route exact path={`${routePrefix}/sheduler`} component={ShedulerPage} />
          <Route exact path={`${routePrefix}/monitoring`} component={MonitoringPage} />
          <Route exact path={`${routePrefix}/`} component={MainPage} />
          <Route path="*" component={MainPage} />
        </Switch>
      </div>
    </>
  );
}
