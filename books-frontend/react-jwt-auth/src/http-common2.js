import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3050/audiobookshop",
  headers: {
    "Content-type": "application/json"
  }
});