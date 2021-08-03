const joi = require("../node_modules/joi");

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();
const id = joi.number().integer().min(1).required();

//添加分类的验证规则对象
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};
//删除分类的校验规则
exports.delete_cate_schema = {
  params: {
    id,
  },
};

//根据id获取分类的验证规则对象
exports.get_cate_schema = {
  params: {
    id,
  },
};

//根据Id更新文章分类的验证规则对象
exports.update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  },
};
