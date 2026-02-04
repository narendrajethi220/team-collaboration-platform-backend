import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email must be unique'],
        lowercase:true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength:[6,'Password must be at least 6 characters']
    },
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:[3,'Username must be at least 3 characters']
    },
    avatar: {
        type:String
    }
},{timestamps:true})

userSchema.pre('save',function(next){
    const user = this;
    user.avatar = `https://robohash.org/${user.username}`;
    next();
})

const User = mongoose.model('User', userSchema);
export default User;