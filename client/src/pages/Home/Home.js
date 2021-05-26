import { useState, useEffect } from 'react'
import {
  Container, Row
} from 'reactstrap'
import User from '../../utils/User'
import Post from '../../utils/Post'
import Posting from '../../components/Posting'
import '../../App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'

let favorites = []
User.profile()
  .then(res => {
    favorites = res.data.favorites
  })
  .catch(err => console.log(err))

function Home() {

  useEffect(() => {
    if(localStorage.getItem('scrollPos')){
    window.scrollTo({
      top: JSON.parse(localStorage.getItem('scrollPos')),
      behavior: 'smooth'
    })
  }
  })

  const [postState, setPostState] = useState({
    posts: []
  })
  
  //shweta added code in use effect for sorting post recent

  useEffect(() => {
    Post.getAll({})
      .then(({ data: posts }) => {
        let arr = posts.sort((a, b) => new Date(a.created) - new Date(b.created)).reverse()
        
        setPostState({ ...postState, posts:arr })
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
                    authid= {post.author._id}
                    body={post.body}
                    crowns={post.crowns}
                    images= {post.images}
                    tags= {post.tags}
                    profilePage={false}
                    otherprofilepage ={false}
                    favorite={favorites.indexOf(post._id) !== -1}
                    uploadpage= {false}
                  />
              
              )) : null
          }
        </Row>
      </Container>
    </>
  );
}

export default Home;