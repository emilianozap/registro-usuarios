import { NextFunction, Request, Response } from "express";

export const isVerified = (req:Request, res:Response, next: NextFunction)=>{
    const{verified} = req.body.userConfirm

    if (!verified) {
        res.status(401).json({
            msj: "el usuario no esta correctamente registrado"
        })
        return
    }
    next()
}