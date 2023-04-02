
// Helper function to authenticate Bearer Token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token !== 'Bearer MY_BEARER_TOKEN') {
      return res.sendStatus(401);
    }
    next();
  }
  
  // Helper function to authenticate API Key
  function authenticateApiKey(req, res, next) {
    const apiKey = req.query.apikey || req.headers['x-api-key'];
    if (apiKey !== 'MY_API_KEY') {
      return res.sendStatus(401);
    }
    next();
  }

  module.exports = {
    authenticateToken,
    authenticateApiKey
  }