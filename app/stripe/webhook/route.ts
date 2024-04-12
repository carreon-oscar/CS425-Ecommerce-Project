import { Resend } from 'resend';
import EmailTemplate from '@/app/_components/email-template';

const stripe = require('stripe')(process.env.NEXT_SECRET_STRIPE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const endpointSecret = process.env.DEV_STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  //create an event and verify that it came from stripe
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.log('Error generating webhook event');
    return new Response(
      `Error when constructing event in webhook: ${err.message}`,
      {
        status: 400,
      }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const sessionId = event.data.object.id;
      // console.log(prodArray);

      const checkoutSession = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: [
            'payment_intent',
            'payment_intent.payment_method',
            'shipping_cost.shipping_rate',
          ],
        }
      );
      // console.log(checkoutSession);

      const customer = {
        email: checkoutSession.customer_details.email,
        name: checkoutSession.customer_details.name,
        last4: checkoutSession.payment_intent.payment_method.card.last4,
        card_brand: checkoutSession.payment_intent.payment_method.card.brand,
        amount_subtotal: (checkoutSession.amount_subtotal / 100).toFixed(2),
        amount_paid: (checkoutSession.amount_total / 100).toFixed(2),
        tax_collected: (checkoutSession.total_details.amount_tax / 100).toFixed(
          2
        ),
        shipping_type: checkoutSession.shipping_cost.shipping_rate.display_name,
        shipping_cost: (
          checkoutSession.shipping_cost.amount_total / 100
        ).toFixed(2),
      };
      console.log(customer);

      await sendEmail(customer);
      break;
    }
    case 'checkout.session.expired': {
      // const sessionId = event.data.object.id;
      // const prodArray = [];
      // // Retrieve the line items from the checkout session using auto pagination
      // for await (const product of stripe.checkout.sessions.listLineItems(
      //   sessionId,
      //   { limit: 100 }
      // )) {
      //   prodArray.push(product);
      // }
      //when a session expires, loop through each product and add the quantity back into sanity
      console.log('the session has expired');
      // console.log(prodArray);
      break;
    }
  }

  return Response.json(
    { message: 'Received stripe webhook POST' },
    { status: 200 }
  );
}

function getFormattedDate(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(new Date());
}

async function sendEmail(customer: {
  name: string;
  email: string;
  last4: string;
  card_brand: string;
  amount_paid: string;
  shipping_type: string;
  shipping_cost: string;
  tax_collected: string;
  amount_subtotal: string;
}) {
  try {
    const { data, error: err } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: customer.email,
      subject: 'Payment Receipt',
      react: EmailTemplate(customer, getFormattedDate()),
    });

    if (err) {
      console.log('customer email failed to send: ', err);
    }
  } catch (err) {
    console.log('customer email failed to send: ', err);
  }
}
