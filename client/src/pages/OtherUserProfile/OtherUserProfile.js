import { useState, useEffect } from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle,
  Container, Row, Col
} from 'reactstrap'
import User from '../../utils/User'
import Post from '../../utils/Post'

import Posting from '../../components/Posting'

import 'bootstrap/dist/css/bootstrap.min.css';

function OtherUserProfile() {

  const [profileState, setProfileState] = useState({
    user: {}
  })

  useEffect(() => {
    User.otheruserprofile(localStorage.getItem('searchUser'))
      .then(({data : user}) => {
        console.log(user)
        setProfileState({ ...profileState, user: user })
        console.log(profileState.user.username)
     
      }
      )
      .catch(err => {
        console.error(err)
        // window.location = '/'
      })
  }, [])




  return(
    <>
      <Container>
        <Row>
          <Col>
            <h1>{profileState.user.username}'s Posts</h1>
          </Col>
        </Row>
        <Row>
          {
            profileState.user.posts
              ? profileState.user.posts.map(post => (
                  <Posting
                    id={post._id}
                    title={post.title}
                    username={profileState.user.username}
                    body={post.body}
                    crowns={post.crowns}
                    images={post.images}
                    tags={post.tags}
                    otherprofilepage = {true}
                  />
              ))
              : null
          }
        </Row>
      </Container>
    </>
  )
}

export default OtherUserProfile