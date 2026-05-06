import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

const planAmounts: Record<string, { monthly: number; yearly: number }> = {
  Starter: { monthly: 0, yearly: 0 },
  Pro: { monthly: 49900, yearly: 478800 },
  Enterprise: { monthly: 0, yearly: 0 },
};

export async function POST(request: Request) {
  const body = await request.json();
  const { plan, billing, userId } = body as {
    plan?: string;
    billing?: "monthly" | "yearly";
    userId?: string;
  };

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return Response.json(
      {
        success: false,
        message: "Razorpay credentials are not configured.",
      },
      { status: 500 }
    );
  }

  if (!userId || !plan || !billing) {
    return Response.json(
      {
        success: false,
        message: "Missing required payment parameters.",
      },
      { status: 400 }
    );
  }

  const planAmount = planAmounts[plan];
  if (!planAmount) {
    return Response.json(
      {
        success: false,
        message: "Unsupported plan selected.",
      },
      { status: 400 }
    );
  }

  const amount = billing === "yearly" ? planAmount.yearly : planAmount.monthly;
  if (amount <= 0) {
    return Response.json(
      {
        success: false,
        message: "This plan does not require a payment.",
      },
      { status: 400 }
    );
  }

  try {
    const shortReceipt = `${userId.substring(0, 8)}_${Date.now().toString().slice(-8)}`;
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: shortReceipt,
      payment_capture: 1,
      notes: {
        plan,
        billing,
        userId,
      },
    });

    return Response.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return Response.json(
      {
        success: false,
        message: "Unable to create Razorpay order.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
