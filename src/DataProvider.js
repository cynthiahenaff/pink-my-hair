import { camelCase } from 'lodash';
import { useState, createContext } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { uniqueId } from 'lodash';

export const DataContext = createContext();

const initialFolders = [
  {
    name: 'Untitled Folder',
    slug: 'untitledFolder',
    images: [],
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

  const handleSaveImage = imageUrl => {
    setFolders(
      folders.map(folder => {
        if (folder.slug !== 'untitledFolder') {
          return folder;
        }

        return {
          ...folder,
          images: [
            ...folder.images,
            {
              id: uniqueId(),
              url: imageUrl,
              createdAt: new Date(),
            },
          ],
        };
      }),
    );
  };

  const handleMoveImage = (image, targetFolder) => {
    setFolders(
      folders.map(folder => {
        if (folder?.slug === targetFolder) {
          return { ...folder, images: [...folder?.images, image] };
        }
        return {
          ...folder,
          images: folder?.images.filter(({ id }) => id !== image?.id),
        };
      }),
    );
  };

  useDeepCompareEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [{ folders }]);

  return (
    <DataContext.Provider
      value={{
        folders,
        onCreateFolder: handleCreateFolder,
        onSaveImage: handleSaveImage,
        onMoveImage: handleMoveImage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
