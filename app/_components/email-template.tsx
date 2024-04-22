import { CustomerDetails } from '../interface';

export default function EmailTemplate(
  customer: CustomerDetails,
  dateOfPurchase: string
) {
  return (
    <>
      <h1>Thank you {customer.name} for shopping with us</h1>
      <h2>Date paid: {dateOfPurchase} PST</h2>
      <h2>Total beore tax & shipping: ${customer.amount_subtotal}</h2>
      <h2></h2>
      <h2>You paid: ${customer.amount_paid}</h2>
      <h2>
        Payment Method: {customer.card_brand} {customer.last4}
      </h2>
      <h2>
        {customer.shipping_type} ${customer.shipping_cost}
      </h2>
    </>
  );
}
