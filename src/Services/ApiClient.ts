import axios from "axios";

export default axios.create({
    baseURL: "https://deezerdevs-deezer.p.rapidapi.com",
  // baseURL:"http://api.deezer.com",
    headers: {
    'X-RapidAPI-Key': '973608122emshd3e09de2e15ffbep15e686jsn04d45b9f73ec',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
})