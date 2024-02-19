import http from "http";
import express from "express";
import medicineRouter from "./medicine/medicine.router";

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(medicineRouter());

const port = parseInt(process.env.PORT || "4000");
server.listen(port, process.env.HOST, () => {
   console.log(`🚀 Server is running on port http://localhost:${port}/`);
});

export default app;