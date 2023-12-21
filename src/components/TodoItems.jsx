import { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
// import button from "./common/button";
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
      <div className="flexjustify-center flex-col items-center w-screen">
        <div className=" max-h-fit flex justify-center lg:w-screen">
          {todo.length === 0 ? (
            <>
              <div className="  flex  md:flex-col justify-evenly  md:w-full md:z-10 lg:w-1/3 p-2 text-white rounded-md lg:h-3/6 sm:h-1/2 border-2">
                <div>My Task</div>
                <div className="font-sans text-3xl py-2 ">
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
                <div className=" max-h-screen  text-white" key={index}>
                  <div className="flex h-fit my-2 bg-slates w-full border-2 rounded-md justify-between py-2">
                    {" "}
                    <div className="flex mx-2 gap-4 flex-col">
                      <div>{item.title}</div>
                      <div className=" text-gray-500">{item.description}</div>
                    </div>
                    <div>
                      <RiDeleteBin5Fill
                        className="mx-2"
                        color="red"
                        opacity={0.6}
                        size={22}
                        onClick={() => deleteTodo(index)}
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
                <button className="bg-blue-500 p-2 rounded-md" type="submit">
                  Add a Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoItems;
