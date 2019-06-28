import CustomMessageComponent from './components/CustomMessage';
import ValidationContextComponent from './components/ValidationContext';
import ConfigBuilderCore from './config/builder';
import FieldValidationConfigContextCore from './config/context';
import useMaskHook from './hooks/useMask';
import useValidationHook from './hooks/useValidation';

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;
export const useValidation = useValidationHook;
export const useMask = useMaskHook;
export const ConfigBuilder = ConfigBuilderCore;
export const FieldValidationConfigContext = FieldValidationConfigContextCore;