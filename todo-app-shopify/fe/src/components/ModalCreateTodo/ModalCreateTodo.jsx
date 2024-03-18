import { Frame, Modal, TextContainer, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { createNewTodo } from '../../services/todoServices';

const ModalCreateTodo = ( { active, setActive } ) => {
  const [ textFieldValue, setTextFieldValue ] = useState( '' );
  const handleClearButtonClick = useCallback( () => setTextFieldValue( '' ), [] );

  const handleChange = useCallback(
    ( newValue ) => setTextFieldValue( newValue ),
    [],
  );
  const handleCreateTodo = async () => {
    let res = await createNewTodo( { title: textFieldValue } );
    if ( res && res.success && res.success === true ) {
      setActive( false )
    }
  }

  const handleCloseModal = () => {
    setActive( false );
  }

  return (
    <div style={ { height: '500px' } }>
      <Frame>
        <Modal
          open={ active }
          onClose={ handleCloseModal }
          title="Create todo"
          primaryAction={ {
            content: 'Add',
            onAction: handleCreateTodo,
          } }
          secondaryActions={ [
            {
              content: 'Cancel',
              onAction: handleCloseModal,
            },
          ] }
        >
          <Modal.Section>
            <TextContainer>
              <TextField
                label="Title"
                value={ textFieldValue }
                onChange={ handleChange }
                clearButton
                onClearButtonClick={ handleClearButtonClick }
                autoComplete="off"
              />
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}

export default ModalCreateTodo;