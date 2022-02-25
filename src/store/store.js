import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../slice/contactSlice';


export const store = configureStore({
    reducer: contactReducer,
  })