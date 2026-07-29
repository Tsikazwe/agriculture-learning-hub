import { db } from "./drizzle";
import { crops } from "./schema/crops";
import { quizQuestions } from "./schema/quizQuestions";
import { eq } from "drizzle-orm";

type Q = { question: string; options: string[]; correctAnswer: number };

const questionsBySlug: Record<string, Q[]> = {
  maize: [
    { question: "What is maize's role in the Zambian diet?", options: ["Livestock feed only", "Zambia's staple crop, basis of nshima", "Purely a cash export", "Used only for oil"], correctAnswer: 1 },
    { question: "What depth should land be ploughed for maize?", options: ["5cm", "20-25cm", "50cm", "1m"], correctAnswer: 1 },
    { question: "What is the spacing between maize plants within a row?", options: ["5cm", "25cm", "75cm", "150cm"], correctAnswer: 1 },
    { question: "Which basal fertilizer is commonly used for maize?", options: ["Compound D", "Urea only", "Lime", "No fertilizer needed"], correctAnswer: 0 },
    { question: "When is maize top-dressed with Urea?", options: ["At planting", "4-6 weeks after emergence", "After harvest", "Only if it rains"], correctAnswer: 1 },
    { question: "Which of these is a common maize variety in Zambia?", options: ["SC627", "Chalimbana", "Roma VF", "Kilombero"], correctAnswer: 0 },
    { question: "When is maize typically harvested?", options: ["January", "April to May", "August", "October"], correctAnswer: 1 },
    { question: "How do you know maize is ready for harvest?", options: ["Leaves turn purple", "Husks turn brown and dry", "Stems fall over", "Roots appear"], correctAnswer: 1 },
    { question: "In how many agro-ecological zones does maize grow well?", options: ["Only Zone I", "Most zones (I, IIa, IIb, III)", "Only Zone III", "None"], correctAnswer: 1 },
    { question: "What pest commonly attacks maize in Zambia?", options: ["Fall Armyworm", "Red Spider Mite", "Aphids only", "Bacterial Wilt"], correctAnswer: 0 },
    { question: "What is the row spacing for maize?", options: ["25cm", "75cm", "150cm", "10cm"], correctAnswer: 1 },
    { question: "What should be done before the first rains for maize?", options: ["Nothing", "Land should be prepared", "Harvest early", "Apply fungicide"], correctAnswer: 1 },
    { question: "Which month typically starts the maize planting window?", options: ["June", "November", "February", "September"], correctAnswer: 1 },
  ],
  groundnuts: [
    { question: "What nutrient do groundnuts fix into the soil?", options: ["Nitrogen", "Potassium", "Sulfur", "Calcium"], correctAnswer: 0 },
    { question: "What soil condition should be avoided for groundnuts?", options: ["Sandy soil", "Waterlogging", "Full sun", "Deep ploughing"], correctAnswer: 1 },
    { question: "What is the spacing between groundnut rows?", options: ["15cm", "45cm", "90cm", "150cm"], correctAnswer: 1 },
    { question: "What is the spacing between groundnut plants?", options: ["5cm", "15cm", "50cm", "1m"], correctAnswer: 1 },
    { question: "Is basal fertilizer usually required for groundnuts on fertile soil?", options: ["Yes, always", "Not usually required", "Only in Zone III", "Only after flowering"], correctAnswer: 1 },
    { question: "Which is a common groundnut variety in Zambia?", options: ["Chalimbana", "SC627", "Roma VF", "Kwale"], correctAnswer: 0 },
    { question: "What sign shows groundnuts are ready to harvest?", options: ["Leaves start yellowing", "Stems turn red", "Roots grow upward", "Flowers appear"], correctAnswer: 0 },
    { question: "When are groundnuts typically harvested?", options: ["January", "April to May", "August", "October"], correctAnswer: 1 },
    { question: "What virus commonly affects groundnuts?", options: ["Groundnut Rosette Virus", "Bacterial Wilt", "Late Blight", "Powdery Mildew"], correctAnswer: 0 },
    { question: "What planting window suits groundnuts?", options: ["June-July", "November-December", "February-March", "September"], correctAnswer: 1 },
    { question: "What benefit do groundnuts give to a farming system?", options: ["Improve soil fertility via nitrogen fixation", "Deplete all nutrients", "Attract more pests", "Require no rotation"], correctAnswer: 0 },
    { question: "Which zones can groundnuts grow well in?", options: ["I, IIa, IIb", "Only III", "Only I", "Nowhere in Zambia"], correctAnswer: 0 },
  ],
  cassava: [
    { question: "Why is cassava valued in poor soil conditions?", options: ["It requires no soil", "It grows well even in poor soils", "It only needs sand", "It grows in water"], correctAnswer: 1 },
    { question: "Roughly how long does cassava take to be ready for harvest?", options: ["1-2 months", "3-4 months", "8-18 months", "3 years"], correctAnswer: 2 },
    { question: "What is the recommended spacing for cassava?", options: ["20cm x 20cm", "1m x 1m", "3m x 3m", "10cm x 10cm"], correctAnswer: 1 },
    { question: "Which provinces grow the most cassava?", options: ["Southern and Western", "Northern and Luapula", "Central only", "Copperbelt only"], correctAnswer: 1 },
    { question: "Is fertilizer usually required for cassava?", options: ["Yes, heavily", "Not usually required", "Only top dressing", "Only lime"], correctAnswer: 1 },
    { question: "Which is a recognized cassava variety in Zambia?", options: ["Bangweulu", "SC627", "Chalimbana", "Kwale"], correctAnswer: 0 },
    { question: "What land preparation method suits cassava?", options: ["Ridges or mounds", "Flooding fields", "No preparation needed", "Deep trenching only"], correctAnswer: 0 },
    { question: "When is cassava typically planted?", options: ["June-July", "October to December", "February only", "Never planted, only wild"], correctAnswer: 1 },
    { question: "What soil quality does cassava tolerate well?", options: ["Only rich volcanic soil", "Poor soils", "Only clay", "Only irrigated soil"], correctAnswer: 1 },
    { question: "How many zones can cassava be grown in per this guide?", options: ["1", "3 (I, IIa, IIb)", "All 4 zones", "0"], correctAnswer: 1 },
  ],
  soybeans: [
    { question: "What natural process do soybeans contribute to the soil?", options: ["Nitrogen fixation", "Potassium depletion", "Salinization", "Erosion"], correctAnswer: 0 },
    { question: "What is the recommended row spacing for soybeans?", options: ["20cm", "45cm", "75cm", "100cm"], correctAnswer: 1 },
    { question: "What is soybean primarily used for?", options: ["Cooking oil and stockfeed", "Only decoration", "Only export", "Building material"], correctAnswer: 0 },
    { question: "When is soybean typically ready for harvest?", options: ["Immediately after flowering", "April to May, when pods rattle", "Within 1 month", "Only in winter"], correctAnswer: 1 },
    { question: "What soil condition should soybean fields avoid?", options: ["Waterlogging", "Sun exposure", "Wind", "Cool temperatures"], correctAnswer: 0 },
    { question: "Is top dressing usually required for soybeans?", options: ["Yes, always required", "Not usually, due to nitrogen fixation", "Only in Zone III", "Twice a week"], correctAnswer: 1 },
    { question: "Which is a recognized soybean variety in Zambia?", options: ["Kafue", "Chalimbana", "SC627", "Bangweulu"], correctAnswer: 0 },
    { question: "What pest commonly affects soybeans?", options: ["Aphids", "Late Blight", "Cabbage Aphid only", "None"], correctAnswer: 0 },
    { question: "What planting window suits soybeans?", options: ["June-July", "November-December", "February-March", "September"], correctAnswer: 1 },
    { question: "Which zones suit soybean cultivation per this guide?", options: ["I, IIa, IIb", "Only III", "Only I", "None"], correctAnswer: 0 },
  ],
  sorghum: [
    { question: "Why is sorghum well suited to drier parts of Zambia?", options: ["It requires daily irrigation", "It is drought-tolerant", "It only grows in wetlands", "It needs constant flooding"], correctAnswer: 1 },
    { question: "What growth stage requires the most careful weeding in sorghum?", options: ["Seedling stage, since it's slow to establish", "Flowering stage", "Harvest stage", "Germination only"], correctAnswer: 0 },
    { question: "What is the recommended spacing between sorghum plants?", options: ["5cm", "20cm", "50cm", "1m"], correctAnswer: 1 },
    { question: "What basal fertilizer rate is typical for sorghum?", options: ["100kg/ha of Compound D", "No fertilizer at all", "1000kg/ha", "Only lime"], correctAnswer: 0 },
    { question: "When is sorghum top-dressed?", options: ["At planting", "4 weeks after emergence", "Never", "After harvest"], correctAnswer: 1 },
    { question: "Which is a recognized sorghum variety in Zambia?", options: ["Kuyuma", "Chalimbana", "SC627", "Roma VF"], correctAnswer: 0 },
    { question: "How do you know sorghum is ready to harvest?", options: ["Grain heads dry and harden", "Leaves turn purple", "Roots emerge", "Stems soften"], correctAnswer: 0 },
    { question: "What row spacing suits sorghum?", options: ["25cm", "75cm", "150cm", "10cm"], correctAnswer: 1 },
    { question: "In which zones does sorghum grow well?", options: ["I and IIa", "Only III", "All four zones equally", "None"], correctAnswer: 0 },
    { question: "When is sorghum typically planted?", options: ["June-July", "November-December", "February only", "September"], correctAnswer: 1 },
  ],
  cowpeas: [
    { question: "What benefit do cowpeas provide to soil for the next season?", options: ["They deplete nitrogen", "They improve soil fertility", "They increase soil salinity", "They have no soil effect"], correctAnswer: 1 },
    { question: "What is the spacing between cowpea rows?", options: ["20cm", "60cm", "120cm", "200cm"], correctAnswer: 1 },
    { question: "Roughly how long does it take cowpeas to reach harvest?", options: ["20-30 days", "70-90 days", "8-18 months", "2 years"], correctAnswer: 1 },
    { question: "Is fertilizer usually required for cowpeas?", options: ["Yes, heavy application", "Usually not required", "Only lime", "Only top dressing"], correctAnswer: 1 },
    { question: "Which is a recognized cowpea variety in Zambia?", options: ["Bubebe", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "What soil condition should cowpeas avoid?", options: ["Heavy waterlogged soils", "Sandy soils", "Sun exposure", "Cool weather"], correctAnswer: 0 },
    { question: "When is cowpea typically planted?", options: ["June-July", "December-January", "February only", "September"], correctAnswer: 1 },
    { question: "What tillage level suits cowpeas?", options: ["Deep trenching", "Light tillage", "No tillage tools allowed", "Only mechanized ploughing"], correctAnswer: 1 },
    { question: "What is cowpea grown for besides grain?", options: ["Leafy greens", "Timber", "Fiber", "Dye"], correctAnswer: 0 },
    { question: "In which zones do cowpeas grow well?", options: ["I, IIa, IIb", "Only III", "Only I", "None"], correctAnswer: 0 },
  ],
  "sweet-potatoes": [
    { question: "How high should sweet potato ridges or mounds typically be?", options: ["5cm", "30cm", "1m", "2m"], correctAnswer: 1 },
    { question: "How long after planting are sweet potatoes usually ready for harvest?", options: ["1 month", "4-5 months", "2 years", "1 week"], correctAnswer: 1 },
    { question: "What planting material is typically used for sweet potatoes?", options: ["Seeds", "Vine cuttings", "Grafted seedlings", "Bulbs"], correctAnswer: 1 },
    { question: "What is the spacing between sweet potato ridges?", options: ["10cm", "90cm", "3m", "5m"], correctAnswer: 1 },
    { question: "Why are sweet potatoes valued for food security?", options: ["They need daily irrigation", "They tolerate poor soils and irregular rainfall", "They only grow in greenhouses", "They require constant fertilizer"], correctAnswer: 1 },
    { question: "Which is a recognized sweet potato variety in Zambia?", options: ["Zambezi", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "Is basal fertilizer usually required for sweet potatoes on fertile soil?", options: ["Yes, heavily", "Not usually required", "Only lime", "Twice weekly"], correctAnswer: 1 },
    { question: "In which zones do sweet potatoes grow well?", options: ["All four zones (I, IIa, IIb, III)", "Only Zone I", "Only Zone III", "None"], correctAnswer: 0 },
    { question: "When is sweet potato typically planted?", options: ["June-July", "October to December", "February only", "September"], correctAnswer: 1 },
  ],
  tomatoes: [
    { question: "How often should tomatoes typically be top-dressed during growth?", options: ["Once, at planting only", "Every 3-4 weeks", "Daily", "Never"], correctAnswer: 1 },
    { question: "Why should tomato fields avoid overhead watering?", options: ["It wastes water", "It reduces leaf wetness and disease risk", "It attracts pests", "It changes soil pH"], correctAnswer: 1 },
    { question: "What is the spacing between tomato plants?", options: ["10cm", "45cm", "1m", "2m"], correctAnswer: 1 },
    { question: "When is tomato typically transplanted in Zambia?", options: ["June-July", "February-March", "October only", "December"], correctAnswer: 1 },
    { question: "How long after transplanting are tomatoes ready to harvest?", options: ["1 week", "60-90 days", "1 year", "3 years"], correctAnswer: 1 },
    { question: "Which is a recognized tomato variety?", options: ["Roma VF", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "What disease commonly affects tomatoes?", options: ["Bacterial Wilt", "Groundnut Rosette Virus", "Fall Armyworm", "Red Spider Mite only"], correctAnswer: 0 },
    { question: "What type of bed preparation suits tomatoes?", options: ["Raised, well-composted beds", "Flooded fields", "No preparation", "Deep trenches only"], correctAnswer: 0 },
    { question: "Is tomato harvest a one-time event?", options: ["Yes, harvested once only", "No, harvested continuously", "Only after 2 years", "Never harvested"], correctAnswer: 1 },
  ],
  sunflower: [
    { question: "How do you know sunflower is ready for harvest?", options: ["Leaves turn purple", "Back of the flower head turns brown", "Stem turns green", "Petals grow longer"], correctAnswer: 1 },
    { question: "What is the recommended row spacing for sunflower?", options: ["25cm", "75cm", "150cm", "10cm"], correctAnswer: 1 },
    { question: "What is sunflower primarily grown for in Zambia?", options: ["Oilseed cash crop", "Timber", "Fiber", "Ornamental use only"], correctAnswer: 0 },
    { question: "What soil preparation suits sunflower?", options: ["Fine seedbed, weed-free", "No preparation needed", "Only flooding", "Only mounds"], correctAnswer: 0 },
    { question: "When is sunflower top-dressed?", options: ["At planting", "3-4 weeks after emergence", "Never", "After harvest"], correctAnswer: 1 },
    { question: "Which is a recognized sunflower variety?", options: ["PAN 7351", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "What weather tolerance does sunflower have?", options: ["Requires constant flooding", "Tolerant of moderate drought", "Cannot survive any dry spell", "Requires greenhouse conditions"], correctAnswer: 1 },
    { question: "In which zones does sunflower grow well?", options: ["I, IIa, IIb", "Only III", "Only I", "None"], correctAnswer: 0 },
    { question: "When is sunflower typically planted?", options: ["June-July", "November-December", "February only", "September"], correctAnswer: 1 },
  ],
  rice: [
    { question: "In which Zambian regions is rice most commonly grown?", options: ["Dry southern plains", "Wetter regions and dambo areas, like Northern and Luapula", "High-altitude mountains", "Urban gardens only"], correctAnswer: 1 },
    { question: "What field condition does rice require during growth?", options: ["Completely dry soil", "Consistently moist or flooded soil", "Sandy, well-drained soil only", "Rocky terrain"], correctAnswer: 1 },
    { question: "What is the spacing for rice planting?", options: ["20cm x 20cm", "1m x 1m", "3m x 3m", "5cm x 5cm"], correctAnswer: 0 },
    { question: "How is rice fertilizer typically top-dressed?", options: ["Once only", "Split during tillering and heading", "Never", "Only after harvest"], correctAnswer: 1 },
    { question: "Which is a recognized rice variety in Zambia?", options: ["Supa", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "How do you know rice is ready to harvest?", options: ["Grains turn golden and firm", "Leaves turn purple", "Roots emerge above soil", "Stems soften"], correctAnswer: 0 },
    { question: "What land preparation does rice require?", options: ["Puddled, flooded, and leveled fields", "Dry ridges only", "No preparation", "Deep trenching"], correctAnswer: 0 },
    { question: "When is rice typically planted in Zambia?", options: ["June-July", "November-December", "February only", "September"], correctAnswer: 1 },
  ],
  "irish-potatoes": [
    { question: "Which Zambian province produces the largest share of Irish potatoes?", options: ["Northwestern", "Eastern", "Copperbelt", "Luapula"], correctAnswer: 0 },
    { question: "What type of soil do Irish potatoes prefer?", options: ["Heavy clay", "Well-drained sandy loam", "Waterlogged soil", "Pure sand"], correctAnswer: 1 },
    { question: "How long after planting are Irish potatoes typically ready for harvest?", options: ["2-3 weeks", "3-4 months", "1 year", "5 years"], correctAnswer: 1 },
    { question: "What is the spacing between Irish potato ridges?", options: ["10cm", "75cm", "3m", "5m"], correctAnswer: 1 },
    { question: "Which is a recognized Irish potato variety in Zambia?", options: ["Up-to-Date", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "What disease commonly threatens Irish potatoes?", options: ["Late Blight", "Bacterial Wilt only", "Fall Armyworm", "Red Spider Mite only"], correctAnswer: 0 },
    { question: "When are Irish potatoes typically planted?", options: ["June-July", "February to April", "October only", "December"], correctAnswer: 1 },
    { question: "What indicates Irish potatoes are ready for harvest?", options: ["Foliage dies back", "Leaves turn purple", "Roots grow upward", "Flowers bloom"], correctAnswer: 0 },
    { question: "In which zones do Irish potatoes grow well per this guide?", options: ["IIa and III", "Only Zone I", "All four zones", "None"], correctAnswer: 0 },
  ],
  cotton: [
    { question: "Where in Zambia is cotton historically grown using water from Lake Kariba?", options: ["Gwembe Valley", "Copperbelt", "Luapula swamps", "Northern highlands"], correctAnswer: 0 },
    { question: "How is cotton typically harvested?", options: ["All at once with machinery only", "Picked in multiple rounds as bolls open", "Harvested underground", "Cut down like grain"], correctAnswer: 1 },
    { question: "What is the spacing between cotton rows?", options: ["30cm", "90cm", "2m", "5m"], correctAnswer: 1 },
    { question: "Why should crop residues be removed before planting cotton?", options: ["To reduce pest carryover", "To increase weeds", "It has no effect", "To attract pests"], correctAnswer: 0 },
    { question: "Which is a recognized cotton variety in Zambia?", options: ["Chureza", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "What pest commonly damages cotton bolls?", options: ["African Bollworm", "Groundnut Rosette Virus", "Late Blight", "Powdery Mildew"], correctAnswer: 0 },
    { question: "When is cotton top-dressed with Urea?", options: ["At planting", "Around 6 weeks after emergence", "Never", "After harvest"], correctAnswer: 1 },
    { question: "When is cotton typically planted?", options: ["June-July", "November-December", "February only", "September"], correctAnswer: 1 },
  ],
  wheat: [
    { question: "How is wheat typically grown in Zambia?", options: ["Rain-fed only during the wet season", "As an irrigated winter crop", "Only in wetlands", "Without any fertilizer"], correctAnswer: 1 },
    { question: "What are the two major wheat-growing schemes mentioned for Zambia?", options: ["Mkushi and Mpongwe", "Lusaka and Ndola", "Livingstone and Kabwe", "Chipata and Mongu"], correctAnswer: 0 },
    { question: "When is wheat typically planted in Zambia?", options: ["April to May", "November-December", "August only", "January"], correctAnswer: 0 },
    { question: "How is wheat sown in the field?", options: ["Drilled in narrow rows", "Broadcast randomly with no pattern", "Transplanted as seedlings", "Planted from cuttings"], correctAnswer: 0 },
    { question: "How is wheat nitrogen fertilizer typically applied?", options: ["Once at planting only", "Split during tillering and stem extension", "Never applied", "Only after harvest"], correctAnswer: 1 },
    { question: "How do you know wheat is ready for harvest?", options: ["Grain moisture drops and heads turn golden", "Leaves turn purple", "Roots emerge", "Stems soften"], correctAnswer: 0 },
    { question: "What is essential before planting irrigated wheat?", options: ["Functional irrigation infrastructure", "Flooding the field permanently", "Nothing special", "Removing all fertilizer"], correctAnswer: 0 },
  ],
  cabbage: [
    { question: "How is cabbage typically established before it's planted in the field?", options: ["Direct seeding only", "Raised in a nursery bed, then transplanted", "Grown from cuttings", "Grown from tubers"], correctAnswer: 1 },
    { question: "How many days after transplanting is cabbage typically ready for harvest?", options: ["10-20 days", "80-100 days", "1 year", "6 months minimum"], correctAnswer: 1 },
    { question: "What is the spacing between cabbage plants?", options: ["10cm", "45cm", "1m", "2m"], correctAnswer: 1 },
    { question: "When is cabbage typically top-dressed?", options: ["Once only", "3 and 6 weeks after transplanting", "Never", "Only before transplanting"], correctAnswer: 1 },
    { question: "Which is a recognized cabbage variety?", options: ["Drumhead", "Chalimbana", "SC627", "Kafue"], correctAnswer: 0 },
    { question: "What disease commonly affects cabbage?", options: ["Powdery Mildew", "Groundnut Rosette Virus", "Fall Armyworm", "Late Blight only"], correctAnswer: 0 },
    { question: "When can cabbage be planted in Zambia according to this guide?", options: ["Only in December", "March through August", "Only in June", "Never during dry season"], correctAnswer: 1 },
    { question: "What soil quality suits cabbage beds?", options: ["Well-composted, fertile beds", "Pure sand", "Waterlogged clay", "Rocky soil"], correctAnswer: 0 },
  ],
};

async function seedQuizFull() {
  let totalInserted = 0;

  for (const [slug, questions] of Object.entries(questionsBySlug)) {
    const crop = await db.query.crops.findFirst({ where: eq(crops.slug, slug) });
    if (!crop) {
      console.warn(`Skipping ${slug} — crop not found`);
      continue;
    }

    await db.insert(quizQuestions).values(
      questions.map((q) => ({
        cropId: crop.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      }))
    );

    totalInserted += questions.length;
    console.log(`Inserted ${questions.length} questions for ${slug}`);
  }

  console.log(`Done! Inserted ${totalInserted} total questions.`);
  process.exit(0);
}

seedQuizFull().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});