export default function TaskForm () {
    return (
        <div>
            <h2>Todo 新登録画面</h2>
            <form className='task-form'>
        <h4>新規作成</h4>
        <div className='form-control'>
          {/* 後からAPI取得 */}
          <p>
            カテゴリー
              <select name="category">
                <option value="work">work</option>
                <option value="private">private</option>
                <option value="school">school</option>
                <option value="nursery">nursery</option>
              </select>
          </p>
          <input 
            type="text" 
            name="todo" 
            className="task-title" 
            placeholder='タイトル'
          /><br/>
          <textarea name="detail" className='task-detail' placeholder='詳しい内容を入力しておこう'></textarea><br/>
          <button type="submit" className="btn submit-btn">新規登録</button>
          <input type="reset" value="リセット" />
        </div>
      </form>
        </div>
    );
}