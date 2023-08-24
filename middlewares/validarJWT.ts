import { NextFunction,Request,Response } from "express";
import jwt, {JwtPayload } from "jsonwebtoken";
import User, {IUser} from "../models/user"


export const validarJWT =async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    
    const token = req.headers["x-token"] as string;

    if(!token){
        res.status(401).json({
            msj: "no hay toquen en la petición"
        })
        return
    }

    try {
        const claveSecreta = process.env.CLAVESECRETA as string;
        const payload = jwt.verify(token, claveSecreta) as JwtPayload
        const {id} = payload;

        const userConfirm: IUser|null = await User.findById(id)

        if (!userConfirm) {
            res.status(401).json({
                msj: "Token no valido"
            })
        
            return;
        }

        req.body.userConfirm = userConfirm

        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: " error token no valido "
        })
        
    }
    
}

