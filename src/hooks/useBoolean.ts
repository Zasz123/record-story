import { useState } from 'react';

export default function useBoolean(initialValue?: boolean) {
  const [value, setValue] = useState(initialValue ?? false);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, setValue, setTrue, setFalse] as const;
}
