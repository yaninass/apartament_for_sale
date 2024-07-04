import React, { useContext,useState,useEffect } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Context } from '../../index';
import { createFlat, fetchDistrict, fetchFlat } from '../../http/flatAPI';
import { observer } from 'mobx-react-lite';
const CreateFlat =observer( ({show,onHide}) => {
    const {flat} =useContext(Context);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [street,setStreet]=useState('')
    const [number_house,setNumberHouse]=useState('')
    const [floor,setFloor]=useState()
    const [rooms,setRooms]=useState()
    const [qr_meters,setQrMeters]=useState()
    const [price,setPrice]=useState()
    const [file,setFile]=useState(null)
    useEffect(()=>{
      fetchDistrict().then(data=>flat.setDistrict(data))
      fetchFlat().then(data=>flat.setFlats(data))
    },[flat])
    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
    };

    const selectFile = e =>{
      setFile(e.target.files[0])

    }
    const addFlat = () => {
      if (!selectedDistrict || !street || !number_house || !floor || !rooms || !qr_meters || !price || !file) {
          alert("Пожалуйста, заполните все поля");
          return;
      }
  
      const formData = new FormData();
      formData.append('districtId', selectedDistrict.id);
      formData.append('street', street);
      formData.append('number_house', number_house);
      formData.append('floor', floor);
      formData.append('rooms', rooms);
      formData.append('qr_meters', qr_meters);
      formData.append('price', price);
      formData.append('img', file);
  
      createFlat(formData)
    .then(data => onHide())
  }
  
       return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить квартиру
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form enctype="multipart/form-data">
                <Dropdown>
                    <Dropdown.Toggle>{selectedDistrict ? selectedDistrict.district_name : 'Выберите район'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {flat.district.map( district =>
                            <Dropdown.Item key={district.id} onClick={() => handleDistrictSelect(district)}>{district.district_name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className='mt-2'
                value ={street}
                onChange={e=> setStreet(e.target.value)}
                placeholder={'Введите улицу'}
                type='text'
                />
                <Form.Control className='mt-2'
                value={number_house}
                onChange={e=> setNumberHouse(e.target.value)} 
                placeholder={'Введите номер дома'}
                type='number'
                />
                <Form.Control className='mt-2'
                value={floor}
                onChange={e=>setFloor(e.target.value)}
                placeholder={'Введите этаж'}
                type='number'
                />
                <Form.Control className='mt-2'
                value={rooms}
                onChange={e=>setRooms(e.target.value)}
                placeholder={'Введите количество жилых комнат'}
                type='number'
                />
                 <Form.Control className='mt-2'
                 value={qr_meters}
                 onChange={e=>setQrMeters(e.target.value)}
                placeholder={'Введите площадь'}
                type='number'
                />
                 <Form.Control className='mt-2'
                 value={price}
                 onChange={e=>setPrice(e.target.value)}
                placeholder={'Введите цену'}
                type='number'
                />
                 <Form.Control className='mt-2'
                name='img'
                placeholder={'Прикрепите фотографию'}
                type='file'
                onChange={selectFile}
                />
                <hr/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-success"onClick={addFlat}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
});

export default CreateFlat;