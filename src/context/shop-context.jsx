import React, { createContext, useState} from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i<PRODUCTS.length + 1; i++){
        cart[i] = 0;
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems ] = useState(getDefaultCart());

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if ( cartItems[item] > 0){
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price
            }
        }
        return totalAmount;
    };
     
    // function for adding items to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1}))
    };

    // function for adding items to cart
     const removeFromCart = (itemId) => {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1}))
        };
        
    // function to manually add/remove items 
    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: newAmount}))
    }

    // function to get the actual context
    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount}

    return(
    <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
    ) 
};