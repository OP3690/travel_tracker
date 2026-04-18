// Famous destinations per region for major countries
// Format: { "Region Name": ["Destination 1", "Destination 2", ...] }
// Region names should match the map data region names

const destinations = {
  // INDIA (handled by backend /api/destinations — this is supplemental)

  // USA
  USA: {
    'California': ['Yosemite National Park', 'Golden Gate Bridge', 'Hollywood', 'Disneyland', 'Big Sur', 'Death Valley'],
    'New York': ['Statue of Liberty', 'Times Square', 'Central Park', 'Niagara Falls', 'Brooklyn Bridge'],
    'Florida': ['Walt Disney World', 'Miami Beach', 'Everglades', 'Key West', 'Universal Studios'],
    'Hawaii': ['Waikiki Beach', 'Pearl Harbor', 'Volcanoes National Park', 'Na Pali Coast', 'Maui'],
    'Texas': ['The Alamo', 'Big Bend NP', 'NASA Space Center', 'River Walk', 'Austin'],
    'Nevada': ['Las Vegas Strip', 'Red Rock Canyon', 'Hoover Dam', 'Valley of Fire'],
    'Arizona': ['Grand Canyon', 'Sedona', 'Monument Valley', 'Antelope Canyon', 'Horseshoe Bend'],
    'Colorado': ['Rocky Mountain NP', 'Aspen', 'Garden of the Gods', 'Mesa Verde'],
    'Washington': ['Mount Rainier', 'Space Needle', 'Olympic NP', 'Pike Place Market'],
    'Oregon': ['Crater Lake', 'Multnomah Falls', 'Cannon Beach', 'Columbia River Gorge'],
    'Massachusetts': ['Freedom Trail', 'Cape Cod', 'Harvard', 'Salem'],
    'Tennessee': ['Great Smoky Mountains', 'Nashville', 'Graceland', 'Dollywood'],
    'Louisiana': ['French Quarter', 'Bourbon Street', 'Swamp Tours', 'Plantation Country'],
    'Alaska': ['Denali', 'Glacier Bay', 'Northern Lights', 'Kenai Fjords'],
    'Utah': ['Zion NP', 'Bryce Canyon', 'Arches NP', 'Canyonlands'],
    'Wyoming': ['Yellowstone', 'Grand Teton', 'Devils Tower', 'Old Faithful'],
    'Montana': ['Glacier NP', 'Big Sky', 'Flathead Lake'],
  },

  // JAPAN
  Japan: {
    'Tokyo': ['Shibuya Crossing', 'Senso-ji Temple', 'Meiji Shrine', 'Akihabara', 'Tsukiji Market'],
    'Kyoto': ['Fushimi Inari', 'Kinkaku-ji', 'Arashiyama Bamboo', 'Gion District'],
    'Osaka': ['Dotonbori', 'Osaka Castle', 'Shinsekai', 'Universal Studios Japan'],
    'Hokkaido': ['Sapporo Snow Festival', 'Furano Lavender', 'Niseko Skiing', 'Otaru Canal'],
    'Okinawa': ['Shuri Castle', 'Churaumi Aquarium', 'Kerama Islands'],
    'Hiroshima': ['Peace Memorial', 'Miyajima Island', 'Itsukushima Shrine'],
    'Nara': ['Todai-ji Temple', 'Nara Park Deer', 'Kasuga Shrine'],
    'Kanagawa': ['Kamakura Great Buddha', 'Hakone', 'Yokohama'],
  },

  // FRANCE
  France: {
    'Ile-de-France': ['Eiffel Tower', 'Louvre', 'Notre-Dame', 'Versailles', 'Champs-Elysees'],
    'Provence-Alpes-Cote d\'Azur': ['Nice', 'Cannes', 'Marseille', 'Avignon'],
    'Auvergne-Rhone-Alpes': ['Mont Blanc', 'Lyon', 'Annecy Lake', 'Chamonix'],
    'Normandie': ['D-Day Beaches', 'Mont Saint-Michel', 'Etretat Cliffs'],
    'Bretagne': ['Saint-Malo', 'Carnac Stones', 'Quimper'],
    'Grand Est': ['Strasbourg', 'Alsace Wine Route', 'Reims Cathedral', 'Colmar'],
  },

  // ITALY
  Italy: {
    'Lazio': ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum', 'Pantheon'],
    'Toscana': ['Florence Duomo', 'Pisa Tower', 'Siena', 'Chianti Vineyards', 'Uffizi'],
    'Veneto': ['Venice Canals', 'St Mark\'s Square', 'Rialto Bridge', 'Verona Arena'],
    'Campania': ['Pompeii', 'Amalfi Coast', 'Capri', 'Positano', 'Naples'],
    'Lombardia': ['Milan Cathedral', 'Lake Como', 'Last Supper'],
    'Sicilia': ['Mount Etna', 'Valley of Temples', 'Taormina'],
    'Liguria': ['Cinque Terre', 'Portofino', 'Genoa'],
    'Puglia': ['Alberobello Trulli', 'Lecce', 'Polignano a Mare'],
  },

  // GERMANY
  Germany: {
    'Bayern': ['Neuschwanstein Castle', 'Munich', 'Oktoberfest', 'Rothenburg'],
    'Berlin': ['Brandenburg Gate', 'Berlin Wall', 'Museum Island', 'Reichstag'],
    'Baden-Wurttemberg': ['Black Forest', 'Heidelberg Castle', 'Europa-Park'],
    'Nordrhein-Westfalen': ['Cologne Cathedral', 'Dusseldorf'],
    'Sachsen': ['Dresden', 'Bastei Bridge', 'Leipzig'],
    'Hamburg': ['Miniatur Wunderland', 'Speicherstadt', 'Elbphilharmonie'],
  },

  // AUSTRALIA
  Australia: {
    'New South Wales': ['Sydney Opera House', 'Harbour Bridge', 'Blue Mountains', 'Bondi Beach'],
    'Victoria': ['Great Ocean Road', 'Melbourne', 'Twelve Apostles', 'Yarra Valley'],
    'Queensland': ['Great Barrier Reef', 'Gold Coast', 'Daintree', 'Whitsundays'],
    'Western Australia': ['Ningaloo Reef', 'Pinnacles Desert', 'Margaret River'],
    'South Australia': ['Barossa Valley', 'Kangaroo Island', 'Adelaide'],
    'Tasmania': ['Cradle Mountain', 'Port Arthur', 'Wineglass Bay'],
    'Northern Territory': ['Uluru', 'Kakadu NP', 'Kings Canyon'],
  },

  // CANADA
  Canada: {
    'British Columbia': ['Vancouver', 'Whistler', 'Victoria', 'Tofino'],
    'Ontario': ['Niagara Falls', 'CN Tower', 'Algonquin Park', 'Ottawa'],
    'Quebec': ['Old Quebec City', 'Montreal', 'Mont Tremblant'],
    'Alberta': ['Banff', 'Lake Louise', 'Jasper', 'Calgary Stampede'],
    'Nova Scotia': ['Peggy\'s Cove', 'Cabot Trail', 'Halifax'],
  },

  // SPAIN
  Spain: {
    'Catalonia': ['Sagrada Familia', 'Park Guell', 'Las Ramblas', 'Costa Brava'],
    'Andalusia': ['Alhambra', 'Seville', 'Cordoba Mosque', 'Ronda'],
    'Madrid': ['Prado Museum', 'Royal Palace', 'Retiro Park'],
    'Basque Country': ['Guggenheim Bilbao', 'San Sebastian'],
    'Balearic Islands': ['Mallorca', 'Ibiza', 'Menorca'],
    'Canary Islands': ['Tenerife', 'Lanzarote', 'Teide Volcano'],
  },

  // MEXICO
  Mexico: {
    'Quintana Roo': ['Cancun', 'Tulum', 'Playa del Carmen', 'Cozumel', 'Cenotes'],
    'Mexico City': ['Zocalo', 'Frida Kahlo Museum', 'Chapultepec', 'Teotihuacan'],
    'Jalisco': ['Puerto Vallarta', 'Guadalajara', 'Tequila Town'],
    'Yucatan': ['Chichen Itza', 'Merida', 'Uxmal'],
    'Oaxaca': ['Monte Alban', 'Hierve el Agua', 'Oaxaca City'],
    'Chiapas': ['Palenque', 'San Cristobal', 'Sumidero Canyon'],
  },

  // THAILAND
  Thailand: {
    'Bangkok': ['Grand Palace', 'Wat Pho', 'Chatuchak Market', 'Khao San Road', 'Wat Arun'],
    'Chiang Mai': ['Doi Suthep', 'Old City Temples', 'Night Bazaar', 'Elephant Sanctuary'],
    'Phuket': ['Patong Beach', 'Big Buddha', 'Old Phuket Town'],
    'Krabi': ['Railay Beach', 'Tiger Cave Temple', 'Four Islands'],
    'Surat Thani': ['Koh Samui', 'Koh Phangan', 'Koh Tao'],
    'Chiang Rai': ['White Temple', 'Blue Temple', 'Golden Triangle'],
  },

  // BRAZIL
  Brazil: {
    'Rio de Janeiro': ['Christ the Redeemer', 'Copacabana', 'Sugarloaf Mountain', 'Ipanema'],
    'Sao Paulo': ['Sao Paulo Museum of Art', 'Ibirapuera Park', 'Paulista Avenue'],
    'Bahia': ['Salvador Pelourinho', 'Chapada Diamantina', 'Porto Seguro'],
    'Amazonas': ['Amazon Rainforest', 'Manaus', 'Meeting of Waters'],
    'Parana': ['Iguazu Falls', 'Curitiba'],
  },

  // SOUTH KOREA
  'South Korea': {
    'Seoul': ['Gyeongbokgung Palace', 'Myeongdong', 'N Seoul Tower', 'Bukchon Hanok Village'],
    'Busan': ['Gamcheon Village', 'Haedong Yonggungsa', 'Haeundae Beach'],
    'Jeju': ['Hallasan', 'Seongsan Ilchulbong', 'Lava Tubes'],
  },

  // CHINA
  China: {
    'Beijing': ['Great Wall', 'Forbidden City', 'Temple of Heaven', 'Tiananmen Square'],
    'Shanghai': ['The Bund', 'Yu Garden', 'Oriental Pearl Tower', 'Nanjing Road'],
    'Shaanxi': ['Terracotta Army', 'Xi\'an City Wall', 'Muslim Quarter'],
    'Sichuan': ['Giant Panda Base', 'Jiuzhaigou Valley', 'Leshan Giant Buddha'],
    'Yunnan': ['Lijiang Old Town', 'Tiger Leaping Gorge', 'Shangri-La'],
    'Guangxi': ['Li River Cruise', 'Yangshuo', 'Guilin'],
    'Tibet': ['Potala Palace', 'Jokhang Temple', 'Namtso Lake'],
  },

  // TURKEY
  Turkey: {
    'Istanbul': ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Topkapi Palace', 'Bosphorus'],
    'Nevsehir': ['Cappadocia', 'Hot Air Balloons', 'Goreme Museum'],
    'Antalya': ['Old Town Kaleici', 'Duden Waterfalls', 'Side Ruins'],
    'Mugla': ['Oludeniz', 'Fethiye', 'Bodrum'],
    'Denizli': ['Pamukkale', 'Hierapolis'],
    'Izmir': ['Ephesus', 'Cesme', 'Pergamon'],
  },

  // EGYPT
  Egypt: {
    'Giza': ['Great Pyramids', 'Sphinx', 'Sound and Light Show'],
    'Luxor': ['Valley of the Kings', 'Karnak Temple', 'Hot Air Balloons'],
    'Cairo': ['Egyptian Museum', 'Khan el-Khalili', 'Islamic Cairo'],
    'Aswan': ['Philae Temple', 'Abu Simbel', 'Felucca Sailing'],
    'Red Sea': ['Hurghada', 'Sharm el-Sheikh', 'Dahab'],
  },

  // SOUTH AFRICA
  'South Africa': {
    'Western Cape': ['Table Mountain', 'Cape of Good Hope', 'Stellenbosch', 'Garden Route'],
    'Gauteng': ['Apartheid Museum', 'Soweto', 'Johannesburg'],
    'KwaZulu-Natal': ['Drakensberg', 'Durban Beaches', 'Hluhluwe'],
    'Mpumalanga': ['Kruger NP', 'Blyde River Canyon', 'God\'s Window'],
    'Eastern Cape': ['Addo Elephant NP', 'Wild Coast'],
    'Northern Cape': ['Kgalagadi NP', 'Namaqualand Flowers'],
  },

  // UNITED KINGDOM
  'United Kingdom': {
    'England': ['Big Ben', 'Stonehenge', 'Tower of London', 'Lake District'],
    'Scotland': ['Edinburgh Castle', 'Loch Ness', 'Isle of Skye', 'Highlands'],
    'Wales': ['Snowdonia', 'Cardiff Castle', 'Pembrokeshire Coast'],
    'Northern Ireland': ['Giant\'s Causeway', 'Titanic Belfast', 'Dark Hedges'],
  },

  // INDONESIA
  Indonesia: {
    'Bali': ['Ubud Rice Terraces', 'Tanah Lot', 'Uluwatu Temple', 'Seminyak Beach'],
    'Yogyakarta': ['Borobudur', 'Prambanan', 'Sultan\'s Palace'],
    'Jakarta': ['National Monument', 'Old Batavia', 'Thousand Islands'],
    'East Java': ['Mount Bromo', 'Ijen Crater'],
    'West Papua': ['Raja Ampat', 'Bird\'s Head Peninsula'],
    'North Sulawesi': ['Bunaken Marine Park', 'Manado'],
    'East Nusa Tenggara': ['Komodo National Park', 'Flores'],
    'West Nusa Tenggara': ['Gili Islands', 'Lombok', 'Mount Rinjani'],
  },

  // VIETNAM
  Vietnam: {
    'Hanoi': ['Old Quarter', 'Ho Chi Minh Mausoleum', 'Temple of Literature', 'Hoan Kiem Lake'],
    'Ha Long': ['Ha Long Bay', 'Surprise Cave', 'Ti Top Island'],
    'Hue': ['Imperial Citadel', 'Thien Mu Pagoda', 'Royal Tombs'],
    'Da Nang': ['Marble Mountains', 'My Khe Beach', 'Golden Bridge'],
    'Ho Chi Minh City': ['Cu Chi Tunnels', 'War Remnants Museum', 'Ben Thanh Market'],
    'Sapa': ['Fansipan Mountain', 'Rice Terraces', 'Trekking Villages'],
    'Ninh Binh': ['Tam Coc', 'Trang An', 'Bai Dinh Pagoda'],
    'Phu Quoc': ['Long Beach', 'Vinpearl Safari', 'Night Market'],
  },

  // COLOMBIA
  Colombia: {
    'Bogota': ['La Candelaria', 'Gold Museum', 'Monserrate', 'Botero Museum'],
    'Bolivar': ['Cartagena Old City', 'Rosario Islands', 'San Felipe Castle'],
    'Antioquia': ['Medellin', 'Guatape Rock', 'Comuna 13'],
    'Valle del Cauca': ['Cali Salsa', 'San Cipriano'],
    'Magdalena': ['Tayrona NP', 'Lost City Trek', 'Santa Marta'],
  },

  // PERU (not in @svg-maps but has JSON map)
  Peru: {
    'Cusco': ['Machu Picchu', 'Sacred Valley', 'Cusco Plaza de Armas', 'Rainbow Mountain'],
    'Lima': ['Miraflores', 'Barranco', 'Huaca Pucllana', 'Larco Museum'],
    'Arequipa': ['Colca Canyon', 'Santa Catalina Monastery', 'Misti Volcano'],
    'Puno': ['Lake Titicaca', 'Uros Floating Islands', 'Taquile Island'],
    'Ica': ['Nazca Lines', 'Huacachina Oasis', 'Paracas'],
    'Loreto': ['Amazon River Cruise', 'Iquitos', 'Pacaya-Samiria'],
  },

  // GREECE
  Greece: {
    'Attica': ['Acropolis', 'Parthenon', 'Plaka', 'Temple of Olympian Zeus'],
    'South Aegean': ['Santorini', 'Mykonos', 'Rhodes'],
    'Crete': ['Knossos Palace', 'Elafonisi Beach', 'Samaria Gorge'],
    'Ionian Islands': ['Corfu', 'Zakynthos Shipwreck Beach', 'Kefalonia'],
    'Central Macedonia': ['Thessaloniki', 'Mount Olympus', 'Meteora'],
    'Peloponnese': ['Olympia', 'Nafplio', 'Mycenae', 'Epidaurus'],
  },

  // MOROCCO
  Morocco: {
    'Marrakech-Safi': ['Jemaa el-Fnaa', 'Majorelle Garden', 'Medina', 'Bahia Palace'],
    'Fes-Meknes': ['Fes Medina', 'Meknes', 'Volubilis Ruins'],
    'Draa-Tafilalet': ['Sahara Desert', 'Merzouga', 'Todra Gorge', 'Ait Benhaddou'],
    'Souss-Massa': ['Agadir Beach', 'Paradise Valley'],
    'Tanger-Tetouan-Al Hoceima': ['Chefchaouen Blue City', 'Tangier Kasbah'],
  },

  // NEPAL
  Nepal: {
    'Bagmati': ['Kathmandu Durbar Square', 'Swayambhunath', 'Boudhanath Stupa', 'Patan'],
    'Gandaki': ['Pokhara', 'Annapurna Base Camp', 'Phewa Lake', 'Sarangkot'],
    'Province 1': ['Everest Base Camp', 'Namche Bazaar', 'Ilam Tea Gardens'],
    'Lumbini': ['Lumbini (Buddha\'s Birthplace)', 'Maya Devi Temple'],
    'Chitwan': ['Chitwan NP', 'Elephant Safari', 'Tharu Village'],
  },

  // PORTUGAL
  Portugal: {
    'Lisboa': ['Belem Tower', 'Alfama', 'Sintra Palace', 'Tram 28', 'LX Factory'],
    'Porto': ['Ribeira District', 'Livraria Lello', 'Dom Luis Bridge', 'Port Wine Cellars'],
    'Faro': ['Algarve Beaches', 'Benagil Cave', 'Lagos', 'Tavira'],
    'Madeira': ['Funchal', 'Levada Walks', 'Monte Palace Garden'],
    'Acores': ['Sete Cidades', 'Furnas Hot Springs', 'Whale Watching'],
  },

  // NEW ZEALAND
  'New Zealand': {
    'Auckland': ['Sky Tower', 'Waiheke Island', 'Rangitoto Island'],
    'Canterbury': ['Christchurch', 'Mount Cook', 'Lake Tekapo', 'Arthur\'s Pass'],
    'Otago': ['Queenstown', 'Milford Sound', 'Wanaka', 'Remarkables'],
    'Bay of Plenty': ['Rotorua Geysers', 'Hobbiton', 'White Island'],
    'Wellington': ['Te Papa Museum', 'Cable Car', 'Zealandia'],
    'Waikato': ['Waitomo Glowworm Caves', 'Hamilton Gardens'],
  },

  // ARGENTINA
  Argentina: {
    'Buenos Aires': ['La Boca', 'Recoleta Cemetery', 'Plaza de Mayo', 'Tango Shows'],
    'Misiones': ['Iguazu Falls', 'Jesuit Missions'],
    'Santa Cruz': ['Perito Moreno Glacier', 'El Chalten', 'Los Glaciares NP'],
    'Tierra del Fuego': ['Ushuaia End of the World', 'Beagle Channel'],
    'Mendoza': ['Wine Country', 'Aconcagua', 'Andes'],
    'Salta': ['Quebrada de Humahuaca', 'Salta Cathedral', 'Train to the Clouds'],
  },

  // RUSSIA
  Russia: {
    'Moscow': ['Red Square', 'Kremlin', 'St Basil\'s Cathedral', 'Bolshoi Theatre'],
    'St Petersburg': ['Hermitage Museum', 'Winter Palace', 'Peterhof', 'Catherine Palace'],
    'Irkutsk Oblast': ['Lake Baikal', 'Olkhon Island'],
    'Kamchatka': ['Valley of Geysers', 'Volcanoes'],
    'Krasnodar': ['Sochi', 'Black Sea Beaches'],
  },

  // KENYA
  Kenya: {
    'Nairobi': ['Nairobi NP', 'David Sheldrick Trust', 'Giraffe Centre', 'Karen Blixen Museum'],
    'Narok': ['Masai Mara', 'Great Migration', 'Hot Air Balloon Safari'],
    'Mombasa': ['Diani Beach', 'Fort Jesus', 'Old Town'],
    'Nakuru': ['Lake Nakuru NP', 'Flamingos'],
    'Laikipia': ['Ol Pejeta Conservancy', 'Mount Kenya'],
    'Kajiado': ['Amboseli NP', 'Kilimanjaro Views'],
  },

  // TANZANIA
  Tanzania: {
    'Arusha': ['Mount Kilimanjaro', 'Serengeti NP', 'Ngorongoro Crater'],
    'Zanzibar': ['Stone Town', 'Nungwi Beach', 'Spice Tour', 'Prison Island'],
    'Manyara': ['Lake Manyara NP', 'Tree-climbing Lions'],
    'Kilimanjaro': ['Kilimanjaro Summit', 'Moshi Town'],
  },

  // UAE
  'United Arab Emirates': {
    'Dubai': ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari', 'Dubai Frame'],
    'Abu Dhabi': ['Sheikh Zayed Mosque', 'Louvre Abu Dhabi', 'Yas Island', 'Saadiyat Island'],
    'Sharjah': ['Sharjah Museum', 'Al Noor Island', 'Blue Souk'],
  },

  // SINGAPORE
  Singapore: {
    'Singapore': ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Chinatown', 'Orchard Road', 'Merlion Park', 'Little India', 'Clarke Quay'],
  },

  // MALAYSIA
  Malaysia: {
    'Kuala Lumpur': ['Petronas Towers', 'Batu Caves', 'KL Tower', 'Chinatown'],
    'Sabah': ['Mount Kinabalu', 'Sipadan Island', 'Orangutan Sanctuary'],
    'Sarawak': ['Bako NP', 'Kuching', 'Mulu Caves'],
    'Penang': ['George Town', 'Street Art', 'Penang Hill', 'Kek Lok Si Temple'],
    'Pahang': ['Cameron Highlands', 'Taman Negara', 'Tioman Island'],
    'Langkawi': ['Sky Bridge', 'Eagle Square', 'Mangrove Tour'],
  },

  // IRELAND
  Ireland: {
    'Dublin': ['Trinity College', 'Temple Bar', 'Guinness Storehouse', 'Phoenix Park'],
    'Galway': ['Cliffs of Moher', 'Aran Islands', 'Connemara'],
    'Cork': ['Blarney Castle', 'English Market', 'Cobh'],
    'Kerry': ['Ring of Kerry', 'Skellig Michael', 'Killarney NP'],
  },

  // CROATIA
  Croatia: {
    'Dubrovnik': ['Old Town Walls', 'Game of Thrones Locations', 'Lokrum Island'],
    'Split': ['Diocletian\'s Palace', 'Marjan Hill', 'Bacvice Beach'],
    'Plitvice': ['Plitvice Lakes NP', 'Waterfalls', 'Hiking Trails'],
    'Zadar': ['Sea Organ', 'Sun Salutation', 'Old Town'],
    'Istria': ['Pula Arena', 'Rovinj', 'Truffle Hunting'],
  },

  // ICELAND
  Iceland: {
    'Capital Region': ['Reykjavik', 'Hallgrimskirkja', 'Harpa Concert Hall'],
    'South': ['Golden Circle', 'Gullfoss', 'Geysir', 'Vik Black Sand Beach', 'Seljalandsfoss'],
    'East': ['Vatnajokull Glacier', 'Jokulsarlon Ice Lagoon'],
    'North': ['Akureyri', 'Godafoss', 'Myvatn', 'Husavik Whale Watching'],
    'West': ['Snaefellsnes Peninsula', 'Kirkjufell Mountain'],
  },

  // SWITZERLAND
  Switzerland: {
    'Bern': ['Old Town Bern', 'Bear Park', 'Zytglogge Clock Tower'],
    'Zurich': ['Old Town', 'Lake Zurich', 'Bahnhofstrasse'],
    'Lucerne': ['Chapel Bridge', 'Lion Monument', 'Mount Pilatus', 'Lake Lucerne'],
    'Valais': ['Matterhorn', 'Zermatt', 'Aletsch Glacier'],
    'Graubunden': ['St Moritz', 'Glacier Express', 'Davos'],
    'Bern Region': ['Interlaken', 'Jungfraujoch', 'Grindelwald', 'Lauterbrunnen'],
  },

  // NORWAY
  Norway: {
    'Oslo': ['Viking Ship Museum', 'Opera House', 'Vigeland Park', 'Akershus Fortress'],
    'Vestland': ['Bergen Bryggen', 'Trolltunga', 'Hardangerfjord', 'Folgefonna Glacier'],
    'Rogaland': ['Preikestolen (Pulpit Rock)', 'Stavanger', 'Lysefjord'],
    'Tromso': ['Northern Lights', 'Arctic Cathedral', 'Whale Safari'],
    'Nordland': ['Lofoten Islands', 'Svartisen Glacier', 'Bodo'],
  },

  // JORDAN
  Jordan: {
    'Ma\'an': ['Petra', 'Wadi Rum', 'Treasury'],
    'Amman': ['Citadel', 'Roman Theatre', 'Rainbow Street'],
    'Aqaba': ['Red Sea Diving', 'Aqaba Fort'],
    'Dead Sea': ['Dead Sea Float', 'Spa Resorts'],
    'Madaba': ['Mosaic Map', 'Mount Nebo'],
  },

  // CAMBODIA
  Cambodia: {
    'Siem Reap': ['Angkor Wat', 'Angkor Thom', 'Ta Prohm', 'Tonle Sap Lake'],
    'Phnom Penh': ['Royal Palace', 'S-21 Museum', 'Central Market', 'Mekong River'],
    'Sihanoukville': ['Koh Rong', 'Otres Beach', 'Ream NP'],
    'Battambang': ['Bamboo Train', 'Killing Caves', 'Bat Caves'],
  },

  // SRI LANKA
  'Sri Lanka': {
    'Central': ['Kandy Temple of Tooth', 'Sigiriya Rock', 'Ella Train Ride', 'Adam\'s Peak'],
    'Southern': ['Galle Fort', 'Mirissa Whale Watching', 'Unawatuna Beach'],
    'Western': ['Colombo', 'Gangaramaya Temple', 'Mount Lavinia'],
    'North Central': ['Anuradhapura', 'Polonnaruwa', 'Dambulla Cave Temple'],
    'Uva': ['Nine Arches Bridge', 'Little Adam\'s Peak'],
  },

  // PAKISTAN
  Pakistan: {
    'Gilgit-Baltistan': ['Hunza Valley', 'Fairy Meadows', 'Karakoram Highway', 'Attabad Lake'],
    'Khyber Pakhtunkhwa': ['Swat Valley', 'Chitral', 'Kalash Valley'],
    'Punjab': ['Lahore Fort', 'Badshahi Mosque', 'Shalimar Gardens', 'Faisal Mosque Islamabad'],
    'Sindh': ['Mohenjo-daro', 'Karachi', 'Clifton Beach'],
    'Azad Kashmir': ['Neelum Valley', 'Muzaffarabad', 'Sharda'],
  },
};

export default destinations;
