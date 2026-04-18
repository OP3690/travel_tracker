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

  // AFGHANISTAN
  Afghanistan: { 'Kabul': ['Blue Mosque', 'Babur Gardens', 'National Museum'], 'Bamyan': ['Buddhas of Bamyan', 'Band-e-Amir Lakes'], 'Herat': ['Herat Citadel', 'Friday Mosque'] },
  // ALBANIA
  Albania: { 'Tirana': ['Skanderbeg Square', 'Bunk Art', 'Et\'hem Bey Mosque'], 'Berat': ['Berat Castle', 'Mangalem Quarter'], 'Gjirokaster': ['Gjirokaster Castle', 'Old Bazaar'], 'Saranda': ['Butrint', 'Ksamil Beach', 'Blue Eye Spring'] },
  // ALGERIA
  Algeria: { 'Algiers': ['Casbah of Algiers', 'Notre Dame d\'Afrique', 'Jardin d\'Essai'], 'Ghardaia': ['M\'zab Valley', 'Traditional Architecture'], 'Tipaza': ['Roman Ruins of Tipaza'] },
  // ANDORRA
  Andorra: { 'Andorra la Vella': ['Caldea Spa', 'Old Town', 'Casa de la Vall'] },
  // ANGOLA
  Angola: { 'Luanda': ['Fortaleza de Sao Miguel', 'Iron Palace', 'Ilha de Luanda'], 'Benguela': ['Lobito Beach', 'Benguela Railway'] },
  // ARMENIA
  Armenia: { 'Yerevan': ['Republic Square', 'Cascade Complex', 'Matenadaran'], 'Ararat': ['Khor Virap Monastery'], 'Aragatsotn': ['Garni Temple', 'Geghard Monastery'] },
  // AZERBAIJAN
  Azerbaijan: { 'Baku': ['Old City Icherisheher', 'Flame Towers', 'Heydar Aliyev Center'], 'Sheki': ['Sheki Khan Palace', 'Caravanserai'] },
  // BAHAMAS
  Bahamas: { 'Nassau': ['Atlantis Paradise Island', 'Nassau Straw Market', 'Blue Lagoon Island'], 'Exuma': ['Swimming Pigs', 'Thunderball Grotto'] },
  // BAHRAIN
  Bahrain: { 'Manama': ['Bahrain Fort', 'Al Fateh Grand Mosque', 'Bahrain National Museum'] },
  // BANGLADESH
  Bangladesh: { 'Dhaka': ['Lalbagh Fort', 'Ahsan Manzil', 'Star Mosque'], 'Chittagong': ['Cox\'s Bazar Beach', 'Saint Martin\'s Island'], 'Rajshahi': ['Somapura Mahavihara', 'Paharpur'] },
  // BARBADOS
  Barbados: { 'Bridgetown': ['Bridgetown Historic Area', 'Carlisle Bay', 'Harrison\'s Cave'] },
  // BELARUS
  Belarus: { 'Minsk': ['Independence Avenue', 'Victory Square', 'National Library'], 'Brest': ['Brest Fortress', 'Belovezhskaya Pushcha NP'] },
  // BELGIUM
  Belgium: { 'Brussels': ['Grand Place', 'Atomium', 'Manneken Pis', 'Magritte Museum'], 'Bruges': ['Historic Centre', 'Belfry Tower', 'Canals'], 'Ghent': ['Gravensteen Castle', 'Saint Bavo\'s Cathedral'], 'Antwerp': ['Cathedral of Our Lady', 'MAS Museum', 'Diamond District'] },
  // BELIZE
  Belize: { 'Belize': ['Great Blue Hole', 'Belize Barrier Reef', 'Ambergris Caye'], 'Cayo': ['ATM Cave', 'Xunantunich', 'San Ignacio'] },
  // BENIN
  Benin: { 'Abomey': ['Royal Palaces of Abomey'], 'Ouidah': ['Temple of Pythons', 'Door of No Return'] },
  // BHUTAN
  Bhutan: { 'Paro': ['Tiger\'s Nest Monastery', 'Paro Dzong', 'National Museum'], 'Thimphu': ['Tashichho Dzong', 'Buddha Dordenma', 'Memorial Chorten'], 'Punakha': ['Punakha Dzong', 'Suspension Bridge'] },
  // BOLIVIA
  Bolivia: { 'Potosi': ['Salar de Uyuni', 'Cerro Rico Mine'], 'La Paz': ['Witches Market', 'Valley of the Moon', 'Mi Teleferico'], 'Santa Cruz': ['Jesuit Missions', 'Amboro NP'] },
  // BOTSWANA
  Botswana: { 'North-West': ['Okavango Delta', 'Moremi Game Reserve'], 'North-East': ['Chobe NP', 'Elephant Herds'], 'Central': ['Makgadikgadi Pans', 'Kalahari Desert'] },
  // BRUNEI
  Brunei: { 'Brunei-Muara': ['Sultan Omar Ali Saifuddien Mosque', 'Royal Regalia Museum', 'Kampong Ayer Water Village'] },
  // BULGARIA
  Bulgaria: { 'Sofia': ['Alexander Nevsky Cathedral', 'Vitosha Mountain', 'National Palace of Culture'], 'Plovdiv': ['Old Town', 'Roman Theatre'], 'Varna': ['Black Sea Beach', 'Stone Forest'] },
  // BURKINA FASO
  'Burkina Faso': { 'Ouagadougou': ['Grand Mosque', 'National Museum'], 'Bobo-Dioulasso': ['Grand Mosque of Bobo', 'Ruins of Loropeni'] },
  // BURUNDI
  Burundi: { 'Bujumbura': ['Lake Tanganyika', 'Livingstone-Stanley Monument', 'Rusizi NP'] },
  // CAMEROON
  Cameroon: { 'Littoral': ['Douala', 'Ekom-Nkam Waterfalls'], 'Northwest': ['Mount Cameroon', 'Ring Road'] },
  // CAPE VERDE
  'Cape Verde': { 'Sal': ['Santa Maria Beach', 'Buracona Blue Eye'], 'Santiago': ['Cidade Velha', 'Praia'] },
  // CHAD
  Chad: { 'N\'Djamena': ['National Museum', 'Grand Mosque'], 'Ennedi': ['Ennedi Plateau', 'Natural Arches'] },
  // CHILE
  Chile: { 'Santiago': ['San Cristobal Hill', 'Plaza de Armas', 'La Moneda Palace'], 'Valparaiso': ['Colorful Houses', 'Funiculars', 'Street Art'], 'Antofagasta': ['Atacama Desert', 'Valle de la Luna', 'San Pedro de Atacama'], 'Magallanes': ['Torres del Paine', 'Patagonia', 'Punta Arenas'], 'Easter Island': ['Moai Statues', 'Rano Raraku', 'Anakena Beach'] },
  // COSTA RICA
  'Costa Rica': { 'San Jose': ['National Theatre', 'Central Market', 'Jade Museum'], 'Guanacaste': ['Tamarindo Beach', 'Rincon de la Vieja'], 'Limon': ['Tortuguero NP', 'Cahuita NP'], 'Puntarenas': ['Manuel Antonio NP', 'Monteverde Cloud Forest', 'Arenal Volcano'] },
  // CUBA
  Cuba: { 'Havana': ['Old Havana', 'Malecon', 'El Capitolio', 'Plaza de la Catedral'], 'Trinidad': ['Plaza Mayor', 'Valle de los Ingenios'], 'Vinales': ['Vinales Valley', 'Tobacco Farms', 'Mogotes'] },
  // CYPRUS
  Cyprus: { 'Paphos': ['Tombs of the Kings', 'Aphrodite\'s Rock', 'Kato Paphos'], 'Limassol': ['Limassol Old Town', 'Kolossi Castle'], 'Famagusta': ['Ayia Napa', 'Cape Greco'] },
  // CZECH REPUBLIC
  'Czech Republic': { 'Prague': ['Charles Bridge', 'Prague Castle', 'Old Town Square', 'Astronomical Clock'], 'Karlovy Vary': ['Hot Springs', 'Colonnade'], 'Cesky Krumlov': ['Cesky Krumlov Castle', 'Old Town'] },
  // DENMARK
  Denmark: { 'Copenhagen': ['Tivoli Gardens', 'Little Mermaid', 'Nyhavn', 'Christiania'], 'North Jutland': ['Skagen', 'Rabjerg Mile'], 'Central Jutland': ['Aarhus', 'Legoland Billund'] },
  // DOMINICAN REPUBLIC
  'Dominican Republic': { 'Santo Domingo': ['Colonial Zone', 'Alcazar de Colon', 'Los Tres Ojos'], 'La Altagracia': ['Punta Cana Beaches', 'Saona Island'], 'Samana': ['Los Haitises NP', 'El Limon Waterfall', 'Whale Watching'] },
  // ECUADOR
  Ecuador: { 'Quito': ['Old Town Quito', 'Middle of the World', 'TeleferiQo'], 'Galapagos': ['Galapagos Islands', 'Giant Tortoises', 'Blue-footed Boobies'], 'Chimborazo': ['Chimborazo Volcano'], 'Napo': ['Amazon Rainforest Lodge'] },
  // ESTONIA
  Estonia: { 'Tallinn': ['Old Town Tallinn', 'Alexander Nevsky Cathedral', 'Toompea Castle', 'Kadriorg Palace'], 'Tartu': ['University of Tartu', 'AHHAA Science Centre'] },
  // ETHIOPIA
  Ethiopia: { 'Addis Ababa': ['National Museum (Lucy)', 'Holy Trinity Cathedral', 'Merkato'], 'Amhara': ['Lalibela Rock Churches', 'Gondar Castles', 'Simien Mountains'], 'Tigray': ['Axum Obelisks', 'Tigray Rock Churches'] },
  // FIJI
  Fiji: { 'Viti Levu': ['Suva', 'Coral Coast', 'Pacific Harbour'], 'Mamanuca': ['Castaway Island', 'Cloud 9 Floating Bar'], 'Yasawa': ['Blue Lagoon', 'Sawa-i-Lau Caves'] },
  // FINLAND
  Finland: { 'Helsinki': ['Helsinki Cathedral', 'Suomenlinna', 'Market Square'], 'Lapland': ['Rovaniemi Santa Claus Village', 'Northern Lights', 'Icebreaker Cruise', 'Saariselka'], 'Turku': ['Turku Castle', 'Archipelago Trail'] },
  // GHANA
  Ghana: { 'Accra': ['Kwame Nkrumah Memorial', 'Jamestown', 'Labadi Beach'], 'Cape Coast': ['Cape Coast Castle', 'Kakum NP Canopy Walk'], 'Ashanti': ['Kumasi', 'Manhyia Palace'] },
  // GUATEMALA
  Guatemala: { 'Guatemala': ['Antigua Guatemala', 'Tikal Ruins', 'Lake Atitlan', 'Semuc Champey', 'Chichicastenango Market'] },
  // HONDURAS
  Honduras: { 'Islas de la Bahia': ['Roatan Island', 'Utila Diving'], 'Copan': ['Copan Ruins', 'Macaw Mountain'] },
  // HUNGARY
  Hungary: { 'Budapest': ['Parliament Building', 'Buda Castle', 'Szechenyi Thermal Bath', 'Fisherman\'s Bastion', 'Ruin Bars'], 'Eger': ['Eger Castle', 'Valley of Beautiful Women'], 'Balaton': ['Lake Balaton', 'Tihany Peninsula'] },
  // IRAN
  Iran: { 'Isfahan': ['Imam Square', 'Sheikh Lotfollah Mosque', 'Si-o-se-pol Bridge', 'Vank Cathedral'], 'Fars': ['Persepolis', 'Nasir al-Mulk Mosque (Pink Mosque)', 'Eram Garden'], 'Tehran': ['Golestan Palace', 'Grand Bazaar', 'Milad Tower'], 'Yazd': ['Yazd Old Town', 'Zoroastrian Fire Temple', 'Wind Towers'] },
  // IRAQ
  Iraq: { 'Baghdad': ['Al-Mutanabbi Street', 'Baghdad Museum', 'Al-Shaheed Monument'], 'Erbil': ['Erbil Citadel', 'Sami Abdulrahman Park'], 'Babylon': ['Ruins of Babylon', 'Ishtar Gate Replica'] },
  // ISRAEL
  Israel: { 'Jerusalem': ['Western Wall', 'Dome of the Rock', 'Church of Holy Sepulchre', 'Old City'], 'Tel Aviv': ['Tel Aviv Beach', 'Jaffa Old City', 'Carmel Market'], 'Dead Sea': ['Dead Sea Float', 'Masada', 'Ein Gedi'] },
  // JAMAICA
  Jamaica: { 'Kingston': ['Bob Marley Museum', 'Devon House', 'Blue Mountains'], 'Montego Bay': ['Doctor\'s Cave Beach', 'Rose Hall Great House'], 'Portland': ['Blue Lagoon', 'Reach Falls', 'Port Antonio'] },
  // KAZAKHSTAN
  Kazakhstan: { 'Almaty': ['Medeu Skating Rink', 'Big Almaty Lake', 'Kok Tobe', 'Green Bazaar'], 'Astana': ['Bayterek Tower', 'Khan Shatyr', 'Palace of Peace'] },
  // LAOS
  Laos: { 'Luang Prabang': ['Royal Palace Museum', 'Kuang Si Falls', 'Morning Alms Giving', 'Pak Ou Caves'], 'Vientiane': ['Pha That Luang', 'Buddha Park', 'Patuxai'], 'Champasak': ['Wat Phou', '4000 Islands'] },
  // LATVIA
  Latvia: { 'Riga': ['Old Riga', 'Art Nouveau District', 'House of the Blackheads', 'Central Market'], 'Sigulda': ['Turaida Castle', 'Gauja NP'] },
  // LEBANON
  Lebanon: { 'Beirut': ['Pigeon Rocks', 'National Museum', 'Gemmayzeh', 'Corniche'], 'Baalbek': ['Baalbek Temples', 'Temple of Jupiter'], 'Byblos': ['Byblos Castle', 'Old Souk', 'Ancient Port'] },
  // LITHUANIA
  Lithuania: { 'Vilnius': ['Old Town Vilnius', 'Gediminas Tower', 'Uzupis Republic', 'Gate of Dawn'], 'Trakai': ['Trakai Island Castle', 'Lake Galve'] },
  // MADAGASCAR
  Madagascar: { 'Antananarivo': ['Rova of Antananarivo', 'Lemur\'s Park'], 'Morondava': ['Avenue of the Baobabs', 'Tsingy de Bemaraha'], 'Toamasina': ['Andasibe-Mantadia NP', 'Indri Lemurs'] },
  // MALDIVES
  Maldives: { 'Male': ['Friday Mosque', 'National Museum', 'Sultan Park'], 'South Ari Atoll': ['Whale Shark Snorkeling', 'Overwater Villas'], 'Baa Atoll': ['Hanifaru Bay Manta Rays'] },
  // MALTA
  Malta: { 'Valletta': ['St John\'s Co-Cathedral', 'Upper Barrakka Gardens', 'Grand Master\'s Palace'], 'Gozo': ['Azure Window', 'Ggantija Temples', 'Ramla Bay'], 'Mdina': ['Silent City', 'St Paul\'s Cathedral'] },
  // MAURITIUS
  Mauritius: { 'Port Louis': ['Aapravasi Ghat', 'Central Market', 'Le Caudan Waterfront'], 'Black River': ['Chamarel Seven Colored Earth', 'Black River Gorges NP', 'Le Morne Brabant'] },
  // MONGOLIA
  Mongolia: { 'Ulaanbaatar': ['Gandantegchinlen Monastery', 'Chinggis Khaan Square', 'National Museum'], 'Gobi': ['Gobi Desert', 'Flaming Cliffs', 'Yolyn Am Valley'], 'Khentii': ['Genghis Khan Statue Complex'] },
  // MONTENEGRO
  Montenegro: { 'Kotor': ['Kotor Old Town', 'Bay of Kotor', 'San Giovanni Fortress'], 'Budva': ['Budva Old Town', 'Sveti Stefan', 'Mogren Beach'], 'Durmitor': ['Durmitor NP', 'Tara River Canyon', 'Black Lake'] },
  // MOZAMBIQUE
  Mozambique: { 'Maputo': ['Maputo Central Market', 'Iron House'], 'Inhambane': ['Tofo Beach', 'Whale Shark Diving'], 'Nampula': ['Island of Mozambique', 'Stone Town'] },
  // MYANMAR
  Myanmar: { 'Mandalay': ['U Bein Bridge', 'Mandalay Hill', 'Kuthodaw Pagoda'], 'Bagan': ['Bagan Temples', 'Hot Air Balloon Ride', 'Ananda Temple'], 'Yangon': ['Shwedagon Pagoda', 'Bogyoke Market', 'Kandawgyi Lake'], 'Shan': ['Inle Lake', 'Floating Gardens', 'Kakku Pagodas'] },
  // NAMIBIA
  Namibia: { 'Erongo': ['Sossusvlei', 'Deadvlei', 'Skeleton Coast'], 'Kunene': ['Etosha NP', 'Himba Villages'], 'Khomas': ['Windhoek', 'Christuskirche'] },
  // NETHERLANDS
  Netherlands: { 'Amsterdam': ['Anne Frank House', 'Rijksmuseum', 'Van Gogh Museum', 'Canal Ring', 'Vondelpark'], 'South Holland': ['The Hague', 'Keukenhof Gardens', 'Delft', 'Rotterdam Cube Houses'], 'North Brabant': ['Efteling Theme Park'] },
  // NICARAGUA
  Nicaragua: { 'Granada': ['Granada Cathedral', 'Isletas de Granada', 'Mombacho Volcano'], 'Leon': ['Leon Cathedral', 'Cerro Negro Volcano Boarding'], 'Rivas': ['Ometepe Island', 'San Juan del Sur'] },
  // NIGERIA
  Nigeria: { 'Lagos': ['Nike Art Gallery', 'Lekki Conservation Centre', 'Freedom Park'], 'Osun': ['Osun-Osogbo Sacred Grove'], 'Abuja': ['Aso Rock', 'National Mosque', 'Zuma Rock'] },
  // OMAN
  Oman: { 'Muscat': ['Sultan Qaboos Grand Mosque', 'Royal Opera House', 'Mutrah Souq', 'Al Jalali Fort'], 'Ad Dakhiliyah': ['Nizwa Fort', 'Jebel Akhdar', 'Bahla Fort'], 'Dhofar': ['Salalah', 'Wadi Darbat', 'Al Mughsail Beach'] },
  // PANAMA
  Panama: { 'Panama': ['Panama Canal', 'Casco Viejo', 'BioMuseo', 'Panama City Skyline'], 'Bocas del Toro': ['Bocas del Toro Islands', 'Red Frog Beach', 'Starfish Beach'], 'Chiriqui': ['Boquete', 'Volcan Baru'] },
  // PHILIPPINES
  Philippines: { 'Cebu': ['Kawasan Falls', 'Whale Shark Oslob', 'Magellan\'s Cross'], 'Palawan': ['El Nido', 'Underground River', 'Coron', 'Honda Bay'], 'Manila': ['Intramuros', 'Rizal Park', 'San Agustin Church'], 'Bohol': ['Chocolate Hills', 'Tarsier Sanctuary', 'Panglao Beach'], 'Aklan': ['Boracay White Beach'] },
  // POLAND
  Poland: { 'Krakow': ['Wawel Castle', 'Main Market Square', 'St Mary\'s Basilica', 'Kazimierz'], 'Warsaw': ['Old Town Warsaw', 'Royal Castle', 'Lazienki Park'], 'Malopolska': ['Auschwitz-Birkenau', 'Wieliczka Salt Mine'], 'Pomerania': ['Gdansk', 'Malbork Castle'] },
  // QATAR
  Qatar: { 'Doha': ['Museum of Islamic Art', 'Souq Waqif', 'The Pearl Qatar', 'Katara Cultural Village'] },
  // ROMANIA
  Romania: { 'Bucharest': ['Palace of Parliament', 'Old Town', 'Village Museum'], 'Brasov': ['Bran Castle (Dracula)', 'Brasov Old Town', 'Black Church'], 'Sibiu': ['Sibiu Old Town', 'Transfagarasan Road'], 'Maramures': ['Wooden Churches', 'Merry Cemetery'] },
  // RWANDA
  Rwanda: { 'Kigali': ['Kigali Genocide Memorial', 'Inema Arts Center'], 'Musanze': ['Volcanoes NP', 'Mountain Gorilla Trekking'], 'Nyungwe': ['Nyungwe Forest NP', 'Canopy Walk'] },
  // SAUDI ARABIA
  'Saudi Arabia': { 'Makkah': ['Masjid al-Haram', 'Kaaba'], 'Madinah': ['Al-Masjid an-Nabawi', 'Mount Uhud'], 'Riyadh': ['Kingdom Centre Tower', 'Masmak Fortress', 'Edge of the World'], 'AlUla': ['Hegra (Mada\'in Saleh)', 'Elephant Rock', 'AlUla Old Town'] },
  // SENEGAL
  Senegal: { 'Dakar': ['Goree Island', 'African Renaissance Monument', 'IFAN Museum'], 'Saint-Louis': ['Saint-Louis Island', 'Djoudj Bird Sanctuary'] },
  // SERBIA
  Serbia: { 'Belgrade': ['Belgrade Fortress', 'Knez Mihailova Street', 'Saint Sava Temple', 'Skadarlija'], 'Novi Sad': ['Petrovaradin Fortress', 'EXIT Festival'] },
  // SEYCHELLES
  Seychelles: { 'Mahe': ['Beau Vallon Beach', 'Victoria Market', 'Morne Seychellois NP'], 'Praslin': ['Vallee de Mai', 'Anse Lazio Beach'], 'La Digue': ['Anse Source d\'Argent', 'L\'Union Estate'] },
  // SLOVAKIA
  Slovakia: { 'Bratislava': ['Bratislava Castle', 'Old Town', 'St Martin\'s Cathedral'], 'Presov': ['Spis Castle', 'Slovak Paradise NP'], 'Zilina': ['High Tatras', 'Demanovska Ice Cave'] },
  // SLOVENIA
  Slovenia: { 'Ljubljana': ['Ljubljana Castle', 'Triple Bridge', 'Dragon Bridge'], 'Gorenjska': ['Lake Bled', 'Bled Castle', 'Vintgar Gorge'], 'Karst': ['Postojna Cave', 'Predjama Castle'] },
  // SWEDEN
  Sweden: { 'Stockholm': ['Gamla Stan Old Town', 'Vasa Museum', 'ABBA Museum', 'Royal Palace'], 'Gotland': ['Visby', 'Medieval Town'], 'Lapland': ['Ice Hotel', 'Northern Lights', 'Abisko NP'] },
  // TAIWAN
  Taiwan: { 'Taipei': ['Taipei 101', 'Night Markets', 'Longshan Temple', 'Elephant Mountain'], 'Hualien': ['Taroko Gorge', 'Qingshui Cliff'], 'Tainan': ['Anping Fort', 'Confucius Temple'], 'Sun Moon Lake': ['Sun Moon Lake', 'Wenwu Temple'] },
  // TUNISIA
  Tunisia: { 'Tunis': ['Medina of Tunis', 'Bardo Museum', 'Carthage Ruins'], 'Sousse': ['Medina of Sousse', 'Ribat'], 'Tozeur': ['Sahara Desert Tours', 'Star Wars Filming Locations', 'Chebika Oasis'] },
  // UGANDA
  Uganda: { 'Kampala': ['Kasubi Tombs', 'Uganda Museum', 'Baha\'i Temple'], 'Bwindi': ['Bwindi Gorilla Trekking'], 'Queen Elizabeth': ['Queen Elizabeth NP', 'Tree-climbing Lions', 'Kazinga Channel'] },
  // UKRAINE
  Ukraine: { 'Kyiv': ['St Sophia Cathedral', 'Kyiv Pechersk Lavra', 'Maidan Square', 'Chernobyl Tour'], 'Lviv': ['Lviv Old Town', 'High Castle', 'Lychakiv Cemetery'], 'Odessa': ['Potemkin Stairs', 'Odessa Opera House'] },
  // URUGUAY
  Uruguay: { 'Montevideo': ['Ciudad Vieja', 'Mercado del Puerto', 'Rambla'], 'Colonia': ['Colonia del Sacramento', 'Historic Quarter'], 'Maldonado': ['Punta del Este', 'Casapueblo'] },
  // UZBEKISTAN
  Uzbekistan: { 'Samarkand': ['Registan Square', 'Shah-i-Zinda', 'Bibi-Khanym Mosque'], 'Bukhara': ['Poi Kalon Complex', 'Ark Fortress', 'Lyab-i-Hauz'], 'Khiva': ['Itchan Kala', 'Kalta Minor Minaret'] },
  // VENEZUELA
  Venezuela: { 'Bolivar': ['Angel Falls', 'Canaima NP', 'Gran Sabana'], 'Merida': ['Merida Cable Car', 'Andes Mountains'], 'Nueva Esparta': ['Margarita Island', 'Playa El Agua'] },
  // YEMEN
  Yemen: { 'Sanaa': ['Old City of Sanaa', 'Bab al-Yemen'], 'Socotra': ['Socotra Island', 'Dragon Blood Trees'] },
  // ZAMBIA
  Zambia: { 'Livingstone': ['Victoria Falls', 'Devil\'s Pool', 'Bungee Jumping'], 'Lusaka': ['Lusaka National Museum'], 'South Luangwa': ['South Luangwa NP', 'Walking Safaris'] },
  // ZIMBABWE
  Zimbabwe: { 'Matabeleland North': ['Victoria Falls (Zimbabwe side)', 'Zambezi NP'], 'Masvingo': ['Great Zimbabwe Ruins'], 'Mashonaland': ['Harare', 'Mana Pools NP'] },
  // Additional small countries
  'Trinidad and Tobago': { 'Trinidad': ['Maracas Bay', 'Pitch Lake', 'Port of Spain'], 'Tobago': ['Pigeon Point', 'Nylon Pool'] },
  Luxembourg: { 'Luxembourg': ['Old Quarters', 'Casemates du Bock', 'Grand Ducal Palace', 'Mudam'] },
  Monaco: { 'Monaco': ['Monte Carlo Casino', 'Prince\'s Palace', 'Oceanographic Museum', 'Monaco Grand Prix Circuit'] },
  'Vatican City': { 'Vatican City': ['St Peter\'s Basilica', 'Sistine Chapel', 'Vatican Museums', 'St Peter\'s Square'] },
};

export default destinations;
