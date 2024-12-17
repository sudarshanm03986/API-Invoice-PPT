// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
// import Logger from "../../config/logger";
import jwt from 'jsonwebtoken';

const authenticate = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    const token = req.header('X-Authorization')

    if (token === undefined) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {

        jwt.verify(token,  process.env.MCNA_JWT_TOKEN , (err, data) => {

            if (err) {
                res.statusMessage = "Token Is not Valid";
                res.status(403).json();

                return;



            } else {
                next();

            }


        })

        return;


    } catch (err) {
        // Logger.error(err)
        res.statusMessage = "Internal Server Error"
        res.status(500).send();
        return;
    }



 }





 export {authenticate};