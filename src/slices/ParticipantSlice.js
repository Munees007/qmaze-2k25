import { createSlice } from "@reduxjs/toolkit";
const ParticipantSlice=createSlice({
    name:"participants",
    initialState:{
        authenticated:false,
        data:null
    },
    reducers:{
        setParticipantDetails:(state,action)=>{
            return{
                ...state,
                authenticated:true,
                data:action.payload
            }
        },
        setLogoutParticipant:(state,action)=>{
            return{
                ...state,
                authenticated:false,
                data:null
            }
        }
    }
})
export const {setLogoutParticipant,setParticipantDetails}=ParticipantSlice.actions;
export default ParticipantSlice.reducer;