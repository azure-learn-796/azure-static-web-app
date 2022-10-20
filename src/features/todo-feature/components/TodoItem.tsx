import { Button, Checkbox, TableCell, TableRow, Typography } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { TodoItemProps } from '../types/props';
import { Todo } from '../types/models';
import { useTodoListOperation } from './TodoPage';
import { useUpdateTodoItemApi } from '../api/TodoApiHooks';

const TodoItem: React.FC<TodoItemProps> = memo(({ todo, ...props }) => {
  // 済チェックボックス
  const [done, setDone] = useState<boolean>(todo.done);

  // TODOアイテム削除処理
  const { removeItem } = useTodoListOperation();
  // TODO更新API
  const updateTodoItemApi = useUpdateTodoItemApi();

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

      setDone(todo.done);
    },
    [updateTodoItemApi]
  );

  /**
   * 削除ボタン押下時のハンドラ
   * @param todo Todoレコード
   */
  const handleDeleteBtnClicked = useCallback(
    (todo: Todo): void => {
      removeItem(todo);
    },
    [removeItem]
  );

  return (
    <TableRow {...props}>
      <TableCell>
        <Checkbox checked={done} onChange={() => handleCheckChanged(todo)} />
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
