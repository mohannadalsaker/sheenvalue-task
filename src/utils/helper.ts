export const getLsValue = (key: string) => localStorage.getItem(key);
export const setLsValue = (key: string, value: string) =>
  localStorage.setItem(key, value);
export const removeLsValue = (key: string) => localStorage.removeItem(key);
