import {Tuple, configureStore} from '@reduxjs/toolkit';
import GeneralSlice from './slices/GeneralSlice';
import ParticipantSlice from './slices/ParticipantSlice';
import AdminSlice from './slices/AdminSlice';
import NetmazeSlice from './slices/NetmazeSlice';
import AnswerKeySlice from './slices/AnswerKeySlice';
import { thunk } from 'redux-thunk';

export const store=configureStore({
    reducer:{
        general:GeneralSlice,
        participant:ParticipantSlice,
        admin:AdminSlice,
        netmaze:NetmazeSlice,
        result:AnswerKeySlice
    },
    middleware:()=>new Tuple(thunk)
})