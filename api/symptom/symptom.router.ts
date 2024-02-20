import express, { Request, Response } from "express";
import { Controller, container as scContainer } from "./symptom.controller";
import { Container } from "../../core/Container";
import * as core from "express-serve-static-core";
import { SymptomData } from "../type";

export class Router {
   router: express.Router;

   constructor(private controller: Controller) {
      this.router = express.Router();
      console.log("Create symptom router !")
   }

   routes() {
      type CRequest = Request<core.ParamsDictionary, any, SymptomData>;
      this.router.post("/", async (req: CRequest, res: Response) => {
         await this.controller.create(req.body);
         res.status(200).json({
            success: true,
            description: "Symptom created !",
         });
      });

      this.router.get("/", async (req: Request, res: Response) => {
         const symptoms = await this.controller.getAll();
         res.status(200).json({
            success: true,
            data: symptoms,
            name: "Symptom list",
         });
      });

      type GRequest = Request<{ id: string }>;
      this.router.get("/:id", async (req: GRequest, res: Response) => {
         const symptom = await this.controller.getOne(parseInt(req.params.id));
         res.status(200).json({
            success: true,
            data: symptom,
            name: "Symptom",
         });
      });

      type URequest = Request<{ id: string }, any, SymptomData>;
      this.router.put("/:id", async (req: URequest, res: Response) => {
         await this.controller.update(parseInt(req.params.id), req.body);
         res.status(200).json({
            name: "Symptom updated !",
         });
      });

      this.router.delete(
         "/:id",
         async (req: GRequest, res: Response) => {
            await this.controller.delete(parseInt(req.params.id));
            res.status(200).json({
               name: "Symptom deleted !",
            });
         }
      );

      return this.router;
   }
}

export const container = Container.create(() => {
   const controller = scContainer.getInstance();
   return new Router(controller);
});
