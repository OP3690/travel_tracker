const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://global5665:test123@cluster0.wigbba7.mongodb.net/travel_dashboard?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define schema
const destinationSchema = new mongoose.Schema({
  state: { type: String, required: true },
  type: { type: String, required: true },
  destinations: [{ type: String }],
  topDestinations: [{ type: String }]
});

const Destination = mongoose.model('Destination', destinationSchema, 'destinations');

// Data to upload
const destinationsData = [
  {
    state: "Andaman and Nicobar Islands",
    type: "UT",
    destinations: ["Radhanagar Beach", "Cellular Jail", "Neil Island", "Ross Island", "Baratang Island", "Havelock Island"],
    topDestinations: ["Radhanagar Beach", "Cellular Jail", "Havelock Island"]
  },
  {
    state: "Andhra Pradesh",
    type: "State",
    destinations: ["Tirupati", "Visakhapatnam", "Araku Valley", "Vijayawada", "Srisailam", "Amaravati"],
    topDestinations: ["Tirupati", "Visakhapatnam", "Araku Valley"]
  },
  {
    state: "Arunachal Pradesh",
    type: "State",
    destinations: ["Tawang", "Ziro", "Bomdila", "Itanagar", "Roing", "Namdapha National Park"],
    topDestinations: ["Tawang", "Ziro", "Bomdila"]
  },
  {
    state: "Assam",
    type: "State",
    destinations: ["Kaziranga National Park", "Guwahati", "Majuli", "Jorhat", "Tezpur", "Sivasagar"],
    topDestinations: ["Kaziranga National Park", "Guwahati", "Majuli"]
  },
  {
    state: "Bihar",
    type: "State",
    destinations: ["Bodh Gaya", "Patna", "Nalanda", "Rajgir", "Vaishali", "Madhubani"],
    topDestinations: ["Bodh Gaya", "Patna", "Nalanda"]
  },
  {
    state: "Chandigarh",
    type: "UT",
    destinations: ["Rock Garden", "Sukhna Lake", "Rose Garden", "Elante Mall", "Capitol Complex", "Pinjore Gardens"],
    topDestinations: ["Rock Garden", "Sukhna Lake", "Rose Garden"]
  },
  {
    state: "Chhattisgarh",
    type: "State",
    destinations: ["Chitrakote Falls", "Bastar", "Raipur", "Bhilai", "Jagdalpur", "Barnawapara Wildlife Sanctuary"],
    topDestinations: ["Chitrakote Falls", "Bastar", "Raipur"]
  },
  {
    state: "Dadra and Nagar Haveli and Daman and Diu",
    type: "UT",
    destinations: ["Diu Fort", "Naida Caves", "Nagoa Beach", "Silvassa", "Vanganga Lake", "Ghoghla Beach"],
    topDestinations: ["Diu Fort", "Nagoa Beach", "Silvassa"]
  },
  {
    state: "Delhi",
    type: "UT",
    destinations: ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple", "Humayun's Tomb", "Jama Masjid"],
    topDestinations: ["Red Fort", "Qutub Minar", "India Gate"]
  },
  {
    state: "Goa",
    type: "State",
    destinations: ["Calangute Beach", "Baga Beach", "Anjuna Beach", "Palolem Beach", "Basilica of Bom Jesus", "Dudhsagar Falls"],
    topDestinations: ["Calangute Beach", "Palolem Beach", "Basilica of Bom Jesus"]
  },
  {
    state: "Gujarat",
    type: "State",
    destinations: ["Gir National Park", "Ahmedabad", "Somnath", "Rann of Kutch", "Dwarka", "Saputara"],
    topDestinations: ["Gir National Park", "Rann of Kutch", "Somnath"]
  },
  {
    state: "Haryana",
    type: "State",
    destinations: ["Kurukshetra", "Gurgaon", "Faridabad", "Panipat", "Pinjore Gardens", "Sultanpur Bird Sanctuary"],
    topDestinations: ["Kurukshetra", "Gurgaon", "Pinjore Gardens"]
  },
  {
    state: "Himachal Pradesh",
    type: "State",
    destinations: ["Shimla", "Manali", "Dharamshala", "Kullu", "Spiti Valley", "McLeod Ganj"],
    topDestinations: ["Shimla", "Manali", "Dharamshala"]
  },
  {
    state: "Jammu and Kashmir",
    type: "UT",
    destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Vaishno Devi", "Leh", "Sonamarg"],
    topDestinations: ["Srinagar", "Gulmarg", "Vaishno Devi"]
  },
  {
    state: "Jharkhand",
    type: "State",
    destinations: ["Ranchi", "Jamshedpur", "Deoghar", "Netarhat", "Hazaribagh", "Betla National Park"],
    topDestinations: ["Ranchi", "Deoghar", "Netarhat"]
  },
  {
    state: "Karnataka",
    type: "State",
    destinations: ["Bengaluru", "Mysore", "Hampi", "Coorg", "Gokarna", "Badami"],
    topDestinations: ["Mysore", "Hampi", "Coorg"]
  },
  {
    state: "Kerala",
    type: "State",
    destinations: ["Munnar", "Kochi", "Alleppey", "Kovalam", "Thekkady", "Wayanad"],
    topDestinations: ["Munnar", "Alleppey", "Kochi"]
  },
  {
    state: "Ladakh",
    type: "UT",
    destinations: ["Leh", "Nubra Valley", "Pangong Lake", "Zanskar", "Kargil", "Hemis Monastery"],
    topDestinations: ["Leh", "Pangong Lake", "Nubra Valley"]
  },
  {
    state: "Lakshadweep",
    type: "UT",
    destinations: ["Agatti Island", "Kavaratti", "Minicoy Island", "Bangaram Island", "Kadmat Island", "Kalpeni Island"],
    topDestinations: ["Agatti Island", "Kavaratti", "Minicoy Island"]
  },
  {
    state: "Madhya Pradesh",
    type: "State",
    destinations: ["Khajuraho", "Bhopal", "Gwalior", "Orchha", "Kanha National Park", "Ujjain"],
    topDestinations: ["Khajuraho", "Kanha National Park", "Ujjain"]
  },
  {
    state: "Maharashtra",
    type: "State",
    destinations: ["Mumbai", "Pune", "Aurangabad", "Lonavala", "Mahabaleshwar", "Ajanta and Ellora Caves"],
    topDestinations: ["Mumbai", "Ajanta and Ellora Caves", "Pune"]
  },
  {
    state: "Manipur",
    type: "State",
    destinations: ["Imphal", "Loktak Lake", "Kangla Fort", "Ukhrul", "Thoubal", "Keibul Lamjao National Park"],
    topDestinations: ["Imphal", "Loktak Lake", "Kangla Fort"]
  },
  {
    state: "Meghalaya",
    type: "State",
    destinations: ["Shillong", "Cherrapunji", "Mawlynnong", "Dawki", "Nongkhnum Island", "Living Root Bridges"],
    topDestinations: ["Shillong", "Cherrapunji", "Mawlynnong"]
  },
  {
    state: "Mizoram",
    type: "State",
    destinations: ["Aizawl", "Champhai", "Lunglei", "Serchhip", "Reiek", "Hmuifang"],
    topDestinations: ["Aizawl", "Champhai", "Reiek"]
  },
  {
    state: "Nagaland",
    type: "State",
    destinations: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Mon", "Dzukou Valley"],
    topDestinations: ["Kohima", "Dimapur", "Dzukou Valley"]
  },
  {
    state: "Odisha",
    type: "State",
    destinations: ["Puri", "Bhubaneswar", "Konark", "Chilika Lake", "Cuttack", "Simlipal National Park"],
    topDestinations: ["Puri", "Konark", "Bhubaneswar"]
  },
  {
    state: "Puducherry",
    type: "UT",
    destinations: ["Pondicherry Beach", "Auroville", "French Quarter", "Paradise Beach", "Sri Aurobindo Ashram", "Chunnambar Boat House"],
    topDestinations: ["Pondicherry Beach", "Auroville", "French Quarter"]
  },
  {
    state: "Punjab",
    type: "State",
    destinations: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Anandpur Sahib", "Chandigarh"],
    topDestinations: ["Amritsar", "Patiala", "Anandpur Sahib"]
  },
  {
    state: "Rajasthan",
    type: "State",
    destinations: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar", "Ranthambore"],
    topDestinations: ["Jaipur", "Udaipur", "Jaisalmer"]
  },
  {
    state: "Sikkim",
    type: "State",
    destinations: ["Gangtok", "Tsomgo Lake", "Pelling", "Lachung", "Yumthang Valley", "Namchi"],
    topDestinations: ["Gangtok", "Tsomgo Lake", "Pelling"]
  },
  {
    state: "Tamil Nadu",
    type: "State",
    destinations: ["Chennai", "Madurai", "Kanyakumari", "Ooty", "Rameswaram", "Coimbatore"],
    topDestinations: ["Chennai", "Madurai", "Ooty"]
  },
  {
    state: "Telangana",
    type: "State",
    destinations: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam", "Bhadrachalam"],
    topDestinations: ["Hyderabad", "Warangal", "Bhadrachalam"]
  },
  {
    state: "Tripura",
    type: "State",
    destinations: ["Agartala", "Ujjayanta Palace", "Neermahal", "Unakoti", "Jampui Hills", "Sepahijala Wildlife Sanctuary"],
    topDestinations: ["Agartala", "Neermahal", "Unakoti"]
  },
  {
    state: "Uttar Pradesh",
    type: "State",
    destinations: ["Agra", "Varanasi", "Lucknow", "Mathura", "Ayodhya", "Allahabad"],
    topDestinations: ["Agra", "Varanasi", "Ayodhya"]
  },
  {
    state: "Uttarakhand",
    type: "State",
    destinations: ["Rishikesh", "Haridwar", "Dehradun", "Mussoorie", "Nainital", "Jim Corbett National Park"],
    topDestinations: ["Rishikesh", "Haridwar", "Nainital"]
  },
  {
    state: "West Bengal",
    type: "State",
    destinations: ["Kolkata", "Darjeeling", "Sundarbans", "Siliguri", "Kalimpong", "Digha"],
    topDestinations: ["Kolkata", "Darjeeling", "Sundarbans"]
  }
];

// Function to upload data
async function uploadData() {
  try {
    // Clear existing data
    await Destination.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    const result = await Destination.insertMany(destinationsData);
    console.log(`Successfully uploaded ${result.length} destinations`);
    
    process.exit(0);
  } catch (err) {
    console.error('Error uploading data:', err);
    process.exit(1);
  }
}

uploadData(); 