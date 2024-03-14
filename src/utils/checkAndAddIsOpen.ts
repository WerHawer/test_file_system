import { FilesData } from '../types';
import { getFromLocalStorage } from './localStore.ts';

export const OPENED_FOLDERS_KEY = 'openedFolders';

export const checkAndAddIsOpen = (data: FilesData) => {
  const openedFolders = getFromLocalStorage(OPENED_FOLDERS_KEY);
  const dataCopy = [...data];

  dataCopy.forEach((item) => {
    if (item.type !== 'folder') return;

    item.isOpened = openedFolders?.includes(item.id);
  });

  return dataCopy;
};
