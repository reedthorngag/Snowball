

export async function get_user(user_id: string) {

    let user = cache.users[user_id];

    if (!user) {
        const value = await global.models.User.findOne({user_id: user_id, deleted: false, banned: false}).select('-google_id -email -password').exec();
        if (!value)
            return undefined;

        user = {
            last_access: 0, 
            value: value
        };
    }

    user.last_access = Date.now();

    return user.value;
}

export async function get_community(community_id: string) {

    let community = cache.communities[community_id];

    if (!community) {
        const value = await global.models.Community.findOne({user_id: community_id, deleted: false, banned: false}).exec();
        if (!value)
            return undefined;

        community = {
            last_access: 0, 
            value: value
        };
    }

    community.last_access = Date.now();

    return community.value;
}

export async function get_post(post_id: string) {

    let post = cache.posts[post_id];

    if (!post) {
        const value = await global.models.Post.findOne({post_id: post_id, deleted: false}).exec();
        if (!value)
            return undefined;

        post = {
            last_access: 0, 
            value: value
        };
    }

    post.last_access = Date.now();

    return post.value;
}


