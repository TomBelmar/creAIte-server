# Project Name
creAIte
<br>

# Quick Compo

<br>

## Description

This is an social media to let your imagination go wild and think outside of the box! Your creativity is inspiring!

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating posts and managing profile.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating posts and managing profile.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the gallery of my images that I have created and post on feed.
-  **Add Post:** As a logged in user I can access the create post page so that I can create a new post.
-  **Edit Profile:** As a logged in user I can edit my profile access.
-  **Add Image:** As a user I can add generated images to the gallery.
-  **View Feed Page:** As a user I can see all the posts created by all users, comment and like.
-  **Generate Image** As a user I can generate image created by AI through my text input.







<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | Login            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | Signup           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | Home             | public `<Route>`           | Home page with info.                                                |
| `/user-profile`              | Profile          | user only `<PrivateRoute>` | Profile/view of the current user.             |
| `/user-profile/edit`         | EditProfile      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/generator`           | GeneratorPage | user only `<PrivateRoute>` | Generate new images based on user input (text).                               |
| `/post/create`               | CreatePost   | user only `<PrivateRoute>` | User can create a post.                                         |
| `/feed` | Feed | user only `<PrivateRoute>` | Display all the posts from all users, allowing to 'like'. |
| `/feed/post/comment` | CommentPage | user only `<PrivateRoute>` | User can comment on someone else post. |





## Components

Pages:

- Login

- Signup

- Home

- Profile

- EditProfile

- GeneratorPage

- CreatePost

- Feed

- CommentPage


  

Components:

- PostCard
- Button
- Navbar
- Private
- Gallery ????
- Like
- Message
- Footer


## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`
    - `.createMessage(id)`
    - `.getUsersDetails(id)`

- **Profile Service**

  - `profileService` :
    - `.addimage(imageData)`
    - `.getimage()`
    - `.getOneImage(id)`
    - `.deleteImage(id)`

  



<br>


# Server / Backend


## Models

**User model**

```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: default,
  gallery: [{type: String}]
  aboutMe: {type: String}
}
```



**Post model**

```javascript
 {
   creator: [ { type: Schema.Types.ObjectId, ref:'User' } ],
   likes: [{type: Schema.Types.ObjectId, ref:'User'}]
   imageURL: {type: String},
   description: {type: String}
   comment: [{ type: Schema.Types.ObjectId, ref:'Comment'}]
 }
```



**Comment model**

```javascript
{
  creator: [ { type: Schema.Types.ObjectId, ref:'User' } ],
  message: { type: String, required: true },

 
}
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/feed    `    | Saved session                | 200            | 404          | Check if user is logged in and return feed page           |
| POST        | `/auth/signup`         | {first name, last name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| POST         | `/api/generator`     |         { user input }                     |          200      | 400          | Save image user gallery.                                         |
| GET         | `/api/post/create/:id` |                              |                |              | Show image and form.                                     |
| POST        | `/api/post/create/:id`     | { user, image, description }       | 201            | 400          | Create and post on feed.                             |
| GET         | `/api/feed` | { user, image, description }       | 200            | 400          | Show all posts                                              |
| PUT ???      | `/api/feed` |      { post id, likes }                        | 201            | 400          | Like/dislike post.                                            |
| GET         | `/api/feed/post/comment`     |    { user, image, description, likes, comments }                          |                |              | show specific post                                         |
| POST        | `/api/feed/post/comment`         | { comment, like}  | 200            | 404          | create comment and like/dislike                                                   |
| GET         | `/api/user-profile/:id`     | { first name, last name, email, description,  gallery }                | 201            | 400          | Show specific user profile                                                  |
| POST      | `/api/user-profile/:id`     |        { post, delete, profile image, description }                      | 200            | 400          | Post image or delete image from gallery                                                |
| GET         | `/api/user-profile/:id/edit`           |    { first name, last name, email, image, description}                          | 201            | 400          | Display form to edit profile                                                   |
| PUT         | `/api/user-profile/:id/edit`       |                              |                |              | Update profile               |
| POST        | `/api/games`           | {player1,player2,winner,img} |                |              | add game                                                     |
| PUT         | `/api/games/:id`       | {winner,score}               |                |              | edit game                                                    |


<br>

## API's
openAI API

<br>

## Packages
<!-- ironlauncher,
axios,
create vite,
react-router-dom, -->
<!-- cloudinary, -->
materialUI,
<!-- bcrypt, -->
styled-components,

bootstrap,


<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides

### Contributors

André Lisboa - [GitHub](https://github.com/andrelisboapt) - [LinkedIn](https://www.linkedin.com/in/andrelisboapt/)

Tomás Belmar - [GitHub](https://github.com/TomBelmar) - [LinkedIn](https://www.linkedin.com/in/tomas-belmar/)