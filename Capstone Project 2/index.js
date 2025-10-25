import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var post = [];

var id;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    updatedPost: post,
  });
});

app.post("/submit", (req, res) => {
  const { title, content } = req.body;

  post.push({
    postTitle: title,
    postContent: content,
  });

  res.render("index.ejs", {
    updatedPost: post,
  });
});

app.post("/delete", (req, res) => {
  const { id } = req.body;

  post = post.filter((posts, postsIndex) => postsIndex !== parseInt(id));

  res.render("index.ejs", {
    updatedPost: post,
  });
});

app.post("/edit", (req, res) => {
  id = req.body.id;

  var editPostTitle = post[id].postTitle;
  var editPostContent = post[id].postContent;

  res.render("edit.ejs", {
    editTitle: editPostTitle,
    editContent: editPostContent,
  });
});

app.post("/submitedit", (req, res) => {
  const { editedTitle, editedContent } = req.body;

  post[id].postTitle = editedTitle;
  post[id].postContent = editedContent;

  res.render("index.ejs", {
    updatedPost: post,
  });
  
  console.log(editedTitle);
  console.log(editedContent);
  console.log(id);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
