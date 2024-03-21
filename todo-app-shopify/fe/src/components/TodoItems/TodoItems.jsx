import {Badge, Button, ButtonGroup, InlineStack, ResourceItem, Text} from "@shopify/polaris";

const TodoItems = ({item, handleDeleteTodo, handleCompleteTodo}) => {
  const {id, title, isCompleted} = item;
  return (
    <ResourceItem id={id}>
      <InlineStack align='space-between' >
        <Text fontWeight="bold" as="p">
          {title}
        </Text>
        <InlineStack gap={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}>
          {
            isCompleted && isCompleted === true ?
              <Badge size='large' tone="success">Complete</Badge> :
              <Badge size='large' tone="attention">Incomplete</Badge>
          }
          <ButtonGroup>
            <Button
              disabled={isCompleted}
              size="large"
              onClick={() => handleCompleteTodo(id)}>
              Complete
            </Button>

            <Button
              size='large'
              tone='critical'
              onClick={() => handleDeleteTodo(id)}>
              Delete
            </Button>
          </ButtonGroup>
        </InlineStack>
      </InlineStack>
    </ResourceItem>

  );
}

export default TodoItems;