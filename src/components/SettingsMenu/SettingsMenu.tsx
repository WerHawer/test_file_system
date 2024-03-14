import { memo, useCallback, useState, MouseEvent, useRef } from 'react';
import {
  SettingOutlined,
  FolderOutlined,
  FileOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styles from './SettingsMenu.module.scss';
import { useClickAway } from 'react-use';
import { Tooltip } from 'antd';

type Icon = 'folder' | 'file' | 'delete';

export type Menu = {
  title: string;
  icon: Icon;
  onClick: () => void;
};

type SettingsMenuProps = {
  menu: Menu[];
};

export const SettingsMenu = memo(({ menu = [] }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  const controllerRef = useRef<HTMLSpanElement>(null);

  useClickAway(ref, (e) => {
    if (controllerRef.current?.contains(e.target as Node)) return;

    setIsOpen(false);
  });

  const handleMenuClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleMenuItemClick = useCallback((e: MouseEvent, cb: () => void) => {
    e.stopPropagation();
    cb();
  }, []);

  const getIcon = (icon: Icon) => {
    switch (icon) {
      case 'folder':
        return <FolderOutlined />;
      case 'file':
        return <FileOutlined />;
      case 'delete':
        return <DeleteOutlined />;
      default:
        return null;
    }
  };

  return (
    <Tooltip
      arrow={false}
      placement="right"
      trigger="click"
      color="#fff"
      open={isOpen}
      title={
        <ul ref={ref}>
          {menu.map((item) => (
            <li
              key={item.title}
              className={styles.menuItem}
              onClick={(e) => handleMenuItemClick(e, item.onClick)}
            >
              {getIcon(item.icon)}
              {item.title}
            </li>
          ))}
        </ul>
      }
    >
      <SettingOutlined
        className={styles.icon}
        onClick={handleMenuClick}
        ref={controllerRef}
      />
    </Tooltip>
  );
});
