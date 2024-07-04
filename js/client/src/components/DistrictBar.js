import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import { Context } from '../index';
import '../css/DistrictBar.css'
const DistrictBar = observer(() => {
    const {flat} =useContext(Context)
    return (
    <ListGroup className='listi'>
      {flat.district.map(district=>
        <ListGroup.Item 
        style={{cursor:'pointer'}}
        active={district.id === flat.selectedDistrict.id}
        onClick={()=>flat.setSelectedDistrict(district)}
        key={district.id}>
            {district.district_name}
        </ListGroup.Item>
        )}
    </ListGroup>
    );
});

export default DistrictBar;