
import React from "react";
import { Post } from "@/types";

interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <div className="px-4 py-2">
      <p className="text-sm whitespace-pre-wrap">{post.content}</p>
    </div>
  );
};

export default PostContent;
