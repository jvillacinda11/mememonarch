import axios from 'axios'

const Post = {
  getAll: () => axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  create: post => axios.post('/api/posts', post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  delete: id => axios.delete(`/api/posts/${id}`),

  vote: (id, newvote, up, down) => axios.put(`/api/posts/vote/${id}`, { vote: newvote, upvoteUpdate: up, downvoteUpdate: down  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  repeatVote: (id, newvote, up, down, voteId) => axios.put(`/api/posts/repeatVote/${id}`, {vote: newvote, upvoteUpdate: up, downvoteUpdate: down, vId: voteId}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  checkVote: (id) => axios.get(`/api/searchUsers/likedHistory/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),

  //shweta added below 05/21/21
 createcomments: (commentInfo) => axios.post(`api/posts/comment/${commentInfo._id}`, 
   commentInfo, {
   headers: {
     Authorization: `Bearer ${localStorage.getItem('user')}`
   }
 }),
  getFromPost: _id => axios.get(`api/posts//comments/${_id}`)
  

}

export default Post