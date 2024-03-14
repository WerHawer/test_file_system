import { memo, useCallback, useContext } from 'react';
import { createListPadding } from '../DataList.tsx';
import { File as FileType } from '../../../types';
import { FileTextFilled, UnlockOutlined } from '@ant-design/icons';
import styles from './File.module.scss';
import classNames from 'classnames';
import { DataItemsContext } from '../../../context/DataItemsContext.tsx';
import { Tooltip } from 'antd';

type FileProps = {
  file: FileType;
  level: number;
};

export const File = memo(({ file, level }: FileProps) => {
  const { selectedItem, setSelectedItem } = useContext(DataItemsContext);
  const isFilePrivate = file.access === 'private';

  const handleFileClick = useCallback(() => {
    if (isFilePrivate) return;

    setSelectedItem(file.id);
  }, []);

  return (
    <Tooltip
      title={isFilePrivate ? "You don't have permission to open this file" : ''}
      trigger="click"
    >
      <div
        className={classNames(
          styles.container,
          selectedItem === file.id && styles.selected
        )}
        style={createListPadding(level)}
        onClick={handleFileClick}
      >
        <FileTextFilled />
        <p>{file.name}</p>
        {isFilePrivate && <UnlockOutlined />}
      </div>
    </Tooltip>
  );
});
