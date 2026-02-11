import mongoose from "mongoose"

const channleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Channel name is required']
    }
},{timestamps:true})

const Channel = mongoose.model('Channel',channleSchema);

export default Channel;