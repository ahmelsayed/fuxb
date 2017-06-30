import { Request, Response } from 'express';

export function proxy(_: Request, res: Response) {
    res.json({
        name: 'proxy'
    });
}