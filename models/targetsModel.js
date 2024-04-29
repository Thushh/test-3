import mongoose from "mongoose";

const targetSchema = mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Achieved', 'Missed'],
            default: 'Pending'
        },
    },
    {
        timestamps: true,
    }
);

export const Target = mongoose.model('Target', targetSchema);
