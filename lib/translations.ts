export type Language = "english" | "bemba" | "nyanja";

export type Translations = {
  nav: {
    crops: string;
    pests: string;
    calendar: string;
    dashboard: string;
    signIn: string;
    signUp: string;
  };
  home: {
    title: string;
    subtitle: string;
    browseCrops: string;
    pestDirectory: string;
  };
  crops: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allZones: string;
  };
  pests: {
    title: string;
    subtitle: string;
  };
  dashboard: {
    welcomeBack: string;
    progressIntro: string;
    cropsCompleted: string;
    quizzesTaken: string;
    averageScore: string;
    savedCrops: string;
    completedCropsHeading: string;
    quizHistoryHeading: string;
    savedCropsHeading: string;
    noCropsCompleted: string;
    noQuizzesTaken: string;
    noSavedCrops: string;
    browseCrops: string;
  };
  calendar: {
    title: string;
    subtitle: string;
    plantLabel: string;
    noData: string;
  };
  detail: {
    landPrep: string;
    fertilizer: string;
    pests: string;
    harvest: string;
    quiz: string;
    plantingWindow: string;
    spacing: string;
    basal: string;
    topDressing: string;
    commonVarieties: string;
    noPestsRecorded: string;
    noPestsDescription: string;
    affects: string;
    symptoms: string;
    organicControl: string;
    chemicalControl: string;
    saveCrop: string;
    saved: string;
    markComplete: string;
    completed: string;
  };
  toast: {
    cropSaved: string;
    cropRemoved: string;
    signInToSave: string;
    markedComplete: string;
    signInToTrack: string;
    quizSubmitted: string;
    signInToSaveQuiz: string;
  };
};

