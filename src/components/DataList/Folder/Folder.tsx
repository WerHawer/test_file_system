import { DataList } from '../index.ts';
import { createListPadding } from '../DataList.tsx';
import { DataItem, FilesData, Folder as FolderType } from '../../../types';
import classNames from 'classnames';
import styles from './Folder.module.scss';
import { memo, useCallback, useContext, useMemo, useState } from 'react';
import {
  addToLocalStorage,
  getFromLocalStorage,
} from '../../../utils/localStore.ts';
import { OPENED_FOLDERS_KEY } from '../../../utils/checkAndAddIsOpen.ts';
import {
  FolderOutlined,
  FolderFilled,
  FolderOpenFilled,
  UnlockOutlined,
} from '@ant-design/icons';
import { DataItemsContext } from '../../../context/DataItemsContext.tsx';
import { DataContext } from '../../../context/DataContext.tsx';
import { SettingsMenu } from '../../SettingsMenu';
import { Tooltip } from 'antd';
import { Menu } from '../../SettingsMenu/SettingsMenu.tsx';
import { v4 as uuid } from 'uuid';

type FolderProps = {
  folder: FolderType;
  level: number;
};

export const Folder = memo(({ folder, level }: FolderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!folder.isOpened);
  const isFolderEmpty = !folder.children?.length;
  const isFolderPrivate = folder.access === 'private';
  const { selectedItem, setSelectedItem } = useContext(DataItemsContext);
  const { dataObject, updateData, data } = useContext(DataContext);

  const folderChildren = useMemo(() => {
    if (isFolderEmpty) return [];

    return folder.children.reduce((acc, item) => {
      const child = dataObject[item];

      return [...acc, child];
    }, [] as FilesData);
  }, [folder, dataObject]);

  const setIsOpenToLS = useCallback((open: boolean = false) => {
    const openedFolders = getFromLocalStorage(OPENED_FOLDERS_KEY) ?? [];
    const folderId = folder.id;
    const isOpened = openedFolders.includes(folderId);

    if (isOpened && open) return;

    const newOpenedFolders = isOpened
      ? openedFolders.filter((item: string) => item !== folderId)
      : [...openedFolders, folderId];

    addToLocalStorage(OPENED_FOLDERS_KEY, newOpenedFolders);
  }, []);

  const handleFolderClick = useCallback(() => {
    if (isFolderEmpty) return;
    if (isFolderPrivate) return;

    setIsOpen((prevState) => !prevState);
    setIsOpenToLS();

    setSelectedItem(folder.id);
  }, []);

  const FolderIcon = useMemo(() => {
    if (isFolderEmpty) return FolderOutlined;

    return isOpen ? FolderOpenFilled : FolderFilled;
  }, [isOpen]);

  const menu: Menu[] = [
    {
      title: 'New folder',
      icon: 'folder',
      onClick: () => {
        const currentFolder = data.find(
          (item) => item.id === folder.id
        ) as FolderType;
        const currentFolderId = currentFolder.id;
        const newFolderId = uuid();
        const newFolderName = 'New folder';

        currentFolder.children = [newFolderId, ...folder.children];

        const newFolder: DataItem = {
          id: newFolderId,
          name: newFolderName,
          type: 'folder',
          parent: currentFolderId,
          access: 'public',
          path: `${folder.path}/${newFolderName}`,
          children: [],
        };

        updateData([...data, newFolder]);
        setIsOpenToLS(true);
      },
    },
    {
      title: 'New file',
      icon: 'file',
      onClick: () => {
        const currentFolder = data.find(
          (item) => item.id === folder.id
        ) as FolderType;
        const currentFolderId = currentFolder.id;
        const newFileId = uuid();
        const newFileName = 'New File';

        currentFolder.children = [...folder.children, newFileId];

        const newFile: DataItem = {
          id: newFileId,
          name: newFileName,
          type: 'file',
          parent: currentFolderId,
          access: 'public',
          path: `${folder.path}/${newFileName}`,
        };

        updateData([...data, newFile]);
        setIsOpenToLS(true);
      },
    },
    {
      title: 'Delete',
      icon: 'delete',
      onClick: () => {
        const idsToDelete = [folder.id, ...folder.children];

        const newData = data.filter((item) => !idsToDelete.includes(item.id));

        updateData(newData);
      },
    },
  ];

  return (
    <>
      <Tooltip
        title={
          isFolderPrivate ? "You don't have permission to open this folder" : ''
        }
        trigger="click"
      >
        <div
          style={createListPadding(level)}
          className={classNames(
            styles.nameContainer,
            selectedItem === folder.id && styles.selected
          )}
          onClick={handleFolderClick}
        >
          <FolderIcon />
          <h3 className={styles.folderName}>{folder.name}</h3>
          {isFolderPrivate ? <UnlockOutlined /> : <SettingsMenu menu={menu} />}
        </div>
      </Tooltip>
      <div
        className={classNames(
          styles.container,
          isOpen ? styles.open : styles.close
        )}
      >
        <DataList data={folderChildren} level={level + 1} />
      </div>
    </>
  );
});
