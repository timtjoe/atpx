import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PeopleCard from "./PeopleCard";
import { motion } from "framer-motion";
import { PeopleService, Person } from "./PeopleService";
import PeopleLive from "./PeopleLive";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@components/IconButton";
import { HeadActions, Header , Title} from "@components/Headers";

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const container = useRef<HTMLDivElement | null>(null);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);

  const onScroll = () => {
    const el = container.current;
    if (!el) return;
    setStart(el.scrollLeft <= 4);
    setEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = container.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let unsub: any = null;
    const init = async () => {
      try {
        setLoading(true);
        const { items } = await PeopleService.list(30);
        // apply removal filter from localStorage
        const removed = await import("@/utils/peopleDb")
          .then((m) => m.getRemovedUris())
          .catch(() => [] as string[]);
        const filtered = (items || []).filter((i) => !removed.includes(i.uri));
        setPeople(filtered || []);
      } catch (e) {
        console.error("People fetch failed", e);
      } finally {
        setLoading(false);
      }
    };

    init();

    // ensure scroll flags are correct after first paint
    setTimeout(() => onScroll(), 200);

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // update scroll state when people list changes
  useEffect(() => {
    setTimeout(() => onScroll(), 120);
  }, [people]);

  return (
    <Container>
      <Head>
        <Title>popular creators</Title>
        <HeadActions>
          <IconButton
            disabled={isStart}
            onClick={() => scroll("left")}
            aria-label="left"
            variant="trans"
          >
            <ChevronLeft size={16} />
          </IconButton>
          <IconButton
            onClick={() => scroll("right")}
            disabled={isEnd}
            aria-label="right"
            variant="trans"
          >
            <ChevronRight size={16} />
          </IconButton>
        </HeadActions>
      </Head>
      <Content>
        <Carousel ref={container} onScroll={onScroll}>
          {people.map((p, idx) => (
            <Item key={p.uri}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                <PeopleCard
                  person={p}
                  position={idx + 1}
                  onRemove={(uri) => {
                    // persist removal
                    import("@/utils/peopleDb")
                      .then((m) => m.addRemovedUri(uri))
                      .catch(() => {});
                    // update service cache and ui
                    PeopleService.remove(uri);
                    setPeople((prev) => prev.filter((x) => x.uri !== uri));
                  }}
                />
              </motion.div>
            </Item>
          ))}
        </Carousel>
      </Content>

      {/* live merger: update counts/info without reordering */}
      <PeopleLive people={people} setPeople={setPeople} />
    </Container>
  );
};

const Container = styled.section`
  padding: var(--spacing-md) 0;
  margin-top: var(--spacing-md);
  background-color: var(--bg-white);
  position: relative;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--spacing-md);
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 var(--spacing-sm);
  gap: var(--spacing-xs);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  margin-right: 8px;
  flex: 0 0 auto;
`;

const Head = styled(Header)`
  padding-left: var(--spacing-md);
`

export const Avatar = styled.img`
  width: 44px; /* Slightly adjusted to fit padding */
  height: 44px;
  border-radius: 8px;
  background-color: #eee;
  object-fit: cover;
  margin-bottom: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const Name = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #000;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-bottom: 2px;
`;

export const Handle = styled.span`
  font-size: 8px; /* Shrunk slightly to fit within 4 columns */
  color: var(--fb-blue); /* Handle is now blue */
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: 500;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: var(--hn-gray);
  font-size: 11px;
  margin-top: 15px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    text-decoration: underline;
    color: #ff6600;
  }
`;
