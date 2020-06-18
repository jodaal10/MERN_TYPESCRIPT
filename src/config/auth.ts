import { Request, Response, NextFunction } from 'express'
import jwt  from 'jsonwebtoken';

interface IUserRequest extends Request {
    userId: string
}

export interface IPayload {
    _id: string;
    iat: number;
} 

export const auth = (req: IUserRequest,res: Response, next: NextFunction) => {
    //Get token from header
    const token = req.header('authorization');

    //check if not token
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'})
    }
    //verify token
    try {
        const decoded = jwt.verify(token,process.env['TOKEN_SECRET'] || '') as IPayload;
        req.userId = decoded._id;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}


