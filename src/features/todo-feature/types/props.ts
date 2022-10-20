import { TableRowProps } from "@mui/material";
import { Todo } from "./models";

export type TodoListProps = {
  todoList: Todo[];
};

export type TodoItemProps = TableRowProps & {
  todo: Todo;
};
