import styled from 'styled-components';

const StyledHeader = styled.header`
  font-size: 13px;
  font-weight: bold;
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-top: 15px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  color: ${props => (props.$active ? '#000' : 'var(--hn-gray)')};
  text-decoration: ${props => (props.$active ? 'underline' : 'none')};
  font-weight: ${props => (props.$active ? 'bold' : 'normal')};

  &:hover {
    color: #000;
  }
`;

const LogoBox = styled.span`
  background: #ff6600;
  color: white;
  padding: 0 5px;
  margin-right: 8px;
  font-family: monospace;
`;

interface HeaderProps {
  currentTab: 'popular' | 'trending';
  onTabChange: (tab: 'popular' | 'trending') => void;
}

export const Header = ({ currentTab, onTabChange }: HeaderProps) => (
  <StyledHeader>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LogoBox>A</LogoBox>
      <span>ATProto Explorer</span>
    </div>
    <Nav>
      <TabButton 
        $active={currentTab === 'popular'} 
        onClick={() => onTabChange('popular')}
      >
        popular
      </TabButton>
      <span style={{ color: 'var(--hn-gray)' }}>|</span>
      <TabButton 
        $active={currentTab === 'trending'} 
        onClick={() => onTabChange('trending')}
      >
        trending
      </TabButton>
    </Nav>
  </StyledHeader>
);