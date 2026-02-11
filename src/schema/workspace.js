import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: { 
       type: String, 
       required: [true, 'Workdspace name is required'],
       unique: true
    },
    description: {
        type: String
    },
    members: [ // array of object  (every workspace have members)
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            role: {
                type: String, 
                enum: ['admin', 'member'],
                default:'member'
            }
        }
    ],
    joinCode: { // code to join the workspace
        type: String, 
        required: [true, 'Join code is required']
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }
},{timestamps: true})

const Workspace = mongoose.Model('Workspace',workspaceSchema);
export default Workspace;
