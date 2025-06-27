import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Read-only client for public data fetching
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

// Write client for inventory management (requires API token)
export const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // Don't use CDN for writes
  token: process.env.SANITY_API_TOKEN, // Server-side only
})