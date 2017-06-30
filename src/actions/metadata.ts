import { Request, Response } from 'express';


export function getBindingConfig(_: Request, res: Response) {
    res.json({
        name: 'getBindingConfig'
    });
}


export function getResources(_: Request, res: Response) {
    res.json({
        name: 'getResources'
    });
}

export function getRuntimeVersion(_: Request, res: Response) {
    res.json({
        name: 'getRuntimeVersion'
    });
}

export function getRoutingVersion(_: Request, res: Response) {
    res.json({
        name: 'getRoutingVersion'
    });
}