import { useState, useEffect } from 'react'
import {
  Button, Form, FormGroup, Label, Input,
  Container, Row
} from 'reactstrap'
import Post from '../../utils/Post'
import Posting from '../../components/Posting'
import '../../App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'


function Home() {
  const [postState, setPostState] = useState({
    title: '',
    body: '',
    posts: []
  })

  

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
    event.preventDefault()

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    Post.create({
      title: postState.title,
      body: postState.body,
      crowns: 0,
      postDate: `${month + 1}/${day}/${year}`
    })
      .then(({ data: post }) => {
        console.log(post)
        const posts = [...postState.posts]
        posts.push(post)
        setPostState({ ...postState, posts, title: '', body: '' })
      })
      .catch(err => console.error(err))
  }

  //shweta added code in use effect for sorting post recent

  useEffect(() => {
    Post.getAll()
      .then(({ data: posts }) => {
        console.log(posts.map(post => post.postDate))
        let arr = posts.sort((a, b) => new Date(a.created) - new Date(b.created)).reverse()

        setPostState({ ...postState, posts:arr })
        
        console.log(arr)
      })
      .catch(err => {
        console.error(err)
        window.location = '/login'
      })
  }, [])
  return (
    <>
      <h1>Create A Post</h1>
      <Form inline onSubmit={handleCreatePost}>
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
        <Button onClick={handleCreatePost}>Create Post</Button>
      </Form>
      <Container>
        <Row>
          {
            postState.posts.length
              ? postState.posts.map(post => (
                <Posting id={post._id} title={post.title} username={post.author.username} body={post.body} />
              )) : null
          }
        </Row>
      </Container>
    </>
  );
}

export default Home;