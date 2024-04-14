export default function EmailTemplate(
  customer: {
    name: string;
    email: string;
    last4: string;
    card_brand: string;
    amount_paid: string;
    shipping_type: string;
    shipping_cost: string;
    tax_collected: string;
    amount_subtotal: string;
  },
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
