import { Button, Checkbox, TableCell, TableRow, Typography } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { TodoItemProps } from '../types/props';
import { Todo } from '../types/models';
import { useDeleteTodoItemApi, useUpdateTodoItemApi } from '../api/TodoApiHooks';
import { useTodoContext } from '../providers/TodoProvider';
import { TodoActionType } from '../types/stores';

const TodoItem: React.FC<TodoItemProps> = memo(({ todo, ...props }) => {
  // TODO一覧の状態
  const { dispatch } = useTodoContext();
  // TODO更新API
  const updateTodoItemApi = useUpdateTodoItemApi();
  // TODO削除API
  const deleteTodoItemApi = useDeleteTodoItemApi();

  /**
   * 済チェックボックス変更時のハンドラ
   * @param todo Todoアイテム
   */
  const handleCheckChanged = useCallback(
    async (todo: Todo): Promise<void> => {
      todo.done = !todo.done;
      const response = await updateTodoItemApi(todo.id, todo);

      if (!response.success) {
        console.error(response.error?.message);
        return;
      }

      dispatch({ type: TodoActionType.replaceTodoItem, todoItems: [{ ...todo }] });
    },
    [updateTodoItemApi, dispatch]
  );

  /**
   * 削除ボタン押下時のハンドラ
   * @param todo Todoレコード
   */
  const handleDeleteBtnClicked = useCallback(
    async (todo: Todo): Promise<void> => {
      const response = await deleteTodoItemApi(todo.id);

      if (!response.success) {
        console.error(response.error?.message);
        return;
      }

      dispatch({ type: TodoActionType.removeTodoItem, todoItems: [todo] });
    },
    [deleteTodoItemApi, dispatch]
  );

  return (
    <TableRow {...props}>
      <TableCell>
        <Checkbox checked={todo.done} onChange={() => handleCheckChanged(todo)} />
      </TableCell>
      <TableCell width='100%'>
        <Typography>{todo.content}</Typography>
      </TableCell>
      <TableCell>
        <Button variant='outlined' onClick={() => handleDeleteBtnClicked(todo)}>
          削除
        </Button>
      </TableCell>
    </TableRow>
  );
});

export default TodoItem;
