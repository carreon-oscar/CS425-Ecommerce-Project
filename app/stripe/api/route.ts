import { redirect } from 'next/navigation';

const stripe = require('stripe')(process.env.NEXT_SECRET_STRIPE_KEY);

interface Product {
  price_id: string;
  quantity: number;
}

export async function POST(request: Request) {
  //convert the request body into FormData
  const formData: FormData = await request.formData();
  const cartDetails = JSON.parse(formData.get('cartDetails') as string);

  const lineItems = [];
  for (const product of Object.values<Product>(cartDetails)) {
    lineItems.push({
      price: product.price_id,
      quantity: product.quantity,
    });
  }

  let session;
  try {
    // Create Checkout Sessions from body params.
    session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.PRODUCTION_URL}/stripe/success/?success=true`,
      cancel_url: `${process.env.PRODUCTION_URL}/stripe/error/?canceled=true`,
    });
  } catch (err) {
    return Response.json(err, {
      status: 500,
    });
  }

  //redirect the user to stripe checkout page
  return Response.redirect(session.url, 303);
}
//error when using redirect from a form POST
//https://github.com/vercel/next.js/issues/51592#issuecomment-1812855871
// redirect(session.url);
