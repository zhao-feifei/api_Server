//导入数据库模块
const db = require("../db/index");
//导入

//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  //定义查询语句
  const sql =
    "select id,username,nickname,email,user_pic from ev_users where id=?";
  //执行sql语句
  db.query(sql, req.user.id, (err, results) => {
    //执行sql失败
    if (err) return res.cc(err);
    //执行sql成功但是查询结果为空
    if (results.length !== 1) return res.cc(req.user.id, "获取用户信息失败！");
    //获取用户信息成功
    res.send({
      status: 0,
      message: "获取用户信息成功！",
      data: results[0],
    });
  });
};

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  //定义sql语句
  const sql = "update ev_users set?where id=? ";
  //执行sql语句并传递参数
  db.query(sql, [req.body, req.body.id], (err, results) => {
    //执行sql语句失败
    if (err) return res.cc(err);
    //执行sql成功但是更新失败  注意区分results.length 和 results.affectedRows
    if (results.affectedRows !== 1) return res.cc("更新用户信息失败！");
    //更新成功
    res.cc("更新成功!", 0);
  });
};

//重置密码的处理函数
exports.updatePassword = (req, res) => {
  const sql = "select * from ev_users where id=?";
  db.query(sql, req.user.id, (err, results) => {
    //执行sql失败
    if (err) return res.cc(err);
    //执行成功但更新失败
    if (results.length !== 1) return res.cc("用户不存在！");
    //判断用户输入的旧密码是否正确
    const bcrypt = require("bcryptjs");
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) return res.cc("原密码错误！");

    // //对新密码进行加密后写入数据库
    const sql = "update ev_users set password=? where id=?";
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("更新密码失败！");
      res.cc("更新密码成功!", 0);
    });

    // res.cc("ok");
  });
};

//更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = "update ev_users set user_pic=? where id=? ";
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新头像失败!");
    return res.cc("更新头像成功！", 0);
  });
};
