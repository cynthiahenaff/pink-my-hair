import { useContext } from 'react';
import { DataContext } from 'DataProvider';

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error(`useData must be used within a DataContext`);
  }

  return context;
};
