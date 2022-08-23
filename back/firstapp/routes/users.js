var express = require('express');
var router = express.Router();

// import { PrismaClient } from '@prisma/client';//エラーになるのでrequireを採用
var {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//loggerのインポート
const logger = require('../utils/logger');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    // 取得できるAPI
    //{id: 1, name: haurka};
    res.status(200).send(users);
    logger.info('GET users'); 
  } catch (e) {
    res.status(500).send(e);//500:サーバー起因エラー
    logger.error('GET users');
  }
});


  module.exports = router;

