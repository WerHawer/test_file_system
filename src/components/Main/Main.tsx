import { useContext } from 'react';
import { DataItemsContext } from '../../context/DataItemsContext.tsx';
import { DataContext } from '../../context/DataContext.tsx';
import styles from './Main.module.scss';

export const Main = () => {
  const { selectedItem } = useContext(DataItemsContext);
  const { dataObject } = useContext(DataContext);

  if (!selectedItem) return null;

  const selectedItemData = dataObject[selectedItem];

  if (!selectedItemData) return null;

  const selectedItemType = selectedItemData.type;
  if (selectedItemType === 'folder') return null;

  return (
    <div className={styles.container}>
      <p>{selectedItemData.path}</p>
      <h1>File: {selectedItemData.name}</h1>
    </div>
  );
};
