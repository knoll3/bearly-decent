import { Bear } from "../models/Bear";
import { router } from "../index";

router.get("/bears", async (req, res) => {
    const bears = await Bear.find();
    res.send(bears);
});

router.post("/bears", async (req, res) => {
    const bear = new Bear({
        name: "Polar Bear",
        description: "The polar bear eats bamboo",
    });
    await bear.save();

    res.send(bear);
});
