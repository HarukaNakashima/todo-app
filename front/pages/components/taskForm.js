import Link from "next/link";
import React, {useState} from "react"
import axios from "axios"

const baseURL = "http://localhost:4000/tasks";

//taskの新規登録をする関数
// //TODO:postの入力はどのように実装すべきか考えて実装する。
export default function Taskform() {
  /* ↓state変数を定義 */
  const [categoryId, setCategoryId] = useState("");
  const [addCategoryId, setAddCategoryId] = useState(""); 
  const [title, setTitle] = useState("");
  const [addTitle, setAddTitle] = useState("");  
  const [detail, setDetail] = useState("");
  const [addDetail, setAddDetaile] = useState("");  
  
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
      categoryId: Number(categoryId),//数値型に変換することでPOST成功！
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
      <div className="Taskform">
      <div>
        <h2>Todo 新登録画面</h2>
        <p> カテゴリー           
        <select value={categoryId} 
                onChange={(e) => setCategoryId(e.target.value)}>
        <option >1</option>                     
        <option >2</option>
        <option >3</option>
        <option >4</option>                     
        </select>
        </p>
        <p>1:work, 2:private, 3:school, 4:nursery</p>
        {/* ↓value属性にstate変数「text」を指定 */}
        <input value={title} 
               placeholder='タイトル'
               onChange={(e) => setTitle(e.target.value)}
        /><br/>
        <textarea value={detail} 
                  placeholder='詳しい内容を入力しておこう'
                  onChange={(e) => setDetail(e.target.value)}
        ></textarea>
        {/* ↓buttonを追加 */}
        <button onClick={onClickAddTask}>todoリストに追加</button>
      </div>
      <div className="showTask">
        <h3>登録されたtodoの確認画面</h3>
        {/* ↓pタグを追加 state変数「addText」を表示する */}
        <p>カテゴリー：{addCategoryId}</p>
        <p>タイトル：{addTitle}</p>
        <p>詳細内容：{addDetail}</p>
        <button onClick={onClickReset}>確認画面のリセット</button>
      </div>
      <Link href={"../"}><a>Topに戻る</a></Link>
    </div>
  
  );
}