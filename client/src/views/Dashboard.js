import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import Spinner from 'react-bootstrap/Spinner'; 
import { Button, Col, OverlayTrigger, Row, Tooltip,Toast } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContex';

import Card from 'react-bootstrap/Card'
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import AddIcon from '../assets/plus-circle-fill.svg';
import UpdatePostModal from '../components/posts/UpdatePostModal';


function Dashboard() {
  // Context
  const {authState :{user:{username}}} = useContext(AuthContext)

  const {postState:{post,posts,postsLoading},
                    getPosts,
                    setShowAddPostModal,
                    showToast:{show,message,type},
                    setShowToast} =useContext(PostContext)

  //Start :Get All posts

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body = null
  if(postsLoading) {
    body =  (
        <div className='spinner-container'>
                <Spinner animation='border' variant='info'/>
        </div>
    )
  }else if (posts.length ===0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi {username}</Card.Header>
          <Card.Title>Welcome to learnIt</Card.Title>
          <Card.Text>
            Click the button below to track your firts skill to learn 
          </Card.Text>
          <Button variant='primary' onClick={setShowAddPostModal.bind(this,true)}>LearnIt</Button>
        </Card>
      </>
    )
  }else {
    body = (
      <>
      <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
        {posts.map(post =>(
          <Col key={post._id} className='my-2'>
            <SinglePost post={post}/>
          </Col>
        ))}
      </Row>

        {/* Open Add post Modal */}

        <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
          <Button className='btn-floating' onClick={setShowAddPostModal.bind(this, true)}>
            <img src={AddIcon} alt="add-post" width='60' height='60'/>
          </Button>
        </OverlayTrigger>

      </>
    )
  }

  return (
    <>
      {body}
      <AddPostModal></AddPostModal>
      {post !== null && <UpdatePostModal/>}
      {/* After post is added , show toast */}
      <Toast 
      show={show} 
      style={{position:'fixed',top:'20%',right:'10px' ,width: 'auto',}} 
      className={`bg-${type} text-white`}
      onClose={setShowToast.bind(this,{show:false,message:'',type:null})}
      delay={3000}
      autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  )
}

export default Dashboard