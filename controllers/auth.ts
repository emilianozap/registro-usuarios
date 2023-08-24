import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import generarJWT from "../helpers/generaJWT";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre, email, password }: IUser = req.body;

  const user = new User({ nombre, email, password });

  const salt = bcryptjs.genSaltSync();

  user.password = bcryptjs.hashSync(password, salt);

  const adminKey = req.headers["admin-key"];

  if (adminKey === process.env.KEYFORADMIN) {
    user.rol = ROLES.admin;
  }

  const newCode = randomstring.generate(6);

  user.code = newCode;

  await user.save();

  await sendEmail(email, newCode);

  res.status(201).json({
    msj: "usuario registrado",
    user,
  });
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        msg: "no se encontró el email en la base de datos",
      });
      return;
    }

    if (user.verified) {
      res.status(400).json({
        msg: "usuario ya esta verificado",
      });
      return;
    }

    if (user.code !== code) {
      res.status(401).json({
        msg: " el código es incorrecto",
      });
      return;
    }

    await User.findOneAndUpdate({ email }, { verified: true });
    res.status(200).json({
      msg: "Usuario verificado con éxito",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        msg: "no se encontró el email en la base de datos",
      });
      return;
    }

    const validarPassword = bcryptjs.compareSync(password, user.password);

    if (!validarPassword) {
      res.status(400).json({
        msg: "la contraseña es incorrecta",
      });
      return;
    }

    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en el servidor",
    });
  }
};

export const recuperarPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        msg: "no se encontró el email en la base de datos",
      });
      return;
    }

    const newCode = randomstring.generate(6);

    user.code = newCode;

    user.code = newCode;

    await sendEmail(email, newCode);

    res.status(200).json({
      msg: "se a enviado a tu correo electrónico tu código de verificación",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en el servidor",
    });
  }
};

export const editPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password, code }: IUser = req.body;
  

  try {

    const user = await User.findOne({ code });
    if (!user) {
      res.status(400).json({
        msg: "el código no coincide",
      });
      return;
    }
    await User.findOneAndUpdate({password});
    res.status(200).json({
      msg: "contraseña modificada con éxito",
    });
  } catch (error) {}
};
