import { IMask } from '../../../components/ConfigProvider/context';
import money from './money';

const masks: IMask[] = [
  { name: 'money', ...money }
];

export default masks;