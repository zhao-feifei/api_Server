const express = require("express");

const app = express();

const joi = require("@hapi/joi");
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

//导入用户路由模块
const userRouter = require("./router/user");

app.use("/api", userRouter);

// 定义错误级别中间;
app.use(function (err, req, res, next) {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  }
  //未知的错误
  res.cc(err);
});

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
