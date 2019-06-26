/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';

import CustomMessageComponent from './components/CustomMessage';
import ValidationContextComponent from './components/ValidationContext';
import useErrorHook from './hooks/useError';
import useMaskHook from './hooks/useMask';

export * from './config';

export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;
export const useError = useErrorHook;
export const useMask = useMaskHook;