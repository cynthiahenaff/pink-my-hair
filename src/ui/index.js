import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 320px 100%;
  grid-template-rows: 80px 100%;
  grid-template-areas:
    'header header'
    'sidebar main';
`;

export const ButtonReset = styled.button`
  padding: 0;
  border: 0;
  text-decoration: none;
  color: inherit;
  outline: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
`;

export const Page = styled.div`
  min-height: 100vh;
`;

export const Header = styled.header`
  grid-area: header;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: #efefef;
  padding: 16px;
  height: 100%;
`;

export const SidebarItem = styled(ButtonReset)`
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
  text-align: left;

  ${({ isActive }) =>
    isActive &&
    `
      font-weight: 600;
    `}
`;

export const Main = styled.div`
  grid-area: main;
  padding: 32px;
  height: 100%;
`;

export const Button = styled(ButtonReset)`
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

export const ThumbnailGrid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(8, 1fr);
`;

export const Thumbnail = styled.div`
  border: 2px solid #011658;
  border-radius: 4px;
  width: 100%;
  aspect-ratio: 1;
  background-color: #efefef;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;
