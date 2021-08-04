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
      res.cc("新增文章分类成功!", 0);
    });
  });
};

//删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  const sql = "update ev_article_cate set is_delete=1 where id=?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除文章分类失败!");
    res.cc("删除文章分类成功！", 0);
  });
};

//根据id获取文章分类的处理函数
exports.getArtCatesById = (req, res) => {
  const sql = "select * from ev_article_cate where id=?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) res.cc(err);
    if (results.length !== 1) return res.cc("获取文章分类数据失败！");
    res.send({
      status: 0,
      message: "获取文章分类数据成功！",
      data: results[0],
    });
  });
};

//根据Id更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`;
  // 执行查重操作
  db.query(
    sql,
    [req.body.Id, req.body.name, req.body.alias],
    (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err);

      // 判断 分类名称 和 分类别名 是否被占用
      if (results.length === 2)
        return res.cc("分类名称与别名被占用，请更换后重试！");
      if (results.length === 1 && results[0].name === req.body.name)
        return res.cc("分类名称被占用，请更换后重试！");
      if (results.length === 1 && results[0].alias === req.body.alias)
        return res.cc("分类别名被占用，请更换后重试！");
      //定义更新文章分类的sql语句
      const sql = "update ev_article_cate set ? where Id=?";
      db.query(sql, [req.body, req.body.Id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc("更新文章分类失败!");
        res.cc("更新文章分类成功!", 0);
      });
    }
  );
};
