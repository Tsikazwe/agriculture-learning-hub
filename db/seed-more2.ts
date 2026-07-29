import { db } from "./drizzle";
import { crops } from "./schema/crops";
import { pests } from "./schema/pests";
import { cropPests } from "./schema/cropPests";
import { quizQuestions } from "./schema/quizQuestions";

async function seedMore2() {
  console.log("Seeding batch 3 crops...");

  const insertedCrops = await db
    .insert(crops)
    .values([
      {
        slug: "irish-potatoes",
        name: "Irish Potatoes",
        scientificName: "Solanum tuberosum",
        image: "/images/irish-potatoes.jpg",
        zones: ["IIa", "III"],
        plantingStart: "February",
        plantingEnd: "April",
        overview:
          "Irish potatoes are grown mainly in Zambia's cooler, higher-rainfall areas, with Northwestern Province producing the largest share nationally. The crop favors well-drained, fertile sandy loam soils that stay moist and cool.",
        landPreparation: [
          "Plough to a fine tilth and make raised ridges",
          "Avoid heavy clay soils that drain poorly",
        ],
        spacing: "75cm between ridges, 30cm between plants",
        fertilizerBasal: "Compound D or similar basal fertilizer at planting",
        fertilizerTopDressing: "Top dress with a nitrogen fertilizer once plants are established",
        commonVarieties: ["Up-to-Date", "Kondowe", "Mwansabombwe"],
        harvestTime: "3-4 months after planting, once foliage dies back",
      },
      {
        slug: "cotton",
        name: "Cotton",
        scientificName: "Gossypium hirsutum",
        image: "/images/cotton.jpg",
        zones: ["I", "IIa"],
        plantingStart: "November",
        plantingEnd: "December",
        overview:
          "Cotton is a major smallholder cash crop in Zambia, historically supported by local textile mills, and widely grown in the Eastern, Central and Southern provinces including the Gwembe Valley near Lake Kariba.",
        landPreparation: [
          "Plough early to allow the first rains to settle the soil",
          "Remove crop residues from the previous season to reduce pest carryover",
        ],
        spacing: "90cm between rows, 30cm between plants",
        fertilizerBasal: "Compound D at planting",
        fertilizerTopDressing: "Urea, applied around 6 weeks after emergence",
        commonVarieties: ["Chureza", "Chibolya"],
        harvestTime: "May to July, picked in multiple rounds as bolls open",
      },
      {
        slug: "wheat",
        name: "Wheat",
        scientificName: "Triticum aestivum",
        image: "/images/wheat.jpg",
        zones: ["IIa"],
        plantingStart: "April",
        plantingEnd: "May",
        overview:
          "Wheat in Zambia is mainly grown as an irrigated winter crop on commercial farms, with major schemes at Mkushi and Mpongwe. Unlike most staple crops, it is planted in the dry season and relies entirely on irrigation.",
        landPreparation: [
          "Prepare a firm, level seedbed suited to irrigation",
          "Ensure irrigation infrastructure is functional before planting",
        ],
        spacing: "Drilled in narrow rows, typically 15-20cm apart",
        fertilizerBasal: "Compound D at planting",
        fertilizerTopDressing: "Split nitrogen applications during tillering and stem extension",
        commonVarieties: ["Kwale", "Nduna"],
        harvestTime: "August to September, when grain moisture drops and heads turn golden",
      },
      {
        slug: "cabbage",
        name: "Cabbage",
        scientificName: "Brassica oleracea var. capitata",
        image: "/images/cabbage.jpg",
        zones: ["I", "IIa", "IIb"],
        plantingStart: "March",
        plantingEnd: "August",
        overview:
          "Cabbage is a popular horticultural crop grown year-round near urban centers, often under irrigation during the dry season when market prices are higher.",
        landPreparation: [
          "Raise seedlings in a nursery bed before transplanting",
          "Prepare well-composted, fertile beds",
        ],
        spacing: "60cm between rows, 45cm between plants",
        fertilizerBasal: "Compound D at transplanting",
        fertilizerTopDressing: "Top dress with Urea 3 and 6 weeks after transplanting",
        commonVarieties: ["Drumhead", "Glory of Enkhuizen"],
        harvestTime: "80-100 days after transplanting, when heads are firm",
      },
    ])
    .returning();

  console.log(`Inserted ${insertedCrops.length} crops`);

  console.log("Seeding batch 3 pests...");

  const insertedPests = await db
    .insert(pests)
    .values([
      {
        slug: "red-spider-mite",
        name: "Red Spider Mite",
        image: "/images/red-spider-mite.jpg",
        symptoms: [
          "Fine yellow speckling on leaves",
          "Fine webbing visible on the underside of leaves",
          "Leaves turning bronze and dropping in severe cases",
        ],
        organicControl: [
          "Spray leaves with water to dislodge mites",
          "Encourage predatory mites and ladybirds",
        ],
        chemicalControl: [
          "Approved miticide applied when populations are high",
        ],
      },
      {
        slug: "african-bollworm",
        name: "African Bollworm",
        image: "/images/african-bollworm.jpg",
        symptoms: [
          "Round holes bored into bolls or fruit",
          "Larvae visible feeding inside damaged bolls",
          "Premature boll drop",
        ],
        organicControl: [
          "Regular field scouting to catch early infestations",
          "Handpicking larvae where practical",
        ],
        chemicalControl: [
          "Approved insecticide applied at early larval stage",
        ],
      },
      {
        slug: "late-blight",
        name: "Late Blight",
        image: "/images/late-blight.jpg",
        symptoms: [
          "Dark, water-soaked lesions on leaves",
          "White fungal growth on the underside of leaves in humid weather",
          "Rapid collapse of foliage",
        ],
        organicControl: [
          "Ensure good spacing for airflow to reduce humidity around plants",
          "Remove and destroy infected foliage promptly",
        ],
        chemicalControl: [
          "Approved fungicide applied preventatively during humid periods",
        ],
      },
      {
        slug: "powdery-mildew",
        name: "Powdery Mildew",
        image: "/images/powdery-mildew.jpg",
        symptoms: [
          "White powdery patches on leaves and stems",
          "Distorted or stunted new growth",
          "Premature yellowing of affected leaves",
        ],
        organicControl: [
          "Improve airflow through proper plant spacing",
          "Avoid excess nitrogen fertilizer, which encourages soft growth",
        ],
        chemicalControl: [
          "Approved sulfur-based or systemic fungicide",
        ],
      },
    ])
    .returning();

  console.log(`Inserted ${insertedPests.length} pests`);

  const bySlug = <T extends { slug: string }>(arr: T[], slug: string) =>
    arr.find((x) => x.slug === slug)!;

  const irishPotatoes = bySlug(insertedCrops, "irish-potatoes");
  const cotton = bySlug(insertedCrops, "cotton");
  const wheat = bySlug(insertedCrops, "wheat");
  const cabbage = bySlug(insertedCrops, "cabbage");

  const redSpiderMite = bySlug(insertedPests, "red-spider-mite");
  const africanBollworm = bySlug(insertedPests, "african-bollworm");
  const lateBlight = bySlug(insertedPests, "late-blight");
  const powderyMildew = bySlug(insertedPests, "powdery-mildew");

  console.log("Linking crops to pests...");

  await db.insert(cropPests).values([
    { cropId: irishPotatoes.id, pestId: lateBlight.id },
    { cropId: cotton.id, pestId: africanBollworm.id },
    { cropId: cotton.id, pestId: redSpiderMite.id },
    { cropId: cabbage.id, pestId: powderyMildew.id },
    { cropId: wheat.id, pestId: powderyMildew.id },
  ]);

  console.log("Seeding quiz questions...");

  await db.insert(quizQuestions).values([
    {
      cropId: irishPotatoes.id,
      question: "Which Zambian province produces the largest share of Irish potatoes?",
      options: ["Northwestern", "Eastern", "Copperbelt", "Luapula"],
      correctAnswer: 0,
    },
    {
      cropId: irishPotatoes.id,
      question: "What type of soil do Irish potatoes prefer?",
      options: [
        "Heavy clay",
        "Well-drained sandy loam",
        "Waterlogged soil",
        "Pure sand",
      ],
      correctAnswer: 1,
    },
    {
      cropId: cotton.id,
      question: "Where in Zambia is cotton historically grown using water from Lake Kariba?",
      options: ["Gwembe Valley", "Copperbelt", "Luapula swamps", "Northern highlands"],
      correctAnswer: 0,
    },
    {
      cropId: wheat.id,
      question: "How is wheat typically grown in Zambia?",
      options: [
        "Rain-fed only during the wet season",
        "As an irrigated winter crop",
        "Only in wetlands",
        "Without any fertilizer",
      ],
      correctAnswer: 1,
    },
    {
      cropId: cabbage.id,
      question: "How is cabbage typically established before it's planted in the field?",
      options: [
        "Direct seeding only",
        "Raised in a nursery bed, then transplanted",
        "Grown from cuttings",
        "Grown from tubers",
      ],
      correctAnswer: 1,
    },
  ]);

  console.log("Batch 3 seeding complete!");
  process.exit(0);
}

seedMore2().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});