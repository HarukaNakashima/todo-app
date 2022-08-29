import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import axios from "axios"

const baseURL = "http://localhost:4000/tasks";

//登録されたtodoリストの表示
export default function TaskList () {
    //routerの取得
    const router = useRouter();
    //useStateの宣言
    const [tasks, setTasks] = useState([]);
    //APIからの情報取得
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTasks(response.data);
        });

    }, []);
    if(!tasks) return null;
    
    //todoの中身を一つずつ取り出してそれぞれを別々に表示させる。
    const useTasks = tasks.map((task) => {
        console.log("task.completed: ", (task.completed).toString());
        if(task === undefined) {
            return (
                <p>現在、todoはないよ〜！</p>
            )};

        return (
            <div className="task-list" key={task.id}>
              <p>categoryId :{task.categoryId}</p>
              <p>完了・未完了 :{(task.completed).toString()}</p>
              <Link as={`/components/${task.id}`}
                    href={{
                    pathname: `/components/[id]`,
                    query:task.id
                    }}>
                    <a>{task.title}</a>
              </Link>
            </div>
        )
    });

    return (<div className='task-container'>{useTasks}</div>);
};
