import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import Filterpanel from '../../components/FilterPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faList, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from '../../context/context';


const Searchresults = () => {
    //Sort and filter
    const { search } = useParams();
    const [searchby, setsearchby] = useState('Recently added');
    const [products, setproducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await fetch(`/products/${search}/`,
    //                 {
    //                     method: "POST",
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         searchBy: searchby,
    //                     })
    //                 }
    //             );
    //             const data = await response.json();
    //             console.log(data);
    //             setproducts(data.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchProducts();
    // }, [search, searchby]);

    //View products
    const navigate = useNavigate();
    const gotoproducts = (productId) => {
        console.log(productId)
        navigate(`/product/id/${productId}/`);
    };

    return (
        <>
            <Navbar />
            <div className='pt-[4rem] flex w-screen h-screen overflow-hidden'>
                <Filterpanel setsearchby={setsearchby} searchby={searchby} />
                <div className='flex-1 overflow-auto flex-col'>
                    <div className='border-b text-sm pl-2 flex justify-between items-center'>
                        <div className='py-2 px-3'>
                            yo search results with result {(search.trim() == "") ? 'all products' : search} with {searchby}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-around'>
                        {products && products.map((product) => {
                            return <div onClick={() => { gotoproducts(product._id) }} className='rounded-lg cursor-pointer flex flex-col w-[13rem] h-[20rem] m-4 overflow-hidden hover:shadow-lg' key={product._id}>
                                <div className='relative'>
                                    <img className={' object-cover w-[13rem] h-[15rem] ' + ((product.quantity == 0) ? ' opacity-50 ' : ' ')} src={product.coverImage} alt="" />
                                    {(product.quantity == 0) && <div className='text-xl absolute text-center top-1/2 w-full translate-y-[-50%]'>Sold out</div>}
                                    {isAuth && <div onClick={e => { handleLike(e, product._id) }} className='absolute bottom-3 right-0 '>
                                        <button className='mr-3 w-8 h-8 hover:scale-110 active:scale-100 duration-200 bg-white rounded-full'>{(wishlist.includes(product._id)) ? <FontAwesomeIcon className='text-red-600' icon={solidHeart} /> : <FontAwesomeIcon className='' icon={faHeart} />}</button>
                                        <div>10</div>
                                    </div>}
                                </div>
                                <div className='mt-3 mx-3'>
                                    <div className='font-bold text-ellipsis text-nowrap overflow-hidden'>{product.name}</div>
                                    <div className='text-sm'>Rs.{product.price}</div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Searchresults
