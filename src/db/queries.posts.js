const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Authorizer = require("../policies/post")
const Comment = require("./models").Comment;
const User = require("./models").User;
const Vote = require("./models").Vote;
const Favorite = require("./models").Favorite;

module.exports = {

  addPost(newPost, callback){
    return Post.create(newPost)
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  }, //end addPost

  getPost(id, callback){
    return Post.findById(id, {
      include: [
        {model: Comment, as: "comments", include: [
          {model: User }
        ]}, {model: Vote, as: "votes"},
              {model: Favorite, as: "favorites"}
      ]
    })
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  }, //end getPost

  deletePost(id, callback){
    console.log(id);
    return Post.destroy({
      where: {id}
    })
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updatePost(id, updatedPost, callback){
    return Post.findById(id)
     .then((post) => {
       if (!post) {
         return callback("post not found");
       }
       post.update(updatedPost, {
         fields: Object.keys(updatedPost)
       })
       .then(() => {
         callback(null, post);
       })
       .catch((err) => {
         callback(err);
       });
    })
    .catch((err) => {
      callback(err);
    });
  } //end update

}
