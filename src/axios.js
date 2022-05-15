import axios from "axios";

const client = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp",
});

export default client;
