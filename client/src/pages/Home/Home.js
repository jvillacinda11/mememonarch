import { useState, useEffect } from 'react'
import {
  Button, Form, FormGroup, Label, Input,
  Container, Row
} from 'reactstrap'
import Post from '../../utils/Post'
import Posting from '../../components/Posting'
import DragAndDrop from '../../components/DragAndDrop'
import '../../App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'


function Home() {
  const [postState, setPostState] = useState({
    posts: []
  })




  useEffect(() => {
    Post.getAll()
      .then(({ data: posts }) => {
        setPostState({ ...postState, posts })
      })
      .catch(err => {
        console.error(err)
        window.location = '/login'
      })
  }, [])

  return (
    <>
      <Container>
        <Row>
          {
            postState.posts.length > 0
              ? postState.posts.map(post => (
                <Posting
                  id={post._id}
                  title={post.title}
                  username={post.author.username}
                  body={post.body}
                  crowns={post.crowns}
                  images= {post.images}
                />
              )) : null
          }
        </Row>
      </Container>
    </>
  );
}

export default Home;