import crypto from "crypto";

export const verifySignature = (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) => {

  const body =
    razorpay_order_id +
    "|" +
    razorpay_payment_id;

  const expectedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(body.toString())
      .digest("hex");

  return (
    expectedSignature ===
    razorpay_signature
  );
};