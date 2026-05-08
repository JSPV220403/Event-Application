import { Request, Response } from "express"
import * as registrationService from "../services/registration"

export const registration = async (
  request: Request,
  response: Response
) => {
  try {

    const res = await registrationService.registration(request.body)

    response.status(201).json({
      success: true,
      data: res
    })

  } catch (error) {

    response.status(500).json({
      success: false,
      message: "Registration failed"
    })

  }
}