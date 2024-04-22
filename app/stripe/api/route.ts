import { CartDetailsProduct, CheckoutItem } from '@/app/interface';
import { decQuantity } from '../sanity-helpers';
const stripe = require('stripe')(process.env.NEXT_SECRET_STRIPE_KEY);

export async function POST(request: Request) {
  //convert the request body into FormData
  const formData: FormData = await request.formData();
  const cartDetails = JSON.parse(formData.get('cartDetails') as string);

  const lineItems = [];
  const docIDs: CheckoutItem[] = [];
  const rates = await createTaxRates();
  const rateIDs = rates.map((rate) => rate.id);
  for (const product of Object.values<CartDetailsProduct>(cartDetails)) {
    lineItems.push({
      price: product.price_id,
      quantity: product.quantity,
      dynamic_tax_rates: rateIDs,
    });
    docIDs.push({ docID: product.docID, quantity: product.quantity });
    //remove the product from inventory
    await decQuantity(product.docID, product.quantity);
  }
  // console.log(docIDs);
  let session;
  const shipping_rates = {
    free: 'shr_1P3MojFa2BWD7O8S4kFs0wB1',
    priority: 'shr_1P3MnsFa2BWD7O8SjWPBfu4n',
    overnight: 'shr_1P3Mq2Fa2BWD7O8Sct5qyNXq',
  };
  try {
    // Create Checkout Session
    session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        { shipping_rate: shipping_rates.free },
        { shipping_rate: shipping_rates.priority },
        { shipping_rate: shipping_rates.overnight },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items: lineItems,
      metadata: { products: JSON.stringify(docIDs) },
      mode: 'payment',
      success_url: `${process.env.PRODUCTION_URL}/stripe/success/?success=true`,
      cancel_url: `${process.env.PRODUCTION_URL}/stripe/error/?canceled=true`,
      expires_at: expiresAt(0.5),
    });
  } catch (err) {
    return Response.json(err, {
      status: 500,
    });
  }
  //redirect the user to stripe checkout page
  return Response.redirect(session.url, 303);
}

// calculates how long before the checkout session expires in minutes
function expiresAt(hours: number): number {
  //set expiration to default of 30 minutes if not within acceptable range
  if (hours < 0.5 || hours > 24) {
    hours = 0.5;
  }
  return Math.floor(Date.now() / 1000) + hours * 3600;
}

async function createTaxRates(): Promise<{ id: string }[]> {
  const rates = [];
  const stateSalesTax: Record<string, number> = {
    AL: 4, // Alabama
    AK: 0, // Alaska
    AZ: 5.6, // Arizona
    AR: 6.5, // Arkansas
    CA: 7.25, // California
    CO: 2.9, // Colorado
    CT: 6.35, // Connecticut
    DE: 0, // Delaware
    FL: 6, // Florida
    GA: 4, // Georgia
    HI: 4, // Hawaii
    ID: 6, // Idaho
    IL: 6.25, // Illinois
    IN: 7, // Indiana
    IA: 6, // Iowa
    KS: 6.5, // Kansas
    KY: 6, // Kentucky
    LA: 4.45, // Louisiana
    ME: 5.5, // Maine
    MD: 6, // Maryland
    MA: 6.25, // Massachusetts
    MI: 6, // Michigan
    MN: 6.875, // Minnesota
    MS: 7, // Mississippi
    MO: 4.225, // Missouri
    MT: 0, // Montana
    NE: 5.5, // Nebraska
    NV: 6.85, // Nevada
    NH: 0, // New Hampshire
    NJ: 6.625, // New Jersey
    NM: 5.125, // New Mexico
    NY: 4, // New York
    NC: 4.75, // North Carolina
    ND: 5, // North Dakota
    OH: 5.75, // Ohio
    OK: 4.5, // Oklahoma
    OR: 0, // Oregon
    PA: 6, // Pennsylvania
    RI: 7, // Rhode Island
    SC: 6, // South Carolina
    SD: 4.5, // South Dakota
    TN: 7, // Tennessee
    TX: 6.25, // Texas
    UT: 4.7, // Utah
    VT: 6, // Vermont
    VA: 5.3, // Virginia
    WA: 6.5, // Washington
    WV: 6, // West Virginia
    WI: 5, // Wisconsin
    WY: 4, // Wyoming
  };

  //generate sales-tax tax-rates for each state
  for (const state of Object.keys(stateSalesTax)) {
    const taxRate = await stripe.taxRates.create({
      display_name: 'Sales Tax',
      inclusive: false,
      percentage: stateSalesTax[state],
      country: 'US',
      state: state,
      jurisdiction: `US - ${state}`,
      description: `${state} Sales Tax`,
    });

    rates.push(taxRate);
  }
  return rates;
}

//error when using redirect from a form POST
//https://github.com/vercel/next.js/issues/51592#issuecomment-1812855871
// redirect(session.url);
