import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoState } from '../state/todoState';

const AddTodo = () => {
  const [text, setText] = useState('');
  const setTodos = useSetRecoilState(todoState);

  const handleAdd = () => {
    if (text.trim()) {
      setTodos((oldTodos) => [
        ...oldTodos,
        { id: Date.now(), text, completed: false },
      ]);
      setText('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded px-2 py-1 text-black"
        placeholder="Add a new task"
      />
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-1 rounded">
        Add Item
      </button>
    </div>
  );
};

export default AddTodo;
