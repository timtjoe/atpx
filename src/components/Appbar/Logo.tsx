import styled from "styled-components";
import logo from "/atpx_sm.jpg";

// Logo component
export const Logo = () => (
  <Box href="/">
    <Image
      src={logo}
      alt="Logo"
      title="Find out what's happening in the fediverse"
    />
  </Box>
);

// Styled components for the logo
const Image = styled.img`
  display: block;
  height: 28px;
  width: auto;
  `;

const Box = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: var(--spacing-sm) 0;
  text-align: center;
`;
