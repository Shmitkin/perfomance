const mockTasksRequest = {
  total_count: 123,
  result: [
    {
      name: `Загрузить новые данные`,
      id: 1,
      color: `#FED6BC`,
      duration: 120,
      startDate: `2021-01-26`,
      startTime: `20:00`,
      steps: [
        {
          name: `Запросить данные`,
          id: 1,
          type: `GET`,
          endpoint: `192.292.2.245/megadata/`,
          params: [
            {
              id: 1,
              key: `param1`,
              value: `123`,
            },
            {
              id: 2,
              key: `param2`,
              value: `value`,
            },
          ],
          error: `repeat`,
        },
        {
          name: `Запросить еще данные`,
          id: 2,
          type: `GET`,
          endpoint: `192.292.2.245/anotherdata/`,
          params: [
            {
              id: 1,
              key: `param1`,
              value: `true`,
            },
            {
              id: 2,
              key: `param2`,
              value: `500`,
            },
          ],
          error: `break`,
        },
      ],
    },

    {
      name: `сделать бэкап`,
      color: `#FDEED9`,
      id: 2,
      duration: 120,
      startDate: `2021-01-27`,
      startTime: `14:00`,
      steps: [
        {
          name: `Проверить разницу данных`,
          id: 1,
          type: `GET`,
          endpoint: `192.292.2.245/data/`,
          params: [
            {
              id: 1,
              key: `date_start`,
              value: `01.01.2021`,
            },
            {
              id: 2,
              key: `date_end`,
              value: `31.01.2021`,
            },
          ],
          error: `send email`,
        },
        {
          name: `скопировать разницу`,
          id: 2,
          type: `GET`,
          endpoint: `192.292.2.245/backup/`,
          params: [
            {
              id: 1,
              key: `url_to_copy`,
              value: `192.292.2.245/data/`,
            },
            {
              id: 2,
              key: `date_start`,
              value: `01.01.2021`,
            },
            {
              id: 3,
              key: `date_end`,
              value: `31.01.2021`,
            },
          ],
          error: `send email`,
        },
      ],
    },
    {
      name: `сделать что-то`,
      color: `#C3FBD8`,
      startDate: `2021-01-27`,
      startTime: `09:00`,
      id: 3,
      duration: 240,
      steps: [],
    },
    {
      name: `сделать еще что-то`,
      color: `#E7ECFF`,
      startDate: `2021-01-29`,
      startTime: `18:00`,
      id: 4,
      duration: 120,
      steps: [],
    },
    {
      name: `сделать что-либо`,
      color: `#DEF7FE`,
      startDate: `2021-01-27`,
      startTime: `20:00`,
      id: 5,
      duration: 120,
      steps: [],
    },
    {
      name: `сделать бэкап еще чего то`,
      color: `#FFFADD`,
      startDate: `2021-01-28`,
      startTime: `09:00`,
      id: 6,
      duration: 120,
      steps: [],
    },
  ],
};

export default mockTasksRequest;
