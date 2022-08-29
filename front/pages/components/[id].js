import Link from "next/link";
import { useRouter } from "next/router";
import React,{useState, useEffect} from "react"
import axios from "axios"
import CompleteButton from "./completebutton";
import DeleteButton from "./deletebutton";

const baseURL = `http://localhost:4000/tasks`;

export default function SingleTask() {
    //routerの取得
    const router = useRouter();
    //useStateの宣言
    const [task, setTask] = useState([]);

    //APIからの情報取得
    useEffect(() => {
        axios.get(`${baseURL}/${router.query.id}`).then((response) => {
            setTask(response.data);
            console.log("GET しました！");
        });
    }, []);
    console.log("task.completed",task.completed);

    if(!task) return null;

    return (
        <div>
          <h1>task 詳細画面</h1>
            <div className="single-task">
              <p>id:{task.id}</p>
              <p>categoryId :{task.categoryId}</p>
              <p>タイトル :{task.title}</p>
              <p>詳細内容 :{task.detail}</p>
              <p>完了・未完了 :{String(task.completed)}</p>
              <CompleteButton />
              <DeleteButton />
            </div>
            <Link href={"../"}><a className="back-home">Topに戻る</a></Link>
        </div>
    );
}