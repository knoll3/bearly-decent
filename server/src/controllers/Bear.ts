import express from "express";
import { Bear } from "../models/Bear";

export const GetBears = async (req: express.Request, res: express.Response) => {
    const bears = await Bear.find();
    res.send(bears);
};

export const DeleteAllBears = async (
    req: express.Request,
    res: express.Response
) => {
    await Bear.deleteMany({});
    res.sendStatus(200);
};
