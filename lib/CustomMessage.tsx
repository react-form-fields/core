import { memo } from 'react';

export interface IProps {
  children: string;
  rules: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomMessage = memo((props: IProps) => {
  return null;
});

export default CustomMessage;