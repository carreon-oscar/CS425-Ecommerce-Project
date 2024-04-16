import { quantityAction, incrementAction } from '@/app/interface';
import { quantity, incQuantity } from '@/app/stripe/sanity-helpers';

export async function POST(request: Request) {
  const { type, product }: quantityAction = await request.json();
  if (type === 'quantity') {
    let count;
    try {
      count = await quantity(product.docID);
      return Response.json({ count: count }, { status: 200 });
    } catch (err) {
      return new Response(
        `error fetching quantity for docID: ${product.docID}`,
        { status: 500 }
      );
    }
  } else {
    return new Response('error, invalid type', { status: 400 });
  }
}

export async function PUT(request: Request) {
  const { type, product }: incrementAction = await request.json();
  if (type === 'increment') {
    let count;
    try {
      count = await incQuantity(product.docID, product.quantity);
      //return the updated quantity
      return Response.json({ count: count }, { status: 200 });
    } catch (err) {
      return new Response(
        `error incrementing quantity for docID: ${product.docID}`,
        { status: 500 }
      );
    }
  } else {
    return new Response('error, invalid type', { status: 400 });
  }
}
