export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Product Description',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    //Quantity schema for products
    {
      name: 'quantity',
      type: 'number',
      title: 'Product Quantity',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'price_id',
      title: 'Stripe Price ID',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [
        {
          type: 'category',
        },
      ],
    },
    {
      name: 'subcategory',
      title: 'Product SubCategory',
      type: 'reference',
      to: [
        {
          type: 'subcategory',
        },
      ],
    },
  ],
}
