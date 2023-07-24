import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";
import { updateSourceFile } from "typescript";

export interface IUser {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  code?: string;
  verified:boolean;  
}

const UserSchema = new Schema<IUser>({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "el email es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "el password es obligatorio"],
    
  },

  rol: {
    type: String,
    default: ROLES.user,
  },
  code: {
    type: String,
    
  },
  verified:{
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function(){
  const{__v, password, _id, code, ...usuario} = this.toObject()
  return usuario
}

const User: Model<IUser> = model<IUser>("Usuario", UserSchema);
export default User;
