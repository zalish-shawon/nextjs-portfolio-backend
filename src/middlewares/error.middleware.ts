import { Request, Response, NextFunction } from "express";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
console.error(err);
const status = err.status || 500;
res.status(status).json({ message: err.message || 'Server error', details: err.details || undefined });
};