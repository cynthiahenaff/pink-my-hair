import styled from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  height: 80px;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const Sidebar = styled.aside`
  width: 320px;
  height: calc(100vh - 60px);
  background-color: #ccc;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

export const Main = styled.main`
  padding: 32px;
`;

export const Button = styled.button`
  padding: 0;
  border: 0;
  text-decoration: none;
  color: inherit;
  outline: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  background-color: #011658;
  color: #fff;
  min-width: 200px;
  font-weight: 600;
  border-radius: 12px;
  transition: background ease 200ms;

  &:hover {
    background-color: #fa9cfe;
  }
`;
