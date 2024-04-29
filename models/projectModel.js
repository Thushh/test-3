import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['Planning', 'In Progress', 'Completed'],
            default: 'Planning'
        },
        startDate: {
            type: Date,
            required: false,
        },
        endDate: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Project = mongoose.model('Project', projectSchema);
