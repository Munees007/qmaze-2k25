import {createSlice} from '@reduxjs/toolkit';
const AnswerKeySlice=createSlice({
    name:"answerkey",
    initialState:{
        result:false,
        data:null
    },
    reducers:{
        setAnswerKey:(state,action)=>{
            return{
                result:true,
                data:action.payload
            }
        }
    }
})
export const{setAnswerKey}=AnswerKeySlice.actions;
export default AnswerKeySlice.reducer;