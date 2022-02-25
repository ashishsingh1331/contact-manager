import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    contacts :false
}
 const contactSlice = createSlice({
    name:'contact',
    initialState:initialState,
    reducers:{
        addContact() {

        },
        replaceContacts(state,payload){
            state.contacts  = payload.payload
        }

    }
});


export const contactActions =  contactSlice.actions;
export default contactSlice.reducer;