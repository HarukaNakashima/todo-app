import React from "react"
import axios from "axios"
import { useRouter } from "next/router";

const baseURL = "http://localhost:4000/tasks";

//taskListの完了未完了をボタンで更新する関数
export default function CompleteButton () {
    //routerの取得
    const router = useRouter();
    
    //<button>タグに設定するupDateState関数
    const upDateState = () => {
      //APIへPOSTリクエスト(complete: false → complete: ture)
      axios.put(`${baseURL}/${router.query.id}/completed`).then((response) => {
        console.log("response",response);
        console.log(`${response.data.completed}に更新しました！`);
      });
    };

    return (
        <div>
            <button onClick={upDateState}>完了</button>
        </div>
    );
}