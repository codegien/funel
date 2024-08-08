const router = require("express").Router();

const { blogSchema } = require("../model/blog_schemer.js");
const {
	signup,
	getbill,
	sendTrap,
	getBlogs,
	createBlog,
} = require("../controller/appController.js");

/** HTTP Request */
router.post("/user/signup", signup);
router.post("/product/getbill", getbill);
router.post("/product/trap", sendTrap);
router.post("/blog/post", createBlog);
router.get("/blog/get", getBlogs);

module.exports = router;
