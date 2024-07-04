import React from 'react'
import {Col,Card } from 'react-bootstrap'
import Image from "react-bootstrap/Image"
import {useNavigate} from 'react-router-dom'
import { FLATPAGE_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
const FlatItem =observer( ({flat}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${FLATPAGE_ROUTE}/${flat.id}`);
    }
    return (
        <Col md={4} className='mt-2 me-8' onClick={handleClick}>
            <Card style={{width:300, cursor:'pointer',opacity:0.8}} border={"light"}>
                <Image width={300} height ={150} src={process.env.REACT_APP_API_URL + flat.img}/>
                <div className='d-flex justify-content-center' >
                    <div>{flat.street}, {flat.number_house}</div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div>{flat.price} $</div>
                </div>
            </Card>
        </Col>
    );
});

export default FlatItem;