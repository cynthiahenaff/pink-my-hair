import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  background-color: #011658;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  padding: 8px;
  transition: background ease 200ms;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #fa9cfe;
  }
`;

const FileButton = ({ onAddImage, children }) => (
  <Label className="add-button-label" htmlFor="customFileAdd">
    <input
      style={{ display: 'none' }}
      type="file"
      onChange={onAddImage}
      id="customFileAdd"
      accept=".png, .jpg, .jpeg"
    />
    {children}
  </Label>
);
export default FileButton;
