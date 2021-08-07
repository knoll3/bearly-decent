import { BearInstance } from "../getContract";

BearInstance.events.NameChanged({}, function (error: any, event: any) {
    if (error) console.log(error);
    console.log(event);
});
