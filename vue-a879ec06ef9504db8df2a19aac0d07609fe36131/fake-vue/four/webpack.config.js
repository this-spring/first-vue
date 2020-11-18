/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-17 14:19:02
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-17 15:28:56
 */
const path = require('path');

module.exports = {

  entry: "./main.js", // string | object | array  // 这里应用程序开始执行
  // webpack 开始打包

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: "seed.js", // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    library: "Seed", // string,
    // 导出库(exported library)的名称

    libraryTarget: "umd", // 通用模块定义    // 导出库(exported library)的类型

    /* 高级输出配置（点击显示） */  },
  }