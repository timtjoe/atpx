import { useState } from "react";
import styled from "styled-components";
import {
  ChevronDown,
  Github,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { Footer, LinkButton } from "@components";
import { faqs } from "@/constants";

// --- Exported Content for the Mobile Drawer ---
export const SidebarContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Content>
      <Card>
        <Title>Protocol FAQ</Title>
        <Accordion>
          {faqs.map((faq, i) => (
            <FaqItem key={i}>
              <FaqHeader onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <ChevronIcon $isOpen={openFaq === i} size={14} />
              </FaqHeader>
              {openFaq === i && <FaqBody>{faq.a}</FaqBody>}
            </FaqItem>
          ))}
        </Accordion>
      </Card>

      <Card>
        <Title>Seeking Work</Title>
        <Text>
          I built this platform because I’m
          <strong> obsessed with crafting pixel-perfect UIs </strong>
          and seamless digital experiences. While this project dives into
          <em> atproto</em>, my true passion lies in pushing the boundaries of
          what's possible with high-fidelity frontend engineering and fluid
          animations.
        </Text>
        <Text>
          I am currently looking for my next challenge and am specifically
          interested in
          <strong> Remote-first roles </strong> or
          <strong> Relocation-friendly </strong>
          Frontend Engineering opportunities where UI excellence is a
          priority.
        </Text>

        <ButtonGroup>
          <Button
            href="mailto:timtjoe@gmail.com"
            target="_blank"
            $primary
            style={{
              backgroundColor: "#0085ff",
              color: "#fff",
              border: "none",
            }}
          >
            <Briefcase size={16} />
            Hire Me
          </Button>

          {/* <Button href="https://wa.me/+231770934646" target="_blank">
            <MessageCircle size={16} />
            WhatsApp
          </Button> */}

          <Button href="https://github.com/timtjoe" target="_blank">
            <Github size={16} />
            GitHub
          </Button>
        </ButtonGroup>
      </Card>

      <Footer />
    </Content>
  );
};

// --- Desktop Sidebar Container ---
export const Sidebar = () => {
  return (
    <Container>
      <SidebarContent />
    </Container>
  );
};

/* --- Styled Components --- */

const Container = styled.aside`
  width: 350px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-left: thin solid var(--border-subtle);
  padding: var(--spacing-md) var(--spacing-md) 0;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-bottom: 120px;
`;

const Card = styled.div`
  background: var(--bg-grey);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: var(--font-sm);
  font-weight: 800;
  color: var(--text-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
`;

const Text = styled.p`
  font-size: var(--font-sm);
  line-height: 1.5;
  color: var(--text-main);
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xs);
  margin-top: 4px;
  /* justify-content: center; */
  flex-wrap: wrap;
`;

const Button = styled(LinkButton)<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Accordion = styled.div`
  margin-top: 4px;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid var(--border-subtle);
  &:last-child {
    border: none;
  }
`;

const FaqHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--text-bold);
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.3;
`;

const FaqBody = styled.div`
  padding-bottom: 12px;
  font-size: var(--font-xs);
  color: var(--text-muted);
  line-height: 1.5;
`;

const ChevronIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
  transition: transform 0.2s ease;
  opacity: 0.5;
`;