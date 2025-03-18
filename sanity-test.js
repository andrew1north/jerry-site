// A simple script to test Sanity queries directly
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-06-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

// Test query for photo collections
async function testPhotoCollections() {
  try {
    const query = `*[_type == "photoCollection"] | order(displayOrder asc) {
      _id,
      title,
      slug,
      description,
      "photos": photos[] {
        _key,
        "asset": {
          "url": asset->url
        },
        caption,
        alt
      },
      tags,
      displayOrder
    }`;
    
    const result = await client.fetch(query);
    console.log('Photo collections:', JSON.stringify(result, null, 2));
    console.log(`Found ${result.length} photo collections`);
  } catch (error) {
    console.error('Error fetching photo collections:', error);
  }
}

// Run the test
testPhotoCollections(); 