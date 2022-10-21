import axios from "axios";

const baseURL = `https://www.superheroapi.com/api/${process.env.ACCESS_TOKEN}/`;

// console.log(process.env.ACCESS_TOKEN);

export default axios.create({ baseURL });
