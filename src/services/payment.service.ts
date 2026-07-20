import { razorpay } from "../config/razorpay";

import { prisma } from "../prisma";

import * as
    verifySignature
    from "../utils/verifySignature";

import * as userService from "../services/user.services"

export const createOrder = async (
    data: any,
    user: any
) => {
    try {
        const schedule =
            await prisma.event_Schedules.findUnique({
                where: {
                    id: data.id
                }
            });

        if (!schedule) {
            return {
                status: 404,
                message: "Schedule not found"
            };
        }

        const amount =
            Number(schedule.price) *
            data.seats;

        const order =
            await razorpay.orders.create({
                amount: amount * 100,
                currency: "INR"
            });

        return {
            status: 200,
            message: "Order created",
            data: order
        };

    } catch (e) {

        return {
            status: 500,
            message: "Internal server error"
        };
    }
};

export const verifyPayment =
    async (
        data: any,
        user: any
    ) => {

        try {
            
            const paymentStatus = await razorpay.orders.fetch(data?.razorpay_order_id)
            console.log(paymentStatus?.status)
            if (paymentStatus?.status == "paid") {                
                const isValid =
                    verifySignature.verifySignature(
                        data.razorpay_order_id,
                        data.razorpay_payment_id,
                        data.razorpay_signature
                    );

                if (!isValid) {
                    console.log("It is invalid")
                    return {
                        status: 400,
                        message: "Invalid payment",
                    };
                }

                console.log("Successfull")

                const schedule =
                    await prisma.event_Schedules.findFirst({
                        where: {
                            id: data?.id,
                            is_active: true
                        }
                    });

                console.log("Schedule Retrived!!!");

                if (!schedule) {
                    return {
                        status: 404,
                        message: "Schedule not found"
                    };
                }

                const amount =
                    Number(schedule.price) *
                    data.seats;

                console.log("Amount: ", amount);

                const metaData = await razorpay.orders.fetch(data.razorpay_order_id)


                const ticket = await userService.bookTicket(data, user)

                console.log("Data",data, "User",user)
                const res = await prisma.payments.create({
                    data: {
                        ticket_id: paymentStatus?.status == "paid" ? (ticket?.data as any)?.id : "",
                        schedule_id: data?.id??"",
                        status: data?.payment_status,
                        order_id: data?.razorpay_order_id,
                        payment_id: data?.razorpay_payment_id ?? "",
                        seat: data?.seats,
                        amount: amount,
                        initiatedBy: user?.id??"",
                        metaData: JSON.parse(JSON.stringify(metaData))
                    }
                })

                return {
                    status: 200,
                    messgae: "Success",
                    data: res,
                };
            }

            else {

                console.log("Else called!!!")
                const metaData = await razorpay.orders.fetch(data.razorpay_order_id)

                const res = await prisma.payments.create({
                    data: {
                        status: data?.payment_status,
                        order_id: data?.razorpay_order_id,
                        ticket_id: "",
                        schedule_id: data?.id??"",
                        payment_id: data?.razorpay_payment_id ?? "",
                        seat: data?.seats ?? 0,
                        amount: data?.amount ?? 0,
                        initiatedBy: user?.id??"",
                        metaData: JSON.parse(JSON.stringify(metaData))
                    }
                })


                return {
                    status: 200,
                    messgae: "Success",
                };

            }

        } catch (e) {
            console.log(e)
            return {
                status: 500,
                message:
                    "Internal server error"
            };
        }
    };