import { filterDataBySearch } from './filterDataBySearch.ts';
import { DataItem } from '../types';

const mockData: DataItem[] = [
  {
    name: 'file1',
    type: 'file',
    parent: 'root',
    path: 'root/file1',
    access: 'public',
    id: '1',
  },
  {
    name: 'folder1',
    id: '2',
    type: 'folder',
    parent: 'root',
    path: 'root/folder1',
    access: 'public',
    children: ['file2', 'file3'],
  },
  {
    name: 'file2',
    id: '3',
    type: 'file',
    parent: 'folder1',
    access: 'public',
    path: 'root/folder1/file2',
  },
  {
    name: 'file3',
    id: '4',
    type: 'file',
    parent: 'folder1',
    access: 'public',
    path: 'root/folder1/file3',
  },
];

describe('filterDataBySearch', () => {
  it('should return all files', () => {
    const result = filterDataBySearch(mockData, '');

    expect(result).toEqual(mockData);
  });

  it('should return only file1', () => {
    const result = filterDataBySearch(mockData, 'file1');

    expect(result).toEqual([mockData[0]]);
  });

  it('should return all files with name file*', () => {
    const result = filterDataBySearch(mockData, 'file');

    expect(result).toEqual([mockData[0], mockData[2], mockData[3]]);
  });

  it('should return only folder1', () => {
    const result = filterDataBySearch(mockData, 'folder1');

    expect(result).toEqual([mockData[1]]);
  });

  it('should return positive result even if search is case sensitive', () => {
    const result = filterDataBySearch(mockData, 'FILE1');

    expect(result).toEqual([mockData[0]]);
  });

  it('should return empty array if no match', () => {
    const result = filterDataBySearch(mockData, 'no match');

    expect(result).toEqual([]);
  });

  it('should return folder and file with same part of name', () => {
    const result = filterDataBySearch(mockData, '1');

    expect(result).toEqual([mockData[0], mockData[1]]);
  });
});
