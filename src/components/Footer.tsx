import React from "react";
import styled from "styled-components";

export const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Divider />
      <p style={{ margin: 0 }}>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/timtjoe"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#000", fontWeight: "bold", textDecoration: "none" }}
        >
          timtjoe
        </a>{" "}
        &copy; {currentYear}
      </p>

      <BadgeContainer>
        <img
          src="https://img.shields.io/badge/ATProto-0085FF?style=flat-square&logo=bluesky&logoColor=white"
          alt="ATProto"
        />
      </BadgeContainer>
    </Container>
  );
});

const Container = styled.footer`
  margin-top: auto;
  padding: 40px 0 20px;
  text-align: center;
  font-size: 11px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--hn-gray);
  opacity: 0.2;
  margin-bottom: 20px;
`;

const BadgeContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;

  img {
    height: 20px;
    border-radius: 3px;
  }
`;

Footer.displayName = "Footer";
