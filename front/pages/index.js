import Head from "next/head";
import Link from "next/link";
import "../styles/Home.module.css"
import TaskList from "./components/taskList"

const App = () => {

  return (
    <>
    <Head>
       <title>my todo app</title>
    </Head>
    
    <main>
      <h1>My Todo Topページ</h1>
      <Link href="/components/taskForm">
        <a className="add-new-task" >新規登録</a>
      </Link>
      <TaskList />
    </main>
    </>
  );
};

export default App;