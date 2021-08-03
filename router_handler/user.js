//引入数据库操作模块
const db = require("../db/index");

//导入bcryptjs这个包用于数据库密码加密
const bcrypt = require("bcryptjs");

//导入生成token的包
const jwt = require("jsonwebtoken");
//导入全局配置文件
const config = require("../config");

//注册新用户的处理函数
exports.regUser = (req, res) => {
  //获取到客户端提交到服务器的用户信息
  const userinfo = req.body;
  //对表单中的数据进行合法性校验
  // if (!userinfo.username || !userinfo.password) {
  //   return res.send({ status: 1, message: "用户名或密码不合法" });
  // }

  //定义sql语句
  const sqlStr = "select *from ev_users where username=?";
  db.query(sqlStr, userinfo.username, (err, result) => {
    //执行sql失败
    if (err) {
      // res.send({ status: 1, message: err.message });
      return res.cc(err);
    }
    //判断用户名是否被占用
    if (result.length > 0) {
      //   return res.send({
      //     status: 1,
      //   message: "用户名被占用，请更换其他用户名！",
      //   });
      return res.cc("用户名被占用，请更换其他用户名！");
    }
    //用户名可以使用
    //对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    //定义插入新用户的sql语句
    const sql = "insert into ev_users set ?";
    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        //判断sql语句是否执行成功
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) {
          //   return res.send({ status: 1, message: "注册失败，请稍后重试！" });
          return res.cc("注册失败，请稍后重试！");
        }
        // return res.send({ status: 0, message: "注册成功!" });
        return res.cc("注册成功!", 0);
      }
    );
  });
};

//登录的处理函数
exports.login = (req, res) => {
  const userinfo = req.body;

  const sql = "select *from ev_users where username=?";
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) {
      return res.cc("登陆失败！");
    }
    //判断密码是否正确
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("登陆失败!");
    }
    //在服务端生成字符串
    const user = { ...results[0], password: "", user_pic: "" };
    //对用户的信息进行加密  生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h",
    });
    //将token响应个客户端
    res.send({
      status: 1,
      message: "登录成功！",
      token: "Bearer " + tokenStr,
    });
  });
};
