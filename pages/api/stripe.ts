const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1M59FIHkQGeMTkP9gD7q8oc3" },
          { shipping_rate: "shr_1M5AAqHkQGeMTkP9Sm9uYh0A" },
        ],
        line_items: req.body.map((item: any) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/zcoar0fk/production/"
            )
            .replace("-webp", ".webp")
            .replace("-png", ".png")
            .replace("-jpeg", ".jpeg")
            .replace("-jpg", ".jpg");
          return {
            price_data: {
              currency: "aud",
              product_data: { name: item.name, images: [newImage] },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: { enabled: true, minimum: 1 },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
