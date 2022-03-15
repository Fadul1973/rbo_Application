import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3050/bookshop",
  headers: {
    "Content-type": "application/json"
  }
});