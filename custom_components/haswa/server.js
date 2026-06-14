const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8099;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SWA8_API = 'https://mm.swabim.com/api';

app.post('/api/proxy/login', async (req, res) => {
  try {
    const response = await fetch(`${SWA8_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Connection to SWA8 server failed' });
  }
});

app.get('/api/proxy/devices', async (req, res) => {
  try {
    const { userId, token } = req.query;
    if (!userId || !token) {
      return res.status(400).json({ error: 'Missing userId or token' });
    }
    const response = await fetch(`${SWA8_API}/devices/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Connection to SWA8 server failed' });
  }
});

app.get('/api/proxy/me', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: 'Missing token' });
    }
    const response = await fetch(`${SWA8_API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Connection to SWA8 server failed' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SWA8 add-on running on port ${PORT}`);
});
