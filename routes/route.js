const router = require("express").Router();

const { signup, getbill, sendTrap } = require("../controller/appController.js");

/** HTTP Request */
router.post("/user/signup", signup);
router.post("/product/getbill", getbill);
router.post("/product/trap", sendTrap);

module.exports = router;
