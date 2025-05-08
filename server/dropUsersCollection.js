const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/travel_dashboard?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connection.on('open', async () => {
  try {
    const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
    if (collections.length === 0) {
      console.log('users collection does not exist.');
    } else {
      await mongoose.connection.db.dropCollection('users');
      console.log('users collection dropped.');
    }
  } catch (err) {
    console.error('Error dropping users collection:', err);
  }
  process.exit(0);
}); 