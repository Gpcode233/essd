const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SCHOOLS_DATA = [
  {
    name: "College of the Immaculate Conception (CIC)",
    slug: "cic-enugu",
    type: "MISSION",
    address: "Uwani, Enugu",
    lga: "Enugu South",
    motto: "Semper Fidelis",
    points: 248,
    seedRank: 1,
    teamMembers: [
      { fullName: "Chukwuebuka Okonkwo", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Somtochukwu Eze", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Kenechukwu Nnamani", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Federal Government College (FGC) Enugu",
    slug: "fgc-enugu",
    type: "FEDERAL",
    address: "Independence Layout, Enugu",
    lga: "Enugu North",
    motto: "Pro Unitate",
    points: 242,
    seedRank: 2,
    teamMembers: [
      { fullName: "Ngozi Chimamanda Obi", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "David Uchechukwu", role: "SPEAKER", classGrade: "SS3" },
      { fullName: "Khadija Abdullahi", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Queen's School Enugu",
    slug: "queens-school-enugu",
    type: "PUBLIC",
    address: "Ogui Road, Enugu",
    lga: "Enugu North",
    motto: "Knowledge and Virtue",
    points: 236,
    seedRank: 3,
    teamMembers: [
      { fullName: "Amarachi Blessing Nwankwo", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Chisom Precious Ugwu", role: "SPEAKER", classGrade: "SS3" },
      { fullName: "Oluebubechukwu Ani", role: "RESEARCHER", classGrade: "SS1" },
    ],
  },
  {
    name: "St. Teresa's College (STC) Nsukka",
    slug: "st-teresas-college-nsukka",
    type: "MISSION",
    address: "University Road, Nsukka",
    lga: "Nsukka",
    motto: "Laborare est Orare",
    points: 230,
    seedRank: 4,
    teamMembers: [
      { fullName: "Ifeanyi Emmanuel Ugwuoke", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Emeka Stanley Asogwa", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Godwin Chidubem Attah", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Mea Mater Elizabeth High School",
    slug: "mea-mater-elizabeth-agbani",
    type: "PRIVATE",
    address: "Ojiagu, Agbani",
    lga: "Nkanu West",
    motto: "Excellence in Character and Learning",
    points: 228,
    seedRank: 5,
    teamMembers: [
      { fullName: "Kamsiyochukwu Onyekachi", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Bryan Munachimso", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Daberechi Maduka", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Spring of Life International Schools",
    slug: "spring-of-life-enugu",
    type: "PRIVATE",
    address: "Abakpa Nike, Enugu",
    lga: "Enugu East",
    motto: "Illuminating the Future",
    points: 224,
    seedRank: 6,
    teamMembers: [
      { fullName: "Precious Chidera Ozor", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Michael Tobenna Edeh", role: "SPEAKER", classGrade: "SS3" },
      { fullName: "Favor Somadina", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Holy Rosary College (HRC) Uwani",
    slug: "holy-rosary-college-enugu",
    type: "MISSION",
    address: "Zik Avenue, Uwani, Enugu",
    lga: "Enugu South",
    motto: "Servite Domino in Laetitia",
    points: 220,
    seedRank: 7,
    teamMembers: [
      { fullName: "Chioma Stephanie Onoh", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Adaobi Jennifer Igwe", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Miracle Chiamaka Odo", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Command Day Secondary School Enugu",
    slug: "command-day-enugu",
    type: "FEDERAL",
    address: "82 Division Army Barracks, Abakpa",
    lga: "Enugu East",
    motto: "Discipline and Knowledge",
    points: 218,
    seedRank: 8,
    teamMembers: [
      { fullName: "Victor Olusegun Babatunde", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Chinedu Paulinus Eze", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Zainab Haruna", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Model High School Nsukka",
    slug: "model-high-school-nsukka",
    type: "PUBLIC",
    address: "Enugu Road, Nsukka",
    lga: "Nsukka",
    motto: "Strive for the Zenith",
    points: 214,
    seedRank: 9,
    teamMembers: [
      { fullName: "Tobechukwu Franklin Ozioko", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Onyinyechi Sandra Eze", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Pascal Chidera Ugwuanyi", role: "RESEARCHER", classGrade: "SS1" },
    ],
  },
  {
    name: "Air Force Comprehensive School Agbani",
    slug: "air-force-agbani",
    type: "FEDERAL",
    address: "Air Force Base, Agbani",
    lga: "Nkanu West",
    motto: "Per Ardua Ad Astra",
    points: 210,
    seedRank: 10,
    teamMembers: [
      { fullName: "Oluwatobi Daniel Alabi", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Kosisochukwu Mbah", role: "SPEAKER", classGrade: "SS3" },
      { fullName: "Favour Nneka Ene", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "National Grammar School Nike",
    slug: "national-grammar-school-nike",
    type: "PUBLIC",
    address: "Nike Lake Road, Enugu",
    lga: "Enugu East",
    motto: "Truth and Diligence",
    points: 206,
    seedRank: 11,
    teamMembers: [
      { fullName: "Chukwudi Samson Nnaji", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Chinaza Grace Ugwu", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Samuel Ifediora", role: "RESEARCHER", classGrade: "SS1" },
    ],
  },
  {
    name: "Urban Girls' Secondary School Enugu",
    slug: "urban-girls-enugu",
    type: "PUBLIC",
    address: "New Haven, Enugu",
    lga: "Enugu North",
    motto: "Character and Intellect",
    points: 202,
    seedRank: 12,
    teamMembers: [
      { fullName: "Munachi Faith Okereke", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Perpetual Amarachi Ani", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Khadijat Sani", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "St. John Cross Seminary Nsukka",
    slug: "st-john-cross-nsukka",
    type: "MISSION",
    address: "Barracks Road, Nsukka",
    lga: "Nsukka",
    motto: "Virtus et Scientia",
    points: 198,
    seedRank: 13,
    teamMembers: [
      { fullName: "Dominic Chidiebere Eze", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Augustine Kenechukwu Omeje", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Gabriel Ebuka Attama", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Enugu State University Demonstration Sec School",
    slug: "esut-demonstration-school",
    type: "PUBLIC",
    address: "Agbani Campus, Agbani",
    lga: "Nkanu West",
    motto: "Leading by Example",
    points: 194,
    seedRank: 14,
    teamMembers: [
      { fullName: "Uchenna Jude Chukwu", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Chidera Cynthia Nnamani", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Collins Somadina", role: "RESEARCHER", classGrade: "SS2" },
    ],
  },
  {
    name: "Boys' High School Awgu",
    slug: "boys-high-school-awgu",
    type: "PUBLIC",
    address: "Old Oji Road, Awgu",
    lga: "Awgu",
    motto: "Courage and Honor",
    points: 190,
    seedRank: 15,
    teamMembers: [
      { fullName: "Chibuike Collins Okoli", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Kingsley Ugochukwu", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Obinna Kingsley Chukwu", role: "RESEARCHER", classGrade: "SS1" },
    ],
  },
  {
    name: "St. Paul's College Eke (Udi)",
    slug: "st-pauls-college-eke",
    type: "MISSION",
    address: "Eke Town, Udi",
    lga: "Udi",
    motto: "In Fide et Scientia",
    points: 188,
    seedRank: 16,
    teamMembers: [
      { fullName: "Arinzechukwu Jude Ezeani", role: "CAPTAIN", classGrade: "SS3" },
      { fullName: "Anthony Onyedikachi", role: "SPEAKER", classGrade: "SS2" },
      { fullName: "Francis Chukwunonso", role: "RESEARCHER", classGrade: "SS1" },
    ],
  },
];

const MOTIONS = [
  "This House Would Replace Traditional Standardized Testing with AI-Driven Continuous Adaptive Evaluation in Nigerian Secondary Schools.",
  "This House Believes That Over-Reliance on Large Language Models Erodes Foundational Critical Thinking and Originality in Secondary Education.",
  "This House Would Make Foundational AI Literacy and Algorithmic Ethics a Compulsory Core Curriculum Subject Across All Nigerian Secondary Schools.",
  "This House Regrets the Monopolization of Educational AI Tools by Private EdTech Corporations.",
  "This House Believes That Human Teachers Possess Irreplaceable Emotional and Moral Mentorship That No Pedagogical Algorithm Can Replicate.",
  "This House Would Ban the Use of Generative AI for Homework and Continuous Assessment in Secondary Schools.",
  "This House Believes That AI-Driven Personalized Tutoring Will Widen the Educational Divide Between Urban and Rural Schools in Developing Nations.",
  "This House Would Prioritize Algorithmic Research over Traditional STEM Laboratory Funding in Developing Economies.",
  "This House Believes That Algorithmic Content Recommendations in Online Learning Platforms Foster Echo Chambers Detrimental to Intellectual Exploration.",
  "This House Would Hold EdTech Developers Legally Liable for Algorithmic Biases in Student Assessment Models.",
  "This House Believes That the Digitization of African Indigenous Knowledge Systems via Generative AI Risks Cultural Exploitation.",
  "This House Would Prohibit AI Tools from Assessing Subjective Student Competencies Such as Creativity, Empathy, and Leadership.",
  "This House Believes That Future Curricula Should Prioritize Philosophy, Ethics, and Logic Over Code Syntax in the Age of Autonomous Programming.",
  "This House Would Require All Secondary School Examinations to Be Administered Strictly Offline in Pen-and-Paper Formats.",
  "This House Believes That Human Intelligence, Not Artificial Intelligence, Must Remain the Ultimate Sovereign in Defining the Purpose and Soul of Education.",
];

const VENUE = "Main Auditorium, Enugu State Secretariat Complex, Independence Layout, Enugu";

async function main() {
  console.log("Seeding ESSD Championship Database...");

  // Clean existing data
  await prisma.match.deleteMany({});
  await prisma.teamMember.deleteMany({});
  await prisma.school.deleteMany({});
  await prisma.prize.deleteMany({});
  await prisma.registration.deleteMany({});

  // Seed Schools & Team Members
  const createdSchools = [];
  for (const s of SCHOOLS_DATA) {
    const { teamMembers, ...schoolData } = s;
    const school = await prisma.school.create({
      data: {
        ...schoolData,
        teamMembers: {
          create: teamMembers,
        },
      },
    });
    createdSchools.push(school);
  }
  console.log(`Created ${createdSchools.length} schools with squad rosters.`);

  // Seed 15 Knockout Matches
  // Round of 16 (Matches 1 - 8) - Oct 16 Morning
  const r16Matches = [
    { num: 1, pos: 1, sA: 0, sB: 15, time: "09:00 AM", date: "16th Oct 2026", status: "COMPLETED", sA_score: 84.5, sB_score: 72.0, winner: 0 },
    { num: 2, pos: 2, sA: 7, sB: 8, time: "09:45 AM", date: "16th Oct 2026", status: "COMPLETED", sA_score: 79.0, sB_score: 81.5, winner: 8 },
    { num: 3, pos: 3, sA: 3, sB: 12, time: "10:30 AM", date: "16th Oct 2026", status: "LIVE", sA_score: 54.0, sB_score: 51.5, winner: null },
    { num: 4, pos: 4, sA: 4, sB: 11, time: "11:15 AM", date: "16th Oct 2026", status: "UPCOMING", sA_score: null, sB_score: null, winner: null },
    { num: 5, pos: 5, sA: 1, sB: 14, time: "12:00 PM", date: "16th Oct 2026", status: "UPCOMING", sA_score: null, sB_score: null, winner: null },
    { num: 6, pos: 6, sA: 6, sB: 9, time: "12:45 PM", date: "16th Oct 2026", status: "UPCOMING", sA_score: null, sB_score: null, winner: null },
    { num: 7, pos: 7, sA: 2, sB: 13, time: "01:30 PM", date: "16th Oct 2026", status: "UPCOMING", sA_score: null, sB_score: null, winner: null },
    { num: 8, pos: 8, sA: 5, sB: 10, time: "02:15 PM", date: "16th Oct 2026", status: "UPCOMING", sA_score: null, sB_score: null, winner: null },
  ];

  for (const m of r16Matches) {
    await prisma.match.create({
      data: {
        matchNumber: m.num,
        round: "ROUND_OF_16",
        roundLabel: "Round of 16",
        roundOrder: 1,
        positionInRound: m.pos,
        schoolAId: createdSchools[m.sA].id,
        schoolBId: createdSchools[m.sB].id,
        winnerId: m.winner !== null ? createdSchools[m.winner].id : null,
        scoreA: m.sA_score,
        scoreB: m.sB_score,
        motionTopic: MOTIONS[m.num - 1],
        date: m.date,
        time: m.time,
        venueName: VENUE,
        judges: "Prof. Kenneth Nweke (Chief Adjudicator), Dr. Chinenye Igwe, Barr. Tochukwu Eze",
        status: m.status,
      },
    });
  }

  // Quarter Finals (Matches 9 - 12) - Oct 16 Afternoon
  // Match 9 has schoolA from Match 1 winner (CIC) and schoolB from Match 2 winner (Model High School Nsukka)
  await prisma.match.create({
    data: {
      matchNumber: 9,
      round: "QUARTER_FINALS",
      roundLabel: "Quarter-Finals",
      roundOrder: 2,
      positionInRound: 1,
      schoolAId: createdSchools[0].id, // CIC (winner of Match 1)
      schoolBId: createdSchools[8].id, // Model High School (winner of Match 2)
      winnerId: null,
      motionTopic: MOTIONS[8],
      date: "16th Oct 2026",
      time: "03:30 PM",
      venueName: VENUE,
      judges: "Prof. Kenneth Nweke, Engr. Dr. Ifeoma Okafor, Nze Victor Anichukwu",
      status: "UPCOMING",
    },
  });

  for (let qf = 10; qf <= 12; qf++) {
    await prisma.match.create({
      data: {
        matchNumber: qf,
        round: "QUARTER_FINALS",
        roundLabel: "Quarter-Finals",
        roundOrder: 2,
        positionInRound: qf - 8,
        schoolAId: null,
        schoolBId: null,
        winnerId: null,
        motionTopic: MOTIONS[qf - 1],
        date: "16th Oct 2026",
        time: qf === 10 ? "04:15 PM" : qf === 11 ? "05:00 PM" : "05:45 PM",
        venueName: VENUE,
        judges: "Panel of Certified WSDC Adjudicators",
        status: "UPCOMING",
      },
    });
  }

  // Semi Finals (Matches 13 & 14) - Oct 17 Morning
  await prisma.match.create({
    data: {
      matchNumber: 13,
      round: "SEMI_FINALS",
      roundLabel: "Semi-Finals",
      roundOrder: 3,
      positionInRound: 1,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      motionTopic: MOTIONS[12],
      date: "17th Oct 2026",
      time: "10:00 AM",
      venueName: VENUE,
      judges: "Grand Jury Panel",
      status: "UPCOMING",
    },
  });

  await prisma.match.create({
    data: {
      matchNumber: 14,
      round: "SEMI_FINALS",
      roundLabel: "Semi-Finals",
      roundOrder: 3,
      positionInRound: 2,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      motionTopic: MOTIONS[13],
      date: "17th Oct 2026",
      time: "11:30 AM",
      venueName: VENUE,
      judges: "Grand Jury Panel",
      status: "UPCOMING",
    },
  });

  // Grand Final (Match 15) - Oct 17 Afternoon
  await prisma.match.create({
    data: {
      matchNumber: 15,
      round: "FINAL",
      roundLabel: "Grand Final Championship",
      roundOrder: 4,
      positionInRound: 1,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      motionTopic: MOTIONS[14],
      date: "17th Oct 2026",
      time: "02:30 PM",
      venueName: VENUE,
      judges: "State Keynote Panel: Ministry of Education, Tech Policy Council & WSDC Grand Adjudicators",
      status: "UPCOMING",
    },
  });

  console.log("Seeded all 15 knockout tournament matches.");

  // Seed Prizes
  const prizes = [
    {
      tier: "CHAMPION",
      title: "ESSD 2026 GRAND CHAMPION",
      rewardHeadline: "Full International Scholarship + Cash Prize + Gold Championship Trophy",
      description: "Prestigious all-expense covered international higher education scholarship opportunity abroad, substantial cash award for the debate society, the official ESSD 2026 Championship Gold Trophy, gold medallions for each debater, and a fully equipped high-speed AI & digital resource lab grant for the school.",
      iconName: "Trophy",
      badgeColor: "gold",
      displayOrder: 1,
    },
    {
      tier: "RUNNER_UP",
      title: "1ST RUNNER-UP (FINALIST)",
      rewardHeadline: "₦1,500,000 Cash Prize + Silver Plaque + Regional Leadership Fellowship",
      description: "Generous cash prize award, silver medals for all squad debaters, executive school plaque, and priority enrollment in the 2027 West Africa Youth Leadership & Public Policy Academy.",
      iconName: "Medal",
      badgeColor: "orange",
      displayOrder: 2,
    },
    {
      tier: "THIRD_PLACE",
      title: "2ND RUNNER-UP (3RD PLACE)",
      rewardHeadline: "₦750,000 Cash Prize + Bronze Trophy + School Library Grant",
      description: "Bronze trophy, certificate of national academic distinction, cash reward for the school debate society, and institutional digital library subscriptions.",
      iconName: "Award",
      badgeColor: "cream",
      displayOrder: 3,
    },
    {
      tier: "BEST_SPEAKER",
      title: "OVERALL BEST INDIVIDUAL SPEAKER",
      rewardHeadline: "International Youth Summit Delegate Seat + Laptops & Tech Suite",
      description: "Awarded to the debater with the highest cumulative individual speaker score across all rounds. Includes high-end laptop, AI research toolkit, and an all-expenses-paid delegate slot at the African Youth Debate Forum.",
      iconName: "Sparkles",
      badgeColor: "gold",
      displayOrder: 4,
    },
    {
      tier: "SPECIAL",
      title: "BEST EMERGING SCHOOL AWARD",
      rewardHeadline: "Special Recognition + Debate Society Mentorship Grant",
      description: "Recognizing outstanding oratory excellence, research depth, and argumentation poise from a first-time championship participant school.",
      iconName: "Star",
      badgeColor: "orange",
      displayOrder: 5,
    },
  ];

  for (const p of prizes) {
    await prisma.prize.create({ data: p });
  }
  console.log("Seeded championship prizes.");

  // Seed sample Registration
  await prisma.registration.create({
    data: {
      regNumber: "ESSD-2026-EN-0842",
      schoolName: "College of the Immaculate Conception (CIC)",
      schoolType: "MISSION",
      schoolAddress: "Uwani, Enugu, Enugu State",
      lga: "Enugu South",
      state: "Enugu",
      schoolEmail: "cic.enugu@gmail.com",
      schoolPhone: "+2348035550192",
      contactName: "Rev. Fr. Patrick Ugwu",
      contactRole: "Debate Master & Vice Principal",
      contactPhone: "+2348035550192",
      contactEmail: "patrick.ugwu@cic.sch.ng",
      debaterCount: 3,
      debaterNames: JSON.stringify(["Chukwuebuka Okonkwo", "Somtochukwu Eze", "Kenechukwu Nnamani"]),
      debaterClasses: JSON.stringify(["SS3", "SS2", "SS2"]),
      captainName: "Chukwuebuka Okonkwo",
      teacherName: "Rev. Fr. Patrick Ugwu",
      referralSource: "Ministry of Education Circular",
      agreedToTerms: true,
      status: "APPROVED",
    },
  });

  console.log("Database successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
