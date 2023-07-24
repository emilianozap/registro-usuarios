import mongoose from "mongoose";

export const conectarBD = async():Promise<void>=>{
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("la URL no esta correctamente definida en el .env")
        }
        await mongoose.connect(dbURL)
        console.log("Base de Datos online");
        
    } catch (error) {
        throw new Error(" error de conexión BD");
    }
}

