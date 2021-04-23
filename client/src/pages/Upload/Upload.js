
import { useState, useEffect } from 'react'
import { storage } from '../../firebase';
import '../../App.css'
import {
  Button, Form, FormGroup, Label, Input,
  Container, Row, Col
} from 'reactstrap'
import DragAndDrop from '../../components/DragAndDrop'
import Post from '../../utils/Post'

const ReactFirebaseFileUpload = () => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const [images, setimages] = useState([])
  const [postState, setPostState] = useState({
    title: '',
    body: '',
    tag1: '',
    tag2: '',
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }

  const handleChange = image => {
    if (image.length === 1) setImage(image[0])
    else alert("Posts can only hold one image!\nPlease reupload with a single image file!")
  }

  const handleUpload = () => {
    console.log("image: ", image)
    if (image) {
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
              const tags = []
              if (postState.tag1 !== '' && postState.tag2 !== '') {
                tags.push(postState.tag1, postState.tag2)
                Post.create({
                  title: postState.title,
                  body: postState.body,
                  link: url,
                  tags: tags
                })
                  .then(res => {
                    window.location = '/'
                  })
              }
              if (postState.tag1 === '' && postState.tag2 !== '') {
                tags.push(postState.tag2)
                Post.create({
                  title: postState.title,
                  body: postState.body,
                  link: url,
                  tags: tags
                })
                  .then(res => {
                    window.location = '/'
                  })
              }
              if (postState.tag1 === '' && postState.tag2 === '') {
                Post.create({
                  title: postState.title,
                  body: postState.body,
                  link: url,
                })
                  .then(res => {
                    window.location = '/'
                  })
              }
            })
        }
      )
    } else {
      const tags = []
      if (postState.tag1 !== '' && postState.tag2 !== '') {
        tags.push(postState.tag1, postState.tag2)
        Post.create({
          title: postState.title,
          body: postState.body,
          link: url,
          tags: tags
        })

          .then(res => {

            window.location = '/'
          })
      }
      if (postState.tag1 === '' && postState.tag2 !== '') {
        tags.push(postState.tag2)
        Post.create({
          title: postState.title,
          body: postState.body,
          link: url,
          tags: tags
        })

          .then(res => {

            window.location = '/'
          })
      }
      if (postState.tag1 !== '' && postState.tag2 === '') {
        tags.push(postState.tag1)
        Post.create({
          title: postState.title,
          body: postState.body,
          link: url,
          tags: tags
        })

          .then(res => {

            window.location = '/'
          })
      }
      if (postState.tag1 === '' && postState.tag2 === '') {
        Post.create({
          title: postState.title,
          body: postState.body,
          link: url,
        })

          .then(res => {

            window.location = '/'
          })
      }
    }
    //ends here
  }

  return (
    <Container>
      <Row>
        <Col xs="4">
          {/* <progress value={progress} max="100" /> */}
          <h1>Create A Post</h1>
          <Form >
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
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label htmlFor='body' className='mr-sm-2'>1st Tag</Label>
              <Input
                type='text'
                name='tag1'
                value={postState.tag1}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
              <Label htmlFor='body' className='mr-sm-2'>2nd Tag</Label>
              <Input
                type='text'
                name='tag2'
                value={postState.tag2}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>

          {/* <p> Firebase my{User.name} image upload!</p> */}
          <DragAndDrop upload={handleChange} />

          <Button onClick={handleUpload}>Create Post</Button>
          <br />
          {url}
          <br />
        </Col>
      </Row>
    </Container>


  );
};

export default ReactFirebaseFileUpload