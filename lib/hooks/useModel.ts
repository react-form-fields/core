import cloneDeep = require('lodash/cloneDeep');
import { useCallback, useRef, useState } from 'react';

export type Model<T> = {
  [key in keyof T]?: T[key];
} & { $dirty?: boolean; toJSON?(this: Model<T>): T };

const useModel = <T>(initialState?: Partial<T>) => {
  const cloneModel = useCallback((model: Model<T>, $dirty: boolean) => {
    model = cloneDeep(model);
    model.$dirty = $dirty;

    model.toJSON = function () {
      const result = cloneDeep<any>(this);
      delete result.$dirty;
      return result as T;
    };

    return model;
  }, []);

  const freezeInitalState = useRef<Model<T>>(cloneModel(initialState, false)).current;
  const [model, setModel] = useState<Model<T>>(freezeInitalState);
  const handlers = useRef<{ [key: string]: any }>({}).current;

  const setModelPropCallback = useRef((key: string, handler: (model: Partial<T>, value: any) => void) => {
    if (!handlers[key]) {
      handlers[key] = (value: any) => {
        handler(model, value);
        setModel(cloneModel(model, true));
      };
    }

    return handlers[key];
  }).current;

  const cleanModel = useCallback(() => {
    setModel(cloneModel(freezeInitalState, false));
  }, [cloneModel, freezeInitalState]);

  return [model, setModelPropCallback, setModel, cleanModel] as [
    typeof model,
    typeof setModelPropCallback,
    typeof setModel,
    typeof cleanModel
  ];
};

export default useModel;
