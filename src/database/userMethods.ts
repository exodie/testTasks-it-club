import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(login: string, password: string): Promise<boolean | undefined> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                login: login,
            },
        });

        if (!user) {
            const newUser = await prisma.user.create({
                data: {
                    login: login,
                    password: password,
                },
            });

            console.log(newUser);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
    }
}

export async function getUserAll() {
    try {
        const allUser = await prisma.user.findMany();

        let obj = {};

        for (let key in allUser) {
            obj = {
                id: allUser[key].id,
                login: allUser[key].login,
                password: allUser[key].password,
                role: allUser[key].role,
                isAdmin: allUser[key].isAdmin
            };
        }

        return obj;
    } catch (e) {
        console.error(e);
    }
}

export async function getUserById(id: number): Promise<{} | undefined | boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
    }
}

export async function changeUserById(id: number): Promise<{} | undefined | boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },

            select: {
                isAdmin: true
            }
        });

        if (!user) return false;

        const updUser = await prisma.user.update({
            where: {
                id: id,
            },

            data: {
                isAdmin: !user?.isAdmin
            }
        });

        return {
            old: user,
            new: updUser
        };
    } catch (e) {
        console.error(e);
    }
}

export async function deleteUserById(id: number) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            }
        });

        return user;
    } catch (e) {
        console.error(e);
    }
}