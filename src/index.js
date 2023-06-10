import express from 'express';
import fetch from 'node-fetch';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res, next) => {
	res.send('Hello from service_1');
});

app.get('/users/:userId', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  // request user data from user_service
  // update URL to match deployed user_service
  const userRes = await fetch(`http://34.217.11.86:3001/users/${req.params.userId}`, options);
  const user = await userRes.json();

  // leave evidence that the data passed through this service
  user.touchedBy.push('service_1');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user));
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
