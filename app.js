const express = require("express");

const app = express();

const joi = require("@hapi/joi");
const jwt = require("express-jwt");
// 导入并配置cors中间件
const cors = require("cors");
app.use(cors());

// 配置解析表单数据的中间件，只能解析application/x-www-form-urlencoded格式的中间件
app.use(express.urlencoded({ extended: false }));

//封装失败处理函数，注意要在路由之前
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

//配置解析token的中间件   要在路由之前
const expressJWT = require("express-jwt");
const config = require("./config");
//path:[/^\/api/是指api开头的不需要进行身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] })
);

//导入用户路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);

//导入并使用用户信息的路由模块
const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);

//导入并使用文章分类的路由模块
const artCateRouter = require("./router/artcate");
app.use("/my/article", artCateRouter);

// 定义错误级别中间;
app.use(function (err, req, res, next) {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  //身份认证失败后的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败!");
  //未知的错误
  res.cc(err);
});

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
