import { memo, useCallback, useContext, useMemo, useState } from 'react';
import styles from './DataListContainer.module.scss';
import { DataList } from '../DataList';
import { SearchInput } from '../SearchInput';
import { useDebounce } from 'react-use';
import { filterDataBySearch } from '../../utils/filterDataBySearch.ts';
import { DataContext } from '../../context/DataContext.tsx';

export const DataListContainer = memo(() => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');
  const { data } = useContext(DataContext);

  useDebounce(
    () => {
      setDebouncedSearchValue(searchValue);
    },
    300,
    [searchValue]
  );

  const filteredData = useMemo(() => {
    if (!debouncedSearchValue) return data;

    return filterDataBySearch(data, debouncedSearchValue);
  }, [data, debouncedSearchValue]);

  const handleChangeSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return (
    <div className={styles.container}>
      <SearchInput onChange={handleChangeSearchValue} />
      {filteredData.length ? (
        <DataList data={filteredData} isSearch={!!debouncedSearchValue} />
      ) : (
        <p>Not found...</p>
      )}
    </div>
  );
});
