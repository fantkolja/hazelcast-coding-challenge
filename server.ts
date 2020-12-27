import axios = require('axios');
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/token', async (req, res) => {
  const githubAuthTokenAccessEndpoint = 'https://github.com/login/oauth/access_token';
  const clientSecret = 'ab0bbf7461554e48fa45f02bfd4e8ca7225407ba';

  try {
    // @ts-ignore
    const response = await axios.post(githubAuthTokenAccessEndpoint, {
      client_id: req.body.client_id,
      client_secret: clientSecret,
      code: req.body.code,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });
    if (response.data.error) {
      res.status(400).json({
        error: response.data.error,
        message: response.data.error_description,
      });
    } else {
      res.status(200).json({
        access_token: response.data.access_token,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.listen(3001, () => {
  console.log('/token listening on port 3001!');
});
