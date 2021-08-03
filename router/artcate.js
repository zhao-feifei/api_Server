//这是文章分类的路由模块

const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");

//导入文章的路由处理函数模块
const artcate_handler = require("../router_handler/artcate");
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require("../schema/artcate");
//获取文章分类列表数据的路由
router.get("/cates", artcate_handler.getArticleCates);

//新增文章分类的路由
router.post(
  "/addcates",
  expressJoi(add_cate_schema),
  artcate_handler.addArticleCates
);

//删除文章分类的路由
router.get(
  "/deletecate/:id",
  expressJoi(delete_cate_schema),
  artcate_handler.deleteCateById
);

//根据Id获取文章分类的路由
router.get(
  "/cates/:id",
  expressJoi(get_cate_schema),
  artcate_handler.getArtCatesById
);

//根据Id获取文章分类数据
router.post(
  "/updatecate",
  expressJoi(update_cate_schema),
  artcate_handler.updateCateById
);

module.exports = router;
