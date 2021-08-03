const path = require("path");
const db = require("../db/index");
//发布新文章的处理函数
exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname != "cover_img")
    return res.cc("文章封面是必选参数!");

  //处理文章的信息对象
  const articleInfo = {
    //标题，内容，发布状态，所属分类的id
    ...req.body,
    //文章封面的存放路径
    cover_img: path.join("/uploads", req.file.filename),
    //文章的发布时间
    pub_date: new Date(),
    //文章作者的ID
    author_id: req.user.id,
  };
  const sql = `insert into ev_articles set ?`;

  // 执行 SQL 语句
  db.query(sql, articleInfo, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc("发布文章失败！");

    // 发布文章成功
    res.cc("发布文章成功", 0);
  });
};
