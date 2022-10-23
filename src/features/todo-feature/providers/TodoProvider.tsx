import { createContext, useContext, useReducer } from 'react';
import { TodoReducer } from '../stores/TodoStore';
import { TodoProviderProps } from '../types/props';
import { TodoContextType, TodoState } from '../types/stores';

/** TODO状態のコンテキスト */
const TodoContext = createContext<TodoContextType>({} as TodoContextType);

const initialState: TodoState = {
  todoItems: [],
};

/**
 * TODO状態のプロバイダー
 * @param プロパティ
 * @returns TODOプロバイダー
 */
const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export default TodoProvider;

/**
 * TODOコンテキストのフック
 * @returns TODOコンテキスト
 */
export const useTodoContext = () => useContext(TodoContext);
