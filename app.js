const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_app", {
    useMongoClient: true
});

const BlogSchema = new mongoose.Schema({
    name: String,
    body: String,
    image: String,
    created: {
        type: Date,
        default: Date.now()
    }
})

const Blog = mongoose.model("Blog", BlogSchema);

Blog.create({
    name: "Test Blog",
    image: "https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?auto=format&fit=crop&w=1500&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    body: "Test data"
}, function (err, blog) {
    console.log(blog)
});

app.use(express.static("/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

// HOME
app.get("/", function (req, res) {
    res.redirect("/blogs");
});

// INDEX: Get all blogs
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            res.render("index", {
                blogs
            });
        }
    })
});


app.listen(port, function () {
    console.log("Blog App server has started");
});