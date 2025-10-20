import mongoose from "mongoose";
import Route from "../../types/route.js";
import logger from "../../util/logger.js";

const create:Route = ['/post', 'GET', 'none', async (req:any,res:any) => {

    const a = new global.models.Post({community_id: "hi", author_id: "hello", title: "test", body: "hello world"});
    res.send(JSON.stringify(await a.save()));
}];


export default [
    create
];