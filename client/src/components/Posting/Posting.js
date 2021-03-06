import { useState } from 'react'
import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Col, Form, FormGroup, Input,
   Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import downcrown from '../../assets/images/crown-down.png'
import upcrown from '../../assets/images/crown-up.png'
import './Posting.css'
import User from '../../utils/User'
import Post from '../../utils/Post'



const Posting = ({ images, id, title, username, body, crowns, tags, deletepost, profilePage, authid, otherprofilepage, uploadpage, favorite }) => {

  //modal toggle parts
  const [modalShow, setModalShow] = useState(false)

  const addFavorite = event => {
    event.preventDefault()
    User.addFavorite(id)
    .then(() =>{
      let scrollPos = window.scrollY
      localStorage.setItem('scrollPos', scrollPos)
      if (event.target.innerHTML === "Add to Royal Vault") event.target.innerHTML = "Remove from Royal Vault"
      else event.target.innerHTML = "Add to Royal Vault"        
      window.location.reload()
    })
    .catch(err =>{
       console.log(err)
       showModal()
      })
  }

  const showModal = () => { setModalShow(true) }

  const hideModal = () => { 
    setModalShow(false)
    setLoginState({
      ...loginState, un : '', pw: ''
    })
  }

  const ProfileSearch = data => {
    //data is the user._id with which we search
    localStorage.removeItem('scrollPos')
    localStorage.setItem('searchUser', data)
    window.location = '/OtherUserProfile'
  }

  const [loginState, setLoginState] = useState({
    un: '',
    pw: ''
  })
  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }
  const handleLogin = event => {
    event.preventDefault()

    User.login({
      username: loginState.un,
      password: loginState.pw
    })
      .then(({ data }) => {
        if (data === null) {
          alert('not valid password')
        }
        else {
          localStorage.setItem('user', data)
          window.location.reload()
        }
      })
  }
  const navToReg = () => {
    localStorage.removeItem('scrollPos')
    window.location = '/login'
  }
  // const Upvote = require('react-upvote');
  // <Upvote
  //   voteStatus={user.votes[postData.id] || 0}
  //   upvoteContent={<img id="upvote" src={upcrown} alt="pepefoot" class="icon" />}
  //   downvoteContent={<img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class="icon" />}
  //   afterContent={<span className="upvote-count">{postData.upvotes}</span>}
  //   shouldAllow={() => user.isLoggedIn}
  //   onDisallowed={() => this.errorMessage('You have to log in!')}
  //   onUpvote={() => this.upvotePost(postData.id)}
  //   onDownvote={() => this.downvotePost(postData.id)}
  //   onRemoveVote={() => this.removeVote(postData.id)}
  // />
  const handleupvote = () => {
    //Post.checkVote checks whether the User has already interacted with the post
    Post.checkVote(id)
      .then(({ data }) => {
        //this conditional is for liking posts that have already been interacted with
        if (data.likedHistory.length > 0) {
          let up = data.likedHistory[0].upvoteActive
          let down = data.likedHistory[0].downvoteActive
          let voteId = data.likedHistory[0]._id
          //if you have previously downvoted
          if (down) {

            let vote = crowns + 2
            let upvoteUpdate = true
            let downvoteUpdate = false
            Post.repeatVote(id, vote, upvoteUpdate, downvoteUpdate, voteId)
              .then(() => {
                let scrollPos = window.scrollY
                localStorage.setItem('scrollPos', scrollPos)
                window.location.reload()
              })
              .catch(err => console.log(err))
          }
          if (up) {
            let vote = crowns - 1
            let upvoteUpdate = false
            let downvoteUpdate = false
            Post.repeatVote(id, vote, upvoteUpdate, downvoteUpdate, voteId)
              .then(() => {
                let scrollPos = window.scrollY
                localStorage.setItem('scrollPos', scrollPos)
                window.location.reload()
              })
              .catch(err => console.log(err))
          }
          if (up === false && down === false) {
            let vote = crowns + 1
            let upvoteUpdate = true
            let downvoteUpdate = false
            Post.repeatVote(id, vote, upvoteUpdate, downvoteUpdate, voteId)
              .then(() => {
                let scrollPos = window.scrollY
                localStorage.setItem('scrollPos', scrollPos)
                window.location.reload()
              })
              .catch(err => console.log(err))
          }
        }
        //this is for liking posts for the first time
        if (data.likedHistory.length === 0) {
          let vote = crowns + 1
          let upvoteUpdate = true
          let downvoteUpdate = false
          Post.vote(id, vote, upvoteUpdate, downvoteUpdate)
            .then(() => {
              let scrollPos = window.scrollY
              localStorage.setItem('scrollPos', scrollPos)
              window.location.reload()
            })
            .catch(err => console.log(err))

        }
      })
      .catch(err => {
        console.log(err)
        showModal()
      })



  }
  const handledownvote = () => {

    Post.checkVote(id)
      .then(({ data }) => {
        //this conditional is for liking posts that have already been interacted with
        if (data.likedHistory.length > 0) {
          let up = data.likedHistory[0].upvoteActive
          let down = data.likedHistory[0].downvoteActive
          let voteId = data.likedHistory[0]._id
          //if you have previously downvoted
          if (up) {

            let vote = crowns - 2
            let upvoteUpdate = false
            let downvoteUpdate = true
            Post.repeatVote(id, vote, upvoteUpdate, downvoteUpdate, voteId)
            .then(() =>{
              let scrollPos = window.scrollY
              localStorage.setItem('scrollPos', scrollPos)
              window.location.reload()
            })
            .catch(err => console.log(err))
          }
          if (down) {
            let vote = crowns + 1
            let upvoteUpdate = false
            let downvoteUpdate = false
            Post.repeatVote(id, vote, upvoteUpdate, downvoteUpdate, voteId)
              .then(() => {
                let scrollPos = window.scrollY
                localStorage.setItem('scrollPos', scrollPos)
                window.location.reload()
              })
              .catch(err => console.log(err))

          }
          if (down === false && up === false) {
            let vote = crowns - 1
            let upvoteUpdate = false
            let downvoteUpdate = true
            Post.repeatVote(id, vote, upvoteUpdate, downvoteUpdate, voteId)
              .then(() => {
                let scrollPos = window.scrollY
                localStorage.setItem('scrollPos', scrollPos)
                window.location.reload()
              })
              .catch(err => console.log(err))

          }

        }
        //this is for liking posts for the first time
        if (data.likedHistory.length === 0) {
          let vote = crowns - 1
          let upvoteUpdate = false
          let downvoteUpdate = true
          Post.vote(id, vote, upvoteUpdate, downvoteUpdate)
            .then(() => {
              let scrollPos = window.scrollY
              localStorage.setItem('scrollPos', scrollPos)
              window.location.reload()
            })
            .catch(err => console.log(err))

        }
      })
      .catch(err => {
        console.log(err)
        showModal()
      })
  }

  return (
    <>

      <Modal isOpen={modalShow} onHide={hideModal} centered>

        <ModalHeader>
          <h3>Login</h3>
        </ModalHeader>

        <ModalBody>
          <p>
            New User? Register <span className= "link" onClick={navToReg}>Here</span>.
      </p>
          <Form onSubmit= {handleLogin}>
            <FormGroup>
              <Input
                type='text'
                name='un'
                value={loginState.un}
                onChange={handleInputChange}
                placeholder='Username'
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='pw'
                value={loginState.pw}
                onChange={handleInputChange}
                placeholder='Password'
              />
            </FormGroup>
          </Form>


        </ModalBody>

        <ModalFooter>
          <Button onClick={handleLogin}> Login</Button>
          <Button onClick={hideModal}>Exit</Button>

        </ModalFooter>
      </Modal>
      {uploadpage ? 
      <>
          {images ?
            <Col md='12' xs='12'>
              <Card>
                <CardImg top width="100%" src={images} alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h5">{title}</CardTitle>
                  <CardText>{body}</CardText>
                  {tags.length > 0 ?
                    <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                    : null}
                  <CardSubtitle>
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
            :
            <Col md='12' xs='12'>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{title}</CardTitle>
                  <CardText>{body}</CardText>
                  {tags.length > 0 ?
                    <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                    : null}
                  <CardSubtitle>
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
          }
      </>
      :
      <> 
{ images ?
        <Col sm="12" md="4">
          <Card>
            <CardImg top width="100%" src={images} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">{title}</CardTitle>
              {
                otherprofilepage ? <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle> : <CardSubtitle tag="h6" className="mb-2 text-muted ">Posted by <span className="link" onClick={() => ProfileSearch(authid)}>{username}</span></CardSubtitle>
              }


              <CardText>{body}</CardText>
              {tags.length > 0 ?
                <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                : null}
              {
                profilePage ?
                  <>
                  <CardSubtitle>
                  <Button color='light' light expand='md' onClick={handleupvote}>
                        <img id="upvote" src={upcrown} alt="pepefoot" class="icon" />
                  </Button>
                      {crowns}
                  <Button color='light' light expand='md' onClick={handledownvote}>
                        <img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class="icon" />
                  </Button>
                  <Button color='secondary' onClick={() => deletepost(id)}>Delete</Button>

                  </CardSubtitle>
                  </>
                  :
                  <>
                    <CardSubtitle>

                      <Button color='light' light expand='md' onClick={handleupvote}>
                        <img id="upvote" src={upcrown} alt="pepefoot" class="icon" />
                      </Button>
                      {crowns}
                      <Button color='light' light expand='md' onClick={handledownvote}>
                        <img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class="icon" />
                      </Button>
                      
                    </CardSubtitle>
                    <Button onClick={addFavorite}>
                      {favorite ? "Remove from Royal Vault" : "Add to Royal Vault"}
                    </Button>
                  </>
              }
            </CardBody>
          </Card>
        </Col>
        :
        <Col sm="12" md="4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">{title}</CardTitle>
                  {
                    otherprofilepage ? <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle> : <CardSubtitle tag="h6" className="mb-2 text-muted ">Posted by <span className="link" onClick={() => ProfileSearch(authid)}>{username}</span></CardSubtitle>
                  }
              <CardText>{body}</CardText>
              {tags.length > 0 ?
                <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                : null}

              {
                profilePage ?
                  <>
                  <CardSubtitle>
                  <Button color='light' light expand='md' onClick={handleupvote}>
                        <img id="upvote" src={upcrown} alt="pepefoot" class="icon" />
                  </Button>
                      {crowns}
                  <Button color='light' light expand='md' onClick={handledownvote}>
                        <img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class="icon" />
                  </Button>
                  <Button color='secondary' onClick={() => deletepost(id)}>Delete</Button>

                  </CardSubtitle>
                  </>
                  :
                  <>
                    <CardSubtitle>

                      <Button color='light' light expand='md' onClick={handleupvote}>
                        <img id="upvote" src={upcrown} alt="pepefoot" class="icon" />
                      </Button>
                      {crowns}
                      <Button color='light' light expand='md' onClick={handledownvote}>
                        <img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class="icon" />
                      </Button>

                    </CardSubtitle>
                    <Button onClick={addFavorite}>
                      {favorite ? "Remove from Royal Vault" : "Add to Royal Vault"}
                    </Button>
                  </>
              }
            </CardBody>
          </Card>
        </Col>
      }
      </>
       }
      
    </>
  )
}

export default Posting