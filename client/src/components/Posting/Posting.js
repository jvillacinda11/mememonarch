import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Col
} from 'reactstrap';
import Post from '../../utils/Post';

const Posting = ({ id, title, username, body, src }) => {
  return (
    <Col>
      <Card>
        <CardImg top width="100%" src={src} />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle>
          <CardText>{body}</CardText>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Posting