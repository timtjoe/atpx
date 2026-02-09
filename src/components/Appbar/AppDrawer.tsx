import React from "react";
import styled from "styled-components";
import { Drawer as Vaul } from "vaul";

interface IDrawer {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AppDrawer = ({
  trigger,
  children,
  title,
  open,
  onOpenChange,
}: IDrawer) => {
  return (
    <Vaul.Root open={open} onOpenChange={onOpenChange}>
      <Vaul.Trigger asChild>{trigger}</Vaul.Trigger>
      <Vaul.Portal>
        <Overlay />
        <Container>
          <HandleBar>
            <Handle />
          </HandleBar>

          <Content>
            {title && (
              <Header>
                <Title>{title}</Title>
              </Header>
            )}
            {children}
          </Content>
        </Container>
      </Vaul.Portal>
    </Vaul.Root>
  );
};

/* --- Updated Styled Components in Drawer.tsx --- */
const Overlay = styled(Vaul.Overlay)`
  position: fixed;
  inset: 0; /* Cover 100% of the screen */
  background: rgba(0, 0, 0, 0.4); /* Slightly darker for better contrast */
  backdrop-filter: blur(4px);

  /* IMPORTANT: 
     1. Remove bottom: 60px so it covers the MobileNav 
     2. Ensure z-index is higher than MobileNav (9999) 
  */
  z-index: 10000;
`;

const Container = styled(Vaul.Content)`
  background: var(--bg-page, #ffffff);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  position: fixed;
  bottom: 0; /* Change to 0 to slide up from the very bottom */
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  max-height: 85vh;

  /* Must be higher than Overlay */
  z-index: 10001;
  outline: none;
  box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.2);

  /* Ensure it has padding-bottom for the content inside */
  padding-bottom: env(safe-area-inset-bottom, 20px);
`;

const HandleBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 0 8px;
`;

const Handle = styled.div`
  width: 36px;
  height: 4px;
  background: var(--border-subtle, #efefef);
  border-radius: 99px;
`;

const Content = styled.div`
  overflow-y: auto;
  padding-bottom: 20px;
`;

const Header = styled.div`
  padding: 0 20px 15px;
  border-bottom: 1px solid var(--border-subtle);
`;

const Title = styled.h3`
  font-weight: 800;
  margin: 0;
  color: var(--text-main);
`;
