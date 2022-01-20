import axios from 'axios'

const API = axios.create({
  baseURL: 'https://step-meter-pp4publmdq-ez.a.run.app',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Token af61aed7399dc6a636e443cdc8a2d55db97c524a'
  }
})
export default {
  async getAllUsers () {
    const response = await API.get('/users')
    return response.data
  }
}
