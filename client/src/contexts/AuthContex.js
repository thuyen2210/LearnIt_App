import { createContext, useReducer,useEffect } from "react"
import axios from 'axios'

import {apiUrl} from "./Contants"
import {LOCAL_STORAGE_TOKEN_NAME} from "./Contants"
import { AuthReducer } from "../reduces/AuthReducer"
import SetAuthToken from "../utils/SetAuthToken"



export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading:true,
        isAuthenticated:false,
        user:null
    })

  //Authenticated user
                const loadUser = async () => {
                    if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                        SetAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
                    }
                    try {
                        const response = await axios.get(`${apiUrl}/auth`)
                        if(response.data.success){
                            dispatch({type:'SET_AUTH',payload:{isAuthenticated:true,user:response.data.user}})
                            
                        }
                    } catch (error) {
                        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                        SetAuthToken(null)
                        dispatch({type:'SET_AUTH',payload:{isAuthenticated:false,user:null}})
                        
                    }
                }

 
  useEffect(() => {
    
    loadUser();
  }, []);

    //Login

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`,userForm)
            if(response.data.success){
                
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                
                // window.location.reload();        
                
                await loadUser()
                
            }
            

            return response.data
        } catch (error) {
            if(error.response.data)
            return error.response.data
        
            else
            return{success:false, message:error.message}
        }
    }
    

    //Register

    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

            await loadUser()

            return response.data
        } catch (error) {
            if(error.response.data)
            return error.response.data
        
            else
            return{success:false, message:error.message}
        }
    }

    //LogOut
    const logoutUser = ()=> {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({type:'SET_AUTH',payload:{isAuthenticated:false,user:null}})
        window.location.reload();   
    }

    //Context data
    const AuthContextData = {loginUser,registerUser,logoutUser,authState}

    //return provider
    return(
        <AuthContext.Provider value={AuthContextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider