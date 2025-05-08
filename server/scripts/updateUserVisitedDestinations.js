const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/travel_dashboard?retryWrites=true&w=majority&appName=Cluster0';
const USER_ID = '68197a3fac457b9597ab0ab5';

async function run() {
  await mongoose.connect(MONGO_URI);
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');
  const result = await User.updateOne({ _id: USER_ID }, { $set: { visitedDestinations: [] } });
  console.log('Update result:', result);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); }); 