import { Page } from '@shopify/polaris';
import React, { useState } from 'react';
import ListTodo from '../ListTodo/ListTodo';
import CreateModal from '../ModalCreateTodo/ModalCreateTodo';

const PageApp = () => {
  const [ active, setActive ] = useState( false );
  return (
    <Page
      backAction={ { content: 'Products', url: '#' } }
      title="Todoes"
      secondaryActions={ [
        {
          content: 'Create',
          onAction: () => setActive( true )
        },
      ] }
    >
      <ListTodo />
      { active && <CreateModal active={ active } setActive={ setActive } /> }
    </Page>
  );
}

export default PageApp;