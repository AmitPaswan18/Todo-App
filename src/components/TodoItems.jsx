import { useState, useEffect } from "react";
import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
import Button from "./common/button";
const TodoItems = () => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState([]);
  const [isinputValid, setInputValid] = useState(false);

  function formValidation() {
    if (title.trim() === "") {
      console.log(title.trim());
      setInputValid(false);
      return false;
    }

    setInputValid(true);
    return true;
  }
  const deleteTodo = (index) => {
    let updatedtask = [...todo];
    updatedtask.splice(index, 1);
    setTodo(updatedtask);
    saveTasks([...updatedtask]);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!formValidation()) {
      return;
    }
    setTodo([...todo, { title }]);
    saveTasks([...todo, { title }]);
    setTitle("");
  }


  function loadTasks() {
    let loadedTasks = localStorage.getItem("todo");
    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTodo(tasks);
    }
  }

  function saveTasks(todo) {
    localStorage.setItem("todo", JSON.stringify(todo));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <div className="flexjustify-center mt-9 flex-col items-center w-screen">
        <div className=" max-h-fit flex justify-center lg:w-screen">
          {todo.length === 0 ? (
            <>
              <div className=" flex md:flex-col justify-evenly md:w-full md:z-10 lg:w-1/3 text-white  lg:h-3/6 sm:h-1/2 ">
                <div className="font-sans font-extrabold text-4xl my-2">
                  My Tasks
                </div>
                <div className=" text-md text-slate-500 opacity-40 py-2 ">
                  {" "}
                  You have No Task
                </div>
              </div>
            </>
          ) : (
            <div className=" left-10 w-1/3 max-h-fit">
              <div className="font-sans text-4xl font-bold text-white">
                My Tasks
              </div>
              {isinputValid == true || (
                <div className="text-red-600">
                  Please enter a valid task name
                </div>
              )}
              {todo.map((item, index) => (
                <div className=" max-h-screen text-white" key={index}>
                  <div className="flex h-fit my-4 bg-slates w-full  border-2 rounded-md justify-between py-4 px-1">
                    {" "}
                    <div className="flex mx-2 gap-4 flex-col">
                      <div className="">{item.title}</div>
                    </div>
                    <div className="flex flex-col ">
                      <RiDeleteBin5Fill
                        className="m-1"
                        color="red"
                        opacity={0.6}
                        size={22}
                        onClick={() => deleteTodo(index)}
                      />
                      <RiEditBoxLine
                        className="m-1"
                        color="white"
                        opacity={0.6}
                        size={22}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className=" max-h-fit flex justify-center lg:w-screen ">
          <form className="w-1/3 " name="todoform" onSubmit={handleSubmit}>
            <div className="text-white w-[30%]">
              {" "}
              <div className="flex flex-col w-full">
                <div>Task</div>
                <input
                  className=" w-full h-8 rounded-md p-2 my-2 text-black"
                  type="text"
                  required
                  name="taskname"
                  placeholder="Task..."
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="flex ">
                <Button color="#1864AB"> Add a Task</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoItems;
