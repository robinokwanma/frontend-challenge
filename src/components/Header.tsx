import React from 'react';
import AddTodo from './AddTodo';

const Header: React.FC<{ openDeleteAllModal: () => void }> = ({ openDeleteAllModal }) => {
  return (
    <header className="sticky top-0 bg-blue-300 text-white shadow-md z-20">
        <h1 className="text-2xl font-bold text-center p-4 font-mono">Todo List</h1>
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4">

        {/* AddTodo Component */}
        <div className="flex-1">
          <AddTodo />
        </div>

        {/* Delete All Button */}
        <button
          onClick={openDeleteAllModal}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete All
        </button>
      </div>
    </header>
  );
};

export default Header;
