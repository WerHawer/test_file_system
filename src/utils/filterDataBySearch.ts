import { DataItem } from '../types';

export const filterDataBySearch = (data: DataItem[], search: string) =>
  data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase().trim())
  );
