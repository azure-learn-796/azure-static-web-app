import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { memo } from 'react';
import { TodoListProps } from '../types/props';
import TodoItem from './TodoItem';

const TodoList: React.FC<TodoListProps> = memo(({ todoList }) => {
  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>済</TableCell>
            <TableCell>やること</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} hover />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default TodoList;
