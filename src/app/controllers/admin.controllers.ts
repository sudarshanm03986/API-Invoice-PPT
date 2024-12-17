import * as admin from '../model/admin.model';

import {Request, Response} from 'express';

import jwt from "jsonwebtoken";

import bcrypt from 'bcryptjs'


// const hash = async (password: string): Promise<string> => {
//     return await bcrypt.hash(password, 10)
// }

const compare = async (password: string, comp: string): Promise<boolean> => {
    return await bcrypt.compare(password, comp)
}

const login = async (req: Request, res: Response): Promise<void> => {

    try {

        const [adminUser] = await admin.findAdminByUsername(req.body.username);

        if (adminUser === undefined || !await compare(req.body.password, adminUser.password)) {
            res.statusMessage = 'Invalid email/password';
            res.status(401).send();
            return;
        }

        const token = jwt.sign({user: adminUser.username}, process.env.JWT_TOKEN,  { expiresIn: '1h' });



        res.status(200).json({"token": token, "username": adminUser.username});


        return;

    } catch (err) {

        // console.log(err)
        res.statusMessage = "Internal Server Error!"+ err;
        res.status(500).send(err);
        return;
    }


}


const logout = async (req: Request, res: Response): Promise<void> => {
    // Logger.http('Logging out User:' + req.body.username )

    return;



}

export {login, logout}