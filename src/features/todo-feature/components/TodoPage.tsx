import { AppBar, Box, Button, FormControl, TextField, Toolbar, Typography } from '@mui/material';
import React, { createContext, memo, useCallback, useContext, useEffect, useState } from 'react';
import { useCreateTodoItemApi, useDeleteTodoItemApi, useFetchTodoListApi as useFetchTodoItemsApi } from '../api/TodoApiHooks';
import { Todo } from '../types/models';
import TodoList from './TodoList';

const TodoPage = memo(() => {
  // TODO(入力)
  const [content, setContent] = useState<string>('');
  // TODO一覧
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // TODO一覧取得API
  const fetchTodoItemsApi = useFetchTodoItemsApi();
  // TODO登録API
  const createTodoItemApi = useCreateTodoItemApi();
  // TODO削除API
  const deleteTodoItemApi = useDeleteTodoItemApi();

  /**
   * TODO一覧取得
   */
  const fetchTodoItems = useCallback(async () => {
    const response = await fetchTodoItemsApi();

    // エラー時
    if (!response.success) {
      console.error(response.error?.message);
      setTodoList([]);
      return;
    }

    // 成功時
    setTodoList(response.data || []);
  }, [fetchTodoItemsApi]);

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
        setTodoList([...todoList, response.data]);
      }

      setContent('');
    },
    [content, todoList, createTodoItemApi]
  );

  /**
   * TODOリストから指定したアイテムを削除する
   */
  const removeItem = useCallback(
    async (todo: Todo) => {
      const response = await deleteTodoItemApi(todo.id);

      if (!response.success) {
        console.error(response.error?.message);
        return;
      }

      const filteredTodoList = todoList.filter(({ id }) => id !== todo.id);
      setTodoList(filteredTodoList);
    },
    [todoList, deleteTodoItemApi]
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
      <TodoListOperationContext.Provider value={{ removeItem }}>
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
        <TodoList todoList={todoList} />
      </TodoListOperationContext.Provider>
    </div>
  );
});

/**
 * TODO一覧操作コンテキストのタイプ
 */
type TodoListOperationType = {
  removeItem: (todo: Todo) => void;
};

/**
 * TODO一覧操作コンテキスト
 */
const TodoListOperationContext = createContext<TodoListOperationType>({
  removeItem: () => {
    throw Error('Providerが設定されていません。');
  },
});

export default TodoPage;
export const useTodoListOperation = () => useContext(TodoListOperationContext);
