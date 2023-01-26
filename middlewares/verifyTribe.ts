import { NextFunction, Request, Response } from "express";
import Trybe from "../models/tribe";

export const checkTribeExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tribeId } = req.params;
      let tribe = await Trybe.findOne({
        where: {
          id_tribe: tribeId,
        },
      });
      if (!tribe) {
        return res.status(404).json({
          message: "La Tribu no se encuentra registrada",
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Error al verificar la existencia de la tribu",
        error,
      });
    }
  }

  