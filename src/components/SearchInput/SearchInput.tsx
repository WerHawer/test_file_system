import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './SearchInput.module.scss';
import { ChangeEvent, memo, useCallback, useState } from 'react';

type SearchInputProps = {
  onChange?: (value: string) => void;
};

export const SearchInput = memo(({ onChange }: SearchInputProps) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setValue('');
    onChange?.('');
  }, [onChange]);

  return (
    <div className={styles.container}>
      <SearchOutlined className={styles.iconSearch} />
      <CloseOutlined className={styles.iconCross} onClick={handleClear} />
      <input
        onChange={handleChange}
        value={value}
        className={styles.input}
        placeholder="Search"
      />
    </div>
  );
});
