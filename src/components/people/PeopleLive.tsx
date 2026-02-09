import { useEffect } from 'react';
import { PeopleService, Person } from './PeopleService';

type Props = {
  people: Person[];
  setPeople: (fn: (prev: Person[]) => Person[] | Person[]) => void;
  pollIntervalMs?: number;
};

// Subscribes to PeopleService and merges incoming data into the existing list
// without reordering. New accounts are appended to the end.
const PeopleLive = ({ people, setPeople, pollIntervalMs = 20000 }: Props) => {
  useEffect(() => {
    const unsub = PeopleService.subscribe(async (items: Person[]) => {
      const incoming = new Map(items.map((i) => [i.uri, i]));

      setPeople((prev) => {
        // Merge updates into existing order
        const merged = prev.map((p) => {
          const update = incoming.get(p.uri);
          if (!update) return p;
          // merge shallowly, but keep original order
          return { ...p, ...update } as Person;
        });

        // Append any new items that didn't exist before
        const existingUris = new Set(prev.map((p) => p.uri));
        const toAppend = items.filter((it) => !existingUris.has(it.uri));
        if (toAppend.length) return merged.concat(toAppend);
        return merged;
      });
    }, pollIntervalMs);

    return () => {
      if (unsub) unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPeople]);

  return null;
};

export default PeopleLive;
