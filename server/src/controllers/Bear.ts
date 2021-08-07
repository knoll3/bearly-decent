import { Bear } from "../models/Bear";

export const GetBears = async (req: any, res: any) => {
    const bears = await Bear.find();
    res.send(bears);
};

export const DeleteAllBears = async (req: any, res: any) => {
    await Bear.deleteMany({});
    res.sendStatus(200);
};
