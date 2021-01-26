import { camelCase } from 'lodash';
import { useState, createContext, useEffect } from 'react';
import { useDeepCompareEffect } from 'react-use';

export const DataContext = createContext();

const initialFolders = [
  {
    name: 'Untitled Folder',
    slug: 'untitledFolder',
    images: [
      {
        url:
          'https://images.unsplash.com/photo-1524165152352-6d21c2485dff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',
        createdAt: new Date(),
      },
    ],
  },
];

const getInitialFolders = () => {
  try {
    const folders = JSON.parse(localStorage.getItem('folders'));
    return folders || initialFolders;
  } catch (err) {
    return [];
  }
};

const DataProvider = ({ children }) => {
  const [folders, setFolders] = useState(getInitialFolders());

  const handleCreateFolder = folderName => {
    setFolders([
      ...folders,
      { name: folderName, slug: camelCase(folderName), images: [] },
    ]);
  };

  useDeepCompareEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [{ folders }]);

  return (
    <DataContext.Provider
      value={{ folders, onCreateFolder: handleCreateFolder }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
