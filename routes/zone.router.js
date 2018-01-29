import express from "express";
import zoneService from "../service/zone.service";

const router = express.Router()

router.get('/allZone', (req, res) => {
    zoneService.getAll(req, res);
});

router.post('/addZone', (req, res) => {
    zoneService.addZone(req, res);
});

router.post('/deleteZone', (req, res) => {
    zoneService.deleteZone(req, res);
});


export default router;
