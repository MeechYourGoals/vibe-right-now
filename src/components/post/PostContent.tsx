
import React from "react";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="px-4 py-2">
      <p className="text-sm whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default PostContent;
