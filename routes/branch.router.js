import express from "express";
import branchService from "../service/branch.service";

const router = express.Router()

router.get('/allBranch', (req, res) => {
    branchService.getAll(req, res);
});
router.get('/oneBranch', (req, res) => {
    branchService.getOne(req, res);
});

router.post('/addBranch', (req, res) => {
    branchService.addBranch(req, res);
});

router.post('/deleteBranch', (req, res) => {
    branchService.deleteBranch(req, res);
});


export default router;
