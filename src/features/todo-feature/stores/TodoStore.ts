import { TodoActionType, TodoReducerType } from '../types/stores';

/**
 * TODOのReducer
 * @param state 状態
 * @param action アクション
 * @returns 状態
 */
export const TodoReducer: TodoReducerType = (state, action) => {
  if (action.todoItems.length === 0) {
    return state;
  }

  return TodoActions[action.type](state, action);
};

/** TODOアクション一覧 */
const TodoActions: Record<TodoActionType, TodoReducerType> = {
  [TodoActionType.addTodoItem]: (state, action) => {
    return { ...state, todoItems: [...state.todoItems, ...action.todoItems] };
  },

  [TodoActionType.replaceTodoItem]: (state, action) => {
    const todoItems = state.todoItems.map((todo) => {
      const actionTodo = action.todoItems.find((actionTodo) => todo.id === actionTodo.id);
      return actionTodo ? actionTodo : todo;
    });
    return { ...state, todoItems };
  },

  [TodoActionType.removeTodoItem]: (state, action) => {
    const todoItems = state.todoItems.filter((todo) => action.todoItems.every((t) => t.id !== todo.id));
    return { ...state, todoItems };
  },

  [TodoActionType.setTodoItems]: (state, action) => {
    return { ...state, todoItems: [...action.todoItems] };
  },
};
