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
  delete:id => axios.delete(`/api/posts/${id}`)
}

export default Post