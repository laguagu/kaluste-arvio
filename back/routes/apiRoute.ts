import express from 'express';
import { calculateAveragePrice } from '../functions/scrapeTori';

const apiRoute : express.Router = express.Router();

apiRoute.get("/", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        res.status(200).json({ "message" : "apiroute initialized"});
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

apiRoute.post("/scrapeTori", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {
        let furnitureType : string = req.body.furnitureType;
        let brand : string = req.body.brand || "";
        let model : string = req.body.model || "";
        let avgPrice = await calculateAveragePrice(furnitureType, brand, model);
        res.status(200).json({ "message" : avgPrice});
    } catch (e : any) {
        res.status(404).json({ "error" : `error fetching: ${e}` });
    }
});

export default apiRoute;