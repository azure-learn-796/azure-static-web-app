import { useCallback } from 'react';
import { ajaxDelete, ajaxGet, ajaxPost, ajaxPatch, API_KEY, API_ORIGIN } from '../../../utils/ApiUtil';
import { Todo } from '../types/models';

/** APIのベースURL */
const BASE_URL = `${API_ORIGIN}/api/todos`;

/**
 * fetchTodoItem API呼び出し
 * @returns fetchTodoItem APIのレスポンス
 */
export const useFetchTodoListApi = () =>
  useCallback(async () => {
    return ajaxGet<Todo[]>(BASE_URL, {
      code: API_KEY,
    });
  }, []);

/**
 * createTodoItem API呼び出し
 * @returns createTodoItem APIのレスポンス
 */
export const useCreateTodoItemApi = () =>
  useCallback(async (data: Todo) => {
    return ajaxPost<Todo, Todo>(BASE_URL, data, {
      code: API_KEY,
    });
  }, []);

/**
 * updateTodoItem API呼び出し
 * @returns updateTodoItem APIのレスポンス
 */
export const useUpdateTodoItemApi = () =>
  useCallback(async (id: number, data: Todo) => {
    return ajaxPatch<Todo>(`${BASE_URL}/${id}`, data, {
      code: API_KEY,
    });
  }, []);

/**
 * deleteTodoItem API呼び出し
 * @returns deleteTodoItem APIのレスポンス
 */
export const useDeleteTodoItemApi = () =>
  useCallback(async (id: number) => {
    return ajaxDelete(`${BASE_URL}/${id}`, {
      code: API_KEY,
    });
  }, []);
