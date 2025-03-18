import { StructureBuilder } from 'sanity/structure'

// Define the structure of the Sanity Studio sidebar
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Portfolio section
      S.listItem()
        .title('Portfolio')
        .schemaType('portfolio')
        .child(S.documentTypeList('portfolio').title('Portfolio Items')),
      
      // Products section
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),
        
      // Photo Collections section
      S.listItem()
        .title('Photo Collections')
        .schemaType('photoCollection')
        .child(S.documentTypeList('photoCollection').title('Photo Collections')),
    ]) 