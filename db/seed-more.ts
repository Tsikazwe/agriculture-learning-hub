import { db } from "./drizzle";
import { crops } from "./schema/crops";
import { pests } from "./schema/pests";
import { cropPests } from "./schema/cropPests";
import { quizQuestions } from "./schema/quizQuestions";

async function seedMore() {
  console.log("Seeding additional crops...");

  const insertedCrops = await db
    .insert(crops)
    .values([
      {
        slug: "soybeans",
        name: "Soybeans",
        scientificName: "Glycine max",
        image: "/images/soybeans.jpg",
        zones: ["I", "IIa", "IIb"],
        plantingStart: "November",
        plantingEnd: "December",
        overview:
          "Soybeans are a major legume crop in Zambia, valued for cooking oil, stockfeed, and their role in fixing nitrogen into the soil for future crops.",
        landPreparation: [
          "Plough to a fine, well-drained seedbed",
          "Avoid waterlogged fields",
        ],
        spacing: "45cm between rows, 5cm between plants",
        fertilizerBasal: "Compound D at planting, light application",
        fertilizerTopDressing: "Not usually required due to nitrogen fixation",
        commonVarieties: ["Kafue", "Musonga", "Solitaire"],
        harvestTime: "April to May, when pods turn brown and rattle",
      },
      {
        slug: "sorghum",
        name: "Sorghum",
        scientificName: "Sorghum bicolor",
        image: "/images/sorghum.jpg",
        zones: ["I", "IIa"],
        plantingStart: "November",
        plantingEnd: "December",
        overview:
          "Sorghum is a drought-tolerant staple grain, well suited to Zambia's drier regions where maize often struggles.",
        landPreparation: [
          "Prepare a fine seedbed",
          "Ensure early weeding since seedlings are slow to establish",
        ],
        spacing: "75cm between rows, 20cm between plants",
        fertilizerBasal: "Compound D at planting (100kg/ha)",
        fertilizerTopDressing: "Urea, applied 4 weeks after emergence",
        commonVarieties: ["Kuyuma", "Sima", "WSV387"],
        harvestTime: "April to May, when grain heads dry and harden",
      },
      {
        slug: "cowpeas",
        name: "Cowpeas",
        scientificName: "Vigna unguiculata",
        image: "/images/cowpeas.jpg",
        zones: ["I", "IIa", "IIb"],
        plantingStart: "December",
        plantingEnd: "January",
        overview:
          "Cowpeas are a fast-maturing legume grown for both grain and leafy greens, and improve soil fertility for the following season.",
        landPreparation: [
          "Light tillage is sufficient",
          "Avoid heavy waterlogged soils",
        ],
        spacing: "60cm between rows, 20cm between plants",
        fertilizerBasal: "Usually not required",
        fertilizerTopDressing: "Not required",
        commonVarieties: ["Bubebe", "Lutembwe"],
        harvestTime: "March to April, roughly 70-90 days after planting",
      },
      {
        slug: "sweet-potatoes",
        name: "Sweet Potatoes",
        scientificName: "Ipomoea batatas",
        image: "/images/sweet-potatoes.jpg",
        zones: ["I", "IIa", "IIb", "III"],
        plantingStart: "October",
        plantingEnd: "December",
        overview:
          "Sweet potatoes are a resilient root crop grown widely across Zambia, valued for food security due to their tolerance of poor soils and irregular rainfall.",
        landPreparation: [
          "Make ridges or mounds about 30cm high",
          "Use healthy vine cuttings for planting",
        ],
        spacing: "90cm between ridges, 30cm between plants",
        fertilizerBasal: "Not usually required on fertile soils",
        fertilizerTopDressing: "Not required",
        commonVarieties: ["Zambezi", "Chingovwa"],
        harvestTime: "4-5 months after planting",
      },
      {
        slug: "tomatoes",
        name: "Tomatoes",
        scientificName: "Solanum lycopersicum",
        image: "/images/tomatoes.jpg",
        zones: ["I", "IIa", "IIb"],
        plantingStart: "February",
        plantingEnd: "March",
        overview:
          "Tomatoes are a high-value horticultural crop grown by many small-scale Zambian farmers for local markets, requiring careful watering and pest management.",
        landPreparation: [
          "Prepare raised beds with well-composted soil",
          "Ensure good drainage to prevent root rot",
        ],
        spacing: "60cm between rows, 45cm between plants",
        fertilizerBasal: "Compound D at transplanting",
        fertilizerTopDressing: "Top dress with Urea every 3-4 weeks during growth",
        commonVarieties: ["Roma VF", "Money Maker"],
        harvestTime: "60-90 days after transplanting, harvested continuously",
      },
      {
        slug: "sunflower",
        name: "Sunflower",
        scientificName: "Helianthus annuus",
        image: "/images/sunflower.jpg",
        zones: ["I", "IIa", "IIb"],
        plantingStart: "November",
        plantingEnd: "December",
        overview:
          "Sunflower is grown as an oilseed cash crop in Zambia, tolerant of moderate drought and suited to a range of soil types.",
        landPreparation: [
          "Plough and harrow to a fine seedbed",
          "Ensure the field is weed-free before planting",
        ],
        spacing: "75cm between rows, 25cm between plants",
        fertilizerBasal: "Compound D at planting",
        fertilizerTopDressing: "Urea, applied 3-4 weeks after emergence",
        commonVarieties: ["PAN 7351", "Agsun 8251"],
        harvestTime: "April to May, when back of flower head turns brown",
      },
      {
        slug: "rice",
        name: "Rice",
        scientificName: "Oryza sativa",
        image: "/images/rice.jpg",
        zones: ["I", "IIa"],
        plantingStart: "November",
        plantingEnd: "December",
        overview:
          "Rice is grown in Zambia's wetter regions and dambo (wetland) areas, particularly in Northern and Luapula provinces, requiring consistently moist soil.",
        landPreparation: [
          "Prepare puddled, flooded fields for transplanting",
          "Level the field to maintain even water depth",
        ],
        spacing: "20cm between rows, 20cm between plants",
        fertilizerBasal: "Compound D before transplanting",
        fertilizerTopDressing: "Urea, split-applied during tillering and heading",
        commonVarieties: ["Supa", "Kilombero"],
        harvestTime: "April to May, when grains turn golden and firm",
      },
    ])
    .returning();

  console.log(`Inserted ${insertedCrops.length} crops`);

  console.log("Seeding additional pests...");

  const insertedPests = await db
    .insert(pests)
    .values([
      {
        slug: "aphids",
        name: "Aphids",
        image: "/images/aphids.jpg",
        symptoms: [
          "Curled or yellowing leaves",
          "Sticky honeydew residue on leaves",
          "Clusters of small insects on new growth",
        ],
        organicControl: [
          "Spray with diluted soapy water",
          "Encourage natural predators like ladybirds",
        ],
        chemicalControl: [
          "Approved systemic insecticides for severe infestations",
        ],
      },
      {
        slug: "stalk-borer",
        name: "Stalk Borer",
        image: "/images/stalk-borer.jpg",
        symptoms: [
          "Small holes in stems",
          "Wilting or broken stalks",
          "Tunnels visible when stem is split open",
        ],
        organicControl: [
          "Remove and destroy affected stalks after harvest",
          "Practice crop rotation to break the pest cycle",
        ],
        chemicalControl: [
          "Insecticide applied to the whorl at early infestation",
        ],
      },
      {
        slug: "bacterial-wilt",
        name: "Bacterial Wilt",
        image: "/images/bacterial-wilt.jpg",
        symptoms: [
          "Sudden wilting of leaves despite moist soil",
          "Brown discoloration inside the stem",
          "Plant collapse within days of first symptoms",
        ],
        organicControl: [
          "Remove and destroy infected plants immediately",
          "Rotate with non-host crops for at least 2 seasons",
        ],
        chemicalControl: [
          "No effective chemical cure; focus on prevention and sanitation",
        ],
      },
      {
        slug: "leaf-blight",
        name: "Leaf Blight",
        image: "/images/leaf-blight.jpg",
        symptoms: [
          "Brown or grey lesions on leaves",
          "Lesions expanding and merging in humid conditions",
          "Premature leaf drop",
        ],
        organicControl: [
          "Avoid overhead watering to reduce leaf wetness",
          "Space plants adequately for airflow",
        ],
        chemicalControl: [
          "Approved fungicide applied at first sign of lesions",
        ],
      },
    ])
    .returning();

  console.log(`Inserted ${insertedPests.length} pests`);

  const bySlug = <T extends { slug: string }>(arr: T[], slug: string) =>
    arr.find((x) => x.slug === slug)!;

  const soybeans = bySlug(insertedCrops, "soybeans");
  const sorghum = bySlug(insertedCrops, "sorghum");
  const cowpeas = bySlug(insertedCrops, "cowpeas");
  const sweetPotatoes = bySlug(insertedCrops, "sweet-potatoes");
  const tomatoes = bySlug(insertedCrops, "tomatoes");
  const sunflower = bySlug(insertedCrops, "sunflower");
  const rice = bySlug(insertedCrops, "rice");

  const aphids = bySlug(insertedPests, "aphids");
  const stalkBorer = bySlug(insertedPests, "stalk-borer");
  const bacterialWilt = bySlug(insertedPests, "bacterial-wilt");
  const leafBlight = bySlug(insertedPests, "leaf-blight");

  console.log("Linking crops to pests...");

  await db.insert(cropPests).values([
    { cropId: soybeans.id, pestId: aphids.id },
    { cropId: sorghum.id, pestId: stalkBorer.id },
    { cropId: tomatoes.id, pestId: bacterialWilt.id },
    { cropId: tomatoes.id, pestId: leafBlight.id },
    { cropId: sunflower.id, pestId: aphids.id },
    { cropId: rice.id, pestId: leafBlight.id },
  ]);

  console.log("Seeding quiz questions...");

  await db.insert(quizQuestions).values([
    {
      cropId: soybeans.id,
      question: "What natural process do soybeans contribute to the soil?",
      options: ["Nitrogen fixation", "Potassium depletion", "Salinization", "Erosion"],
      correctAnswer: 0,
    },
    {
      cropId: soybeans.id,
      question: "What is the recommended row spacing for soybeans?",
      options: ["20cm", "45cm", "75cm", "100cm"],
      correctAnswer: 1,
    },
    {
      cropId: sorghum.id,
      question: "Why is sorghum well suited to drier parts of Zambia?",
      options: [
        "It requires daily irrigation",
        "It is drought-tolerant",
        "It only grows in wetlands",
        "It needs constant flooding",
      ],
      correctAnswer: 1,
    },
    {
      cropId: cowpeas.id,
      question: "Roughly how long does it take cowpeas to reach harvest?",
      options: ["20-30 days", "70-90 days", "8-18 months", "2 years"],
      correctAnswer: 1,
    },
    {
      cropId: sweetPotatoes.id,
      question: "What planting material is typically used for sweet potatoes?",
      options: ["Seeds", "Vine cuttings", "Grafted seedlings", "Bulbs"],
      correctAnswer: 1,
    },
    {
      cropId: tomatoes.id,
      question: "Why should tomato fields avoid overhead watering?",
      options: [
        "It wastes water",
        "It reduces leaf wetness and disease risk",
        "It attracts pests",
        "It changes soil pH",
      ],
      correctAnswer: 1,
    },
    {
      cropId: sunflower.id,
      question: "How do you know sunflower is ready for harvest?",
      options: [
        "Leaves turn purple",
        "Back of the flower head turns brown",
        "Stem turns green",
        "Petals grow longer",
      ],
      correctAnswer: 1,
    },
    {
      cropId: rice.id,
      question: "What field condition does rice require during growth?",
      options: [
        "Completely dry soil",
        "Consistently moist or flooded soil",
        "Sandy, well-drained soil only",
        "Rocky terrain",
      ],
      correctAnswer: 1,
    },
  ]);

  console.log("Additional seeding complete!");
  process.exit(0);
}

seedMore().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});