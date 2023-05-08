import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from 'axios';
import {
    CLEAR_ALERT,
    SHOW_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    GET_PINS_BEGIN,
    GET_PINS_SUCCESS,
    GET_PINS_ERROR,
    SUCCESS,
    ERROR,
    BEGIN,
    UPDATE_USER_SUCCESS,
    LIKE_PIN_SUCCESS,

} from "./actions";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const user_id = localStorage.getItem('user_id')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertMsg: "",
    alertColor: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    user_id: user_id,
    currentPerson:{},
    pinCreator:{},
    pins: [],
    pin: {},
    comments:[]
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: 'http://localhost:8000/api',

    })

    const displayAlert = (msg, stCode) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { msg, stCode }
        })
        clearAlert()
    }

    const clearAlert = () => {
        
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 2000);
    }

    const addUserToLocalStorage = ({  token, user_id }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user_id)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }
    //===================REGISTER USER===============================//

    const signUp = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await authFetch.post('/register', currentUser);

           const {data} = response
            const user = data.credentials.name
            const user_id =  data.credentials.email
            const token = data.token
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {user: user, token: token, user_id: user_id }
            })
            addUserToLocalStorage({ token, user_id })
            displayAlert("Signed up successfully!", "success")
        } catch (error) {
            displayAlert(error.response.data.detail, "danger")
            dispatch({
                type: REGISTER_USER_ERROR,
            })
        }
        clearAlert();
    }

    //===================LOGIN USER===============================//

    const login = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
      
            const response = await authFetch.post('/login', currentUser)
       
            const {data} = response
            const user = data.name
            const user_id = data.email
            const token = data.token

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user: user, token: token, user_id: user_id }
            })
            addUserToLocalStorage({  token, user_id })
            displayAlert("Logged in successfully!", "success")
            
        } catch (error) {
            displayAlert(error.response.data.detail, "danger")
            dispatch({
                type: LOGIN_USER_ERROR,

            })
        }
        clearAlert()
    }


    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }
    //====================================================================================//

    
    
    const getCurrentUser = async()=>{
        dispatch({type: BEGIN})
        try {
            const response = await authFetch.get('/auth/getuser', {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const {User} = response.data
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {User}
            })
            
        } catch (error) {
            dispatch({type: ERROR})
            
        }
    }
  
    const createEvent = async (Pin) => {
        dispatch({ type: BEGIN })
        try {
            const response = await authFetch.post('/pin/createPin', Pin, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            dispatch({ type: SUCCESS })
            displayAlert("Pin created successfully", "success")
            return true
        } catch (error) {
            dispatch({ type: ERROR })
            displayAlert(error.response.data, "danger")
            return false
        }
    }

    const getAllEvents = async (search) => {
        dispatch({ type: GET_PINS_BEGIN })
        try {
            if (search) {
                const response = await authFetch.get(`/pin/getAllPins?search=${search}`)
                const { Pins } = response.data
                dispatch({
                    type: GET_PINS_SUCCESS,
                    payload: { Pins }
                })
            }
            else {
                const response = await authFetch.get('/pin/getAllPins?search=all')
                const { Pins } = response.data
                
                dispatch({
                    type: GET_PINS_SUCCESS,
                    payload: { Pins }
                })
            }
        } catch (error) {
            dispatch({ type: GET_PINS_ERROR })
        }
    }

   

    const likeThePin = async (id) => {
   
        try {
            const response = await authFetch.patch('/pin/savePin', id, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const { savedPin, Pins } = response.data
            dispatch({
                type: LIKE_PIN_SUCCESS,
                payload: {savedPin, Pins}

            })
        } catch (error) {
           
            dispatch({ type: ERROR })
        }
    }


    return <AppContext.Provider
        value={{
            ...state,
            signUp,
            login,
            logoutUser,
            displayAlert,
            getCurrentUser,
            createEvent
        }}
    >
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }