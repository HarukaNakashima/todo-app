import Link from "next/link";
import React from "react"
import axios from "axios"
import CompleteButton from "./completebutton";

const baseURL = `http://localhost:4000/tasks`;
//何かしらの定義が必要
const id = {id: [id]};

export default function SingleTask() {
    //useStateの宣言
    //tasks:状態変数、setTasks:状態変数を健康するための関数、React.useState(状態変数の初期値)
    const [task, setTask] = React.useState([]);
    console.log("task : ", task);//[]
    console.log("test1");
    //APIからの情報取得
    React.useEffect(() => {
        console.log("test2");
        axios.get(`${baseURL}/${id}`).then((response) => {
            setTask(response.data);
            console.log("response.data", response.data);//[{...}, {...}]の形でAPI情報が入ってきている
            console.log("test3");
        });
    //第2引数に値の配列を指定 => マウント時と指定された値に変化があった場合のみに第１引数の関数を実行。
    // todoが追加され、tasksのテーブルに変化　=> 最後リクエストして、リスポンスを表示
    // (保留）第２引数にtasksを入れると、どんどんコンソールにレンダリングされる！（サーバーが大変そう！）
}, []);
// const showTask = () => {//taskに何も入っていないので関数使用を一旦諦める。
//     console.log("test3");
//     console.log("引数task : ", task);
//     return (
//         <div className="single-task">
//         <p>categoryId :{task.categoryId}</p>
//         <p>タイトル :{task.title}</p>
//         <p>詳細内容 :{task.detail}</p>
//         <p>完了・未完了 :{task.completed}</p>
//         <CompleteButton />
//        </div>
//     )
// };
    if(!task) return null;

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
            </div>
            <Link href={"../"}><a>Topに戻る</a></Link>
        </div>
    );
}