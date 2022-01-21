import axios from 'axios'

const API = axios.create({
  baseURL: 'https://step-meter-pp4publmdq-ez.a.run.app/',
  headers: {
    Authorization: 'Token af61aed7399dc6a636e443cdc8a2d55db97c524a',
    'Content-Type': 'application/json'
  },
  useCredentials: true
})
export default {
  async getAllUsers () {
    const response = await API.get('users/?limit=100')
    return response.data
  },
  async getUser (userName) {
    const response = await API.get(`${userName}/workouts/?limit=999`)
    return response.data
  }
}
