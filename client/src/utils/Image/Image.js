import axios from 'axios'

const Image = {
  getAll: () => axios.get('/api/image', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  create: link => axios.post('/api/image', link, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default Image