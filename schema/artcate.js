const joi = require("../node_modules/joi");

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

//添加分类的验证规则对象
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};
