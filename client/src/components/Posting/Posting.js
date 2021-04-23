import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Col
} from 'reactstrap';
import downcrown from '../../assets/images/crown-down.png'
import upcrown from '../../assets/images/crown-up.png'

const Posting = ({ images, id, title, username, body, crowns, tags,deletepost }) => {
  //   /* crowns/karma functionality */                                          
  //   $(".upcrown-post").click(function () {
  //     let query = $(this).closest('article')
  //     let ref = query.data('ref')

  //     let crowns = query.find('.post-crowns')
  //     let downcrown = query.find(".downcrown-post")
  //     let post_user = query.find('.post-user').text()
  //     let counter;

  //     // if upvote is already toggled and user presses it again, 
  //     // toggle off the upvote button and decrement vote.
  //     if ($(this).hasClass("up-enabled")) {
  //       counter = crowns.text();
  //       crowns.text(--counter);
  //       $(this).removeClass("up-enabled");

  //       $.ajax({
  //         type: "put",
  //         url: `/crown/post/${ref}`,
  //         data: {
  //           crown: counter,
  //           state: "neutral",
  //           action: "decrement",
  //           user: post_user
  //         },
  //         success: function (res) { }
  //       });
  //       return false;
  //     }

  //     // if downvote is already toggled while upvote is pressed
  //     // toggle off downvote and increment vote
  //     if (downcrown.hasClass('down-enabled')) {
  //       downcrown.removeClass("down-enabled");
  //       counter = crowns.text();
  //       crowns.text(++counter);

  //       $.ajax({
  //         type: "put",
  //         data: {
  //           crown: counter,
  //           state: "neutral",
  //           action: "increment",
  //           user: post_user
  //         },
  //         url: `/crown/post/${ref}`,
  //         success: function (res) { }
  //       });
  //     }

  //     // if upvote isnt toggled while upvote is pressed,
  //     // toggle upvote and increment vote.
  //     else if (!$(this).hasClass("up-enabled")) {
  //       counter = crowns.text();
  //       crowns.text(++counter);
  //       $(this).addClass("up-enabled");

  //       $.ajax({
  //         type: "put",
  //         data: {
  //           crowns: counter,
  //           state: "up",
  //           action: "increment",
  //           user: post_user
  //         },
  //         url: `/crown/post/${ref}`,
  //         success: function (res) { }
  //       });
  //     }
  //     return false;
  //   })

  // (".downcrown-post").click(function () {
  //   let query = $(this).closest('article')
  //   let ref = query.data('ref')

  //   let crowns = query.find('.post-crowns')
  //   let upcrown = query.find(".upcrown-post")
  //   let post_user = query.find('.post-user').text()
  //   let counter;

  //   // if downvote is already toggled and user presses it again, 
  //   // toggle off the downvote button and increment vote.
  //   if ($(this).hasClass("down-enabled")) {
  //     counter = crowns.text();
  //     crowns.text(++counter);
  //     $(this).removeClass("down-enabled");

  //     $.ajax({
  //       type: "put",
  //       data: {
  //         crown: counter,
  //         state: "neutral",
  //         action: "increment",
  //         user: post_user
  //       },
  //       url: `/crown/post/${ref}`,
  //       success: function (res) { }
  //     });
  //     return false;
  //   }

  //   // if upvote is already toggled while downvote is pressed
  //   // toggle off upvote and decrement vote
  //   if (upcrown.hasClass('up-enabled')) {
  //     upcrown.removeClass("up-enabled");
  //     counter = crowns.text();
  //     crowns.text(--counter);

  //     $.ajax({
  //       type: "put",
  //       data: {
  //         crown: counter,
  //         state: "neutral",
  //         action: "decrement",
  //         user: post_user
  //       },
  //       url: `/crown/post/${ref}`,
  //       success: function (res) { }
  //     });

  //     // if downvote isnt toggled while downvote is pressed,
  //     // toggle downvote and decrement vote.
  //   } else if (!$(this).hasClass("down-enabled")) {
  //     counter = crowns.text();
  //     crowns.text(--counter);
  //     $(this).addClass("down-enabled");

  //     $.ajax({
  //       type: "put",
  //       data: {
  //         crown: counter,
  //         state: "down",
  //         action: "decrement",
  //         user: post_user
  //       },
  //       url: `/crown/post/${ref}`,
  //       success: function (res) { }
  //     });
  //   }
  //   return false;
  // })
  return (
    <>
      { images ?
        <Col>
          <Card>
            <CardImg top width="100%" src={images} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">{title}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle>
              <CardText>{body}</CardText>
              {tags.length > 0 ?
                <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                : null}
              <CardSubtitle>

                <Button color='light' light expand='md'><img id="upvote" src={upcrown} alt="pepefoot" class="icon" /></Button> {crowns} <Button color='light' light expand='md'><img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class="icon" /></Button>

              </CardSubtitle>
              <Button color='secondary' onClick={() => deletepost(id)}>Delete</Button>
            </CardBody>
          </Card>
        </Col>
        :
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">{title}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Posted by {username}</CardSubtitle>
              <CardText>{body}</CardText>
              {tags.length > 0 ?
                <CardText>Tags: {tags.map(tag => `| ${tag} `)}|</CardText>
                : null}
              <CardSubtitle>

                <Button color='light' light expand='md'><img id="upvote" src={upcrown} alt="pepefoot" class="icon" /></Button> {crowns} <Button color='light' light expand='md'><img id="downvote" src={downcrown} alt="pepefootbutupsidedown" class="icon" /></Button>

              </CardSubtitle>
              <Button color='secondary' onClick={()=>deletepost(id)}>Delete</Button>
            </CardBody>
          </Card>
        </Col>
      }
    </>
  )
}

export default Posting