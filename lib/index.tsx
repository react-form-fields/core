import ConfigProviderComponent, { ConfigBuilder as ConfigBuilderClass } from './components/ConfigProvider';
import CustomMessageComponent from './components/CustomMessage';
import ValidationContextComponent from './components/ValidationContext';
import useMaskHook from './hooks/useMask';
import useValidationHook from './hooks/useValidation';

export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;
export const useValidation = useValidationHook;
export const useMask = useMaskHook;
export const ConfigProvider = ConfigProviderComponent;
export const ConfigBuilder = ConfigBuilderClass;