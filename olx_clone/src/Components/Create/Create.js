import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { storage } from '../../firebase/config';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom'
const firestore = getFirestore();

const Create = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image!');
      return;
    }

    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `/images/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);

      // Log URL to verify image upload
      console.log('Image uploaded, URL:', url);

      // Save product info in Firestore
      const docRef = await addDoc(collection(firestore, 'products'), {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: date.toDateString(),
      });

      console.log("Document written with ID: ", docRef.id);
      alert('Product uploaded successfully!');

      // Clear the form
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);
      
      navigate('/');
    } catch (error) {
      console.error("Error uploading product or creating collection: ", error);
      alert('Error uploading product or creating collection. Please try again.');
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
          />
          <br />
          <label htmlFor="fcategory">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fcategory"
            name="category"
            value={category}
            onChange={(e) => { setCategory(e.target.value); }}
          />
          <br />
          <label htmlFor="fprice">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fprice"
            name="Price"
            value={price}
            onChange={(e) => { setPrice(e.target.value); }}
          />
          <br />
          <br />
          {image && <img alt="Post" width="200px" height="200px" src={URL.createObjectURL(image)} />}
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button className="uploadBtn" type="submit">Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;