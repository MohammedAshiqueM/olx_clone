import React, { createContext, useState } from "react";

// Create the context
const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [postDetails, setPostDetails] = useState();

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

// Export PostContext for use in other components
export { PostContext };
