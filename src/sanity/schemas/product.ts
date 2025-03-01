import { Rule } from 'sanity'

const productSchema = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule: Rule) => Rule.required().min(0)
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true,
        }
      },
      {
        name: 'details',
        title: 'Product Details',
        type: 'object',
        fields: [
          {
            name: 'detailedDescription',
            title: 'Detailed Description',
            type: 'text'
          },
          {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'images',
            title: 'Additional Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true }}]
          },
          {
            name: 'dimensions',
            title: 'Dimensions',
            type: 'object',
            fields: [
              { name: 'width', title: 'Width', type: 'string' },
              { name: 'depth', title: 'Depth', type: 'string' },
              { name: 'height', title: 'Height', type: 'string' },
              { name: 'weight', title: 'Weight', type: 'string' }
            ]
          }
        ]
      }
    ]
  }

export default productSchema;