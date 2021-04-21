
import { useState, useEffect } from 'react'
import { storage } from '../../firebase';
import '../../App.css'
import {
  Button, Form, FormGroup, Label, Input,
  Container, Row
} from 'reactstrap'


import Post from '../../utils/Post'


const ReactFirebaseFileUpload = () => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const [images, setimages] = useState([])
  const [postState, setPostState] = useState({
    title: '',
    body: '',
    posts: []
  })
  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }


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
            Post.create({
              title: postState.title,
              body: postState.body,
              link: url})
              .then(res => {

              window.location = '/'
            })

          })
      }

    )
  }



  return (
    <>
      <div>
        {/* <progress value={progress} max="100" /> */}
        <h1>Create A Post</h1>
        <Form inline >
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='title' className='mr-sm-2'>Title</Label>
            <Input
              type='text'
              name='title'
              value={postState.title}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='body' className='mr-sm-2'>Body</Label>
            <Input
              type='textarea'
              name='body'
              value={postState.body}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
        <input type='file' onChange={handleChange} />
        <button onClick={handleUpload}>Create Post</button>
        <br />
        {url}
        <br />
      </div>
    </>


  );
};

export default ReactFirebaseFileUpload