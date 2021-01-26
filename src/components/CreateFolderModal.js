import { useState } from 'react';
import { Button } from 'ui';
import { Dialog, TextField } from '@material-ui/core';

const CreateFolderModal = ({ onCreateFolder, isOpen, onRequestClose }) => {
  const [newFolderName, setNewFolderName] = useState('');

  const handleResetCreateFolderForm = () => {
    onRequestClose();
    setNewFolderName('');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleResetCreateFolderForm}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={{ backgroundColor: '#fff', padding: 32 }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            onCreateFolder(newFolderName);
            handleResetCreateFolderForm();
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={e => setNewFolderName(e.target.value)}
            value={newFolderName}
          />

          <Button style={{ marginTop: 16 }} type="submit">
            Save
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default CreateFolderModal;
