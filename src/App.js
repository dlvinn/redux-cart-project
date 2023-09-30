import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar'
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import { useEffect } from "react";
import Modal from './components/Modal';
function App() {
  const {isOpen} = useSelector((store)=> store.modal)
  const { cartItems, isLoading } = useSelector((store)=>store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems('random'))
  }, [])
  
  if(isLoading){
    return <h1>Loading...</h1>
  }
  return <main>
    {isOpen && <Modal />}
  <Navbar/>
  <CartContainer />
  </main>;
}
export default App;
