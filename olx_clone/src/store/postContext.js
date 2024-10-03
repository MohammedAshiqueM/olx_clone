import React, { createContext, useState } from "react";

const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [postDetails, setPostDetails] = useState();

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

export { PostContext };
