import { Rule } from 'sanity'

const photosSchema = {
  name: 'photoCollection',
  title: 'Photo Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Collection Title',
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
      name: 'photos',
      title: 'Photos',
      description: 'Upload multiple photos at once by selecting them from your file browser and dragging them here',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true
              }
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order to display this collection (lower numbers appear first)',
      initialValue: 0
    }
  ]
}

export default photosSchema; 