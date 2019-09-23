import { memo } from 'react';

import useMask from './hooks/useMask';

export interface ITextMaskProps {
  children: string | number | Date;
  mask: string;
}

const TextMask = memo<ITextMaskProps>(props => {
  const { maskedValue } = useMask({ value: props.children, mask: props.mask });
  return maskedValue;
});

export default TextMask;