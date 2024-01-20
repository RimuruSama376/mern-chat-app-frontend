import axios from 'axios'
export const getUserInfo = async () => {
  try {
    const configuration = {
      method: 'get',
      url: 'http://localhost:8000/auth',
      withCredentials: true
    }

    const response = await axios(configuration)
    return response.data
  } catch (error) {
    // Handle errors - show an error message to the user
    return error
  }
}
