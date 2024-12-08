import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoState } from '../state/todoState';
import { TodoItem } from './TodoItem';
import Modal from './Modal';
import Header from './Header';

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [showModal, setShowModal] = useState(false); // Modal state for "Delete All"
  const [activeId, setActiveId] = useState<number | null>(null); // Track the currently active item
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  // Function to execute on confirm
  const [modalMessage, setModalMessage] = useState<string>(''); // Modal message
  const [modalTitle, setModalTitle] = useState<string>(''); // Modal title

  
  const handleDeleteAll = () => {
    setTodos([]); // Clear all todos
    setShowModal(false); // Close modal
  };

  const openDeleteAllModal = () => {
    setModalTitle('Are you sure?');
    setModalMessage('This will delete all items permanently.');
    setModalAction(() => handleDeleteAll);
    setShowModal(true);
  };

  return (
    <div className="relative">
      {/* Header with Delete All Button */}
      <Header openDeleteAllModal={openDeleteAllModal} />

      {/* Todo Items */}
      <div className="mt-4">
        {todos.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add one!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))
        )}
      </div>

      {/* Modal for "Delete All" Confirmation */}
      {showModal && (
        <Modal
          title={modalTitle}
          message={modalMessage}
          onConfirm={() => {
            if (modalAction) modalAction();
          }}
          onCancel={() => setShowModal(false)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default TodoList;
