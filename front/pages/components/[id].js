import Link from "next/link";
import { useRouter } from "next/router";
import React from "react"
import axios from "axios"
import CompleteButton from "./completebutton";
import DeleteButton from "./deletebutton";

const baseURL = `http://localhost:4000/tasks`;
//何かしらの定義が必要

export default function SingleTask() {
    //routerの取得
    const router = useRouter();
    //useStateの宣言
    //tasks:状態変数、setTasks:状態変数を健康するための関数、React.useState(状態変数の初期値)
    const [task, setTask] = React.useState([]);
    console.log("task : ", task);//[]

    //APIからの情報取得
    React.useEffect(() => {
       
        axios.get(`${baseURL}/${router.query.id}`).then((response) => {
            setTask(response.data);
            console.log("response.data", response.data);//[{...}, {...}]の形でAPI情報が入ってきている
        });
}, []);

    if(!task) return null;
    //TODO:{task.completed}のboolean型をどのように表示させるかを考え実装する。
    return (
        <div>
          <h1>task 詳細画面</h1>
            <div className="single-task">
              <p>{task.id}</p>
              <p>categoryId :{task.categoryId}</p>
              <p>タイトル :{task.title}</p>
              <p>詳細内容 :{task.detail}</p>
              <p>完了・未完了 :{task.completed}</p>
              <CompleteButton />
              <DeleteButton />
            </div>
            <Link href={"../"}><a>Topに戻る</a></Link>
        </div>
    );
}