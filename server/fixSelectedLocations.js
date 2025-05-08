const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/travel_dashboard?retryWrites=true&w=majority&appName=Cluster0');

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
  selectedLocations: [mongoose.Schema.Types.Mixed],
});

const User = mongoose.model('User', userSchema);

async function fixSelectedLocations() {
  const users = await User.find({});
  for (const user of users) {
    if (Array.isArray(user.selectedLocations) && user.selectedLocations.length > 0 && typeof user.selectedLocations[0] === 'string') {
      user.selectedLocations = [];
      await user.save();
      console.log(`Fixed user: ${user.email}`);
    }
  }
  console.log('Migration complete.');
  process.exit(0);
}

fixSelectedLocations(); 