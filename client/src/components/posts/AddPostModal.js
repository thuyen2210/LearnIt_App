import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext'


function AddPostModal() {

  //Contexts
  const {
    showAddPostModal,
    setShowAddPostModal, 
    addPost,
    setShowToast
    
  } = useContext(PostContext)

  //State
  const [newPost,setNewPost] = useState({
    title:'',
    description:'',
    url:'',
    status:''
  })

  const {title,description,url,status} =newPost

  const onChangeNewPostForm = event => setNewPost({...newPost,[event.target.name]:event.target.value})

  const closeDialog = () => {
    resetAddPostData()
  }

  const onSubmit = async event => {
    event.preventDefault()
    const {success, message} = await addPost(newPost)
    resetAddPostData()
    setShowToast({show:true,message,type:success ? 'success' : 'danger'})
  }

  const resetAddPostData =() => {
    setNewPost({title:'',description:'',url:'',status:''})
    setShowAddPostModal(false)
  }

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
        <Modal.Header>
            <Modal.Title>What do you want to learn?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
            <Modal.Body>
                <Form.Group>
                  <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeNewPostForm}/>
                  <Form.Text id='title-help' muted>Required</Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Control as='textarea' rows={3} placeholder='Description' name='description' value={description} onChange={onChangeNewPostForm} />
                  <Form.Text id='title-help' muted>Required</Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url' value={url} onChange={onChangeNewPostForm} />
                </Form.Group>
                <Form.Group>
                  <Form.Control as='select' value={status}  name='status' onChange={onChangeNewPostForm}>
                    <option value="TO LEARN">TO LEARN</option>
                    <option value="LEARNING">LEARNING</option>
                    <option value="LEARNED">LEARNED</option>
                  </Form.Control>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button className='bg-danger' onClick={closeDialog}>Cancel</Button>
              <Button className='bg-success' type='submit'>LearnIt!</Button>
            </Modal.Footer>
        </Form>

    </Modal>
  )
}

export default AddPostModal