import {createSlice} from '@reduxjs/toolkit';
const AdminSlice=createSlice({
    name:"admin",
    initialState:{
        authenticated:false,
        data:null
    },
    reducers:{
        setAdminDetails:(state,action)=>{
            return{
                ...state,
                authenticated:true,
                data:action.payload
            }
        },
        setLogoutAdmin:(state,action)=>{
            return{
                ...state,
                authenticated:false,
                data:null
            }
        },
        updateNetmazeQuestions:(state,action)=>{
            return{
                ...state,
                data:{...state.data,netmazeQuestions:action.payload}
            }
        },
        updateNetmazeParticipants:(state,action)=>{
            return{
                ...state,
                data:{...state.data,netmazeParticipants:action.payload}
            }
        }
    }
})
export const {setAdminDetails,setLogoutAdmin,updateNetmazeQuestions,updateNetmazeParticipants}=AdminSlice.actions;
export default AdminSlice.reducer;
