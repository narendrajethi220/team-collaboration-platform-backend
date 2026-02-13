import Channel from "../schema/channel.schema.js";
import crudRepository from "./crud.repository.js";

const channelRepository = {
    ...crudRepository(Channel)
}

export default channelRepository;