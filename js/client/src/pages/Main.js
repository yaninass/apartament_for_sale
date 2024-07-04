import React , { useState }from 'react';
import Container from 'react-bootstrap/esm/Container';
import Card from "react-bootstrap/Card"
import "../css/main.css"
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardGroup from 'react-bootstrap/CardGroup';
import minskworld from '../resorce/minskworld.jpg' 
import park from '../resorce/park.jpeg'
import Row from 'react-bootstrap/Row'
import Carousel from 'react-bootstrap/Carousel'
import myak from '../resorce/myak.jpg'
import levada from '../resorce/levada.jpg'
import sezon from '../resorce/4.jpg'
import bor from '../resorce/bor.jpg'
import { observer } from 'mobx-react-lite';
import { createFlatsale } from '../http/flatsaleAPI';


const Main = observer((onHide) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    
    const [adres,setAdres] =useState('')
    const [number_house,setNumberHouse]=useState(1)
    const [rooms,setRooms]=useState(1)
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [number,setNumber]=useState('')

    const addFLatsale=()=>{
      if (!adres || !number_house || !rooms || !email || !name || !number) {
        alert("Пожалуйста, заполните все поля");
        return;
    }
      createFlatsale({
        adres: adres,
        number_house: number_house,
        rooms: rooms,
        email: email,
        name: name,
        number: number
    }).then(data => {
        setAdres('');
        setNumberHouse(1);
        setRooms(1);
        setEmail('');
        setName('');
        setNumber('');
        onHide();
        handleClose();
    }).catch(error => {
        console.error('Error adding flatsale:', error);
    });
    }

    return (
        <div className='contaner'>
            <div className="overlay"></div>
            <Container >
                <div className='name'>
            <h1 className='animated-text-h1'>
                FlatFinders</h1>
                <h3 className='animated-text-h3'>Лучший сервис для покупки и продажи квартир в Минске</h3>
                </div>

                <Container className="d-flex justify-content-center align-items-center ">
                <Card className="p-5 carda">
                    <h2>Узнайте стоимость вашей квартиры сейчас</h2>
             
      <Button onClick={handleShow} className="me-2 mt-1" variant="secondary">Рассчитать</Button>
    
  </Card>
  <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Заполните поля</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" >
              <Form.Label>Ваша улица</Form.Label>
              <Form.Control value ={adres} onChange={e=>setAdres(e.target.value)}
              type="text" placeholder="Введите улицу" required />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Номер дома</Form.Label>
              <Form.Control value={number_house} onChange={e=>setNumberHouse(e.target.value)}
              type="number" placeholder="Введите номер дома" required />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Количество комнат</Form.Label>
              <Form.Control value={rooms} onChange={e=>setRooms(e.target.value)}
               type="number" placeholder="Введите количество комнат" required />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Электронная почта</Form.Label>
              <Form.Control value={email} onChange={e=>setEmail(e.target.value)}
              type="email" placeholder="Введите email" required />
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Имя</Form.Label>
            <Form.Control value={name} onChange={e=>setName(e.target.value)}
            type="text" placeholder="Введите ваше имя" required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control value={number} onChange={e=>setNumber(e.target.value)}
                 type="tel" placeholder="Введите ваш номер телефона" required/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" onClick={addFLatsale}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>



<Carousel fade>
      <Carousel.Item>
      
    <Container>
  <Row className='justify-content-center'>
    <CardGroup className='mt-5 cartochki'>
      <Card>
        <Card.Img className="cartinka" src={minskworld} />
        <Card.Footer>
          <small className="text-muted">ЖК "Minsk World"</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img  className="cartinka"  src={park} />

        <Card.Footer>
          <small className="text-muted">ЖК "Парк Челюскинцев"</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img className="cartinka" src={myak} />

        <Card.Footer>
          <small className="text-muted">ЖК "Маяк Минска"</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  
  </Row>
</Container>  
      </Carousel.Item>
      <Carousel.Item>
       
    <Container>
  <Row className='justify-content-center'>
    <CardGroup className='mt-5 cartochki'>
      <Card>
        <Card.Img className="cartinka" src={levada} />
        <Card.Footer>
          <small className="text-muted">ЖК "Левада"</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img  className="cartinka"  src={sezon} />

        <Card.Footer>
          <small className="text-muted">ЖК "4 сезона"</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img className="cartinka" src={bor} />

        <Card.Footer>
          <small className="text-muted">ЖК "Новая боровая"</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  
  </Row>
</Container>
      </Carousel.Item>
     
    </Carousel>
            </Container>
        </div>
          
        
    );
});

export default Main;