import { faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/context';



const Cart = () => {
  //Handle cart
  const { cart, setcart } = useContext(AppContext);

  //Fetch cart
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/users/find-cart`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        console.log(data);
        setproducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [cart]);

  //Increase quantity
  const increaseQuantity = async (productId) => {
    try {
      const response = await fetch('/api/users/increase-quantity', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: productId,
        })
      });
      const result = await response.json();
      if (result.status == 200) {
        console.log(result);
        setproducts(result.data);
      }
      else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Decrease quantity
  const decreaseQuantity = async (productId) => {
    try {
      const response = await fetch('/api/users/decrease-quantity', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: productId,
        })
      });
      const result = await response.json();
      if (result.status == 200) {
        console.log(result);
        setproducts(result.data);
      }
      else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Remove from cart
  const removeFromCart = async (e, productId) => {
    try {
      const response = await fetch('/api/users/remove-from-cart', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: productId,
        })
      });
      const result = await response.json();
      if (result.status == 200) {
        console.log(result);
        // setproducts(result.data);
        setcart(result.data.cart);
      }
      else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Total sum
  const [sum, setsum] = useState(0);

  useEffect(() => {
    setsum(products.reduce((x, y) => {
      return x + (y.product.price * y.quantity)
    }, 0));
  }, [products]);

  //Reward
  const [useReward, setuseReward] = useState(false);
  const reward = (localStorage.getItem("reward") || 0);

  const handleCheckbox = () => {
    setuseReward(prev => !prev);
  };

  //Navigate
  const navigate = useNavigate();

  const startsearch = (e) => {
    e.preventDefault();
    navigate(`/searchresults/%20/`);
  };

  return (
    <div className='pt-[5rem] flex justify-center sm:text-sm text-xs flex-wrap'>
      <div className='flex flex-col sm:w-[500px] w-[350px] pr-2'>
        <div className='rounded-md text-gray-700 bg-red-100/70 sm:p-4 p-2 flex justify-between'>
          <div className='sm:text-sm text-[10px]'>
            <div className='mb-1 '>Deliver to : <span className='font-bold text-black'>Aditya Choudhary, 833215</span></div>
            <div>SRT-253, ACC Colony, Jhinkpani</div>
          </div>
          <div className='flex justify-center items-center '>
            <button className='text-[10px] border-[1.5px] font-bold text-red-600 border-red-600 rounded-md px-3 py-2 bg-red-100/70 hover:bg-red-50 duration-200'>CHANGE ADDRESS</button>
          </div>
        </div>
        <div className='flex-col flex pb-4'>
          {products && products.map((products) => {
            const product = products.product;
            return <div className='flex mt-4 border-[1px] p-4' key={product._id}>
              <div>
                <img className='sm:w-[8rem] w-[8rem] sm:h-[10rem] object-cover' src={product.coverImage} />
              </div>
              <div className='ml-4 flex flex-col justify-between'>
                <div className='sm:mt-2'>
                  <div className='font-bold'>{product.brand}</div>
                  <div className='w-[200px] overflow-hidden whitespace-nowrap text-ellipsis'>{product.name}</div>
                  <div className='flex border-[1px] w-max my-2'>
                    <div onClick={(e) => increaseQuantity(product._id)} className='no-select py-1 px-2 cursor-pointer flex justify-center items-center hover:bg-gray-50 w-7 h-7 text-center'><div>+</div></div>
                    <div className='py-1 px-2 w-7 h-7 text-center'>{products.quantity}</div>
                    <div onClick={(e) => decreaseQuantity(product._id)} className='no-select py-1 px-2 cursor-pointer flex justify-center items-center hover:bg-gray-50 w-7 h-7 text-center'><div>-</div></div>
                  </div>
                  <div>₹{product.price * products.quantity}</div>
                </div>
                <div className='mt-2'>
                  <button onClick={(e) => removeFromCart(e, product._id)} className='border-[1.5px] font-bold rounded-md px-3 py-2  hover:bg-gray-50 duration-200'>Remove from cart</button>
                </div>
              </div>
            </div>
          })}
          {/* <div className='flex border-[1px] p-4'>
              <div>
                <img className='w-[10rem] h-[10rem] object-cover' src="/fertilizer.jpg" />
              </div>
              <div className='ml-4 flex flex-col justify-between'>
                <div className='mt-2'>
                  <div className='font-bold'>Brand</div>
                  <div className='w-[200px] overflow-hidden whitespace-nowrap text-ellipsis'>Product name</div>
                  <div className='flex border-[1px] w-max my-2'>
                    <div onClick={(e) => increaseQuantity(e)} className='py-1 px-2 flex justify-center items-center hover:bg-gray-50 w-7 h-7 text-center'><div>+</div></div>
                    <div className='py-1 px-2 w-7 h-7 text-center'>5</div>
                    <div onClick={(e) => decreaseQuantity(e)} className='py-1 px-2 flex justify-center items-center hover:bg-gray-50 w-7 h-7 text-center'><div>-</div></div>
                  </div>
                  <div>Price</div>
                </div>
                <div className=''>
                  <button className='border-[1.5px] font-bold rounded-md px-3 py-2  hover:bg-gray-50 duration-200'>Remove from cart</button>
                </div>
              </div>
            </div> */}
          {(cart.length == 0) &&
            <>
              <div className='flex mt-4 border-[1px] p-4 justify-center items-center'>
                <div className='font-bold'>Cart is empty</div>
              </div>
              <button onClick={(e) => startsearch(e)} className='active:scale-95 duration-200 px-3 py-3 bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 font-bold text-white text-base rounded-lg mt-4 flex flex-col justify-center items-center'>
                <div className='mt-4'>
                  <div className='flex md:p-4 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                    <div className='flex p-3 md:p-4 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                      <FontAwesomeIcon className='text-black w-10 h-10 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faShop} />
                    </div>
                  </div>
                </div>
                <div className='text-xl mt-10 mb-6'>Buy products</div>
              </button>
            </>}
        </div>
      </div>
      <div className='flex flex-col md:w-[300px] sm:w-[500px] w-[350px] p-4 border-2 rounded-lg border-green-700 h-fit'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <div className='font-bold mb-1'>USE REWARDS</div>
            <div>Balance: <span>₹{reward}</span></div>
          </div>
          <div><input className='w-[1rem] h-[1rem]' type="checkbox" name="reward" value={useReward} onChange={handleCheckbox} /></div>
        </div>
        <div className='flex justify-between items-center mb-4 font-bold'>PRICE DETAILS</div>
        <div className='flex justify-between items-center mb-1'>
          <div>Total MRP</div>
          <div>₹{sum}</div>
        </div>
        <div className='flex justify-between items-center mb-1'>
          <div>Discount</div>
          <div className='text-red-600'>- ₹{(useReward) ? reward : 0}</div>
        </div>
        <div className='flex justify-between items-center border-b pb-2'>
          <div>Shipping</div>
          <div>₹{(sum == 0) ? 0 : 20}</div>
        </div>
        <div className='flex justify-between items-center my-2 font-bold'>
          <div>Total Amount</div>
          <div>₹{sum - ((useReward) ? reward : 0) - ((sum == 0) ? 0 : 20)}</div>
        </div>
        <button className='active:scale-95 duration-200 bg-green-700 px-4 py-1 rounded-md font-bold text-base text-white flex justify-center items-center'>
          <img className='invert w-10 h-10 mr-2' src='indian-rupee.png' />
          <div>Place order</div>
        </button>
      </div>
    </div>
  )
}

export default Cart
