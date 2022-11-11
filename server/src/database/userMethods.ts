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
                    isRegister: true
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
        // немного схитрил :)
        const allUser = await prisma.user.findMany({
            where: {
                isRegister: true,
            },
        });

        return allUser;
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