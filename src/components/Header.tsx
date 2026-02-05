import styled from "styled-components";
import logo from "/atpx_sm.jpg";

const FullWidthHeader = styled.header`
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eee;
  padding: 15px 0; /* Vertical padding for breathing room */
`;

const CenteredContent = styled.div`
  width: var(--iphone-width);
  max-width: 100%;
  display: flex;
  flex-direction: column; /* Stack logo and text vertically */
  align-items: center;    /* Center them horizontally */
  text-align: center;
`;

const Logo = styled.img`
  height: 28px;
  width: auto;
  display: block;
  margin-bottom: 6px; /* Space between logo and tagline */
`;

const Tagline = styled.p`
  margin: 0;
  font-size: 11px;
  color: var(--hn-gray);
  font-weight: 400;
  letter-spacing: -0.2px;
  max-width: 80%; /* Keeps the long text from hitting the edges */
  line-height: 1.4;
`;

export const Header = () => (
  <FullWidthHeader>
    <CenteredContent>
      <Logo src={logo} alt="Logo" />
      <Tagline>
        find out what's happening in the fediverse
      </Tagline>
    </CenteredContent>
  </FullWidthHeader>
);