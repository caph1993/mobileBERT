//@ts-check
const { Router, static } = require("express");
const mainRouter = require("./main");

const router = Router();

router.use('/static', static('static'));
router.use(mainRouter);

module.exports = router;
