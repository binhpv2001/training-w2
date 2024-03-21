import {Modal, Text, TextContainer, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {createNewTodo} from '../../services/todoServices';

const ModalCreateTodo = ({active, setActive, listTodo, setListTodo}) => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [isEmpty, setEmpty] = useState(false);
  const handleClearButtonClick = useCallback(() => setTextFieldValue(''), []);
  const handleChange = useCallback((newValue) => setTextFieldValue(newValue), [],);
  const handleCloseModal = () => setActive(false);
  const handleCreateTodo = async () => {
    const title = textFieldValue.trim().replace(/\s+/g, ' ');
    if (title) {
      let res = await createNewTodo({title});
      if (res && res.success && res.success === true) {
        setListTodo([res.data, ...listTodo]);
        setActive(false);
      }
    }
    if (title.trim() === '') setEmpty(true)
  }

  return (
    <Modal
      open={active}
      onClose={handleCloseModal}
      title="Create todo"
      footer={
        isEmpty ?
          <Text fontWeight='bold' tone='critical'>
            Title cannot empty
          </Text>
          : <></>
      }
      primaryAction={{
        content: 'Add',
        onAction: handleCreateTodo,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleCloseModal,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <TextField
            label="Title"
            value={textFieldValue}
            onChange={handleChange}
            clearButton
            onClearButtonClick={handleClearButtonClick}
            autoComplete="off"
          />
        </TextContainer>
      </Modal.Section>
    </Modal>

  );
}

export default ModalCreateTodo;