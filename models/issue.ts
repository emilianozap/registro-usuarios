import { Model, Schema, model, Types  } from "mongoose";

export interface IIssue {
    title: string;
    description: string;
    priority: number;
    user: Types.ObjectId;
    createdAt: Date
}

const IssueSchema = new Schema<IIssue>({
    title: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    description:{
        type: String,
        required: [true ,"La descripción es obligatoria"]
    },
    priority:{
        type: Number,
        required: [true, ("la prioridad es obligatoria")]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
})

const Issue: Model<IIssue> = model<IIssue>("Issue", IssueSchema)

export default Issue