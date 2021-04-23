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

function Profile() {
  const [profileState, setProfileState] = useState({
    user: {}
  })

  const deletepost=(id)=>{
  Post.delete(id)
    .then(() => {
      window.location.reload()
    })
    .catch(err => {
      console.error(err)
      //window.location = '/login'
    })

  }

  useEffect(() => {
    User.profile()
      .then(({ data: user }) => setProfileState({ ...profileState, user }))
      .catch(err => {
        console.error(err)
        window.location = '/login'
      })
  }, [])
  return (
    <>
      <h1>Your Info</h1>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>Name: {profileState.user.name}</CardTitle>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>Email: {profileState.user.email}</CardSubtitle>
          <CardText>Username: {profileState.user.username}</CardText>
        </CardBody>
      </Card>
      <hr />
      <Container>
        <Row>
          <Col>
            <h1>Your Posts</h1>
          </Col>
        </Row>
        <Row>
          {
            profileState.user.posts
              ? profileState.user.posts.map(post => (
                <Posting
                  id={post._id}
                  title={post.title}
                  username={post.author.username}
                  body={post.body}
                  crowns={post.crowns}
                  images={post.images}
                  tags = {post.tags}
                  deletepost={deletepost}
                />
              ))
              : null
          }
        </Row>
      </Container>
    </>
  );
}

export default Profile;