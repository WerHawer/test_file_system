import { createContext, PropsWithChildren, useCallback, useState } from 'react';

export const DataItemsContext = createContext<{
  selectedItem: string;
  setSelectedItem: (id: string) => void;
}>({
  setSelectedItem: () => {},
  selectedItem: '',
});

export const DataItemsProvider = ({ children }: PropsWithChildren) => {
  const [selectedItem, setSelectedItem] = useState<string>('');

  const setSelectedItemHandler = useCallback((id: string) => {
    setSelectedItem(id);
  }, []);

  return (
    <DataItemsContext.Provider
      value={{
        selectedItem,
        setSelectedItem: setSelectedItemHandler,
      }}
    >
      {children}
    </DataItemsContext.Provider>
  );
};
