
<br>

# COMP.7214
## Brody Cooper <br> 30076323

<br>


  - [Requirements](#requirements)
  - [Development stack](#development-stack)
  - [Design philosophy](#design-philosophy)
  - [Frontend Components](#frontend-components)
    - [Login](#login)
    - [Sign-up](#sign-up)
    - [Search](#search)
    - [Communities sidebar](#communities-sidebar)
    - [Feed](#feed)
    - [Post](#post)
    - [Community](#community)
    - [Post create/edit](#post-createedit)
    - [Community create/edit](#community-createedit)
  - [Mood board](#mood-board)
  - [Wireframes](#wireframes)
    - [Home](#home)
    - [Login](#login-1)
    - [Post](#post-1)
    - [Community](#community-1)
  - [Backend services provided](#backend-services-provided)
  - [Mongo DB collections](#mongo-db-collections)
    - [Users collection](#users-collection)
    - [Communities Collection](#communities-collection)
    - [Posts collection](#posts-collection)
    - [Comments collection](#comments-collection)
    - [Votes collection](#votes-collection)
  - [Routes](#routes)
    - [All routes have the prefix `/api/v1`](#all-routes-have-the-prefix-apiv1)
    - [GET /auth/google](#get-authgoogle)
    - [/auth/google/callback](#authgooglecallback)
    - [/logout](#logout)
    - [GET /feed](#get-feed)
    - [GET /search?s=search-term](#get-searchssearch-term)
    - [POST /resources](#post-resources)
    - [GET /resources/\[resource\_id\]](#get-resourcesresource_id)
    - [GET /posts/\[post\_id\]](#get-postspost_id)
    - [PUT /posts/\[post\_id\]](#put-postspost_id)
    - [PUT /posts/\[post\_id\]/vote](#put-postspost_idvote)
    - [GET /posts/\[post\_id\]/comments](#get-postspost_idcomments)
    - [POST /posts/\[post\_id\]/comments](#post-postspost_idcomments)
    - [POST /posts/\[post\_id\]/comments/\[comment\_id\]](#post-postspost_idcommentscomment_id)
    - [PUT /posts/\[post\_id\]/comments/\[comment\_id\]](#put-postspost_idcommentscomment_id)
    - [PUT /posts/\[post\_id\]/comments/\[comment\_id\]/vote](#put-postspost_idcommentscomment_idvote)
    - [DELETE /posts/\[post\_id\]/comments/\[comment\_id\]](#delete-postspost_idcommentscomment_id)
    - [POST /communities/\[community\_id\]/post](#post-communitiescommunity_idpost)
    - [GET /communities/\[community\_id\]](#get-communitiescommunity_id)
    - [GET /communities](#get-communities)
    - [GET /communities/top](#get-communitiestop)
    - [GET /communities/search?s=name](#get-communitiessearchsname)
    - [POST /communities](#post-communities)
    - [PUT /communities/\[community\_id\]](#put-communitiescommunity_id)
    - [PUT /communities/\[community\_id\]/promote/\[user\_id\]](#put-communitiescommunity_idpromoteuser_id)
    - [DELETE /communities/\[community\_id\]](#delete-communitiescommunity_id)
    - [GET /communities/\[community\_id\]/feed](#get-communitiescommunity_idfeed)
    - [GET /users/\[user\_id\]](#get-usersuser_id)
    - [POST /users](#post-users)
    - [GET /user](#get-user)
    - [GET /users/search?s=name](#get-userssearchsname)


<br>
<br>

## Requirements

Create a social media app that is similar in function to reddit.
- Has communities
- Has posts
- Has comments on posts
- Has support for text, image and video posts

<br>

## Development stack

- Vue.js
- Express
- Mongodb

<br>

## Design philosophy

Model View Presenter (MVP) will be used.
This is due to it making sense to, with the selected tech stack, as Vue is the View, handling UI and user input, with only lightweight validation, then express being the Presenter, which controls and validates requests and data coming from the View and returns data from the Model, which is mongodb.

<br>

## Frontend Components


### Login
The Login component is a popup that displays in the center of the screen and provides options for logging in with google or signing up. Signing up has the same initial process as logging in with google, so both options actually redirect to the same url lol.

Routes used:  

Navigation options:
* /api/v1/auth/google


### Sign-up
The Sign-up component is a popup that displays in the center of the screen after someone has logged in/signed up for the first time (or every time until they fill it out). It asks for their chosen username and has options to cancel (immediately logs them out) or select.

Routes used:
* /api/v1/users/[potential_username]
* /api/v1/users

Navigation options:
* /logout
* / (once username is selected)


### Search
The Search component accepts input through the search bar, and displays search results in a dropdown container.

Routes used:
* /search?s=[search-term]

Navigation options:
* /communities/[community_id]
* /posts/[post_id]
* /users/[user_id]


### Communities sidebar
The Community sidebar component shows either the logged in users communities, or the top communities if not logged in. It also has a button to create new communities.

#### Routes used:
* /api/v1/communities/top
  
#### Navigation options:
* /communities/[community_id]
* /communities/create


### Feed
The feed is one of the core components, it is a container that fetches and displays posts. It gets the list of posts to display from /feed, and requests more when the user gets near the end of the current posts in the feed.

#### Routes used:
* /api/v1/feed

#### Navigation options:
* /posts/[post_id]
* /communities/[community_id]
* /users/[post_author]


### Post
There are two individual post components, one is a feed post, which shows the collapsed form of a post with just score, title, a (possibly partial) view of the content, and number of comments.  
The second post component is the full component, which shows everything the partial feed post does, but shows the full post content/body, as well as showing the comments for that post, with options to create comments.
The post component also displays options to edit (a variant of create post) and delete options to the author, and a delete option to admins and community mods. 

#### Routes used:  
* /api/v1/posts/[post_id]/vote
* /api/v1/posts/[post_id]/comments/[comment_id]/vote
* /api/v1/posts/[post_id]/comments
* /api/v1/posts[post_id]/comments/[comment_id]

#### Navigation options:
* Back
* /communities/[community_id]
* /posts/[post_id]/edit
* /users/[post_author]
* /users/[comment_author]


### Community
The community component displays the information for a community, followed by a Feed component showing posts for that community. It shows the name, member count, owner and moderators, as well as options for the owner to edit or delete the community.  

#### Routes used:  
* /api/v1/communities/[community_id]  
* /api/v1/communities/[community_id]/feed  

#### Navigation options:  
* Back
* /users/[owner_id]
* /users/[mod_id]
* /posts/[post_id]
* /community/[community_id]/edit


### Post create/edit
The post create/edit component is similar to the regular post, but has text fields for the title and body, which for editing a prefilled with the old values. It also has a button to attach a file, and options to cancel and either save or post, depending on if it is creating a new post or editing one. There is also a field to select the community to post in, from the communities the user is in.

#### Routes used:
* /api/v1/communities/[community_id]/post
* /api/v1/posts/[post_id]
* /api/v1/resources

#### Navigation options:
* Back (cancel triggers back)
* /posts/[post_id] (post/save shows the created/updated post)


### Community create/edit
The community create/edit component has text fields for either only the description for editing, or the description and name for creation, as well as buttons for canceling or creating/saving the changes.

#### Routes used:
* /api/v1/communities
* /api/v1/communities/[community_id]

#### Navigation options:
* Back (cancel triggers back)
* /communities/[community_id] (create/save shows the created/updated community)


<br>

## Mood board

![mood board](image.png)


## Wireframes

### Home
![home](image-3.png)

### Login
![login popup](image-2.png)

### Post
![post](image-5.png)

### Community
![community](image-4.png)


## Backend services provided

- File upload for images and videos
- Authentication service
- Post feed service
- Search service

## Mongo DB collections

### Users collection
Collection to store a user's data, including their google-id and/or password for login.  
User id is the name of the user, chosen by the user, and must be unique. Its length is not strict, but will be 24 chars.  

    {
        "id": user id,
        "google-id": google id for google oauth login, not sent to frontend,
        "email": not sent to frontend,
        "password": password hash. Might not be used in v1,
        "admin": bool,
        "communities": [community_id1, community_id2, ...]
        "mod-of": [community_id1, community_id2, ...],
        "date": date time created,
    }

### Communities Collection
Collection storing everything about a community  
The name is the same as user's, chosen by the creator, with a 24 char limit, and must be unique.  

    {
        "id": community name,
        "members": num of members,
        "posts": community feed url,
        "owner": user id,
        "mods": [user_id1, user_id2, user_id3, ...],
        "date": date time created,
        "deleted": bool,
        "banned": bool
    }

### Posts collection
Collection storing everything about a post.  
Post id is a uuid generated by the server.  
May have either an image or video, which the resource id is created by submitting the media to [/upload/file](#post-uploadfile).  

    {
        "id": post id,
        "community": community_id,
        "title": title,
        "author": user id,
        "date": date time created,
        "image" || "video": optional resource id,
        "body": optional body text,
        "num-comments": number of comments,
        "activity": activity score, every upvote increments it. decreases by 100 per day,
        "upvotes": number of upvotes the post has received,
        "downvotes": number of downvotes,
        "edited": bool,
        "deleted": bool,
        "deleted-by": "author" || "mod" || "admin" (selects lowest role if multiple apply)
    }

### Comments collection
Collection storing each comment for every post.  
Comment id is a uuid generated by the server.  
replies stores the ids of every reply to that comment, so comment threads can be more easily built client side.

    {
        "post": post id,
        "id": comment id,
        "body": body text, undefined if deleted,
        "reply-to": comment id or undefined if top level
        "replies": [ comment_id1, comment_id2, ...],
        "date": date time created,
        "edited": bool,
        "deleted": bool,
        "deleted-by": "author" || "mod" || "admin" (selects lowest role if multiple apply),
        "upvotes": num of upvotes,
        "downvotes": num of downvotes
    }

### Votes collection
Votes collection to track every vote made and when they were created or last updated.
This is used to prevent people voting more than once, though they are not intended to be stored forever.  
Vote id is a key composed of user_id + (post_id || comment_id).

    {
        "id": vote id,
        "date": date time last updated
        "vote": -1 || 0 || 1
    }

<br>

## Routes

### All routes have the prefix `/api/v1`

### GET /auth/google
Redirects to the google login page.


### /auth/google/callback
The google login page returns to here, which then redirects to home, either logged in, or with an error message.


### /logout
Logs out the current user (if any) and redirects to home.


### GET /feed
Gets the content feed, returns a list of post structures, as they are stored in the db.  
Returns:

    [
        post1 (same structure as posts collection),
        post2,
        post3,
        ...
    ]


### GET /search?s=search-term
Searches communities and posts for matches with the search term.  
Returns:

    [
        {
            "title": search result title,
            "body": search result body/description,
            "type": "community" || "post" || "user"
        }
    ]


### POST /resources
Uploads an image or video file and returns the created resource id.  
POST data: multipart/form-data

    <input name='file' type='file' />

Returns:

    {
        "file": resource id
    }

or appropriate error message, such as 422 unacceptable: file too large


### GET /resources/[resource_id]
Returns the requested resource file, or 404 if it doesn't exist


### GET /posts/[post_id]
Returns the post structure, as it is stored in the db


### PUT /posts/[post_id]
Updates a post, replacing the current post content with the new content.  
POST data:

    {
        "body": post body (optional),
        "image" || "video": optional resource id, returned by /upload/file,
    }

Returns 200 ok or appropriate error code and message e.g. 403 forbidden: not your post

### PUT /posts/[post_id]/vote
Submits a vote, up or down, on a post.
PUT data:

    {
        "vote": -1 || 0 || 1
    }

Returns 200 ok or 401 authorized if not logged in

### GET /posts/[post_id]/comments
Returns a list of comment structures, as they occur in the db collection.  
They need to be built into comment threads by the client, using the reply-to and replies fields.  
Returns:
    
    [
        comment1,
        comment2,
        comment3,
        ...
    ]


### POST /posts/[post_id]/comments
Creates a top level comment on a post  
POST data:

    {
        "body": comment content
    }

Returns:

    201 created or appropriate error code/message (e.g. 403 forbidden: you need to login)


### POST /posts/[post_id]/comments/[comment_id]
Creates a comment replying to another comment  
POST data:

    {
        "body": comment content
    }

Returns:

    201 created or appropriate error code/message (e.g. 403 forbidden: you need to login)


### PUT /posts/[post_id]/comments/[comment_id]
Updates a comment you have previously created.  
PUT data:

    {
        "body": comment content
    }

Returns:

    200 ok or appropriate error code/message (e.g. 403 forbidden: not your comment)

### PUT /posts/[post_id]/comments/[comment_id]/vote
Submits a vote, up or down, on a comment.
PUT data:

    {
        "vote": -1 || 0 || 1
    }

Returns 200 ok or 401 authorized if not logged in


### DELETE /posts/[post_id]/comments/[comment_id]
Deletes a comment you have previously created, or created by someone else if the deleter is a mod in the community or is an admin.  
Returns:

    200 ok or appropriate error code/message (e.g. 403 forbidden: not your comment)


### POST /communities/[community_id]/post
Creates a post in the community.  
POST data:

    {
        "title": post title,
        "body": post body (optional),
        "image" || "video": resource url,
    }

### GET /communities/[community_id]
Returns the community structure, as it is stored in the collection

### GET /communities
Returns a list of community names.  
Returns:

    [
        name1,
        name2,
        name3,
        ...
    ]

### GET /communities/top
Returns a list of the top 30 (subject to change) communities. Communities will be ranked by member count, but that may change in future versions.  
Returns:

    [
        name1,
        name2,
        name3,
        ...
    ]

### GET /communities/search?s=name
Returns matches for the provided partial name.  
Returns:

    [
        possibleName1,
        possibleName2,
        ...
    ]

### POST /communities
Creates a new community.  
POST data:

    {
        "name": community name,
        "description": optional community description
    }
Returns 201 created or an error code and message, such as 409 conflict: a community with that name already exists

### PUT /communities/[community_id]
Updates the description for a community.  
PUT data:

    {
        "description": community description
    }
Returns 200 ok or an error code and message, such as 403 forbidden: Only admins and the owner may change this


### PUT /communities/[community_id]/promote/[user_id]
Makes the specified user a moderator of the community


### DELETE /communities/[community_id]
Deletes a community
Returns:

    200 ok or appropriate error code/message (e.g. 403 forbidden: not owner of server)


### GET /communities/[community_id]/feed
Gets the feed for a specific community, returning a list of posts.
Returns:

    [
        post1,
        post2,
        post3,
        ...
    ]


### GET /users/[user_id]
Returns a users data, minus their email, google-id and password, for obvious reasons.  
Returns:

    {
        "id": user id,
        "admin": bool,
        "communities": [community_id1, community_id2, ...]
        "mod-of": [community_id1, community_id2, ...],
        "date": date time created,
    }


### POST /users
Creates a new user, either after they have logged in with google, or with a password and email provided.  
POST data:

    {
        "name": the user's new display name,
        "email": optional email, not needed when google used to create account,
        "password": optional, same as email,
    }

Returns 201 created or appropriate error code/message e.g. 409 conflict: user already exists.

### GET /user
Returns the user info for the currently logged in user.  
Returns:  

    {
        "id": user id,
        "admin": bool,
        "communities": [community_id1, community_id2, ...]
        "mod-of": [community_id1, community_id2, ...],
    }

Returns 401 unauthorized if the user is not logged in.  


### GET /users/search?s=name
Returns names of potential users from provided partial name.  
Returns:

    [
        possibleName1,
        possibleName2,
        ...
    ]

