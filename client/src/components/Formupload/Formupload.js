import { useState, useEffect } from 'react'
import { storage } from '../../firebase';
import DragAndDrop from '../DragAndDrop'
import '../../App.css'

import User from '../../utils/User'

import Image from '../../utils/Image'

const ReactFirebaseFileUpload = () => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const [images, setimages] = useState([])

  useEffect(()=>{
  Image.getAll().then(data=> {
    console.log(data)
    setimages(data.data)
    })
  },[] )

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])

    }

  }


  const handleUpload = () => {
    console.log("image: ", image)

    const uploadTask = storage.ref(`image/${image.name}`).put(image)
    uploadTask.on("state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.byteTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      error => {
        console.log(error)

      },
      () => {
        storage
          .ref("image")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url)
            setUrl(url)
            Image.create({link: url}).then(res => {
           setimages([...images, url])

            })

          })
      }

    )
  }

  return (
    <>
      <div>
        <progress value={progress} max="100" />
        <p> Firebase my {User.name} image upload!</p>
        <DragAndDrop onChange={handleChange} />
        {/* <input type='file' onChange={handleChange} /> */}
        <button onClick={handleUpload}>Upload</button>
        <br />
        {url}
        <br />
        {/* <img src={url || "http://via.placeholder.com/250X250"} alt="firebase-image" /> */}
        {images?.map((image, i )=> (
          <img className='imgalign' src={images[images.length-1-i] || "http://via.placeholder.com/250X250"} alt="firebase" />
        ))}
      </div>
    </>
  );
};

export default ReactFirebaseFileUpload