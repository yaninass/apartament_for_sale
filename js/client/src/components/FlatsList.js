import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Row } from 'react-bootstrap';
import FlatItem from './FlatItem';


const FlatsList = observer(() => {
    const {flat} = useContext(Context)
    
    
    return (
       <Row className="d-flex mt-2">
        {flat.getflats().map(item=>
            <FlatItem key={item.id} flat={item}/>
            )}
       </Row>
    );
});

export default FlatsList;