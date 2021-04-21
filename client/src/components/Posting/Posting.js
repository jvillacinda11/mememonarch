import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Col
} from 'reactstrap';
import downcrown from '../../assets/images/crown-down.png'
import upcrown from '../../assets/images/crown-up.png'

const Posting = ({ images, id, title, username, body, crowns}) => {
  return (
    <Col>
      <Card>
        <CardImg top width="100%" src={images} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle>
          <CardText>{body}</CardText>
          <CardSubtitle>  
          
            <Button color='light' light expand='md'><img id="upvote" src={upcrown} alt="pepefoot" class="icon" /></Button> {crowns} <Button color='light' light expand='md'><img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class = "icon"/></Button>
         
             </CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Posting