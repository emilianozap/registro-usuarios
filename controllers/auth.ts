import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import  randomstring  from "randomstring";
import { sendEmail } from "../mailer/mailer";

export const registerUser = async (req: Request, res: Response):Promise<void> => {

  const { nombre, email, password }: IUser = req.body;

  const user = new User({nombre, email, password})

 const salt = bcryptjs.genSaltSync()

 user.password = bcryptjs.hashSync(password, salt)

 const adminKey = req.headers["admin-key"]

 if (adminKey === process.env.KEYFORADMIN) {
      user.rol = ROLES.admin
 }

 const newCode = randomstring.generate(6);

 user.code = newCode;

 await user.save()

 await sendEmail(email, newCode)

 res.status(201).json({
   msj: "usuario registrado",
    user
 })

};







