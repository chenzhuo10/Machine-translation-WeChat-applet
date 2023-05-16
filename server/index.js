//index.js 文件 入口文件
const express = require('express');
var { translate } = require('./translate');
var scanImageInfo = require('./image');

var app = express();


var bodyParser = require('body-parser');
// 解析 application/x-www-form-urlencoded 格式的请求正文
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({
  limit: '50mb' //nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb,改为10M
}));
app.use(bodyParser.urlencoded({
  limit: '50mb', //nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb,改为10M
  extended: true
}));

app.use(express.json({ limit: '100mb' })); // 解析JSON请求体
app.use(express.urlencoded({ extended: true })); // 解析URL编码的表单数据



app.get('/text', async (req, res) => {
  const { q, from = 'auto', to = 'auto'} = req.query;
  console.log(q);

  try {
    const result = await translate(q, from, to);
    console.log(result);
    res.json(result);
  }catch(error){
    res.status(500).send(error);
  }
});


app.post("/image", async (req, res) => {
  console.log(req.body);
  
  const {imageData} = req.body; // 获取请求体中的图片数据
  // console.log(imageData);
  try {
    // const result = await scanImageInfo(req.file.path);
    const result = await scanImageInfo(imageData);
    // console.log(result);
    if(!result) {
      throw new Error("Failed to retrieve image information.");
    }
    res.json(result);
  } catch(error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

 
app.listen(8081, function () {
  console.log("应用实例，访问地址为 http://localhost:8081");
});