import React from "react"
import axios from "axios"

const baseURL = "http://localhost:4000/tasks/:id";
//taskListの完了未完了をボタンで更新する関数
export default function CompleteButton () {

    const [completed, setCompleted] = React.useState(false);
    console.log("completed : ", completed);//
    


    return (
        <div>
            <button>完了</button>
        </div>
    );
}