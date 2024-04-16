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
/**
 *increments a given product by amount
 *@param `docID` id of the sanity document
 *@param `amount` amount to increment quantity by
 *@returns `true` if product was incremented
 *@returns `false` if product was not incremented due to error
 */
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

/**
 *decrements a given product by amount
 *@param `docID` id of the sanity document
 *@param `amount` amount to decrement quantity by
 *@returns `true` if product was decremented
 *@returns `false` if product was not decremented due to error
 */
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
/**
 *increments a given product by amount
 *@param `docID` id of the sanity document
 *@returns `quantity` of the product
 *@returns `-1` if product was not incremented due to error
 */
export async function quantity(docID: string): Promise<number> {
  try {
    const product = await writeClient.getDocument(docID);
    return product!.quantity;
  } catch (err: any) {
    console.log(`Error retrieving document with ID ${docID}: `, err.message);
    return -1;
  }
}

export async function retrieveProduct(docID: string): Promise<any> {
  try {
    const product = await client.getDocument<Product>(docID);
    return product;
  } catch (err: any) {
    console.log(`Error retrieving document with ID ${docID}: `, err.message);
    return null;
  }
}
