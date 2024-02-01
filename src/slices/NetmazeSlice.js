import {createSlice} from '@reduxjs/toolkit'
import {encryptData,decryptData} from '../utils/utils';
const NetmazeSlice=createSlice({
    name:"netmaze",
    initialState:{
        isLogin:false,
        userData:null,
        questions:null,
        currentQuestion:null
    },
    reducers:{
        setNetmazeUserData:(state,action)=>{
            return{
                ...state,
                isLogin:true,
                userData:action.payload
            }
        },
        setNetmazeQuestionData:(state,action)=>{
            return{
                ...state,
                questions:action.payload
            }
        },
        setCurrentQuestion:(state,action)=>{
            return{
                ...state,
                currentQuestion:action.payload
            }
        },
        incrementCurrentAttempt:(state,action)=>{
            const userData=decryptData(state.userData)
            return{
                ...state,
                userData:encryptData({...userData,currentAttempt:userData.currentAttempt+1})
            }
        },
        setNetmazeUserLogout:(state,action)=>{
            return{
                ...state,
                isLogin:false,
                userData:null,
                questions:null
            }
        },
    }
})

export const{setNetmazeUserData,setNetmazeQuestionData,setNetmazeUserLogout,incrementCurrentAttempt,setCurrentQuestion}=NetmazeSlice.actions;
export default NetmazeSlice.reducer;