import  nodemailer  from "nodemailer";

//configuración del trasporter
//recordar crear el correo con validación en 2 pasos

const transporter = nodemailer.createTransport({
    service: "gmail",
    tls:{
        rejectUnauthorized: false
    },
    auth:{
        user: "tiendaprueba133@gmail.com",
        pass: "jilsyulvbhdaesbs"
    },
    from: "tiendaprueba133@gmail.com"
    
})


// función enviar correo electrónico

export const sendEmail = async(to: string, code: string ):Promise<void> => {
    try {
        const mailOptions={
            from: `"tienda prueba" <tiendaprueba133@gmail.com>`,
            to,
            subject: "Código de verificación para tu cuenta",
            text: `Llego tu código para tienda. Tu código para verificarse es: ${code}`, 
            
        }
        
        //envió correo
        await transporter.sendMail(mailOptions),
        console.log("correo enviado");
        
    } catch (error) {
        console.error("error al enviar correo electrónico", error)
    }
}