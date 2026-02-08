import { useEffect } from "react";
import { IPost as Post } from "@/types/post";
import { PostService } from "./PostService";

export const PostLive = ({ setPosts }: { setPosts: React.Dispatch<React.SetStateAction<Post[]>> }) => {
  useEffect(() => {
    const unsub = PostService.subscribe((items) => {
      setPosts(prev => {
        const incoming = new Map(items.map(i => [i.uri, i]));
        return prev.map(p => {
          const fresh = incoming.get(p.uri);
          return fresh ? { ...p, ...fresh } : p;
        }).sort((a, b) => b.engagement - a.engagement);
      });
    }, 20000);
    return unsub;
  }, [setPosts]);
  return null;
};