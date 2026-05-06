import Razorpay from "razorpay";
import { db } from "@/firebase/admin";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

export async function POST(request: Request) {
  const body = await request.json();
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId,
    plan,
    billing,
    amount,
  } = body as {
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
    userId?: string;
    plan?: string;
    billing?: "monthly" | "yearly";
    amount?: number;
  };

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !userId || !plan || !billing) {
    return Response.json(
      {
        success: false,
        message: "Missing payment verification parameters.",
      },
      { status: 400 }
    );
  }

  try {
    const isValid = razorpay.utils.verifyPaymentSignature({
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      return Response.json(
        {
          success: false,
          message: "Payment signature verification failed.",
        },
        { status: 400 }
      );
    }

    const userRef = db.collection("users").doc(userId);
    await userRef.update({
      subscription: plan,
      subscriptionStatus: "active",
      subscriptionBilling: billing,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      subscriptionUpdatedAt: new Date().toISOString(),
    });

    await db.collection("payments").add({
      userId,
      plan,
      billing,
      amount: amount ?? 0,
      currency: "INR",
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      verified: true,
      createdAt: new Date().toISOString(),
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Razorpay verification failed:", error);
    return Response.json(
      {
        success: false,
        message: "Unable to verify payment.",
      },
      { status: 500 }
    );
  }
}
