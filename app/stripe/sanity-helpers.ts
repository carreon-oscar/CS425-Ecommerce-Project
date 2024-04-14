import { Product } from '../interface';
import { client, writeClient } from '../lib/santiy';

/**
 *checks whether the given product is in stock (quantity > 0)
 *@param `docID` id of the sanity document
 *@returns `true` if product has quantity > 0
 *@returns `false` if product quantity === 0
 *@returns `null` if an error occurs
 */
export async function inStock(docID: string): Promise<boolean | null> {
  try {
    const product = await client.getDocument(docID);
    return product!.quantity > 0;
  } catch (err: any) {
    console.log('error patching: ', err.message);
    return null;
  }
}

//increment a given product quantity by amount
//returns true if it incremented and false if it failed to
export async function incQuantity(
  docID: string,
  amount: number
): Promise<boolean> {
  try {
    await writeClient.patch(docID).inc({ quantity: amount }).commit();
    return true;
  } catch (err: any) {
    console.log(`Error incrementing product with ID ${docID}: `, err.message);
    return false;
  }
}

//decrement a given product quantity by amount
//returns true if it decremented and false if it failed to
export async function decQuantity(
  docID: string,
  amount: number
): Promise<boolean> {
  try {
    await writeClient.patch(docID).dec({ quantity: amount }).commit();
    return true;
  } catch (err: any) {
    console.log(`Error incrementing product with ID ${docID}: `, err.message);
    return false;
  }
}

//returns the quantity of a given product or -1 if it failed to to retrieve the document.
export async function quantity(docID: string): Promise<number> {
  try {
    const product = await client.getDocument(docID);
    return product!.quantity;
  } catch (err: any) {
    console.log(`Error retrieving document with ID ${docID}: `, err.message);
    return -1;
  }
}
