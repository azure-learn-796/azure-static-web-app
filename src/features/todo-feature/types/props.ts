import { TableRowProps } from '@mui/material';
import { ReactNode } from 'react';
import { Todo } from './models';

/** TODO一覧プロパティ */
export type TodoListProps = {
  todoItems: Todo[];
};

/** TODO要素プロパティ */
export type TodoItemProps = TableRowProps & {
  todo: Todo;
};

/** TODO Providerプロパティ */
export type TodoProviderProps = {
  children: ReactNode;
};
