import { faArrowLeft, faArrowRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/context';

const ProductPage = () => {
    //Fetch product
    const [product, setproduct] = useState({});
    const { productId } = useParams();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/fetch-product/${productId}/`,
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                setposter(data.data.coverImage);
                setproduct(data.data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProduct();
    }, []);

    //Image viewer
    const [poster, setposter] = useState('');

    const handlePosterChange = (image, index) => {
        setposter(image);
        setactive(index);
    };

    const [active, setactive] = useState(0);

    const nextImage = () => {
        const totalImages = product.images ? product.images.length + 1 : 1;
        setactive((prev) => {
            const newActive = (prev + 1) % totalImages;
            setposter(newActive === 0 ? product.coverImage : product.images[newActive - 1]);
            return newActive;
        });
    };

    const prevImage = () => {
        const totalImages = product.images ? product.images.length + 1 : 1;
        setactive((prev) => {
            const newActive = (prev - 1 + totalImages) % totalImages;
            setposter(newActive === 0 ? product.coverImage : product.images[newActive - 1]);
            return newActive;
        });
    };

    //Add to cart
    const { cart, setcart } = useContext(AppContext);

    const addToCart = async () => {
        try {
            const response = await fetch('/api/users/add-to-cart', {
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
                setcart(result.data.cart);
            }
            else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='mt-[4rem] sm:mb-0 mb-[4rem] flex justify-center md:flex-row flex-col'>
            <div className='m-8 flex flex-col items-center'>
                <div className='relative sm:w-[25rem] w-[20rem] mb-4'>
                    <div onClick={() => { prevImage() }} className='absolute top-1/2 left-0'><FontAwesomeIcon className='w-6 h-6 p-2 rounded-full bg-white mx-2 cursor-pointer hover:drop-shadow-lg duration-200 hover:scale-105 active:scale-100' icon={faArrowLeft} /></div>
                    <div><img className='sm:w-[25rem] w-[20rem] h-[25rem] sm:h-[30rem] object-cover border' src={poster} /></div>
                    <div onClick={() => { nextImage() }} className='absolute top-1/2 right-0'><FontAwesomeIcon className='w-6 h-6 p-2 rounded-full bg-white mx-2 cursor-pointer hover:drop-shadow-lg duration-200 hover:scale-105 active:scale-100' icon={faArrowRight} /></div>
                </div>
                <div className='flex'>
                    <div className={'flex-shrink-0 duration-200 border-2 rounded-md mr-4 cursor-pointer overflow-hidden' + ((active == 0) ? ' border-green-700 ' : ' opacity-60 hover:opacity-100 hover:border-green-700')} onClick={() => handlePosterChange(product.coverImage, 0)}><img className='w-[3rem] h-[3rem] object-cover rounded-md' src={product.coverImage} /></div>
                    {product.images && product.images.map((image, index) => {
                        return <div className={'flex-shrink-0 duration-200 border-2 rounded-md mr-4 cursor-pointer overflow-hidden' + (((index + 1) == active) ? ' border-green-700 ' : ' opacity-60 hover:opacity-100 hover:border-green-700')} onClick={() => handlePosterChange(image, index + 1)} key={image}>
                            <img className='w-[3rem] h-[3rem] object-cover rounded-md' src={image} />
                        </div>
                    })}
                </div>
            </div>
            <div className='p-8 md:w-[40rem] md:pt-[5rem]'>
                <div className='text-2xl font-bold'>{product.brand}</div>
                <div className='text-3xl font-bold'>{product.name}</div>
                <div className='italic '>Fertilizer</div>
                <div className='text-3xl my-8'>₹{product.price}</div>
                {cart.includes(productId) ? <button disabled className='px-10 py-3 rounded-3xl duration-200 font-bold border-2 border-green-700 mb-8'><FontAwesomeIcon className='pr-2' icon={faShoppingCart} />ADDED TO CART</button> : <button onClick={addToCart} className='px-10 py-3 rounded-3xl hover:bg-green-700 duration-200 hover:text-white font-bold border-2 border-green-700 mb-8'><FontAwesomeIcon className='pr-2' icon={faShoppingCart} />ADD TO CART</button>}
                <div className='font-semibold'>Description:</div>
                <div className='border-2 border-green-700 rounded-xl p-4'><strong>Natures Plus Vermi Compost - Organic Manure 1Kg</strong> is the perfect solution for enriching your soil with 100% natural nutrients. Derived from the finest organic waste and processed by earthworms, this vermicompost provides a rich blend of essential nutrients that promote healthy plant growth. It's ideal for improving soil structure, enhancing moisture retention, and boosting microbial activity. Whether you’re growing vegetables, fruits, flowers, or herbs, this organic manure ensures robust yields and flourishing plants without the use of harmful chemicals. Suitable for all types of soil, it’s an eco-friendly choice for gardeners and farmers who value sustainability.

</div>
            </div>
        </div>
    )
}

export default ProductPage
