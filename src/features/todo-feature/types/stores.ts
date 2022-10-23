import { ReducerType } from '../../../types/stores';
import { Todo } from './models';

/** TODO状態 */
export type TodoState = {
  todoItems: Todo[];
};

/** TODOアクションタイプ */
export enum TodoActionType {
  'addTodoItem',
  'replaceTodoItem',
  'removeTodoItem',
  'setTodoItems',
}

/** TODOアクション */
export type TodoAction = {
  type: TodoActionType;
  todoItems: Todo[];
};

/** TODO Reducer */
export type TodoReducerType = ReducerType<TodoState, TodoAction>;

/** TODO状態のContext */
export type TodoContextType = {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};
