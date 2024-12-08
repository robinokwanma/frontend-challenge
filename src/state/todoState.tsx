import { atom, AtomEffect } from 'recoil';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const localStorageEffect =
  (key: string): AtomEffect<Todo[]> =>
  ({ setSelf, onSet, trigger }) => {
    if (trigger === 'get') {
      const savedValue = localStorage.getItem(key);
      if (savedValue) {
        setSelf(JSON.parse(savedValue));
      }
    }

    onSet((newValue, oldValue, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const todoState = atom<Todo[]>({
  key: 'todoState',
  default: [],
  effects: [localStorageEffect('todoList')],
});
