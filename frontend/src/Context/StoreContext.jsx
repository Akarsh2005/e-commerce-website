import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [product_list, setProductList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId]; // Remove item if quantity reaches zero
            }
            return updatedCart;
        });
        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, item) => {
            const itemInfo = product_list.find((product) => product._id === item);
            return itemInfo ? total + itemInfo.price * cartItems[item] : total;
        }, 0);
    };

    const fetchProductList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            setProductList(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response?.data?.cartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchProductList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        url,
        product_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        setCartItems,
        currency,
        deliveryCharge,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
