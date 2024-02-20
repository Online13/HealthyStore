import express, { Request, Response } from "express";
import { Controller, container as mcContainer } from "./medicine.controller";
import { Container } from "../../../core/Container";
import * as core from "express-serve-static-core";
import { MedicineData } from "../../type";

export class Router {
   router: express.Router;

   constructor(private controller: Controller) {
      this.router = express.Router();
      console.log("Create medicine router !")
   }

   routes() {
      type CRequest = Request<core.ParamsDictionary, any, MedicineData>;
      this.router.post("/", async (req: CRequest, res: Response) => {
         await this.controller.create(req.body);
         res.status(200).json({
            success: true,
            description: "Medicine created !",
         });
      });

      this.router.get("/", async (req: Request, res: Response) => {
         const medicines = await this.controller.getAll();
         res.status(200).json({
            success: true,
            data: medicines,
            name: "Medicine list",
         });
      });

      type GRequest = Request<{ id: string }>;
      this.router.get("/:id", async (req: GRequest, res: Response) => {
         const medicine = await this.controller.getOne(parseInt(req.params.id));
         res.status(200).json({
            success: true,
            data: medicine,
            name: "Medicine",
         });
      });

      type URequest = Request<{ id: string }, any, MedicineData>;
      this.router.put("/:id", async (req: URequest, res: Response) => {
         await this.controller.update(parseInt(req.params.id), req.body);
         res.status(200).json({
            name: "Medicine updated !",
         });
      });

      this.router.delete(
         "/:id",
         async (req: GRequest, res: Response) => {
            await this.controller.delete(parseInt(req.params.id));
            res.status(200).json({
               name: "Medicine deleted !",
            });
         }
      );

      return this.router;
   }
}

export const container = Container.create(() => {
   const controller = mcContainer.getInstance();
   return new Router(controller);
});
