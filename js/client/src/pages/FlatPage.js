import React,{useContext, useState,useEffect,history} from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/FlatPage.css'; // Подключаем CSS-файл
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneFlat } from '../http/flatAPI';
import { createApplication } from '../http/applicationAPI';
import { fetchOneDistrict,deleteFlat } from '../http/flatAPI';

const FlatPage = observer(() => {
    const [flat,setFlat]=useState({})
    const [districtName,setDistrictName]=useState('')
    const {user}=useContext(Context)
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        fetchOneFlat(id).then(async (data) => {
            setFlat(data)
        const name = await fetchOneDistrict(data.districtId)
        setDistrictName(name)});
    }, [id])
    const handleLeaveRequest = () => {
        alert('Заявку могут оставить только авторизированные пользователи');
    };
    const leaveApplication = async () => {
        try {
            await createApplication(id); 
            alert('Заявка успешно оставлена!');
        } catch (error) {
            console.error('Ошибка при оставлении заявки:', error);
            alert('Ошибка при оставлении заявки. Пожалуйста, попробуйте снова.');
        }
    };
    const handleDeleteFlat = async () => {
        try {
            await deleteFlat(id);
            alert('Квартира успешно удалена!');
            navigate('/');// Перенаправление на главную страницу после удаления
        } catch (error) {
            console.error('Ошибка при удалении квартиры:', error);
            alert('Ошибка при удалении квартиры. Пожалуйста, попробуйте снова.');
        }
    };
    const isAdmin = localStorage.getItem('role') ==='ADMIN' ;
    return (
        <div className="image-background">
        <div className="overlay"></div>
        <Container className=' d-flex justify-content-center'>
            <div>
                <Card className='mt-1 flat-card'>
                    <Image src={flat && flat.img ? process.env.REACT_APP_API_URL + flat.img : ''} alt="Flat Image" className='flat-image' />
                    <Card.Body>
                        <Card.Title>{flat.street},{flat.number_house}</Card.Title>
                        <Card.Text>
                        <p className='ppp'>
                            Этаж: {flat.floor} <br />
                            Количество  жилых комнат: {flat.rooms} <br />
                            Площадь: {flat.qr_meters} м2 <br />
                            Район: {districtName}
                        </p>
                            <h4>Цена: {flat.price} $</h4>
                        </Card.Text>
                        {user.isAuth &&
                        <Button className='knopochka' variant="primary" onClick={leaveApplication}>Оставить заявку</Button>
                        }
                        {!user.isAuth && 
                            <Button className='knopochka' variant="primary" onClick={handleLeaveRequest}>Оставить заявку</Button>
                        }
                        {isAdmin &&
                            <Button className='knopochka' variant="danger" onClick={handleDeleteFlat}>Удалить </Button>
                        }
                    </Card.Body>
                </Card>
            </div>
        </Container>
        </div>
    );
});

export default FlatPage;
