import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import axios from "axios";
const url = 'https://course-api.com/react-useReducer-cart-project';
const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}//this one is the state and changing in this state will trigger rerender
export const getCartItems = createAsyncThunk('cart/getCartItems', async(name, thunkAPI) => {
        try{
        console.log(name);
        console.log(thunkAPI.getState())
        const res = await axios(url)
        return res.data
        }catch(err){
        return thunkAPI.rejectWithValue('there was an error...')
        }

        // return fetch(url)
        //         .then((res)=>res.json())
        //         .catch((err)=>console.log(err));
})
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        clearCart: (store) =>{
            store.cartItems = []
        },
        removeItem: (store, action)=>{
            const itemId = action.payload;
            const newArray = store.cartItems.filter((item)=> item.id !== itemId)
            store.cartItems = newArray;
        },
        increaseItem: (store, {payload})=>{
            const currentItem = store.cartItems.find((item)=>(
                item.id === payload.id
            ));
            currentItem.amount = currentItem.amount + 1;
        },
        decreaseItem: (store, {payload})=>{
            const currentItem = store.cartItems.find((item)=>(
                item.id === payload.id
            ));
            currentItem.amount = currentItem.amount - 1;
        },
        calculateTotals: (store)=>{
            let amount = 0;
            let total = 0;
            store.cartItems.forEach(item => {
                amount += item.amount;
                total += item.amount * item.price; 
            });
            store.amount = amount;
            store.total = total;

        },
        

    },
    extraReducers: (builder)=>{
        builder.addCase(getCartItems.pending,(store)=>{
            store.isLoading = true;
            }).addCase(getCartItems.fulfilled,(store, action)=>{
                // console.log(action)
                store.isLoading = false;
                store.cartItems = action.payload;
            }).addCase(getCartItems.rejected,(store,action)=>{
                store.isLoading = false;
                console.log(action);
            })
    }
    
})
export default cartSlice.reducer;
export const {clearCart, removeItem, increaseItem, decreaseItem, calculateTotals} = cartSlice.actions;
