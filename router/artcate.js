//这是文章分类的路由模块

const express = require("express");
const expressJoi = require("@escook/express-joi");
const router = express.Router();
const artcate_handler = require("../router_handler/artcate");
const { add_cate_schema } = require("../schema/artcate");
//获取文章分类列表数据的路由
router.get("/cates", artcate_handler.getArticleCates);

//新增文章分类的路由
router.post(
  "/addcates",
  expressJoi(add_cate_schema),
  artcate_handler.addArticleCates
);
module.exports = router;
