import { DataItem, FilesData, FilesObjectData } from '../types';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { addToLocalStorage, getFromLocalStorage } from '../utils/localStore.ts';
import flatData from '../mock/flatData.json';
import { checkAndAddIsOpen } from '../utils/checkAndAddIsOpen.ts';
import { createObjectFromArray } from '../utils/createObjectFromArray.ts';

export const DataContext = createContext<{
  data: FilesData;
  dataObject: FilesObjectData;
  updateData: (newData: DataItem[]) => void;
}>({ data: [], dataObject: {}, updateData: () => {} });

const DATA_LS_KEY = 'filesData';

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<FilesData>([]);

  useEffect(() => {
    const dataFromLS = getFromLocalStorage(DATA_LS_KEY);

    setData(dataFromLS || flatData);

    if (!dataFromLS) {
      addToLocalStorage(DATA_LS_KEY, flatData);
    }
  }, []);

  const dataWithIsOpen = useMemo(
    () => checkAndAddIsOpen(data as FilesData),
    [data]
  );

  const dataObject = useMemo(
    () => createObjectFromArray(dataWithIsOpen),
    [dataWithIsOpen]
  );

  const handleUpdateData = useCallback((newData: DataItem[]) => {
    setData(newData);
    addToLocalStorage(DATA_LS_KEY, newData);
  }, []);

  return (
    <DataContext.Provider
      value={{ data: dataWithIsOpen, updateData: handleUpdateData, dataObject }}
    >
      {children}
    </DataContext.Provider>
  );
};
