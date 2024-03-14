type Access = 'public' | 'private';

export type File = {
  id: string;
  name: string;
  type: 'file';
  path: string;
  access: Access;
  parent: string;
};

export type Folder = {
  id: string;
  name: string;
  type: 'folder';
  path: string;
  isOpened?: boolean;
  parent: string;
  access: Access;
  children: string[];
};

export type DataItem = File | Folder;

export type FilesData = DataItem[];
export type FilesObjectData = Record<string, DataItem>;
