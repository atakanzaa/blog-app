"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = __importDefault(require("../models/post"));
const router = (0, express_1.Router)();
router.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const newPost = new post_1.default({ title, content });
    yield newPost.save();
    res.status(201).json(newPost);
}));
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.default.find();
    res.status(200).json(posts);
}));
router.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.default.findById(req.params.id);
    res.status(200).json(post);
}));
router.put('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const updatedPost = yield post_1.default.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    res.status(200).json(updatedPost);
}));
router.delete('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield post_1.default.findByIdAndDelete(req.params.id);
    res.status(204).send();
}));
exports.default = router;
