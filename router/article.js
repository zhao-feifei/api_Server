//导入解析formdata格式表单数据的包
const multer = require("multer");
//导入处理路径的核心模块
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "../uploads") });
const article_handler = require("../router_handler/article");
const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const { add_article_schema } = require("../schema/article");
//发布新文章
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post(
  "/add",
  upload.single("cover_img"),
  expressJoi(add_article_schema),
  article_handler.addArticle
);

module.exports = router;
