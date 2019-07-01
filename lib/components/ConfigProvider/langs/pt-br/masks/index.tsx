import { IMask } from '../../../context';
import cnpj from './cnpj';
import cpf from './cpf';
import document from './document';
import money from './money';
import phone from './phone';
import zipcode from './zipcode';

const masks: IMask[] = [
  { name: 'zipcode', ...zipcode },
  { name: 'phone', ...phone },
  { name: 'document', ...document },
  { name: 'cpf', ...cpf },
  { name: 'cnpj', ...cnpj },
  { name: 'money', ...money }
];
export default masks;