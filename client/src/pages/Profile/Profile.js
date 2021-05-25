import { useState, useEffect } from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle,
  Container, Row, Col, Button
} from 'reactstrap'
import User from '../../utils/User'
import Post from '../../utils/Post'

import Posting from '../../components/Posting'

import 'bootstrap/dist/css/bootstrap.min.css';

let allPosts = []
Post.getEveryPost()
  .then(posts => {
    allPosts = posts.data
    console.log(allPosts)
  })
  .catch(err => console.log(err))

let favorites = []
User.profile()
  .then(user => {
    favorites = user.data.favorites
  })
  .catch(err => console.log(err))

function Profile() {

  const [profileState, setProfileState] = useState({
    user: {}
  })

  const deletepost = (id) => {
    Post.delete(id)
      .then(() => {
        window.location.reload()
      })
      .catch(err => {
        console.error(err)
        window.location = '/login'
      })
  }

  useEffect(() => {
    User.profile()
      .then(({ data: user }) => {
        setProfileState({ ...profileState, user })
      })
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
                <Col md="4">
                  <Posting
                    id={post._id}
                    title={post.title}
                    username={profileState.user.username}
                    body={post.body}
                    crowns={post.crowns}
                    images={post.images}
                    tags = {post.tags}
                    authid ={profileState.user._id}
                    deletepost={deletepost}
                    profilePage={true}
                  />
                </Col>
              ))
              : null
          }
        </Row>
        <hr />
        <Row>
          <Col>
            <h1>Your Favorites</h1>
          </Col>
        </Row>
        <Row>
          {
            favorites.length
              ? allPosts.filter(post => favorites.indexOf(post._id) !== -1).map(post => (
                <Col md="4">
                  <Posting
                    id={post._id}
                    title={post.title}
                    username={post.author.username}
                    body={post.body}
                    crowns={post.crowns}
                    images={post.images}
                    tags={post.tags}
                    profilePage={false}
                    authid={post.author.id}
                    favorite={true}
                  />
                </Col>
              ))
              : null
          }
        </Row>
      </Container>
    </>
  );
}

export default Profile;