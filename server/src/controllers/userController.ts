import { Request, Response } from "express";
import { changeUserById, createUser, deleteUserById, getUserAll, getUserById } from "../database/userMethods";
import EncodeServer from "../utils/encodeUtils";

// происходят основные действия между пользователем и сервером
export default class UserController {
    public async reg(req: Request, res: Response) {
        try {
            const { login, password } = req.body;

            if (login === '' ||  password === '')
                return res.status(404).json({ message: "[Error] [User-Reg] 'Any input haven`t value.'" });

            const hashPassword = await new EncodeServer().encode(password);

            const state = await createUser(login, hashPassword);

            if (state === false)
                return res.status(400).json({ message: "This login must be register on system." });

            return res.status(200).send({ message: "Successfully registration account on system!" });
        } catch (e) {
            console.error(e);
        }
    }

    public async getAllUser(req: Request, res: Response) {
        try {
            const state = await getUserAll();

            res.status(200).json({ ...state });
        } catch (e) {
            console.error(e);
        }
    }

    public async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const state = await getUserById(Number(id));

            res.json(state);
        } catch (e) {
            console.error(e);
        }
    }

    public async changeUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const state = await changeUserById(Number(id));
            res.status(200).json(state);
        } catch (e) {
            console.error(e);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            deleteUserById(Number(id));

            res.status(200).json({ message: 'Account -> deleted!' });
        } catch (e) {
            console.error(e);
        }
    }
}