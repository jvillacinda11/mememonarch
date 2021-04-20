import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Col
} from 'reactstrap';
import Post from '../../utils/Post';

const Posting = ({ id, title, username, body, crowns}) => {
  return (
    <Col>
      <Card>
        <CardImg top width="100%" src="https://i.pinimg.com/280x280_RS/ad/2a/20/ad2a2058ad62d30a0754aafb81e5de13.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle>
          <CardText>{body}</CardText>
          <CardSubtitle>{crowns}</CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Posting