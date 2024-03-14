export const createObjectFromArray = <T extends { id: string }>(data: T[]) => {
  return data.reduce(
    (acc, item) => {
      acc[item.id] = item;

      return acc;
    },
    {} as Record<string, T>
  );
};
