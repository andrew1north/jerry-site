import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource as SanityOriginalImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId } from './env'

// We're extending the original type to allow null/undefined
type SanityImageSource = SanityOriginalImageSource | null | undefined

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource) => {
  // Skip image processing if source is null or undefined
  if (!source) {
    return imageBuilder.image(source || '').url()
  }
  return imageBuilder.image(source).auto('format').fit('max')
} 