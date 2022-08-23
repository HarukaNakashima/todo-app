var express = require('express');
var router = express.Router();
// import { PrismaClient } from '@prisma/client'
var { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//loggerのインポート
const logger = require('../utils/logger');


/* GET */
//tasks....全テーブル情報の取得
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    console.log(tasks);
    res.status(200).send(tasks);
    logger.info('GET tasks'); //インフォログ表示確認済み
  } catch (e) {
    res.status(500).send(e);//500:サーバー起因エラー
    logger.error('GET tasks');
  }
});

//singleTask....1つのタスクの情報取得
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const singleTask = await prisma.task.findUnique({
        where: {id: Number(id)},
      });
      if(!singleTask) {
        return res.status(404).send(`id:${singleTask.id} is not exit!`);
      }
      console.log(singleTask);
      res.status(200).send(singleTask);
      logger.info(`GET singleTask id:${singleTask.id}`);//インフォログ表示確認済み
  } catch (e) {
    res.status(500).send(e);//500:サーバー起因エラー
    logger.error('GET singleTask ');
    // logger.error(`GET task id:${result.id}`);
  }
});
  
/* POST */
//createTask...新しいtaskの作成             
router.post(`/`, async (req, res) => {
  const { categoryId, title, detail} = req.body;
  try {
    const createTask = await prisma.task.create({
      data: {
        categoryId,
        title,
        detail
      }
    })
    res.status(200).send(createTask);
    logger.info(`POST task id:${createTask.id}`);//インフォログ確認済み
  } catch (e) {
    res.status(400).send(e);//400=Badrepuest ここのエラーの設定は500?400?
    logger.error('POST task ');//エラーログ表示確認済み
  }
});              

/* PUT */
//completedTask...完了未完了の変更
router.put("/:id/completed", async (req, res) => {
  const { id } = req.params;
  try {
    const completedTask = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {completed: true},//未完了のfalseから完了のtrueへ
    });
    res.status(200).send(completedTask);
    logger.info(`PUT task id:${completedTask.id} is completed!`);//成功表示確認済み
  } catch (e) {
    res.status(400).send(e);//400=Badrepuest ここのエラーの設定は500?400?
    logger.error('PUT task ');
  }
});


/* DELETE */
//deleteTask....taskの削除
router.delete(`/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const deleteTask = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    })
    if(!deleteTask) {
      return res.status(404).send(`id:${deleteTask.id} is not exit!`);
    }
    res.status(200).send(deleteTask);
    logger.info(`DELETE task id:${deleteTask.id} have been deleted.`);//成功表示確認済み
  } catch (e) {
    res.status(400).send(e);//400=Badrepuest ここのエラーの設定は500?400?
    logger.error('DELETE task');
  }

});

module.exports = router;
