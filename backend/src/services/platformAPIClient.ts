import axios from "axios";

const platformAPIClient = axios.create({
  baseURL: "https://api.minepi.com",
  headers: {
    Authorization: `Key ${process.env.PI_API_KEY}`
  }
});

export default platformAPIClient;
