import { Client, Webhook, resources } from 'coinbase-commerce-node';

Client.init(process.env.COINBASE_API_KEY as string);

interface Product {
  name: string;
  quantity: number;
  value: number; //value is = price of product * quantity;
}

export async function POST(request: Request) {
  //convert the request body into FormData
  const formData: FormData = await request.formData();
  const cartDetails = JSON.parse(formData.get('cartDetails') as string);

  let total = 0;
  let lineItems = [];
  for (const product of Object.values<Product>(cartDetails)) {
    lineItems.push({
      name: product.name,
      quantity: product.quantity,
      total_value: product.value,
    });
    total += product.value;
  }

  try {
    const charge = await resources.Charge.create({
      name: 'Test Charge',
      description: 'description',
      local_price: {
        amount: total.toString(),
        currency: 'USD',
      },
      pricing_type: 'fixed_price',
      redirect_url: `${process.env.PRODUCTION_URL}/coinbase/success/?success=true`,
      cancel_url: `${process.env.PRODUCTION_URL}/coinbase/error/?canceled=true`,
      metadata: {
        lineItems: lineItems,
      },
    });
    // return Response.json({ charge: charge }, { status: 200 });
    //redirect to the coinbase hosted checkout page
    return Response.redirect(charge.hosted_url, 303);
  } catch (err) {
    console.log(err);
    return Response.json({ error: err }, { status: 500 });
  }
}
