import { useState, useRef } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
const TodoItems = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const [page, setPage] = useState(false);

  const addItem = useRef(null);

  const deleteTodo = (index) => {
    let updatedtask = [...todo];
    updatedtask.splice(index, 1);
    setTodo(updatedtask);
  };
  function handleSubmit(event) {
    setTodo([...todo, { title, description }]);
    event.preventDefault();
    setTitle("");
    setDescription("");
    setPage(true);
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center max-h-fit lg:h-screen lg:w-screen">
          {" "}
          {page ? null : (
            <form
              className="w-1/4 absolute top-10 right-60"
              onSubmit={handleSubmit}>
              <div className="text-white w-[30%]">
                {" "}
                <h3 className="text-2xl">New Task</h3>
                <div className="flex flex-col w-full">
                  <div>Title</div>
                  <input
                    className=" w-full h-8 rounded-md p-2 my-2 text-black"
                    type="text"
                    required
                    ref={addItem}
                    placeholder="Task Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  <div>Summary</div>
                  <input
                    className=" w-full h-8 rounded-md  p-2 my-2 text-black"
                    type="text"
                    placeholder="Task Summary"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className="flex ">
                  <button className="bg-blue-500 p-2 rounded-md" type="submit">
                    Add a Task
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        {todo.length === 0 ? (
          <>
            <div className=" absolute flex  md:flex-col justify-evenly lg:top-10 md:top-80 md:w-full md:z-10 lg:w-1/3 p-2 text-white rounded-md lg:h-3/6 sm:h-1/2 border-2">
              <div className="font-sans text-3xl py-2 "> No data</div>

              <button
                onClick={() => setPage(false)}
                className="bg-blue-500 text-white p-2 w-full md:h-10 sm:max-h-10 sm:w-[30%] rounded-md">
                Add Item
              </button>
            </div>
          </>
        ) : (
          <div className="lg:absolute top-10 left-10 w-1/3 max-h-fit">
            <div className="font-sans text-4xl font-bold text-white">
              My Tasks
            </div>
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
            <button
              onClick={() => setPage(false)}
              className="bg-blue-500 text-white p-2 w-full rounded-md">
              Add Item
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoItems;
