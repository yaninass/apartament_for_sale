import React, { useContext, useEffect } from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import DistrictBar from '../components/DistrictBar';
import FlatsList from '../components/FlatsList';
import '../css/Flats.css'
import { Context } from '..';
import { fetchDistrict, fetchFlat } from '../http/flatAPI';
import { observer } from 'mobx-react-lite';
import Pages from '../components/Pages';

const Flats = observer(() => {
  const{flat}=useContext(Context)
  useEffect(() => {
    fetchDistrict().then(data => flat.setDistrict(data));
    fetchFlat().then(data => {
      flat.setFlats(data.rows);
      flat.setTotalCount(data.count);
    });
  }, []);
 
  useEffect(() => {
    fetchFlat(flat.selectedDistrict.id, flat.page, 6).then(data => {
      flat.setFlats(data.rows);
      flat.setTotalCount(data.count);
    });
  }, [flat.page, flat.selectedDistrict]);

    return (
      <div className="image-background">
      <div className="overlay"></div>
       <Container>
        <Row >
          <Col className="mt-2" md={3}>
            <DistrictBar/>
          </Col>
          <Col md={9}>
          <FlatsList/>
          <Pages/>
          </Col>
        </Row>
       </Container>
       </div>
    );
});

export default Flats;