import React, { useState } from "react";
import styled from "styled-components";
import { Heart, ChevronDown, CheckCircle2, Circle, Briefcase, Globe } from "lucide-react";
import { Footer } from "@components";

export const Sidebar = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const roadmap = [
    { task: "OAuth user accounts (Sign-in)", done: false, priority: 1 },
    { task: "Domain migration (atpx.app)", done: false, priority: 2 },
    { task: "Search across the Metaverse", done: false, priority: 3 },
    { task: "Direct Messages (DMs)", done: false, priority: 4 },
    { task: "Media & Video support", done: false, priority: 5 },
    { task: "Global Bookmarking", done: false, priority: 6 },
    { task: "Fediverse Radio / Audio", done: false, priority: 7 },
    { task: "Performance & Security audit", done: true, priority: 8 },
  ].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return a.priority - b.priority;
  });

  const faqs = [
    { q: "What is ATProto?", a: "The Authenticated Transfer Protocol is a foundation for social networking that gives users control over their data, identity, and algorithms." },
    { q: "How is this different from Mastodon?", a: "Mastodon uses ActivityPub. ATProto (used here) is built for better performance, easier server switching, and global search capabilities." },
    { q: "Is my data secure?", a: "Yes. All data is signed cryptographically. Soon, you'll be able to host your own Personal Data Server (PDS) for total ownership." },
    { q: "What is the 'Metaverse' in this context?", a: "It is the open, interconnected web of decentralized servers where users can talk across different platforms without borders." },
    { q: "How do I find communities?", a: "That is a core goal of this project! I am building a curated, user-friendly directory to help you find your niche in the Fediverse." },
    { q: "Can I use my existing handle?", a: "Yes, once OAuth is implemented, you can sign in with any ATProto-compatible handle (like Bluesky)." }
  ];

  return (
    <Container>
      <ScrollableContent>
        {/* Seeking Work / Portfolio Section */}
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
              Hire timtjoe
            </Button>
            <Button href="https://ko-fi.com" target="_blank">
              <Heart size={16} fill="currentColor" />
              Support project
            </Button>
          </ButtonGroup>
        </Card>

        {/* Roadmap / Goals Section */}
        <Card>
          <Title>The Way Forward</Title>
          <RoadmapList>
            {roadmap.map((item, idx) => (
              <RoadmapItem key={idx} $done={item.done}>
                {item.done ? <CheckCircle2 size={14} color="var(--text-blue)" /> : <Circle size={14} />}
                <span>{item.task}</span>
              </RoadmapItem>
            ))}
          </RoadmapList>
        </Card>

        {/* Expanded FAQ Section */}
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

        <Footer />
      </ScrollableContent>
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

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-bottom: 120px;

  &::-webkit-scrollbar { width: 4px; }
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
  background: ${props => props.$primary ? 'var(--text-bold)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--bg-white)' : 'var(--text-bold)'};
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

const RoadmapList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RoadmapItem = styled.div<{ $done?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${props => props.$done ? 'var(--text-muted)' : 'var(--text-main)'};
  text-decoration: ${props => props.$done ? 'line-through' : 'none'};
  svg { flex-shrink: 0; }
`;

const Accordion = styled.div`
  margin-top: 4px;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid var(--border-subtle);
  &:last-child { border: none; }
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

  &:hover { color: var(--text-blue); }
`;

const FaqBody = styled.div`
  padding-bottom: 12px;
  font-size: var(--font-xs);
  color: var(--text-muted);
  line-height: 1.5;
`;

const ChevronIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
  transition: transform 0.2s ease;
  opacity: 0.5;
`;