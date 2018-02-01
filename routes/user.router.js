import express from "express";
import userService from "../service/user.service";

const router = express.Router()

router.get('/allUser', (req, res) => {
    userService.getAll(req, res);
});

router.get('/oneUser', (req, res) => {
    userService.getAll(req, res);
});

router.post('/addUser', (req, res) => {
    userService.addUser(req, res);
});

router.post('/deleteUser', (req, res) => {
    userService.deleteUser(req, res);
});

export default router;
