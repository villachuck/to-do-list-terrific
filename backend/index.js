"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("MongoDB conectado");
    app_1.default.listen(PORT, () => {
        console.log("Server running on port:", PORT);
    });
})
    .catch((error) => {
    console.error("Error trying to catch MongoDB", error.message);
});
