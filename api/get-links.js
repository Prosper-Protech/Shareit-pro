// api/get-links.js
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In production, fetch from database
    // const links = await db.collection('links').find().sort({ timestamp: -1 }).toArray();
    
    // For demo, return sample links
    const sampleLinks = [
      {
        id: 1,
        url: 'https://github.com',
        title: 'GitHub - Code Hosting',
        description: 'The world\'s leading software development platform',
        timestamp: new Date().toISOString(),
        date: 'Just now'
      },
      {
        id: 2,
        url: 'https://vercel.com',
        title: 'Vercel - Deploy Instantly',
        description: 'Cloud platform for static sites and serverless functions',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        date: '1 hour ago'
      },
      {
        id: 3,
        url: 'https://stackoverflow.com',
        title: 'Stack Overflow',
        description: 'Community for developers to learn and share knowledge',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        date: '2 hours ago'
      }
    ];

    return res.status(200).json({
      success: true,
      links: sampleLinks,
      count: sampleLinks.length,
      message: 'For production, connect to a database'
    });

  } catch (error) {
    console.error('Error fetching links:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};
