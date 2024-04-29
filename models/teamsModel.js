import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        members: [{
            memberName: String,
            role: String,
            email: String,
        }],
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Team = mongoose.model('Team', teamSchema);
