import Head from "next/head";
import Link from "next/link";
import { useRouter, Route } from "next/router";
import React from "react"
import axios from "axios"

const baseURL = ""
//taskの新規登録をする関数

export default function TaskForm () {
    return (
        <div>
          <h2>Todo 新登録画面</h2>
            <form className='task-form'>
              <h4>新規作成</h4>
                <div className='form-control'>
                  {/* 後からAPI取得 */}
                  <p>
                    カテゴリー
                    <select name="category">
                      <option value="work">work</option>
                      <option value="private">private</option>
                      <option value="school">school</option>
                      <option value="nursery">nursery</option>
                    </select>
                  </p>
                  <input 
                    type="text" 
                    name="todo" 
                    className="task-title" 
                    placeholder='タイトル'
                  /><br/>
                  <textarea name="detail" className='task-detail' placeholder='詳しい内容を入力しておこう'></textarea><br/>
                  <button type="submit" className="btn submit-btn">新規登録</button>
                  <input type="reset" value="リセット" /><br/>
                </div>
            </form>
                <Link href={"../"}><a>Topに戻る</a></Link>
        </div>
    );
}