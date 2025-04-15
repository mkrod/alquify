import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  
    <App />
  ,
)/*const axios = require('axios');

// Authenticate User
const authenticateUser = (req, res) => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    res.redirect(authUrl);
};

// Post Content
const postContent = async (req, res) => {
    const { accessToken, imageUrl, caption } = req.body;

    try {
        const response = await axios.post(`https://graph.instagram.com/me/media`, {
            image_url: imageUrl,
            caption: caption,
            access_token: accessToken
        });

        const creationId = response.data.id;

        // Publish the media
        await axios.post(`https://graph.instagram.com/me/media_publish`, {
            creation_id: creationId,
            access_token: accessToken
        });

        res.status(200).json({ message: 'Post published successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Insights
const getInsights = async (req, res) => {
    const { accessToken } = req.query;

    try {
        const response = await axios.get(`https://graph.instagram.com/me/insights`, {
            params: {
                metric: 'impressions,reach,engagement',
                access_token: accessToken
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    authenticateUser,
    postContent,
    getInsights
};*/