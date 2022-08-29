import Link from "next/link";
import React, {useState, useEffect} from "react"
import axios from "axios"
import "/styles/Home.module.css"

const baseURL = "http://localhost:4000/tasks";
const categoryURL = `http://localhost:4000/categories`;

//taskの新規登録をする関数
// //TODO:postの入力はどのように実装すべきか考えて実装する。
export default function Taskform() {
  /* ↓state変数を定義 */
  const [categoryId, setCategoryId] = useState("");
  const [categories,setCategories] = useState([]);
  const [addCategoryId, setAddCategoryId] = useState(""); 
  const [title, setTitle] = useState("");
  const [addTitle, setAddTitle] = useState("");  
  const [detail, setDetail] = useState("");
  const [addDetail, setAddDetaile] = useState("");  
  
  useEffect(() => {
      axios.get(categoryURL).then((response) => {
        console.log(`${response.data}をGETしました！`);
        setCategories(response.data);
      });
  },[]);

  const useCategories = categories.map((category) => {
    return (
        <div className="category-list" key={category.id}>
        <p>{category.id}:{category.name}</p>
        </div>
    );
  });
  /* ↓関数onClickAddTextを定義 */
  const onClickAddTask = () => {
    console.log("onClickAddTask関数の実行");
    //state変数「add~」が「inputに入力した値」に更新される
    setAddCategoryId(categoryId);
    setAddTitle(title);
    setAddDetaile(detail);
    //inputの中身を空にする
    setCategoryId("");
    setTitle("");
    setDetail("");
    //POST
    createTask();
  }

  const createTask = () => {
    console.log("createTask関数の実行");
    console.log("categoryId", categoryId);
    console.log("title", title);
    console.log("addDetail", detail);
    const data = {
      categoryId: Number(categoryId),
      title: title,
      detail: detail
    }
    console.log(typeof Number(categoryId));
    axios.post((baseURL), data)
         .then((response) => {
            console.log("axiosのPOST実行しました！");
            console.log("data", data);
            console.log("response.data",response.data);
         }).catch(err => console.log(err));
  };
  
  const onClickReset = () => {
    console.log("onClickReset関数の実行");
    setAddCategoryId("");
    setAddTitle("");
    setAddDetaile("");
  }
  
  return (
      <div className="task-form">
        <h1>Todo 新登録画面</h1>
        <div className="task-input">
          <h3 className="h3">入力フォーム</h3>
          <p> カテゴリー           
            <select value={categoryId} 
                    onChange={(e) => setCategoryId(e.target.value)}>
              <option >1</option>                     
              <option >2</option>
              <option >3</option>
              <option >4</option>                     
            </select>
          </p>
          <div className="category-container">{useCategories}</div>
          <input value={title} 
                 placeholder='タイトル'
                 onChange={(e) => setTitle(e.target.value)}
          /><br/>
          <textarea value={detail} 
                  placeholder='詳しい内容を入力しておこう'
                  onChange={(e) => setDetail(e.target.value)}
          ></textarea><br/>
          <button onClick={onClickAddTask}>todoリストに追加</button>
        </div>
        <div className="show-new-task">
          <h3 className="h3">登録されたtodoの確認画面</h3>
          <p>カテゴリー：{addCategoryId}</p>
          <p>タイトル：{addTitle}</p>
          <p>詳細内容：{addDetail}</p>
          <button onClick={onClickReset}>確認画面のリセット</button>
        </div>
        <Link href={"../"}><a className="back-home">Topに戻る</a></Link>
      </div>
  
  );
}