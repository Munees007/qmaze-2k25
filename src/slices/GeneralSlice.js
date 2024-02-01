import { createSlice } from "@reduxjs/toolkit";

const GeneralSlice=createSlice({
    name:"general",
    initialState:{
        result:false,
        data:null
    },
    reducers:{
        setGeneralState(state,action){
            return{
                ...state,
                result:true,
                data:action.payload
            }
        }
    }
})
export const{setGeneralState}=GeneralSlice.actions;
export default GeneralSlice.reducer;