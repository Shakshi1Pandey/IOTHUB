/**
 * @file(account.router.js) All routing of asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 14-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import accountService from "../service/account.service";

const router = express.Router()

router.post('/addAccount', (req, res) => {
    accountService.addAccount(req, res);
});

router.get('/allAccount', (req, res) => {
    accountService.getAll(req, res);
});

router.post('/editAccount',(req,res)=>{
	accountService.editAccount(req,res)
})

export default router;