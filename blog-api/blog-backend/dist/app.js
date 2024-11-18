"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const app = (0, express_1.default)();
// CORS'u etkinleştir
app.use((0, cors_1.default)());
// JSON gövde ayrıştırıcıyı kullan
app.use(body_parser_1.default.json());
// API rotalarını kullan
app.use('/api', postRoutes_1.default);
// MongoDB'ye bağlan
mongoose_1.default.set('bufferCommands', false); // Buffering'i devre dışı bırak
mongoose_1.default.connect('mongodb://127.0.0.1:27017/blog')
    .then(() => {
    console.log('MongoDB connected');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
exports.default = app;
