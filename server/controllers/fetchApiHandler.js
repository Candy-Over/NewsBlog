// const axios=require("axios")

// const fetchApiHandler=async (req,res)=>{
//     const category=req.params.category
//     const apiKey=process.env.NEWS_API_KEY

//     const url = category=="headlines"?`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`:`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
    
//     try {
//         const response = await axios.get(url);
//         res.send(response.data);
//       } catch (error) {
//         if (!res.headersSent) {
//           res.status(500).json({ error: 'Failed to fetch data' });
//         }
//     }

// }

// module.exports=fetchApiHandler

const axios = require('axios');

const fetchApiHandler = async (req, res) => {
  const category = req.params.category;
  const apiKey = process.env.NEWS_API_KEY;

  // Validate category parameter
  const validCategories = [
    'headlines', 'general', 'business', 'sports', 'entertainment', 
    'health', 'science', 'technology'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  // Construct URL based on the category
  const url = category === 'headlines'
    ? `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
};

module.exports = fetchApiHandler;
