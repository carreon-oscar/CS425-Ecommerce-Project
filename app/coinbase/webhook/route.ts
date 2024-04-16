import { Webhook } from 'coinbase-commerce-node';
import { Resend } from 'resend';
import EmailTemplate from '@/app/_components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const raw = await request.text();
  const sig = request.headers.get('x-cc-webhook-signature');
  try {
    const event = Webhook.verifyEventBody(
      raw,
      sig as string,
      process.env.DEV_COINBASE_WEBHOOK_SECRET as string
    );
    console.log(event);
    switch (event.type) {
      case 'charge:pending': {
        //user paid, transaction not confirmed on block chain
        break;
      }
      case 'charge:confirmed': {
        //user paid, transaction confirmed
        break;
      }
      case 'charge:failed': {
        //charge failed or expired
        break;
      }

      default:
        break;
    }

    return new Response(`Webhook event: ${event.type} handled`, {
      status: 200,
    });
  } catch (err) {
    console.log(`Error verifying coinbase signature: ${err}`);
    return new Response(`Error verifying coinbase signature: ${err}`, {
      status: 400,
    });
  }
}
// function getFormattedDate(): string {
//   const months = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ];
//   const days = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];

//   const date = new Date();
//   const month = months[date.getMonth()];
//   const dayNum = date.getDate();
//   const dayString = date.getDay();
//   const year = date.getFullYear();
//   const hours = date.getHours();
//   const minutes =
//     date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
//   const seconds = date.getSeconds();
//   const ampm = hours >= 12 ? 'PM' : 'AM';

//   const formattedDate = `${days[dayString]} ${month} ${dayNum}, ${year}, ${
//     hours % 12 || 12
//   }:${minutes}:${seconds} ${ampm}`;

//   return formattedDate;
// }

// async function sendEmail(customer: {
//   name: string;
//   email: string;
//   amount_paid: string;
//   shipping_type: string;
//   shipping_cost: string;
//   tax_collected: string;
//   amount_subtotal: string;
// }) {
//   try {
//     const { data, error: err } = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: customer.email,
//       subject: 'Payment Receipt',
//       react: EmailTemplate(customer, getFormattedDate()),
//     });

//     if (err) {
//       console.log('customer email failed to send: ', err);
//     }
//   } catch (err) {
//     console.log('customer email failed to send: ', err);
//   }
// }
