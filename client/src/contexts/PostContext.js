import {createContext,useReducer, useState} from 'react'
import { PostRudcer } from '../reduces/PostReducer'
import axios from 'axios'
import {apiUrl,POSTS_LOADED_SUCCESS,POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST} from './Contants'


export const PostContext = createContext()

const PostContextProvider = ({children})=> {
    // State
    const [postState, dispatch] = useReducer(PostRudcer,{
        post:null,
        posts:[],
        postsLoading:true
    })

    const [showAddPostModal,setShowAddPostModal] = useState(false)
    const [showUpdatePostModal,setShowUpdatePostModal] = useState(false)
    const [showToast,setShowToast] = useState({
        show:false,
        message:'',
        type:null
    })

    //Getall posts
    const getPosts = async() => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success) {
                dispatch({type:POSTS_LOADED_SUCCESS, payload:response.data.posts})
            }
        } catch (error) {
            dispatch({type:POSTS_LOADED_FAIL})
        }

    }

    //Add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`,newPost)
            if(response.data.success){
                dispatch({type:ADD_POST, payload:response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false,message:'Sever error'}
        }
    }

    //delete post 
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(response.data.success){
                dispatch({type:DELETE_POST,payload:postId})
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Find post clicked when user updatting post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({type:FIND_POST, payload:post})

    }

    //Update post
    const updatePost = async updatePost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`,updatePost)
            if(response.data.success){
                dispatch({type:UPDATE_POST,payload:response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false,message:'Sever error'}
            
        }
    }

    //Post context data
    const postContextData = {
        postState, 
        getPosts, 
        showAddPostModal,
        setShowAddPostModal, 
        addPost,showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal
    }

    return(
        <PostContext.Provider value={postContextData}>
            {children}

        </PostContext.Provider>
    )
}

export default PostContextProvider