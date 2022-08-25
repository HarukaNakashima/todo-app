import Head from "next/head";
import Link from "next/link";
import { useRouter, Route } from "next/router";
import React from "react"
import axios from "axios"

// import ShowState from "./components/showState";

const baseURL = "http://localhost:4000/tasks";

//登録されたtodoリストの表示
export default function TaskList () {
    //useStateの宣言
    //tasks:状態変数、setTasks:状態変数を健康するための関数、React.useState(状態変数の初期値)
    const [tasks, setTasks] = React.useState([]);
    console.log("tasks : ", tasks);//[]配列
    console.log("test1");
    //APIからの情報取得
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTasks(response.data);
            console.log("response.data", response.data);//[{...}, {...}]の形でAPI情報が入ってきている
        });
    //第2引数に値の配列を指定 => マウント時と指定された値に変化があった場合のみに第１引数の関数を実行。
    // todoが追加され、tasksのテーブルに変化　=> 最後リクエストして、リスポンスを表示
    // (保留）第２引数にtasksを入れると、どんどんコンソールにレンダリングされる！（サーバーが大変そう！）
    }, []);
    if(!tasks) return null;

    //todoの中身を一つずつ取り出してそれぞれを別々に表示させる。好きな食べ物の表示方法を参考にする。
    const useTasks = tasks.map((task) => {

        console.log("task.completed", task.completed);
        //データの完了未完了
        const completed = () => {
            if (task.completed === false) {
                return (
                    <p>未完了：がんばれ〜！</p>
                );
            } else if (task.completed === ture) {
                return (
                    <p>完了：やったね〜！</p>
                );
            }
        };
        if(task === undefined) {
            return (
                <p>現在、todoはないよ〜！</p>
            )};
        return (
            <div className="task-list" key={task.id}>
            <p>categoryId :{task.categoryId}</p>
            <Link href={`/components/${task.id}`}>
              <a  >{task.title}</a>
            </Link>
            {completed}
           </div>
        )
    });

    return (<div className='task-container'>{useTasks}</div>);
};
