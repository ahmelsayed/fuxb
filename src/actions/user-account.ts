import { Request, Response } from 'express';

export function getTenants(_: Request, res: Response) {
    res.json({
        name: 'getTenants'
    });
}

export function switchTenant(req: Request, res: Response) {
    const params: { tenantId: string } = req.params;
    res.json({
        name: params.tenantId
    });
}

export function getToken(_: Request, res: Response) {
    res.json({
        name: 'getToken'
    });
}