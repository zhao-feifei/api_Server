const express = require("express");
const router = express.Router();
//导入用户处理函数模块
const userHandler = require("../router_handler/user");

//导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
//导入需要的验证规则对象
const { reg_login_schema } = require("../schema/user");

//注册新用户
router.post("/reguser", userHandler.regUser);
// expressJoi(reg_login_schema)
//上面这个验证规则有BUG，废弃掉了
//登录
router.post("/login", userHandler.login);

module.exports = router;
