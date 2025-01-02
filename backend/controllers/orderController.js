import Order from "../models/orderModel.js";
import CartList from "../models/cartListModel.js";
import { jwtDecode } from "jwt-decode";

export const createOrder = async (req, res) => {
  const token = req.headers.authorization || req.headers.Authorization;

  if (!token) {
    return res.status(403).json({ message: "You are not authorized" });
  }

  const decoded = jwtDecode(token);
  const id = decoded.id;

  const { items } = req.body;
  try {
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items array is missing or empty" });
    }

    const cartItems = await CartList.find({ user: id });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Your Cart Is Empty" });
    }

    const orderItems = cartItems.map((cartItem) => {
      const inputItem = items.find(
        (item) => item.productId === String(cartItem.productId)
      );

      if (!inputItem) {
        throw new Error(
          `Invalid input for product ID: ${cartItem.productId}. Please fill all required fields.`
        );
      }

      const { size, color, qty, status } = inputItem;

      if (!size || !color || !qty) {
        return res.status(400).json({ message: "Fill All The Empty Fields" });
      }
      return {
        title: cartItem.title,
        qty,
        price: cartItem.price,
        size,
        color,
        amount: Number(cartItem.price * qty),
        status: status,
        product: cartItem.productId,
      };
    });

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.amount,
      0
    );

    const newOrder = new Order({
      user: id,
      orderItems,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(200).json({
      message: "Order created successfully",
      order: savedOrder,
    });

    await CartList.deleteMany({ user: id });
  } catch (error) {
    console.log("server error happened", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const orderList = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletedOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const orderCheckout = async (req, res) => {

  try {
   
  } catch (error) {
    console.error("Error in checkout:", error.message);
    res.status(500).json({ message: error.message });
  }
};

