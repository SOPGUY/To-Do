import React, { useEffect, useState } from "react";
import trashIcon from "./assets/trash.svg";

interface Itodo {
  todo: string;
  key: number;
}

function App() {
  const [input, setInput] = useState("");
  const [toDos, setTodos] = useState<Itodo[]>([]);

  function addTodos() {
    const localData: Itodo[] = JSON.parse(
      localStorage.getItem("promise") ?? "[]"
    );
    localData.unshift({ todo: input, key: new Date().getTime() });
    localStorage.setItem("promise", JSON.stringify(localData));
  }
  useEffect(() => {
    const localData: Itodo[] = JSON.parse(
      localStorage.getItem("promise") ?? "[]"
    );
    setTodos(localData);
  }, []);
  function deleteTodo(key: number) {
    
    const array = [...toDos];

    
    const findResult = array.find((item) => item.key === key);
    if (findResult) {
      const indexToDelete = array.indexOf(findResult);
      array.splice(indexToDelete, 1);
      setTodos(array);
      localStorage.setItem("promise", JSON.stringify(array));
    }
  }
  return (
    <main>
      <h1 className="text-white font-bold text-4xl text-center pt-10">
        To-Do List 📃
      </h1>
      <div className="mx-auto h-[500px] max-w-[600px] w-full bg-white rounded-lg mt-10 p-5">
        <form onSubmit={addTodos} className="flex items-center gap-5">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
            type="text"
            name="todo"
            id="todo"
            placeholder="What do you want to do?"
            className="w-full border border-neutral-400 outline-none focus:border-primary px-3 py-3 rounded-md"
          />
          <button className="bg-primary px-6 py-3 text-white font-semibold rounded-md hover:bg-primary/90 transition-all duration-300">
            Add
          </button>
        </form>
        <div className="mt-10 space-y-3 overflow-y-scroll h-[370px]">
          {toDos.length === 0 ? (
            <div>No toDos yet</div>
          ) : (
            toDos.map((x) => (
              <div
                key={x.key}
                className="px-3 py-1 flex justify-between items-center gap-5 bg-teal-300 border-2 border-neutral-400 rounded-md"
              >
                <p>{x.todo}</p>
                <button
                  onClick={() => {
                    deleteTodo(x.key);
                  }}
                  className="grid place-content-center p-3 bg-blue-800 rounded-md hover:bg-red-500 transition-all duration-300"
                >
                  <img src={trashIcon} alt="Trash" className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
    </main>
  );
}

export default App;
