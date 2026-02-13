import { StatusCodes } from "http-status-codes";

import User from "../schema/user.schema.js";
import Workspace from "../schema/workspace.js";
import ClientError from "../utils/errors/client.error.js";
import channelRepository from "./channel.repository.js";
import crudRepository from "./crud.repository.js";

const workspaceRepository = {
    ...crudRepository(Workspace), // factory function

    // adding custom method on the top of generic CRUD methods
    getWorkspaceByName: async function (workspaceName) {
        const workspace = await Workspace.findOne({
            name: workspaceName
        });

        if(!workspace){
            throw new ClientError ({
                message: 'Workspace not found',
                explanation: 'Invalid data sent from the client' ,
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        return workspace;
    } ,
    getWorkspaceByJoinCode: async function (joinCode) {
        const workspace = await Workspace.findOne(joinCode);
        if(!workspace){
           throw new ClientError ({
              message: 'Workspace not found',
              explanation: 'Invalid data sent from the client',
              statusCode: StatusCodes.NOT_FOUND
           })
        }
        return workspace;
    },
    addMemberToWorkspace: async function (workspaceId, memberId, role) {
        const workspace = await Workspace.findById(workspaceId);
        if(!workspace) {
            throw new ClientError({
              message: 'Workspace not found',
              explanation: 'Invalid data sent from the client',
              statusCode: StatusCodes.NOT_FOUND
            })   
        }

        const isValidUser = await User.findById(memberId);
        
        if(!isValidUser){
            throw new ClientError({
              message: 'User not found',
              explanation: 'Invalid data sent from the client',
              statusCode: StatusCodes.NOT_FOUND
            })
        }

        const isMemberAlreadyPartOfWorkspace = workspace.members.find((member) => member.memberId == memberId)

        if(isMemberAlreadyPartOfWorkspace){
            throw new ClientError({
              message: 'User already part of workspace',
              explanation: 'Invalid data sent from the client',
              statusCode: StatusCodes.FORBIDDEN
            })
        }
        
        workspace.members.push({
            memberId,
            role
        })

        await workspace.save();
        
        return workspace;
    },
    addChannelToWorkspace: async function (workspaceId, channelName) {
     const workspace = await Workspace.findById(workspaceId).populate('channels');
     if(!workspace){
        throw new ClientError({
            message: "Workspace not found",
            explanation: "Invalid data sent from the client" ,
            statusCode: StatusCodes.NOT_FOUND
        })
     }

     const isChannelAlreadyPartOfWorkspace = await Workspace.channels.find((channel)=> channel.name === channelName);
     if(isChannelAlreadyPartOfWorkspace){
        throw new ClientError({
            message: 'Channel already part of workspace',
            explanation: 'Invalid data sent from the client',
            statusCode: StatusCodes.FORBIDDEN
        })
     }

     const channel = await channelRepository.create({name:channelName});
     
     workspace.channels.push(channel);
     await workspace.save();
     
     return workspace;

    },
    fetchAllWorkspaceByMemberId: async function (memberId) {
        const isValidUser = await User.findById(memberId);
        if(!isValidUser) {
            throw new ClientError({
                message: "User not found",
                explanation: "Invalid data sent from the client",
                statusCode: StatusCodes.NOT_FOUND
            })
        }

        const workspaces = await Workspace.find({'members.memberId':memberId}).populate('members.memberId','username email avatar');
        
        return workspaces;
    }
}

export default workspaceRepository;