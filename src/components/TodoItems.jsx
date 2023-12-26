import { useState, useEffect, useRef } from "react";
import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
import Checkboxbutton from "./common/Checkboxbutton";
import ToogleBar from "./common/ToogleBar";
import {} from "react-icons/ri";
import Button from "./common/button";
import RadioButton from "./common/RadioButton";
import InputButton from "./common/InputButton";
const TodoItems = () => {
  const [title, setTitle] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [todo, setTodo] = useState([]);
  const [isinputValid, setInputValid] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [filter, setFilter] = useState("all");
  const editRef = useRef(null);
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredTodo = () => {
    switch (filter) {
      case "complete":
        return todo.filter((item, index) => checkedItems[index] === true);
      case "incomplete":
        return todo.filter((item, index) => checkedItems[index] !== true);
      default:
        return todo;
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      return {
        ...prevCheckedItems,
        [id]: !prevCheckedItems[id],
      };
    });
  };

  function formValidation(input) {
    if (input.trim() === "") {
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
    const isValidTitle = formValidation(title);

    if (!isValidTitle) {
      return;
    }
    if (editIndex !== null) {
      handleEditSubmit(event);
    } else {
      setTodo([...todo, { title }]);
      saveTasks([...todo, { title }]);
      setTitle("");
    }
  }
  const editTodo = (index) => {
    setEditIndex(index);
    setTitleEdit(todo[index].title);
    console.log("Editing todo at index:", index);
  };
  const cancelEdit = () => {
    setEditIndex(null);
    setTitle("");
  };
  const handleEditSubmit = (event) => {
    event.preventDefault();

    const isValidTitle = formValidation(titleEdit);
    if (!isValidTitle) {
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...todo];
      updatedTasks[editIndex].title = titleEdit;
      setEditIndex(null);
      setTodo(updatedTasks);
      saveTasks(updatedTasks);
      setTitleEdit("");
    }
  };
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

  const containerRef = useRef(null);

  const handleBlur = (event) => {
    if (editIndex !== null) {
      handleEditSubmit(event);
    }
  };

  useEffect(() => {
    loadTasks();
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (editIndex !== null) {
          handleEditSubmit(event);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (editIndex !== null) {
          handleEditSubmit(event);
        }
        cancelEdit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, editIndex]);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <div
          id="scrollbar"
          className="flex justify-center  lg:w-1/2 w-10/12  mt-9 flex-col items-center mx-auto border-2 rounded-md p-2 bg-gray-700">
          <div className=" max-h-96 overflow-y-auto w-11/12 flex justify-center lg:w-10/12  ">
            {todo.length === 0 ? (
              <>
                <div className=" flex flex-col md:flex-col justify-evenly md:w-full md:z-10 lg:w-1/3 text-white lg:ml-10  lg:h-3/6 sm:h-1/2 ">
                  <div className="font-sans lg:font-extrabold  lg:text-3xl text-sm font-bold my-2">
                    My Tasks
                  </div>

                  <div className=" text-md text-slate-500 opacity-40 py-2 ">
                    {" "}
                    You have No Task
                  </div>
                </div>
              </>
            ) : (
              <div className=" left-10 lg:w-10/12 w-full max-h-fit">
                <div className="font-sans text-4xl font-bold text-white">
                  My Tasks
                </div>
                <div className="flex justify-center text-white mt-4 gap-2 text-lg">
                  <RadioButton
                    label="All"
                    value="all"
                    checked={filter === "all"}
                    onChange={() => handleFilterChange("all")}
                  />

                  <RadioButton
                    label="Complete"
                    value="complete"
                    checked={filter === "complete"}
                    onChange={() => handleFilterChange("complete")}
                  />

                  <label htmlFor="incomplete">
                    <RadioButton
                      label="Incomplete"
                      value="incomplete"
                      checked={filter === "incomplete"}
                      onChange={() => handleFilterChange("incomplete")}
                    />{" "}
                  </label>
                </div>
                {isinputValid === false && (
                  <div className="text-red-600">
                    Please enter a valid task name
                  </div>
                )}
                {filteredTodo().map((item, index) => (
                  <div className=" max-h-screen text-white" key={index}>
                    <div>
                      <div className="flex lg:mx-2 lg:gap-2 gap-0 flex-col">
                        <div
                          ref={editIndex === index ? editRef : null}
                          className="flex max-h-fit max-w-fit my-2 bg-slates w-full  border-2 border-gray-500 rounded-md justify-between py-1 px-1">
                          {editIndex === index ? (
                            <>
                              <div className="flex flex-col">
                                <InputButton
                                  className="w-full h-8 rounded-md p-2 m-2 text-black"
                                  placeholder="Task..."
                                  onChange={(e) => setTitleEdit(e.target.value)}
                                  onBlur={handleBlur}
                                  value={titleEdit}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleEditSubmit(e);
                                    }
                                  }}
                                />
                              </div>
                            </>
                          ) : (
                            <div className="flex lg:mx-2 lg:gap-2 gap-0 flex-col">
                              <div className="md:text-sm text-xs">
                                {item.title}
                              </div>
                              <div>
                                {filter === "all" ? (
                                  <Checkboxbutton
                                    checked={checkedItems[index] || false}
                                    onChange={() => handleCheckboxChange(index)}
                                  />
                                ) : null}
                                {checkedItems[index] && filter == "all" ? (
                                  <span className="badge text-bg-success m-2">
                                    Complete
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          )}
                          <div className="flex flex-col md:flex-row">
                            <RiDeleteBin5Fill
                              className="m-1"
                              color="red"
                              opacity={0.6}
                              size={18}
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteTodo(index)}
                            />
                            <RiEditBoxLine
                              className="m-1"
                              color="white"
                              opacity={0.6}
                              size={18}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                editIndex === index
                                  ? handleEditSubmit()
                                  : editTodo(index)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isinputValid === false && (
                  <div className="text-red-600">
                    Please enter a valid task name
                  </div>
                )}
                {/* {todo.map((item, index) => (
                  <div className=" max-h-screen text-white" key={index}>
                    <div
                      ref={editIndex === index ? editRef : null}
                      className="flex max-h-fit max-w-fit my-2 bg-slates w-full  border-2 border-gray-500 rounded-md justify-between py-1 px-1">
                      {editIndex === index ? (
                        <>
                          <div className="flex flex-col">
                            <InputButton
                              className="w-full h-8 rounded-md p-2 m-2 text-black"
                              placeholder="Task..."
                              onChange={(e) => setTitleEdit(e.target.value)}
                              onBlur={handleBlur}
                              value={titleEdit}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleEditSubmit(e);
                                }
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="flex lg:mx-2 lg:gap-2 gap-0 flex-col">
                          <div className="md:text-sm text-xs">{item.title}</div>
                          <div>
                            <Checkboxbutton
                              checked={checkedItems[index] || false}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            {checkedItems[index] == true ? (
                              <span className="badge text-bg-success m-2">
                                Complete
                              </span>
                            ) : null}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row">
                        <RiDeleteBin5Fill
                          className="m-1"
                          color="red"
                          opacity={0.6}
                          size={18}
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteTodo(index)}
                        />
                        <RiEditBoxLine
                          className="m-1"
                          color="white"
                          opacity={0.6}
                          size={18}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            editIndex === index
                              ? handleEditSubmit()
                              : editTodo(index)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            )}
            <ToogleBar />
          </div>
          <div className=" max-h-fit flex  w-10/12 justify-center ">
            <form
              className="w-full max-w-fit lg:w-11/12"
              name="todoform"
              onSubmit={handleSubmit}>
              <div className="text-white mr-8">
                {" "}
                <div className="flex flex-col w-full">
                  <div>Task</div>
                  <InputButton
                    type="text"
                    className="w-full h-8 rounded-md p-2 my-2 text-black "
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
      </div>
    </>
  );
};

export default TodoItems;
