import { useState, useCallback } from 'react';

export function useColorInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return {
    value,
    onChange: handleChange,
  };
}