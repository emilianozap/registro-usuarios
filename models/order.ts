import { Model, Schema, Types, model } from "mongoose";

interface IShippingDetails{
    name: string;
    cellPhone: string;
    location: string;
    address: string;
}

interface IItem{
    desc: string;
    id: number;
    price: number;
    quantity: number;
    title: string;
}

export interface IOrder{
    createAt: Date;
    user: Types.ObjectId;
    price: number;
    shippingCost: number;
    items: IItem[];
    shippingDetails: IShippingDetails;
    status: string;
    total: number;
}

const OrderSchema = new Schema<IOrder>({
    createAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true

    },
    price:{
        type: Number,
        required:true
    },
    shippingCost:{
        type: Number,
    },
    items:{
        type:[{
            desc:{
                type:String,
                required: true
            },
            id:{
                type: Number,
                required: true
            },
            price:{
                type:Number,
                require: true
            },
            quantity:{
                type:Number,
                required: true
            },
            title:{
                type:String,
                required: true
            },
           
        }],
        require: true
    },
    shippingDetails:{
        name:{
            type:String,
            required: true
        },
        cellPhone:{
            type:String,
            require: true
        },
        location:{
            type:String,
            required: true
        },
        address:{
            type:String,
            required: true
        },
    },
    status:{
        type:String,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
})


const Order:Model<IOrder> = model<IOrder>("Order", OrderSchema)

export default Order