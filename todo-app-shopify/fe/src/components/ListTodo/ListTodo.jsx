import React, {useCallback, useEffect, useState} from 'react';
import {Card, ResourceList, Toast} from '@shopify/polaris';
import {
  deleteListTodo, deleteTodo, fetchListTodo,
  updateCurrentTodo, updateListTodo
} from '../../services/todoServices';
import ModalCreateTodo from '../ModalCreateTodo/ModalCreateTodo';
import TodoItems from '../TodoItems/TodoItems';

const ListTodo = ({isActive, setActive}) => {
  const limit = 5;
  const [selectedTodo, setSelectedTodos] = useState([]);
  const [listTodo, setListTodo] = useState([]);

  const getListTodo = async () => {
    const res = await fetchListTodo(limit);
    if (res?.data) {
      setListTodo(res.data);
    }
  }

  const handleCompleteTodo = async (id) => {
    const res = await updateCurrentTodo(id, {isCompleted: true});
    if (res?.success === true) {
      setListTodo((prev) =>
        prev.map((todo) => {
          if (todo.id === res.data) {
            return {...todo, isCompleted: true};
          }
          return todo;
        })
      );
    }
  }

  const bulkUpdateTodo = async (action) => {
    let res = await updateListTodo({selectedTodo, action});
    if (res?.success === true) {
      setListTodo((prev) =>
        prev.map((todo) => {
          if (res.data.includes(todo.id)) {
            return action === 'complete' ?
              {...todo, isCompleted: true} :
              {...todo, isCompleted: false};
          }
          return todo;
        })
      );
      setSelectedTodos([]);
    }
  }

  const handleDeleteTodo = async (id) => {
    const res = await deleteTodo(id);
    if (res?.success === true) {
      setListTodo((prev) => prev.filter((item) => item.id !== id));
    }
  }

  const bulkDeleteTodo = async () => {
    const res = await deleteListTodo(selectedTodo);
    if (res?.success === true) {
      setListTodo((prev) =>
        prev.filter((todo) => !res.data.includes(todo.id))
      );
    }
  }

  const bulkActions = [
    {
      content: 'Complete',
      onAction: () => bulkUpdateTodo('complete')
    },
    {
      content: 'Incomplete',
      onAction: () => bulkUpdateTodo('inComplete')
    },
    {
      destructive: true,
      content: 'Delete',
      onAction: () => bulkDeleteTodo()
    },
  ];

  useEffect(() => {
    getListTodo();
  }, [])
  return (
    <Card >
      {isActive &&
        <ModalCreateTodo active={isActive} setActive={setActive}
          listTodo={listTodo} setListTodo={setListTodo} setError={setError} />}
      <ResourceList
        items={listTodo}
        selectable
        renderItem={
          (item) => TodoItems({
            item, handleDeleteTodo, handleCompleteTodo,
            bulkDeleteTodo, bulkUpdateTodo
          })
        }
        selectedItems={selectedTodo}
        onSelectionChange={setSelectedTodos}
        bulkActions={bulkActions}
      />
    </Card>
  );

}

export default ListTodo;
