import { AppBar, Box, Button, FormControl, TextField, Toolbar, Typography } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useCreateTodoItemApi, useFetchTodoListApi as useFetchTodoItemsApi } from '../api/TodoApiHooks';
import TodoProvider, { useTodoContext } from '../providers/TodoProvider';
import { Todo } from '../types/models';
import { TodoActionType } from '../types/stores';
import TodoList from './TodoList';

const TodoPage = memo(() => {
  return (
    <TodoProvider>
      <TodoPageContent />
    </TodoProvider>
  );
});

const TodoPageContent = memo(() => {
  // やること
  const [content, setContent] = useState<string>('');

  // TODO一覧の状態
  const { state, dispatch } = useTodoContext();
  // TODO一覧取得API
  const fetchTodoItemsApi = useFetchTodoItemsApi();
  // TODO登録API
  const createTodoItemApi = useCreateTodoItemApi();

  /**
   * TODO一覧取得
   */
  const fetchTodoItems = useCallback(async () => {
    const response = await fetchTodoItemsApi();

    // エラー時
    if (!response.success) {
      console.error(response.error?.message);
      dispatch({ type: TodoActionType.setTodoItems, todoItems: [] });
      return;
    }

    // 成功時
    dispatch({ type: TodoActionType.setTodoItems, todoItems: response.data || [] });
  }, [fetchTodoItemsApi, dispatch]);

  /**
   * TODOテキスト変更時のハンドラ
   * @param event TODOテキスト変更イベント
   */
  const handleTodoChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  }, []);

  /**
   * 登録ボタンクリック時のハンドラ
   * @param event 登録ボタンクリックイベント
   */
  const handleRegisterButtonClicked = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!content) {
        return;
      }

      const newTodo: Todo = {
        id: 0, // 登録時に自動採番されるので何でも良い
        content: content,
        done: false,
      };

      const response = await createTodoItemApi(newTodo);

      if (!response.success) {
        console.error(response.error?.message);
        return;
      }

      if (response.data) {
        dispatch({ type: TodoActionType.addTodoItem, todoItems: [response.data] });
      }

      setContent('');
    },
    [content, createTodoItemApi, dispatch]
  );

  useEffect(() => {
    fetchTodoItems();
  }, [fetchTodoItems]);

  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6' component='div'>
              TODO
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {/* 入力 */}
      <FormControl component='form' fullWidth>
        <Box sx={{ display: 'flex', mb: 3 }} justifyContent='space-between'>
          <TextField variant='standard' label='やること' fullWidth value={content} onChange={handleTodoChanged} sx={{ mr: 1 }} />
          <Button variant='contained' type='submit' sx={{ width: '8rem' }} onClick={handleRegisterButtonClicked}>
            追加
          </Button>
        </Box>
      </FormControl>
      {/* 一覧 */}
      <TodoList todoItems={state.todoItems} />
    </div>
  );
});

export default TodoPage;
