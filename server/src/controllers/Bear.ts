import { Bear } from "../models/Bear";

export const GetBears = async (req: any, res: any) => {
    const bears = await Bear.find();
    res.send(bears);
};
