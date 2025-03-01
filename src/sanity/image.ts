import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './env'

// Define a proper type for Sanity image sources
type SanityImageSource = {
  asset?: {
    _ref?: string;
    _id?: string;
  };
  _ref?: string;
  _id?: string;
} | null;

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source).auto('format').fit('max')
} 