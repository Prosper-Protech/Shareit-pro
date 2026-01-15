// api/save-link.js
const fs = require('fs');
const path = require('path');

// In a real Vercel deployment, you would use a database
// For demo, we'll use a JSON file (not persistent on Vercel)
// For production, use MongoDB, PostgreSQL, or Vercel KV

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, title, description, timestamp } = req.body;

    // Validate required fields
    if (!url || !title) {
      return res.status(400).json({ 
        success: false, 
        error: 'URL and title are required' 
      });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (err) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid URL format' 
      });
    }

    // Create link object
    const newLink = {
      id: Date.now(),
      url,
      title,
      description: description || 'No description provided',
      timestamp: timestamp || new Date().toISOString(),
      date: new Date().toLocaleString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };

    // In production, you would save to a database here
    // For demo, we'll return success without saving
    // Example with database:
    // await db.collection('links').insertOne(newLink);

    console.log('Link would be saved:', newLink);

    return res.status(200).json({
      success: true,
      message: 'Link saved successfully',
      link: newLink
    });

  } catch (error) {
    console.error('Error saving link:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};
