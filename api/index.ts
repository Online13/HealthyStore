import http from "http";
import express from "express";
import { container as mrContainer } from "./medicine/medicine.router";
import { container as srContainer } from "./symptom/symptom.router";

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/medicine", mrContainer.getInstance().routes());
app.use("/symptom", srContainer.getInstance().routes());

const port = parseInt(process.env.PORT || "4000");
server.listen(port, process.env.HOST, () => {
   console.log(`🚀 Server is running on port http://localhost:${port}/`);
});

export default app;