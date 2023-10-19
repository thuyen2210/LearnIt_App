import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function About() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3  bg-secondary h3"
      justify
      
    >
      
      <Tab eventKey="profile" title="Profile" className="text-center  "  >
         <h1>
         My Profile 
          </h1>
        <Card className="text-center">
      <Card.Header className='h2'>Đặng Thế Thuyên</Card.Header>
      <Card.Body>
        <Card.Title>Web_tieu_su</Card.Title>
        <Card.Text>
          Please click below to go
        </Card.Text>
        <Button variant="primary" 
        href='https://thuyen2210.github.io/tieusu_web/?fbclid=IwAR2Os7SWzaKubzwLPnM3luJjnP0uwPHuYzKv-UdnPOUZ82zZRQfP2kzm2eU'>
          Go here!!!</Button>
      </Card.Body>
    </Card>
      </Tab>
      
      <Tab eventKey="contact" title="Contact"  className="text-center  ">
      <Card>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Text>
            SĐT: 0377789208
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Body>
          <Card.Text>
            Gmail: dangthethuyen2002@gmail.com
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Body>
          <Card.Text>
            Facebook: Đặng Thế Thuyên
          </Card.Text>
          <Button variant="primary" 
        href='https://www.facebook.com/profile.php?id=100007362887304'>
          Go here!!!</Button>
        </Card.Body>
      </Card>
      </Tab>
    </Tabs>
  );
}

export default About;