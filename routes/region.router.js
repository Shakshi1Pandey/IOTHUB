import express from "express";
import regionService from "../service/region.service";

const router = express.Router()

router.get('/allRegion', (req, res) => {
    regionService.getAll(req, res);
});

router.post('/addRegion', (req, res) => {
    regionService.addRegion(req, res);
});

router.post('/deleteRegion', (req, res) => {
    regionService.deleteRegion(req, res);
});


export default router;
