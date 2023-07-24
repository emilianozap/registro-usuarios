import User, {IUser} from "../models/user";
import { sendEmail } from "../mailer/mailer";

export const existeEmail = async (email: string): Promise<void> => {
    const existeMail: IUser | null = await User.findOne({email});

    if (existeMail && existeMail.verified) {
        throw new Error(`el correo ${email} ya esta registrado`)
    }

    if (existeMail && !existeMail.verified) {
        await sendEmail(email, existeMail.code as string)
        throw new Error(`el usuario ya esta registrado se envió nuevamente el código de verificación a ${email} `)
    }
}