import React from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import '../css/news.css'
import news1 from '../resorce/news1.jpg'
import news2 from '../resorce/news2.png'
import news3 from '../resorce/news3.jpg'
import { observer } from 'mobx-react-lite';

const News = observer(() => {
    return (
            <div className="image-background">
      <div className="overlay">
        <Container>
        <CardGroup className='mt-2'>
      <Card>
        <Card.Img variant="top" src={news1} />
        <Card.Body>
          <Card.Title>От 1160 долларов за метр. Застройщик озвучил цены на квартиры рядом с метро «Грушевка»</Card.Title>
          <Card.Text>
          На проспекте Дзержинского сейчас одновременно строятся сразу несколько жилых комплексов.
           Один из них — ЖК «Гранд Авеню». Он будет состоять из четырех высоток, стоящих на общем стилобате. 
            
           
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">07.05.2024</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img className='kartinka' variant="top" src={news2} />
        <Card.Body>
          <Card.Title>Не только Минск Мир. Сколько стоят бюджетные евродвушки с ремонтом в домах не старше десяти лет</Card.Title>
          <Card.Text>
          Решили посмотреть, сколько стоят бюджетные евродвушки с ремонтом в домах,
           что были построены в 2014 году. Некоторые объекты еще полностью не укомплектованы мебелью и техникой.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">03.05.2024</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img className='kartinka' variant="top" src={news3} />
        <Card.Body>
          <Card.Title>Суд вынес приговор застройщику ЖК «Грушевский посад». Кого в итоге наказали?</Card.Title>
          <Card.Text>
           После того, как почти все квартиры в двух домах были раскуплены, руководитель компании-застройщика сбежал за границу. Сегодня Суд Ленинского района Минска вынес приговор по делу о краже средств у дольщиков ЖК «Грушевский посад». О деталях процесса, рассказывает БЕЛТА.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">30.04.2024</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
        </Container>
      </div>
        </div>
    );
});

export default News;