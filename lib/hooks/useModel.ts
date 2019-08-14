import cloneDeep = require('lodash/cloneDeep');
import { useCallback, useRef, useState } from 'react';

type IModel<T> = {
  [key in keyof T]?: T[key];
} & { $dirty?: boolean; toJSON?(this: IModel<T>): T };

const useModel = <T>(initialState?: Partial<T>) => {
  const cloneModel = useCallback((model: IModel<T>, $dirty: boolean) => {
    model = cloneDeep(model);
    model.$dirty = $dirty;

    model.toJSON = function () {
      const result = cloneDeep<any>(this);
      delete result.$dirty;
      return result as T;
    };

    return model;
  }, []);

  const [freezeInitalState] = useState(cloneModel(initialState, false));
  const [model, setModel] = useState(cloneModel(initialState, false));
  const handlers = useRef<{ [key: string]: any }>({}).current;

  const setModelCallback = useRef((key: string, handler: (model: Partial<T>, value: any) => void) => {
    if (!handlers[key]) {
      handlers[key] = (value: any) => {
        const newModel = cloneModel(model, true);
        handler(newModel, value);
        setModel(newModel);
      };
    }

    return handlers[key];
  }).current;

  const cleanModel = useCallback(() => {
    setModel(cloneModel(freezeInitalState, false));
  }, [cloneModel, freezeInitalState]);

  return [model, setModelCallback, setModel, cleanModel] as [
    typeof model,
    typeof setModelCallback,
    typeof setModel,
    typeof cleanModel
  ];
};

export default useModel;
