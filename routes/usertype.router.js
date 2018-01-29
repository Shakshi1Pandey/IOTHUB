/**
 * @file(asset.router.js) All routing of asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 29-Jan-2018
 * @lastModifedBy Deepak
 */
import express from "express";
import userTypeService from "../service/usertype.service";

const router = express.Router()

router.get('/allUsertype', (req, res) => {
    userTypeService.getAll(req, res);
});

router.post('/addUsertype', (req, res) => {
    userTypeService.addUsertype(req, res);
});

router.post('/deleteUsertype', (req, res) => {
    userTypeService.deleteUsertype(req, res);
});


export default router;
