import axios from "axios"
import base_url from "./util"

const base_url ='/api'


const get_token = () => {
  const token = window.localStorage.getItem('token')
  return `bearer ${token}`
}

export const handle_login = async (payload) => {
  payload = {
    email: payload.email.value,
    password: payload.password.value
  }
  const {data} = await axios.post(`${base_url}/login`, payload)
  return data
}
  
export const handle_register = async (payload) => {
  const {data} = await axios.post(`${base_url}/users`, payload)
  return data
}

export const get_user_info = async () => {
  const config = {
    headers: { authorization: get_token()},
  }
  const {data} = await axios.get(`${base_url}/users/me`, config)
  return data
}
