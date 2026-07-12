import { db } from "./drizzle";
import { crops } from "./schema/crops";
import { pests } from "./schema/pests";
import { cropPests } from "./schema/cropPests";
import { quizQuestions } from "./schema/quizQuestions";

async function seed() {
  console.log("Seeding crops...");

  const insertedCrops = await db
    .insert(crops)
    .values([
      {
        slug: "maize",
        name: "Maize",
        scientificName: "Zea mays",
        image: "/images/maize.jpg",
        zones: ["I", "IIa", "IIb", "III"],
        plantingStart: "November",
        plantingEnd: "December",
        overview:
          "Maize is Zambia's staple crop, forming the basis of nshima. It grows across most agro-ecological zones, with variety choice depending on rainfall.",
        landPreparation: [
          "Clear land and plough at least 20-25cm deep",
          "Ridge or make flat seedbeds depending on soil type",
          "Ensure land is prepared before the first rains",
        ],
        spacing: "75cm between rows, 25cm between plants",
        fertilizerBasal: "Compound D at planting (200kg/ha)",
        fertilizerTopDressing: "Urea, applied 4-6 weeks after emergence",
        commonVarieties: ["SC627", "SC719", "PAN53"],
        harvestTime: "April to May, when husks turn brown and dry",
      },
      {
        slug: "groundnuts",
        name: "Groundnuts",
        scientificName: "Arachis hypogaea",
        image: "/images/groundnuts.jpg",
        zones: ["I", "IIa", "IIb"],
        plantingStart: "November",
        plantingEnd: "December",
        overview:
          "Groundnuts are a key legume crop in Zambia, valued for both food and cash income, and they improve soil fertility through nitrogen fixation.",
        landPreparation: [
          "Plough land to a fine tilth",
          "Ensure good drainage since groundnuts dislike waterlogging",
        ],
        spacing: "45cm between rows, 15cm between plants",
        fertilizerBasal: "Compound D not usually required if soil is fertile",
        fertilizerTopDressing: "Not typically needed for groundnuts",
        commonVarieties: ["Chalimbana", "MGV4", "MGV5"],
        harvestTime: "April to May, when leaves start yellowing",
      },
      {
        slug: "cassava",
        name: "Cassava",
        scientificName: "Manihot esculenta",
        image: "/images/cassava.jpg",
        zones: ["I", "IIa", "IIb"],
        plantingStart: "October",
        plantingEnd: "December",
        overview:
          "Cassava is a drought-tolerant staple crop widely grown in Zambia's Northern and Luapula provinces, valued for its ability to grow in poor soils.",
        landPreparation: [
          "Clear land and make ridges or mounds",
          "Prepare well-drained soil",
        ],
        spacing: "1m between rows, 1m between plants",
        fertilizerBasal: "Not usually required",
        fertilizerTopDressing: "Not usually required",
        commonVarieties: ["Bangweulu", "Mweru", "Kampolombo"],
        harvestTime: "8-18 months after planting, depending on variety",
      },
    ])
    .returning();

  console.log(`Inserted ${insertedCrops.length} crops`);

  console.log("Seeding pests...");

  const insertedPests = await db
    .insert(pests)
    .values([
      {
        slug: "fall-armyworm",
        name: "Fall Armyworm",
        image: "/images/fall-armyworm.jpg",
        symptoms: [
          "Ragged holes in leaves",
          "Sawdust-like frass near the whorl",
          "Damage concentrated in the plant's growing point",
        ],
        organicControl: [
          "Handpicking larvae early in infestation",
          "Applying ash or sand into the leaf whorl",
        ],
        chemicalControl: [
          "Approved insecticides applied directly into the whorl",
          "Rotate chemical groups to avoid resistance",
        ],
      },
      {
        slug: "groundnut-rosette",
        name: "Groundnut Rosette Virus",
        image: "/images/groundnut-rosette.jpg",
        symptoms: [
          "Stunted, bushy plant growth",
          "Yellow mottled or mosaic leaf pattern",
          "Reduced pod formation",
        ],
        organicControl: [
          "Early planting to avoid peak aphid vector season",
          "Removing and destroying infected plants",
        ],
        chemicalControl: [
          "Insecticide seed treatment to control aphid vectors",
        ],
      },
    ])
    .returning();

  console.log(`Inserted ${insertedPests.length} pests`);

  const maize = insertedCrops.find((c) => c.slug === "maize")!;
  const fallArmyworm = insertedPests.find((p) => p.slug === "fall-armyworm")!;
  const groundnuts = insertedCrops.find((c) => c.slug === "groundnuts")!;
  const rosette = insertedPests.find((p) => p.slug === "groundnut-rosette")!;

  await db.insert(cropPests).values([
    { cropId: maize.id, pestId: fallArmyworm.id },
    { cropId: groundnuts.id, pestId: rosette.id },
  ]);

  console.log("Linked crops to pests");

  await db.insert(quizQuestions).values([
    {
      cropId: maize.id,
      question: "What is the recommended row spacing for maize?",
      options: ["50cm", "75cm", "100cm", "30cm"],
      correctAnswer: 1,
    },
    {
      cropId: groundnuts.id,
      question: "What type of nutrient do groundnuts fix into the soil?",
      options: ["Phosphorus", "Nitrogen", "Potassium", "Calcium"],
      correctAnswer: 1,
    },
  ]);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});