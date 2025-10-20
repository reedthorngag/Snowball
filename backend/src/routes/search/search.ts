import Route from "../../types/route.js";
import logger from "../../util/logger.js";

const get:Route = ['/search', 'GET', 'none', async (req:any,res:any) => {

    if (req.query.s?.length > 32) {
        res.status(422).send('{"error":"search term too long"}');
    }

    const posts = await global.models.Post.find({$text: {$search: req.query.s}});
    console.log(posts)

    res.send(JSON.stringify(posts));
}];


export default [
    get
];


