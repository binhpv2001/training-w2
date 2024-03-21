import {Button, Page} from '@shopify/polaris';
import {useState} from 'react';
import ListTodo from '../ListTodo/ListTodo';

const PageApp = () => {
  const [isActive, setActive] = useState(false);
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Todos"
      primaryAction={
        <Button variant="primary" onClick={() => setActive(true)}>Create</Button>
      }
    >
      <ListTodo isActive={isActive} setActive={setActive} />
    </Page>
  );
}

export default PageApp;