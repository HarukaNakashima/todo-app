import React from "react"
import axios from "axios"

const baseURL = "http://localhost:4000/tasks/:id/completed";
//taskListの完了未完了をボタンで更新する関数
export default function CompleteButton () {
    
    const [completed, setCompleted] = React.useState(false);
    // console.log("completed : ", completed);
    
    //APIのPOST情報の取得(complete: false → complete: ture)
    
    //<button>タグに設定するupDateState関数
    const upDateState = () => {
      axios.put(baseURL).then((response) => {
        setCompleted(response.data);
      });
      console.log("response.data:", response.data);
    };

    return (
        <div>
            <button onClick={{upDateState}}>完了</button>
        </div>
    );
}