export const translations: Record<Language, Translations> = {
  english: {
    nav: {
      crops: "Crops",
      pests: "Pests",
      calendar: "Calendar",
      dashboard: "Dashboard",
      signIn: "Sign In",
      signUp: "Sign Up",
    },
    home: {
      title: "Agriculture Learning Hub Zambia",
      subtitle:
        "Learn modern farming practices tailored to Zambia's crops, seasons, and agro-ecological zones — from land preparation to harvest.",
      browseCrops: "Browse Crops",
      pestDirectory: "Pest Directory",
    },
    crops: {
      title: "Crop Library",
      subtitle:
        "Learn best practices for growing crops suited to your agro-ecological zone.",
      searchPlaceholder: "Search crops...",
      allZones: "All Zones",
    },
    pests: {
      title: "Pest & Disease Directory",
      subtitle:
        "Identify common pests and diseases affecting Zambian crops, with organic and chemical control methods.",
    },
    dashboard: {
      welcomeBack: "Welcome back",
      progressIntro: "Here's your learning progress so far.",
      cropsCompleted: "Crops Completed",
      quizzesTaken: "Quizzes Taken",
      averageScore: "Average Score",
      savedCrops: "Saved Crops",
      completedCropsHeading: "Completed Crops",
      quizHistoryHeading: "Quiz History",
      savedCropsHeading: "Saved Crops",
      noCropsCompleted: "You haven't completed any crops yet.",
      noQuizzesTaken: "You haven't taken any quizzes yet.",
      noSavedCrops: "You haven't saved any crops yet.",
      browseCrops: "Browse Crops",
    },
    calendar: {
      title: "Seasonal Planting Calendar",
      subtitle:
        "See which crops to plant, month by month, based on Zambia's farming seasons.",
      plantLabel: "Plant",
      noData: "No planting data available yet.",
    },
    detail: {
      landPrep: "Land Prep",
      fertilizer: "Fertilizer",
      pests: "Pests",
      harvest: "Harvest",
      quiz: "Quiz",
      plantingWindow: "Planting window",
      spacing: "Spacing",
      basal: "Basal",
      topDressing: "Top dressing",
      commonVarieties: "Common varieties",
      noPestsRecorded: "No pests recorded",
      noPestsDescription: "No pest data has been added for this crop yet.",
      affects: "Affects",
      symptoms: "Symptoms",
      organicControl: "Organic Control",
      chemicalControl: "Chemical Control",
      saveCrop: "Save Crop",
      saved: "Saved",
      markComplete: "Mark as Complete",
      completed: "Completed",
    },
    toast: {
      cropSaved: "Crop saved!",
      cropRemoved: "Removed from saved crops",
      signInToSave: "Please sign in to save crops",
      markedComplete: "Marked as completed!",
      signInToTrack: "Please sign in to track progress",
      quizSubmitted: "Quiz submitted!",
      signInToSaveQuiz: "Please sign in to save your quiz results",
    },
  },
  bemba: {
    nav: {
      crops: "Ifimela",
      pests: "Utupumpu",
      calendar: "Kalenda",
      dashboard: "Ubumeneno",
      signIn: "Ingila",
      signUp: "Ilembo",
    },
    home: {
      title: "Ncenjelesho ya Bulimi Zambia",
      subtitle:
        "Sambilila inshila ishya ishya bulimi ishiwaminwa ku fimela, imyaka, na mapya ya Zambia.",
      browseCrops: "Langa Ifimela",
      pestDirectory: "Utupumpu",
    },
    crops: {
      title: "Ifimela",
      subtitle:
        "Sambilila inshila ishawaminwa ukubomba ifimela mu mapya yenu.",
      searchPlaceholder: "Fwaya ifimela...",
      allZones: "Amapya Yonse",
    },
    pests: {
      title: "Utupumpu ne Malwele",
      subtitle:
        "Ishibeni utupumpu ne malwele ayacita ifimela mu Zambia, pamo ne nshila sha kwafwa.",
    },
    dashboard: {
      welcomeBack: "Mwaiseni",
      progressIntro: "Uku e kulundana kwenu mu kusambilila.",
      cropsCompleted: "Ifimela Fyapwa",
      quizzesTaken: "Amepusho Yasangwilwe",
      averageScore: "Ubwingi bwa Mepusho",
      savedCrops: "Ifimela Fyasungwa",
      completedCropsHeading: "Ifimela Fyapwa",
      quizHistoryHeading: "Amashiwi ya Mepusho",
      savedCropsHeading: "Ifimela Fyasungwa",
      noCropsCompleted: "Tamulapwisha nangu cimo icimela.",
      noQuizzesTaken: "Tamulasangwilepo mepusho.",
      noSavedCrops: "Tamulasungapo icimela.",
      browseCrops: "Langa Ifimela",
    },
    calendar: {
      title: "Kalenda ya Kubyala",
      subtitle:
        "Moneni ifimela ifya kubyala, umwezi ku mwezi, ukulingana ne nshita sha bulimi mu Zambia.",
      plantLabel: "Byalani",
      noData: "Tapali fyebo pa kubyala.",
    },
    detail: {
      landPrep: "Ukupwililika Mushili",
      fertilizer: "Ifelesa",
      pests: "Utupumpu",
      harvest: "Ukulobolola",
      quiz: "Amepusho",
      plantingWindow: "Inshita ya kubyala",
      spacing: "Ubutali",
      basal: "Ifelesa lya Kubyala",
      topDressing: "Ifelesa lya Kukula",
      commonVarieties: "Imisango Iyafwilwa",
      noPestsRecorded: "Tapali tupumpu twalembwa",
      noPestsDescription: "Tapali fyebo fya tupumpu pali ici cimela.",
      affects: "Cicita",
      symptoms: "Ifishibilo",
      organicControl: "Ukwafwa mu Cifyalilwa",
      chemicalControl: "Ukwafwa na Mankini",
      saveCrop: "Sunga Icimela",
      saved: "Casungwa",
      markComplete: "Langa Ukupwa",
      completed: "Capwa",
    },
    toast: {
      cropSaved: "Icimela casungwa!",
      cropRemoved: "Cafumishiwa ku fyasungwa",
      signInToSave: "Ingilenimo pa kusunga ifimela",
      markedComplete: "Capwa!",
      signInToTrack: "Ingilenimo pa kulundana",
      quizSubmitted: "Amepusho yatumwa!",
      signInToSaveQuiz: "Ingilenimo pa kusunga ifisubulo fya mepusho",
    },
  },
  nyanja: {
    nav: {
      crops: "Mbewu",
      pests: "Tizirombo",
      calendar: "Kalendala",
      dashboard: "Bolodi",
      signIn: "Lowani",
      signUp: "Lembetsani",
    },
    home: {
      title: "Malo Ophunzirira Ulimi wa Zambia",
      subtitle:
        "Phunzirani njira zamakono zaulimi zoyenera mbewu, nyengo, ndi madera a Zambia.",
      browseCrops: "Onani Mbewu",
      pestDirectory: "Tizirombo",
    },
    crops: {
      title: "Mbewu",
      subtitle: "Phunzirani njira zabwino zolimira mbewu zoyenera dera lanu.",
      searchPlaceholder: "Sakani mbewu...",
      allZones: "Madera Onse",
    },
    pests: {
      title: "Tizirombo ndi Matenda",
      subtitle:
        "Dziwani tizirombo ndi matenda omwe amavutitsa mbewu ku Zambia, ndi njira zothandiza.",
    },
    dashboard: {
      welcomeBack: "Takulandirani",
      progressIntro: "Awa ndi mmene mwapitilira maphunziro anu.",
      cropsCompleted: "Mbewu Zomalizidwa",
      quizzesTaken: "Mayeso Otenga",
      averageScore: "Ziwerengero za Mayeso",
      savedCrops: "Mbewu Zosungidwa",
      completedCropsHeading: "Mbewu Zomalizidwa",
      quizHistoryHeading: "Mbiri ya Mayeso",
      savedCropsHeading: "Mbewu Zosungidwa",
      noCropsCompleted: "Simunamaliza mbewu iliyonse.",
      noQuizzesTaken: "Simunatenge mayeso aliwonse.",
      noSavedCrops: "Simunasunge mbewu iliyonse.",
      browseCrops: "Onani Mbewu",
    },
    calendar: {
      title: "Kalendala ya Kubzala",
      subtitle:
        "Onani mbewu zoti mubzale, mwezi ndi mwezi, malinga ndi nyengo za ulimi ku Zambia.",
      plantLabel: "Bzalani",
      noData: "Palibe zambiri za kubzala pano.",
    },
    detail: {
      landPrep: "Kukonza Nthaka",
      fertilizer: "Feteleza",
      pests: "Tizirombo",
      harvest: "Kukolola",
      quiz: "Mayeso",
      plantingWindow: "Nyengo yobzala",
      spacing: "Mpata",
      basal: "Feteleza Woyamba",
      topDressing: "Feteleza Wachiwiri",
      commonVarieties: "Mitundu Yodziwika",
      noPestsRecorded: "Palibe tizirombo tolembedwa",
      noPestsDescription: "Palibe zambiri za tizirombo pa mbewu iyi.",
      affects: "Zimakhudza",
      symptoms: "Zizindikiro",
      organicControl: "Njira Yachilengedwe",
      chemicalControl: "Njira ya Mankhwala",
      saveCrop: "Sungani Mbewu",
      saved: "Yasungidwa",
      markComplete: "Lozani Yamaliza",
      completed: "Yamaliza",
    },
    toast: {
      cropSaved: "Mbewu yasungidwa!",
      cropRemoved: "Yachotsedwa ku zosungidwa",
      signInToSave: "Chonde lowani kuti musunge mbewu",
      markedComplete: "Yalozedwa yamaliza!",
      signInToTrack: "Chonde lowani kuti mutsatire mmene mukupitilira",
      quizSubmitted: "Mayeso atumizidwa!",
      signInToSaveQuiz: "Chonde lowani kuti musunge zotsatira za mayeso",
    },
  },
};