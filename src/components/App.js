import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import '../assets/scss/App.scss';

function App() {

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([
    {
      desc: "Andare a scuola",
      done: true,
      editMode: false,
      priority: false
    },
    {
      desc: "Fare i compiti",
      done: false,
      editMode: false,
      priority: true
    },
    {
      desc: "Andare in palestra",
      done: false,
      editMode: false,
      priority: false
    }
  ]);

  const onTodoChange = (e) => {
    setTodo(e.target.value);
  }

  const onAddTodo = (e) => {
    if ((e._reactName === 'onClick') || (e._reactName === 'onKeyPress' && e.key === "Enter")) {
      setTodos([...todos, {
        desc: todo,
        done: false,
        editMode: false,
        priority: false
      }]);
      setTodo('');
    }
  }

  const editTodo = (e, index) => {
    const copyTodos = [...todos];
    copyTodos[index]['desc'] = e.target.value;
    setTodos(copyTodos);
  }

  const changeStatus = (index) => {
    const copyTodos = [...todos];
    copyTodos[index]['done'] = !copyTodos[index]['done'];
    copyTodos[index]['editMode'] = false;
    setTodos(copyTodos);
  }

  const saveTodo = (e, index) => {
    if ((e._reactName === 'onClick') || (e._reactName === 'onKeyPress' && e.key === "Enter")) {
      const copyTodos = [...todos];
      copyTodos[index]['editMode'] = false;
      setTodos(copyTodos);
    }
  }

  const isPriority = (index) => {
    let className = 'priority';
    if (todos[index]['priority']) className += " not";
    return className;
  }

  const changePriority = (index) => {
    const copyTodos = [...todos];
    copyTodos[index]['priority'] = !copyTodos[index]['priority'];
    copyTodos[index]['editMode'] = false;
    setTodos(copyTodos);
  }

  const editToDo = (index) => {
    const copyTodos = [...todos];
    copyTodos[index]['editMode'] = !copyTodos[index]['editMode'];
    setTodos(copyTodos);
  }

  const deleteToDo = (index) => {
    const copyTodos = [...todos];
    copyTodos.splice(index, 1);
    setTodos(copyTodos);
  }

  const colorStatus = (index) => {
    const copyTodos = [...todos];
    if (copyTodos[index]['done']) return "done";
    if (copyTodos[index]['priority']) return "priority";
  }

  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src={logo} alt="Boolean ToDo" />
        </div>
        <div className="input-section">
          <input type="text" placeholder="Scrivi qui.." onKeyPress={onAddTodo} onChange={onTodoChange} value={todo} />
          <button onClick={onAddTodo}>Aggiungi</button>
        </div>
      </header>
      <main>
        <ul>
          {
            todos.map(
              (td, index) =>
                <li key={index} className={colorStatus(index)}>
                  <div className="desc">
                    {
                      (!td.editMode || td.done) && (
                        <p>
                          {td.desc}
                        </p>
                      )
                    }
                    {
                      (td.editMode && !td.done) && (
                        <input type="text" value={td.desc} onChange={(e) => editTodo(e, index)} onKeyPress={(e) => saveTodo(e, index)} />
                      )
                    }
                    {
                      (td.editMode) && (
                        <button className='changeStatus' onClick={(e) => changeStatus(index)}>
                          {
                            (!td.done) && (
                              <i className="fas fa-calendar-check"></i>
                            )
                          }
                          {
                            (td.done) && (
                              <i className="fas fa-calendar-times"></i>
                            )
                          }
                        </button>
                      )
                    }
                    {
                      (td.editMode && !td.done) && (
                        <button className={isPriority(index)} onClick={(e) => changePriority(index)}>
                          <i className="fas fa-exclamation-triangle"></i>
                        </button>
                      )
                    }
                  </div>
                  <div className="controls">
                    <div className="edit" onClick={(e) => editToDo(index)}>
                      <i className="fas fa-edit"></i>
                    </div>
                    <div className="delete" onClick={(e) => deleteToDo(index)}>
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                </li>
            )
          }
          {
            (todos.length <= 0) && ('Non ci sono To Do!')
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
