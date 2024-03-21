import Axios from "axios";
// Create an axios instance with your baseURL

const api = Axios.create({
    baseURL: "http://localhost:8080",
    //   baseURL: "https://global-office-backend.vercel.app/",
});
api.defaults.headers.common["Access-Control-Allow-Origin"] = "*"; // Replace with the actual origin of your frontend
api.defaults.headers.common["Access-Control-Allow-Methods"] =
    "GET, POST, PUT, PATCH, DELETE"; // Define the allowed HTTP methods
// axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization"; // Define the allowed headers


// Set default headers for the axios instance
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("access-token");

export default api;