import express, { Request, Response } from "express";
import * as controller from "./medicine.controller";

export default function router() {
   const router = express.Router();

   router.post("/medicine", (req: Request, res: Response) => {
      console.log(req.body);
      controller.chooseMedicineWithMinPrice();
      res.status(200).json({
         success: true,
      });
   });

   router.get("/medicine", (req: Request, res: Response) => {
      res.status(200).json({
         name: "Get all medicine",
      });
   });

	router.get("/medicine/:id", (req: Request, res: Response) => {
      res.status(200).json({
         name: "Get one medicine",
      });
	});

	router.put("/medicine/:id", (req: Request, res: Response) => {
      res.status(200).json({
         name: "Update one medicine",
      });
   });

	router.delete("/medicine/:id", (req: Request, res: Response) => {
      res.status(200).json({
         name: "Delete one medicine",
      });
   });


   return router;
}
