import { Rule } from 'sanity'

const portfolioSchema = {
    name: 'portfolio',
    title: 'Portfolio',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
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
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true,
        }
      },
      {
        name: 'content',
        title: 'Content Blocks',
        type: 'array',
        of: [
          {
            title: 'Text Block',
            type: 'object',
            name: 'textBlock',
            fields: [
              {
                name: 'content',
                title: 'Content',
                type: 'text'
              }
            ]
          },
          {
            title: 'Image Block',
            type: 'object',
            name: 'imageBlock',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true,
                }
              },
              {
                name: 'caption',
                title: 'Caption',
                type: 'string'
              }
            ]
          }
        ]
      }
    ]
  }

export default portfolioSchema;