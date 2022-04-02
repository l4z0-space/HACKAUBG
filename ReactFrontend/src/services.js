import axios from "axios"

const base_url ='http://localhost:9000/api'


const get_token = () => {
  const token = window.localStorage.getItem('token')
  return `bearer ${token}`
}

export const handle_login = async (payload) => {

  const {data} = await axios.post(`${base_url}/login`, payload)
  localStorage.setItem('token', data.token)
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

export const get_link = async () => {
  const config = {
    headers: { authorization: get_token()},
  }
  const {data} = await axios.post(`${base_url}/plaid/link`, {}, config)
  return data
}

export const link_institution = async (public_token) => {
  const config = {
    headers: { authorization: get_token()},
  }
  const {data} = await axios.post(`${base_url}/plaid/link-institution`, {public_token}, config)
  return data
}

export const get_institutions = async () => {
  const config = {
    headers: { authorization: get_token()},
  }
  const {data} = await axios.get(`${base_url}/institutions`, config)
  return data
}
