import { Resend } from 'resend';
import EmailTemplate from '@/app/_components/email-template';

const stripe = require('stripe')(process.env.NEXT_SECRET_STRIPE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const endpointSecret = process.env.PROD_STRIPE_WEBHOOK_SECRET;

export async function sendEmail(customerEmail: string) {
  try {
    const { data, error: err } = await resend.emails.send({
      from: 'ethanvito@nevada.unr.edu',
      to: customerEmail,
      subject: 'Hello world',
      react: EmailTemplate(),
    });

    if (err) {
      console.log('customer email failed to send: ', err);
    }
  } catch (err) {
    console.log('customer email failed to send: ', err);
  }
}

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  //create an event and verify that it came from stripe
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return new Response(
      `Error when constructing event in webhook: ${err.message}`,
      {
        status: 400,
      }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const prodArray = [];
    const sessionId = event.data.object.id;

    // Retrieve the line items from the checkout session using auto pagination
    for await (const product of stripe.checkout.sessions.listLineItems(
      sessionId,
      { limit: 100 }
    )) {
      prodArray.push(product);
    }
    console.log(prodArray);

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    await sendEmail(checkoutSession.customer_details.email);
  }

  return Response.json(
    { message: 'Received stripe webhook POST' },
    { status: 200 }
  );
}
