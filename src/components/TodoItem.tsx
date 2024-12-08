import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Todo, todoState } from '../state/todoState';
import Modal from './Modal';

export const TodoItem = ({
  todo,
  activeId,
  setActiveId,
}: {
  todo: Todo;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [todos, setTodos] = useRecoilState(todoState);
  const [showModal, setShowModal] = useState(false); // Modal state
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isSelected = activeId === todo.id;

  const handleRadioClick = () => {
    setActiveId(isSelected ? null : todo.id);
  };

  const handleEdit = () => setIsEditing(true);

  const handleDelete = () => {
    setTodos(todos.filter(t => t.id !== todo.id));
    setShowModal(false); // Close the modal after deletion
  };

  const saveEdit = () => {
    setTodos(todos.map(t => (t.id === todo.id ? { ...t, text } : t)));
    setIsEditing(false);
  };

  const handleDone = () => {
    setActiveId(null);
    setIsEditing(false);
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div
      className={`flex items-start gap-2 p-2 border-b ${
        isSelected ? 'bg-gray-100' : ''
      }`}
    >
      <input
        type="radio"
        className="form-radio mt-1"
        onChange={handleRadioClick}
        checked={isSelected}
      />

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => {
            setText(e.target.value);
            adjustHeight();
          }}
          rows={1}
          className="border rounded px-2 py-1 flex-1 w-full sm:w-auto resize-none overflow-hidden"
          onBlur={saveEdit}
        />
      ) : (
        <span
          className={`flex-1 ${
            isSelected ? 'font-semibold' : ''
          } whitespace-normal break-words truncate`}
        >
          {todo.text}
        </span>
      )}

      {isSelected && (
        <div className="ml-auto flex gap-2 flex-col sm:flex-row flex-wrap">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => setShowModal(true)} // Open the modal
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
          <button
            onClick={handleDone}
            className="text-green-500 hover:text-green-700"
          >
            Done
          </button>
        </div>
      )}

      {/* Modal for delete confirmation */}
      {showModal && (
        <Modal
          title="Are you sure?"
          message="This will delete the selected item permanently."
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};
