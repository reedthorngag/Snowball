



export async function get_user(user_id: string) {

    let user = cache.users[user_id];

    if (!user) {
        const value = await global.models.User.findOne({user_id: user_id}).select('-google_id -email -password').exec();
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

export async function get_community(user_id: string) {

    let user = cache.users[user_id];

    if (!user) {
        const value = await global.models.User.findOne({user_id: user_id}).select('-google_id -email -password').exec();
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

export async function get_post(post_id: string) {

    let user = cache.users[post_id];

    if (!user) {
        const value = await global.models.Post.findOne({user_id: post_id}).exec();
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


