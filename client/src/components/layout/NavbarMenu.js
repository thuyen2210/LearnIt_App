import React, { useContext } from 'react'
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import LearnitLogo from '../../assets/logo.svg'
import LogoutIcon from '../../assets/logout.svg'
import {Button} from 'react-bootstrap'
import {  NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContex'
import Container from 'react-bootstrap/Container';


function NavbarMenu() {

    const{authState :{user: {username}},logoutUser} = useContext(AuthContext)

    const logout = ()=>logoutUser()

  return (
    <Navbar expand='lg' bg='bg-info' variant='dark' className="bg-secondary ">
        <Container fluid>

        <Navbar.Brand className="font-weight-bolder text-white">
            <img src={LearnitLogo} alt="LearnitLogo" width='32' height='32' className='mr-2' />
            LearnIt
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav'/>

        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
                <Nav.Link className='font-weight-bolder text-while' to='/dashboard' as={NavLink}>
                    Dashboard    
                </Nav.Link> 

                <Nav.Link className='font-weight-bolder text-while' to='/about' as={NavLink}>
                    About    
                </Nav.Link> 
            </Nav>
            
            <Nav>
                <Nav.Link className='font-weight-bolder text-light ' disabled >
                    wellcome {username}
                </Nav.Link>
                <Button variant='danger' className='font-weight-bolder text-while' onClick={logout}>
                    <img src={LogoutIcon} alt="logoutIcon"  width='32' height='32' className='mr-2'/>
                    Logout
                </Button>
            </Nav>
        </Navbar.Collapse>
        </Container>

    </Navbar>
  )
}

export default NavbarMenu