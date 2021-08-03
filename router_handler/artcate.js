const db = require("../db/index");

//获取文章分类数据的处理函数
exports.getArticleCates = (req, res) => {
  const sql = "select * from ev_article_cate where is_delete=0 order by id asc";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "获取文章分类成功!",
      data: results,
    });
  });
};

//新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  const sql = "select * from ev_article_cate where name=? or alias=?";
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2)
      return res.cc("分类名称与别名被占用，请更换后重试！");
    // 分别判断 分类名称 和 分类别名 是否被占用
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc("分类名称被占用，请更换后重试！");
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc("分类别名被占用，请更换后重试！");

    // TODO：新增文章分类
    const sql = "insert into ev_article_cate set ?";
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("新增文章分类失败!");
      res.cc("新增文章分类成功!");
    });
  });
};
