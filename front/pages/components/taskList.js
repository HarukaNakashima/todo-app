//APIから情報を取得
import Head from "next/head";
import Link from "next/link";
import { useRouter, Route } from "next/router";
import React from "react"
import axios from "axios"

const baseURL = "http://localhost:4000/tasks";


//登録されたtodoリストの表示
export default function TaskList () {
    const [task, setTask] = React.useState(null);
    console.log("task : ", task);
    console.log("test1");

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTask(response.data);
        });
    }, []);
    console.log("test2");

    if(!task) return null;//ここでnull指定しているから１行目のpタグも反応しない
    console.log("test3");
    return (
        <div>
              <p>task listの表示</p>
              <p>{task}</p>
          </div>
      );
    };
    //getServerSideProps関数を利用してサーバサイドからDBにアクセスを行う
    // export async function getServerSideProps() {
    //     const response = await fetch('http://localhost:4000/tasks')
    //     const taskList = await response.json()
      
    //     return { props: { taskList } }
    //   }