import React,{useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Row, Col, Card } from 'react-bootstrap';
import '../css/Feedback.css'
const FeedBackList = observer(() => {
    const {feedback}=useContext(Context)
    return (
        <Row className="d-flex">
              {feedback.getFeedback().map(item => (
                <Col className='mt-2' key={item.id} xs={12} md={4}>
                    <Card className="my-2 cardocka">
                        <Card.Body>{item.feedback}</Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default FeedBackList;