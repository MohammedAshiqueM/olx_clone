import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { PostContext } from '../../store/postContext';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails?.userId) {
        try {
          console.log(postDetails.userId);
          
          const usersCollectionRef = collection(db, 'users');
          const q = query(usersCollectionRef, where("userId", "==", postDetails.userId));
          const querySnapshot = await getDocs(q);
          
          console.log("size:", querySnapshot.size);
          console.log("empty?", querySnapshot.empty);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            console.log("User data:", userData);
            setUserDetails(userData);
          } else {
            console.log("No matching", postDetails.userId);
            setError("User not found");
          }
        } catch (error) {
          console.error("Error fetching:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No userId");
        setLoading(false);
        setError("No user ID available");
      }
    };

    fetchUserDetails();
  }, [postDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postDetails) {
    return <div>No post details available</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name || "Product Name"}</span>
          <p>{postDetails.category || "Category"}</p>
          <span>{postDetails.createdAt || "Date not available"}</span>
        </div>
        {userDetails ? (
          <div className="contactDetails">
            <p>Seller: {userDetails.username || "Name not available"}</p>
            <p>Contact: {userDetails.phone || "Phone not available"}</p>
          </div>
        ) : (
          <div className="contactDetails">
            <p>Seller details not available</p>
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default View;