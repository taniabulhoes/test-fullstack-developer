import { PrismaClient } from "@prisma/client";
import { IUser, IUserRequest } from "../interfaces/IUser.js";

const prisma = new PrismaClient();

const createUser = async (user: IUserRequest): Promise<IUser> => {
    const newUser = await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password_hash: user.password,
            active: user.active,
        },
    });

    return newUser;
};

const getUserById = async (id) => {
    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    });
    return user;
};

const getUserByEmail = async (email) => {
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });
    return user;
};

const getAllUsers = async () => {
    const users = await prisma.users.findMany()

    return users;
};
const updateUserById = async (id, updates): Promise<IUser> => {
    const updatedUser = await prisma.users.update({
        where: {
            id,
        },
        data: updates,
    });
    return updatedUser;
};

const deleteUserById = async (id) => {
    const deletedUser = await prisma.users.update({
        where: {
            id,
        },
        data: { active: 0 },
    });
};

export const userModel = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById
}
