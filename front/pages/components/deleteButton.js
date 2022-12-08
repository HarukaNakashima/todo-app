import React from "react"
import axios from "axios"
import { useRouter } from "next/router";

const baseURL = `http://localhost:4000/tasks`;

//taskの削除
export default function DeleteButton() {
    //routerの取得
    const router = useRouter();

    const onClickDelete = () => {
        axios.delete(`${baseURL}/${router.query.id}`).then((response) => {
            console.log(`${response.data}を　DELETE しました！`);
        });
    }
    return (
        <div>
          <button onClick={onClickDelete }>削除</button>
        </div>
    );
}