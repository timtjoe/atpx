import { useState } from "react";
import styled from "styled-components";
import {
  Heart,
  ChevronDown,
  CheckCircle2,
  Circle,
  Briefcase,
} from "lucide-react";
import { Footer } from "@components";
import { faqs, roadmap } from "@/constants";

export const Sidebar = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Container>
      <Content>
        <Card>
          <Title>Seeking Work</Title>
          <Text>
            I built this project to demonstrate full-stack expertise for the
            <strong> Hacker News "Who wants to be hired"</strong> thread.
          </Text>
          <Text>
            Inspired by Dan Abramov's dive into <em>atproto</em>, this platform
            aims to be the central discovery hub for the decentralized web.
          </Text>
          <ButtonGroup>
            <Button href="https://github.com/timtjoe" target="_blank" $primary>
              <Briefcase size={16} />
              Hire Me
            </Button>
            {/* <Button href="https://ko-fi.com" target="_blank">
              <Heart size={16} fill="currentColor" />
              Support project
            </Button> */}
          </ButtonGroup>
        </Card>

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

        {/* <Card>
          <Title>The Way Forward</Title>
          <List>
            {roadmap.map((item, idx) => (
              <RoadmapItem key={idx} $done={item.done}>
                {item.done ? (
                  <CheckCircle2 size={14} color="var(--text-blue)" />
                ) : (
                  <Circle size={14} />
                )}
                <span>{item.task}</span>
              </RoadmapItem>
            ))}
          </List>
        </Card> */}

        {/* Main footer */}
        <Footer />
      </Content>
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
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-bottom: 120px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-subtle);
    border-radius: 10px;
  }
  scrollbar-width: thin;
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
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
`;

const Button = styled.a<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${(props) =>
    props.$primary ? "var(--text-bold)" : "transparent"};
  color: ${(props) =>
    props.$primary ? "var(--bg-white)" : "var(--text-bold)"};
  border: 1px solid var(--text-bold);
  padding: 10px;
  border-radius: 30px;
  font-weight: 700;
  font-size: var(--font-sm);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--text-bold);
    color: var(--bg-white);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RoadmapItem = styled.div<{ $done?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${(props) => (props.$done ? "var(--text-muted)" : "var(--text-main)")};
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
  svg {
    flex-shrink: 0;
  }
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

  &:hover {
    color: var(--text-blue);
  }
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
