import { Request, Response } from 'express';

export function getTemplates(_: Request, res: Response) {
    res.json({
        name: 'Ahmed'
    });
}