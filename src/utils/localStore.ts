export const addToLocalStorage = (key: string, value: any) => {
  try {
    const strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) return null;

    return JSON.parse(value);
  } catch (error) {
    console.error('Error getting data from localStorage', error);
  }
};
