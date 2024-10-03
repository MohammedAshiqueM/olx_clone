import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { db } from '../../firebase/config'; // Ensure correct Firestore import
import { PostContext } from '../../store/postContext';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails?.userId) {
        try {
          const userQuery = db.collection('user').where('id', '==', postDetails.userId);
          const snapshot = await userQuery.get();
          snapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error("Error fetching user details: ", error);
        }
      }
    };

    fetchUserDetails();
  }, [postDetails]);

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
          <span>{new Date(postDetails.createdAt).toLocaleDateString()}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
