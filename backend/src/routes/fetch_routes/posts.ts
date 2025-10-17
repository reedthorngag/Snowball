import Route from "../../types/route.js";
import { PostCreateData } from "../../types/post_data.js";
import logger from "../../util/logger.js";

const fetch_post:Route = ['/fetch/post', 'GET', 'none', async (req:any,res:any) => {
    
    if (!req.query.id) {
        res.status(404).contentType('text').send('missing post id parameter (?id=)');
        return;
    }

    // try {
    //     const post = await prismaClient.post.findUnique({
    //         where: {
    //             PostID: req.query.id,
    //             IsDeleted:false
    //         },
    //         select: {
    //             PostID:true,
    //             Title:true,
    //             Community: {
    //                 select: {
    //                     CommunityID: true,
    //                     Name: true
    //                 }
    //             },
    //             Type:true,
    //             Url:true,
    //             Description:true,
    //             Body:true,
    //             Rating:true,
    //             AuthorID: true,
    //             LastEdited:true,
    //             IsLocked:true,
    //             PostedAt:true
    //         }
    //     });

    //     if (post)
    //         res.status(200).contentType("json").send(JSON.stringify(post));
    //     else
    //         res.status(404).contentType('json').send('{"error":"invalid_id"}');

    // } catch (error:any) {
    //     if (error.code === 'P2023') {
    //         logger.info('fuck');
    //         res.status(404).contentType("json").send('{"error":"invalid_id"}');
    //     } else {
    //         logger.error(error);
    //     }
    // }
}];

const routeList:Route[] = [
    fetch_post
];

export default routeList;