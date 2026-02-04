import crudRepository from "./crud.repository.js";
import User from "../schema/user.schema.js";

const userRepository = {
  ...crudRepository(User),
  getByEmail: async function(email){
    const user = await User.findOne({email});
    return user;
  },
  getByUsername: async function(username){
    const user = await User.fundOne({username}).select('-password'); // except password
    return user;
 }
}

export default userRepository;