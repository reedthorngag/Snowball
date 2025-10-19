import Route from "../../types/route.js";
import logger from "../../util/logger.js";

const get:Route = ['/fetch/post', 'GET', 'none', async (req:any,res:any) => {

    res.send("hello");
}];


export default [
    get
];