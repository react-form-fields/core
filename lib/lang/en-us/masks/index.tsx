import { IMask } from '../../../config/context';
import money from './money';

const masks: IMask[] = [
  { name: 'money', ...money }
];

export default masks;