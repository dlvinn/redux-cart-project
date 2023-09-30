import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}
const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
    openModal: (store, action)=>{
        store.isOpen = true;
    },
    closeModal: (store, action)=>{
        store.isOpen = false;
    }
    }
})

export default modalSlice.reducer;
export const {openModal, closeModal} = modalSlice.actions;