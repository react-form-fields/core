import ConfigProviderComponent, { ConfigBuilder as ConfigBuilderClass } from './ConfigProvider';
import CustomMessageComponent from './CustomMessage';
import useMaskHook from './hooks/useMask';
import useValidationHook from './hooks/useValidation';
import ValidationContextComponent from './ValidationContext';

export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;
export const useValidation = useValidationHook;
export const useMask = useMaskHook;
export const ConfigProvider = ConfigProviderComponent;
export const ConfigBuilder = ConfigBuilderClass;