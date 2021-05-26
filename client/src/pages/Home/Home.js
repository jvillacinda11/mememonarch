import { useState, useEffect } from 'react'
import {
  Button, Form, FormGroup, Label, Input,
  Container, Row, Col
} from 'reactstrap'
import Post from '../../utils/Post'
import Posting from '../../components/Posting'
import '../../App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'


function Home() {
  const [postState, setPostState] = useState({
    posts: []
  })




  //shweta added code in use effect for sorting post recent

  useEffect(() => {
    Post.getAll({})
      .then(({ data: posts }) => {
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
      <Container>
        <Row>
          {/* <Col> */}
          {
            postState.posts.length > 0
              ? postState.posts.map(post => (
                <Posting
                  id={post._id}
                  title={post.title}
                  username={post.author.username}
                  authid= {post.author._id}
                  body={post.body}
                  crowns={post.crowns}
                  images= {post.images}
                  tags= {post.tags}
                  profilePage={false}
                  otherprofilepage ={false}
                  uploadpage= {false}
                />
              )) : null
          }
          {/* </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default Home;