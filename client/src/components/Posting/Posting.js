import { useState, useEffect } from 'react'
import { PromiseProvider } from 'mongoose';
import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Col
} from 'reactstrap';
import downcrown from '../../assets/images/crown-down.png'
import upcrown from '../../assets/images/crown-up.png'
import './Posting.css'
import Upvote from 'react-upvote';
import Post from '../../utils/Post'

const Posting = ({ images, id, title, username, body, crowns, tags, deletepost, profilePage, authid, otherprofilepage }) => {


  const [voteState, setVoteState] = useState({
    upvoteActive: false,
    downvoteActive: false
  })


  const ProfileSearch = data => {
    //data is the user._id with which we search
    localStorage.setItem('searchUser', data)
    window.location = '/OtherUserProfile'

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
    let vote = crowns + 1
    Post.vote(id, vote)

  }
  const handledownvote = () => {
    let vote = crowns - 1
    Post.vote(id, vote)
  }

  return (
    <>
      { images ?
        <Col>
          <Card>
            <CardImg top width="100%" src={images} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">{title}</CardTitle>
              {
                otherprofilepage ? <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle> : <CardSubtitle tag="h6" className="mb-2 text-muted link" onClick={() => ProfileSearch(authid)}>Posted by {username}</CardSubtitle>
              }


              <CardText>{body}</CardText>
              {tags.length > 0 ?
                <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                : null}
              <CardSubtitle>



              </CardSubtitle>
              {
                profilePage ?
                  <>
                    <Button color='secondary' onClick={() => deletepost(id)}>Delete</Button>
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
                  </>
              }
            </CardBody>
          </Card>
        </Col>
        :
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">{title}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted link" onClick={() => ProfileSearch(authid)}>Posted by {username}</CardSubtitle>
              <CardText>{body}</CardText>
              {tags ?
                <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                : null}
              <CardSubtitle>


              </CardSubtitle>
              {
                profilePage ?
                  <>
                    <Button color='secondary' onClick={() => deletepost(id)}>Delete</Button>
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
                  </>
              }
            </CardBody>
          </Card>
        </Col>
      }
    </>
  )
}

export default Posting