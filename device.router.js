/**
 * @file(device.router.js) All routing of device,device Tracker and Device Tracker history 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import deivceService from "../service/device.service";
import deivceTrackerService from "../service/deviceTracking.service";
import deivceTrackerHistoryService from "../service/deviceTrackingHistory.service";
const router = express.Router()

router.get('/allDevice', (req, res) => {
    deivceService.getAll(req, res);
});

router.post('/addDevice', (req, res) => {
    deivceService.addDevice(req, res);
});

router.delete('/deleteDevice', (req, res) => {
    deivceService.deleteDevice(req, res);
});


router.get('/allDeviceData', (req, res) => {
    deivceTrackerService.getAll(req, res);
});

router.get('/addDeviceData', (req, res) => {
    deivceTrackerHistoryService.addDeviceTrackingHistoryData(req, res);
});


export default router;