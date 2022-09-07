const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//  ROUTES
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/id', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours', updateTour);

// app.delete('/api/v1/tours', deleteTour);

// START SERVER

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
