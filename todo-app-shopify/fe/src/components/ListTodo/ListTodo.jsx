import React, { useEffect, useState } from 'react';
import {
  Card, ResourceItem, ResourceList, Text,
  Button, Badge, ButtonGroup, InlineStack,
} from '@shopify/polaris';
import { deleteListTodo, deleteTodo, fetchListTodo, updateCurrentTodo, updateListTodo } from '../../services/todoServices';

const ListTodo = () => {
  const limit = 5
  const [ selectedTodo, setSelectedTodos ] = useState( [] );
  const [ listTodo, setListTodo ] = useState( [] );

  const getListTodo = async () => {
    const res = await fetchListTodo( limit );
    if ( res && res.data ) {
      setListTodo( res.data );
    }
  }

  const handleCompleteTodo = async ( id ) => {
    await updateCurrentTodo( id, { isCompleted: true } );
    await getListTodo();
  }

  const bulkUpdateTodo = async ( action ) => {
    await updateListTodo( { selectedTodo, action } );
  }

  const handleDeleteTodo = async ( id ) => {
    await deleteTodo( id );
  }

  const bulkDeleteTodo = async () => {
    await deleteListTodo( selectedTodo );
  }

  const bulkActions = [
    {
      content: 'Complete',
      onAction: () => bulkUpdateTodo( 'complete' )
    },
    {
      content: 'Incomplete',
      onAction: () => bulkUpdateTodo( 'inComplete' )
    },
    {
      destructive: true,
      content: 'Delete',
      onAction: () => bulkDeleteTodo()
    },
  ];

  useEffect( () => {
    getListTodo();
  }, [] )
  return (
    <Card >
      <ResourceList
        items={ listTodo }
        renderItem={ renderItem }
        selectedItems={ selectedTodo }
        onSelectionChange={ setSelectedTodos }
        bulkActions={ bulkActions }
      />
    </Card>
  );

  function renderItem ( item ) {
    const { id, title, isCompleted } = item;
    return (
      <ResourceItem id={ id }>
        <InlineStack align='space-between' >
          <Text fontWeight="bold" as="p">
            { title }
          </Text>
          <ButtonGroup>
            {
              isCompleted && isCompleted === true ?
                <Badge tone="success">Complete</Badge> :
                <Badge tone="attention">Incomplete</Badge>
            }
            <Button
              onClick={ () => handleCompleteTodo( id ) }>
              Complete
            </Button>
            <Button
              tone='critical'
              onClick={ () => handleDeleteTodo( id ) }>
              Delete
            </Button>
          </ButtonGroup>
        </InlineStack>
      </ResourceItem>

    );
  }
}

export default ListTodo;
