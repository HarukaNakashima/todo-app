var express = require('express');
var router = express.Router();
// import { PrismaClient } from '@prisma/client' //エラーが出るためrequireで取り込んだ
var { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//loggerのインポート
const logger = require('../utils/logger');
/* GET categories listing. */

//categories...Categoryテーブルの情報全ての取得
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    console.log(categories);
    res.status(200).send(categories);
    logger.info('GET categories');
  } catch (e) {
    res.status(500).send(e);//500:サーバー起因エラー
    logger.error('GET categories');
  }
});

//singleCategory....指定したいidの中身だけ取得
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const singleCategory = await prisma.category.findUnique({
      where: {id: Number(id)},
    });
    if(!singleCategory) {
      return res.status(404).send(`id:${singleCategory.id} is not exit!`);
    }
    console.log(singleCategory);
    res.status(200).send(singleCategory);
    logger.info(`GET singleCategory id:${singleCategory.id}`);//インフォログ表示確認済み
  } catch (e) {
    res.status(500).send(e);//500:サーバー起因エラー
    logger.error('GET singleCategory');
  }
});

module.exports = router;
