import React, { useContext,useState } from 'react';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Context } from '../../index';
import { createFeedback } from '../../http/feedbackAPI';
import { observer } from 'mobx-react-lite';
const CreateFeedback = observer(({show,onHide}) => {
    const [value,setValue] = useState('')
    const addFeedback = () =>{
     
      createFeedback({feedback:value}).then(data=> {setValue('')
      onHide()
    })
  }


    const {feedback} =useContext(Context);
  
       return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить отзыв
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control className='mt-2'
                value={value}
                onChange={e =>setValue(e.target.value)}
                placeholder={'Ваш отзыв'}
                type='text'
                />
                <hr/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-success"onClick={addFeedback}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
});

export default CreateFeedback;