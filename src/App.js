import { useState, useEffect } from 'react';
import {
  Header,
  Main,
  Sidebar,
  SidebarItem,
  Button,
  ThumbnailGrid,
  Thumbnail,
  Layout,
} from 'ui';
import CreateFolderModal from 'components/CreateFolderModal';
import { useData } from 'hooks';
import { MdAddCircleOutline } from 'react-icons/md';
import mediumZoom from 'medium-zoom';

const App = () => {
  const { folders, onCreateFolder } = useData();

  const [selectedFolderSlug, setSelectedFolderSlug] = useState(null);
  const [createFolderModalIsShown, setCreateFolderModalIsShown] = useState(
    false,
  );

  const activeFolder = folders.find(({ slug }) => slug === selectedFolderSlug);

  useEffect(() => {
    mediumZoom(document.querySelectorAll('#images img'));
  });

  console.log(activeFolder);
  return (
    <Layout>
      <Header></Header>

      <Sidebar>
        <Button onClick={() => setCreateFolderModalIsShown(true)}>
          <MdAddCircleOutline />
          New folder
        </Button>
        {folders.map(({ name, slug }, index) => (
          <SidebarItem
            key={index}
            onClick={() => setSelectedFolderSlug(slug)}
            isActive={selectedFolderSlug === slug}
          >
            {name}
          </SidebarItem>
        ))}
      </Sidebar>
      <Main>
        <ThumbnailGrid id="images">
          {(activeFolder?.images ?? []).map(({ url }, index) => (
            <Thumbnail key={index}>
              <img src={url} alt=""></img>
            </Thumbnail>
          ))}
        </ThumbnailGrid>
      </Main>

      <CreateFolderModal
        isOpen={createFolderModalIsShown}
        onRequestClose={() => setCreateFolderModalIsShown(false)}
        onCreateFolder={onCreateFolder}
      />
    </Layout>
  );
};

export default App;
