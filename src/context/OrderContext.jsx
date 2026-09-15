import { createContext, useContext, useState } from "react";

const OrderContext = createContext();
const ORDERS_KEY = "veloshop-orders";

const readOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(readOrders);

  const addOrder = (order) => {
    const nextOrders = [order, ...orders];
    setOrders(nextOrders);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
  };

  const getOrdersForUser = (email) =>
    orders.filter((order) => order.email === email);

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrdersForUser }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
