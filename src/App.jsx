import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {v4 as uuidv4} from 'uuid';

function App() {

  const [todo, setTodo]=useState("")
  const [todos, setTodos]=useState([])
  const [showFinished, setshowFinished]=useState(true)

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      try {
        const loadedTodos = JSON.parse(todoString);
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
        localStorage.removeItem('todos');
      }
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit=(e,id) =>{
    let t=todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
      setTodos(newTodos)
  }

  const handleDelete=(e,id) =>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
      setTodos(newTodos)
  }

  const handleAdd= () =>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    console.log(todos)
  }

  const handleChange=(e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox =(e) => {
    let id=e.target.name;
    console.log(`The id is ${id}`)
    let index=todos.findIndex(item=>{
      return item.id==id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos,todos)
  }
  

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5  bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-xl text-center"> Workify -Manage your todos at one place </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className="w-full"/>
          <button onClick={handleAdd}  disabled={todo.length<=3} className="bg-violet-600 hover:bg-violet-400 disabled:bgvoi p-3 py-1 text-white rounded-md mx-2 text-sm font-bold">
            Add
          </button>
          </div>

        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> show Finished
        <div className="h-[1px] bg-black opacity-15 w-5/6 mx-auto my-2"></div>
          <h2 className='text-lg font-bold my-3'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div>No Todos to display</div>}
            {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between">
              <div className="flex gap-9">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className="my-3">
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              </div>
              <div className="buttons my-3">
                <button  onClick={(e)=>handleEdit(e,item.id)} className="bg-violet-600 hover:bg-violet-400 p-3 py-1 text-white rounded-md mx-2 text-sm font-bold"><FaEdit /></button>
                <button  onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-600 hover:bg-violet-400 p-3 py-1 text-white rounded-md mx-2 text-sm font-bold"><MdDelete /></button>
              </div>
            
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
