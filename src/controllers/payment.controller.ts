import express from "express"
import { Request,Response } from "express";

const paymentService = require("../services/payment.service")

export const createOrder = async (
    req: Request,
    res: Response
) => {
    const result =
        await paymentService.createOrder(
            req.body,
            (req as any).user
        );
    res.status(result.status).json(result)
};

export const verifyPayment =
  async (
    req: Request,
    res: Response
  ) => {

    const result =
      await paymentService.verifyPayment(
        req.body,
        (req as any).user
      );

    return res
      .status(result.status)
      .json(result);
  };