import React, {useEffect, useState, useRef} from 'react';

export default function StepItem({currentStep, onSaveButtonClick, onStepDeleteButtonClick}) {
  const [step, setStep] = useState(currentStep);
  const [isEditMode, setIsEditMode] = useState(false);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevCurrentStep = usePrevious(currentStep);

  useEffect(() => {
    if (prevCurrentStep !== currentStep) {
      setStep(currentStep);
    }
  }, [currentStep, prevCurrentStep]);

  const onParamChange = (param, key, value) => {
    // скопировали массив всех параметров из шага
    const paramsInStep = step.params.slice();
    // нашли индекс редактируемого элемента
    const index = paramsInStep.findIndex((item) => item.id === param.id);
    // создали отредактированный объект
    const editedParam = {...paramsInStep[index], [key]: value};
    // создадим отредактиролванный массив
    const editedParams = paramsInStep.slice(0, index).concat(editedParam).concat(paramsInStep.slice(index + 1));
    // заменим массив в объекте
    setStep({...step, params: editedParams});
  };

  const addNewParam = () => {
    const maxId = step.params.length !== 0 ? step.params[step.params.length - 1].id : 0;

    const newParam = {
      id: maxId + 1,
      key: ``,
      value: ``,
    };

    const newParams = step.params.concat(newParam);
    setStep({...step, params: newParams});
  };

  const deleteParam = (id) => {
    const index = step.params.findIndex((item) => item.id === id);
    const editedParams = step.params.slice(0, index).concat(step.params.slice(index + 1));
    setStep({...step, params: editedParams});
  };

  return (
    <li
      className="current-task-area__list-item"
    >
      {(isEditMode || step.new) && (
        <>
          <label className="step__list-item">
            <span>Название шага:</span>
            <input
              value={step.name}
              onChange={(evt) => setStep((prevState) => ({...prevState, name: evt.target.value}))}
            />
          </label>
          <label className="step__list-item">
            <span>Тип запроса:</span>
            <input
              value={step.type}
              onChange={(evt) => setStep((prevState) => ({...prevState, type: evt.target.value}))}
            />
          </label>
          <label className="step__list-item">
            <span>Эндпоинт:</span>
            <input
              value={step.endpoint}
              onChange={(evt) => setStep((prevState) => ({...prevState, endpoint: evt.target.value}))}
            />
          </label>

          <div className="step__list-params-container">
            {step.params.map((param) => (
              <div key={param.id} className="step__list-params-item">
                <label>
                  <span>Параметр:</span>
                  <input
                    value={param.key}
                    onChange={(evt) => { onParamChange(param, `key`, evt.target.value); }}
                  />
                </label>
                <label>
                  <span>Значение:</span>
                  <input
                    value={param.value}
                    onChange={(evt) => { onParamChange(param, `value`, evt.target.value); }}
                  />
                </label>
                <button type="button" onClick={() => { deleteParam(param.id); }}>Удалить параметр</button>
              </div>
            ))}
            <button type="button" onClick={addNewParam}>Добавить параметр</button>
          </div>
          <label className="step__list-item">
            <span>При ошибке:</span>
            <input
              value={step.error}
              onChange={(evt) => setStep((prevState) => ({...prevState, error: evt.target.value}))}
            />
          </label>
          <div className="step__list-item-buttons">
            <button type="button" onClick={() => { onSaveButtonClick(step); setIsEditMode(false); }}>Сохранить</button>
            <button type="button" onClick={() => { setIsEditMode(false); setStep(currentStep); }}>Отменить</button>
          </div>
        </>
      )}

      {!isEditMode && !step.new && (
        <>
          <div className="step__list-item-no-edit">
            <span>{`Шаг: ${step.id} - ${step.name}`}</span>
            <span>{`Тип запроса: ${step.type}`}</span>
            <span>{`Эндпоинт: ${step.endpoint}`}</span>
            {step.params.map((param) => (
              <div key={param.id}>
                <span>{`Параметр: ${param.key}`}</span>
                <span>{`Значение: ${param.value}`}</span>
              </div>
            ))}
            <span>{`При ошибке: ${step.error}`}</span>
            <div>
              <button type="button" onClick={() => { setIsEditMode(true); }}>Редактировать</button>
              <button type="button" onClick={() => { onStepDeleteButtonClick(step.id); }}>Удалить</button>
            </div>
          </div>
        </>
      )}
    </li>
  );
}
