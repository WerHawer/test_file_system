import { memo } from 'react';
import { Folder } from './Folder';
import { File } from './File';
import { FilesData, Folder as FolderType } from '../../types';
import styles from './DataList.module.scss';

type DataListProps = {
  data: FilesData;
  level?: number;
  isSearch?: boolean;
};

export const BASE_PADDING = 20;
export const MAX_PADDING = 120;

export const createListPadding = (level: number) => {
  const padding = BASE_PADDING * level;

  return { paddingLeft: `${padding <= MAX_PADDING ? padding : MAX_PADDING}px` };
};

export const DataList = memo(({ data, level = 1, isSearch }: DataListProps) => {
  const isFirstLevel = level === 1;
  let firstLevelData: FolderType | undefined;

  if (isFirstLevel && !isSearch) {
    const rootItem = data.find(({ parent }) => parent === 'root');

    firstLevelData = rootItem ? (rootItem as FolderType) : undefined;

    return (
      <ul>
        {firstLevelData ? (
          <li key={firstLevelData.id} className={styles.item}>
            <Folder folder={firstLevelData} level={level} />
          </li>
        ) : null}
      </ul>
    );
  }

  return (
    <ul>
      {data.map((item) => {
        if (!item) return null;

        const isFolder = item.type === 'folder';
        const idSuffix = isFolder ? item.children?.length : '';

        return (
          <li key={item.id + idSuffix} className={styles.item}>
            {isFolder ? (
              <Folder folder={item} level={level} />
            ) : (
              <File file={item} level={level} />
            )}
          </li>
        );
      })}
    </ul>
  );
});
