import React,{useContext, useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap'
import FeedBackList from '../components/FeedBackList';
import '../css/Feedback.css'
import CreateFeedback from '../components/Modals/CreateFeedback';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { fetchFeedback } from '../http/feedbackAPI';
import { Context } from '..';

const Feedback = observer( () => {
  const {feedback} = useContext(Context)
  const {user} = useContext(Context)
  useEffect(()=>{
      fetchFeedback().then(data=> feedback.setFeedback(data))
  },[])
    const [feedbackVisible,setFeedbackVisible]=useState(false)
    return (
        <div className="image-background">
      <div className="overlay">
      <Container className='d-flex flex-column align-items-center justify-content-center'>
        <Row>
            <Col  md={12}>
            <div className="d-flex h-100 mt-2">
                <FeedBackList/>
                </div>
            </Col>
        </Row>
        {user.isAuth &&
        
        <Button className='mt-3 mb-3 me-3' onClick={()=> setFeedbackVisible(true)}>Добавить отзыв</Button>
      
        }
        <CreateFeedback show={feedbackVisible} onHide={()=> setFeedbackVisible(false)} />
      </Container></div>
      </div>
    );
});

export default Feedback;