import { Request, Response } from "express";
import Order, {IOrder} from "../models/order";
import { ObjectId } from "mongoose";

export const getOrdenes =async (req:Request, res: Response):Promise<void> => {
    const userId: ObjectId = req.body.userConfirm._id;

    const consulta = {user: userId}

    const orders = await Order.find(consulta)

    res.json({
        data: [...orders]
    })
}

export const createOrder =async (req:Request, res: Response):Promise<void> => {
    const userId: ObjectId = req.body.userConfirm._id;

    const orderData: IOrder = req.body;

    const data = {
        ...orderData,
        user: userId,
        createdAt: new Date(),
        status: "pending"
    }

    const order = new Order(data);

    await order.save()

    res.status(201).json({
        msj: "orden creada",
        order
    })
}