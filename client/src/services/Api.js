import axios from 'axios'

//https://goschoolportal.herokuapp.com/
//http://localhost:8081/

export default () => {
    return axios.create({
        baseURL: `http://localhost:8081/`,
        headers: {
        }
    })
}