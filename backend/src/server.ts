import express from "express";
import cors from "cors";
import morgan from "morgan";
import doctors from "../src/api/doctors.route";

export const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/doctors", doctors);
app.use("/status", express.static("build"));
app.use("/", express.static("build"));
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
