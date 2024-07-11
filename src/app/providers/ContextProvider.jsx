"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  //! Get User
  const { data: user, refetch: userRefetch } = useQuery({
    queryKey: ["profile", "user", "all"],
    queryFn: async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/user");
        if (data.success) return data.user;
        else return null;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
  });

  //! Localstorage Management Section -Start---------------------------
  const [carts, setCarts] = useState([]);
  const [cartReloader, setCartReloader] = useState(true);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("carts"));
    if (storedItems) {
      setCarts(storedItems);
    }
  }, [cartReloader]);

  const addItem = (item) => {
    const updatedCarts = [...carts];
    const existingItemIndex = updatedCarts.findIndex(
      (cartItem) =>
        cartItem._id === item._id && cartItem.variants.mg === item.variants.mg
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase the count
      updatedCarts[existingItemIndex].count += item.count;
    } else {
      // If item does not exist, add it to the array
      updatedCarts.push(item);
    }

    localStorage.setItem("carts", JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    setCartReloader(!cartReloader);
  };

  const updateItemCount = (id, mg, newCount) => {
    if (newCount == 0) {
      removeItemFromCart(id, mg);
    } else {
      const updatedCarts = carts.map((cartItem) => {
        if (cartItem._id === id && cartItem.variants.mg === mg) {
          return { ...cartItem, count: newCount };
        }
        return cartItem;
      });

      localStorage.setItem("carts", JSON.stringify(updatedCarts));
      setCarts(updatedCarts);
      setCartReloader(!cartReloader);
    }
  };

  const removeItemFromCart = (id, mg) => {
    const confirmed = confirm(
      "Do you want to delete this item from your cart?"
    );
    if (!confirmed) return;
    const newItems = carts.filter(
      (cartItem) => !(cartItem._id === id && cartItem.variants.mg === mg)
    );
    localStorage.setItem("carts", JSON.stringify(newItems));
    setCarts(newItems);
    setCartReloader(!cartReloader);
  };

  const clearCart = () => {
    localStorage.removeItem("carts");
    setCarts([]);
    setCartReloader(!cartReloader);
  };

  //! Localstorage Management Section -End---------------------------------

  const addToCart = async (product) => {
    addItem({ ...product });
  };

  const info = {
    user,
    loading,
    userRefetch,
    addToCart,
    carts,
    removeItemFromCart,
    updateItemCount,
    clearCart,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
