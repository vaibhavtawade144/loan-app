const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/loanbank');

const Loan = mongoose.model('Loan', {
  name: String,
  amount: Number,
  status: String,
});

app.post('/apply', async (req, res) => {
  const loan = new Loan({ ...req.body, status: 'pending' });
  await loan.save();
  res.send(loan);
});

app.get('/status/:id', async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  res.send(loan);
});

app.listen(3000, () => console.log('Loan API running on port 3000'));
