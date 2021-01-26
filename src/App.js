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
import FileButton from 'components/FileButton';
import { useData } from 'hooks';
import { MdAddCircleOutline } from 'react-icons/md';
import mediumZoom from 'medium-zoom';
import { API_BASE } from './constants';
import loadImage from 'blueimp-load-image';

const App = () => {
  const { folders, onCreateFolder, onSaveImage } = useData();

  const [selectedFolderSlug, setSelectedFolderSlug] = useState(null);
  const [createFolderModalIsShown, setCreateFolderModalIsShown] = useState(
    false,
  );

  const activeFolder = (folders || []).find(
    ({ slug }) => slug === selectedFolderSlug,
  );

  const uploadImageToServer = file => {
    loadImage(file, {
      maxWidth: 1200,
      canvas: true,
    })
      .then(imageData => {
        let image = imageData.image;

        let imageBase64 = image.toDataURL('image/png');

        let data = {
          b64_img: imageBase64,
        };
        return fetch(API_BASE + '/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(result => {
            return result.json();
          })
          .then(data => {
            let imageUrl = API_BASE + '/' + data.path;
            onSaveImage(imageUrl);
            console.log(`You can access the updated image here: ${imageUrl}`);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAddImage = e => {
    if (e.target.files && e.target.files[0]) {
      uploadImageToServer(e.target.files[0]);
    } else {
      console.error('No file was picked');
    }
  };

  useEffect(() => {
    mediumZoom(document.querySelectorAll('#images img'));
  });

  return (
    <Layout>
      <Header>
        <FileButton onAddImage={handleAddImage}>
          <MdAddCircleOutline />
          New picture
        </FileButton>
      </Header>

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
