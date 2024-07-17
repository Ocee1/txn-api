import { Response } from 'express';

class AppResponse {
    constructor() {}

    public created = (res: Response, data: string | object) => {
        res.status(201).json(data);
    };

    public success = (res: Response, data: string | object) => {
        res.status(200).json(data);
    };

    public accepted = (res: Response, data: string | object) => {
        res.status(202).json(data);
    };

    public deleted = (res: Response) => {
        res.status(204).json();
    };

    public badRequest = (res: Response, data: string | object) => {
        return res.status(400).json(data);
    };

    public serverError = (res: Response, data: any) => {
        res.status(500).json(data);
    };

    public notAuthorized = (res: Response, data: string | object) => {
        res.status(403).json(data);
    };

    public notFound = (res: Response, data: string | object) => {
        res.status(404).json(data);
    };
}

export default AppResponse;
