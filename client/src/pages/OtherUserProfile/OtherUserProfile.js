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
    let profilesearch = 
    User.otheruserprofile(profilesearch)
    .then(({ data: user }) => setProfileState({...profileState, user}))
    .catch(err => {console.log(err)
    alert('User not found')
    window.location = '/'
    })
  })

  return(
    <>
      <h1>Your Info</h1>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>Name: {profileState.user.name}</CardTitle>
          <CardText>Username: {profileState.user.username}</CardText>
        </CardBody>
      </Card>
      <Container>
        <Row>
          <Col>
            <h1>{profileState.user.username} Posts</h1>
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