import { type SchemaTypeDefinition } from 'sanity'
import portfolio from './schemas/portfolio'
import product from './schemas/product'
import photoCollection from './schemas/photos'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolio, product, photoCollection],
}