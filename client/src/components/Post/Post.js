import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Post = () => {
  return (
    <Card>
      <CardImg top width="100%" src="https://i.pinimg.com/280x280_RS/ad/2a/20/ad2a2058ad62d30a0754aafb81e5de13.jpg" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  )
}

export default Post