import { prisma } from "./prisma";
import { MatchData, SchoolData, PrizeData, RegistrationData } from "./types";

export const DEFAULT_SCHOOLS: SchoolData[] = [];

export const DEFAULT_PRIZES: PrizeData[] = [
  {
    id: "p1",
    tier: "CHAMPION",
    position: "1st Position (Grand Champion)",
    cashPrize: "₦150,000",
    rewardHeadline: "₦150,000 Cash Prize + Gold Medal + Tech Scholarship + International Scholarship Application + School Trophy",
    benefits: [
      "₦150,000 Direct Cash Prize Award",
      "Official ESSD Gold Champion Medal",
      "Full Scholarship to study any Tech Course",
      "Free International Scholarship Application & Processing Support",
      "Official 2026 Championship Trophy for the School",
    ],
    description: "Conferred on the supreme debater of the Enugu State Secondary Schools Debate Championship 2026.",
    iconName: "Trophy",
    badgeColor: "gold",
    displayOrder: 1,
  },
  {
    id: "p2",
    tier: "RUNNER_UP",
    position: "2nd Position (1st Runner-Up)",
    cashPrize: "₦100,000",
    rewardHeadline: "₦100,000 Cash Prize + Silver Medal + Tech Scholarship + International Scholarship Application + School Trophy",
    benefits: [
      "₦100,000 Direct Cash Prize Award",
      "Official ESSD Silver Medal",
      "Full Scholarship to study any Tech Course",
      "Free International Scholarship Application & Processing Support",
      "Official Runner-Up Trophy for the School",
    ],
    description: "Awarded to the grand finalist exhibiting outstanding argumentative precision and poise.",
    iconName: "Award",
    badgeColor: "orange",
    displayOrder: 2,
  },
  {
    id: "p3",
    tier: "THIRD_PLACE",
    position: "3rd Position (2nd Runner-Up)",
    cashPrize: "₦50,000",
    rewardHeadline: "₦50,000 Cash Prize + Bronze Medal + Tech Scholarship + International Scholarship Application + School Trophy",
    benefits: [
      "₦50,000 Direct Cash Prize Award",
      "Official ESSD Bronze Medal",
      "Scholarship to study any Tech Course",
      "Free International Scholarship Application & Processing Support",
      "Distinguished Trophy for the School",
    ],
    description: "Awarded to the second runner-up for intellectual distinction throughout the tournament.",
    iconName: "Star",
    badgeColor: "cream",
    displayOrder: 3,
  },
  {
    id: "p4",
    tier: "FOURTH_FIFTH",
    position: "4th & 5th Positions (Top 5 Finalists)",
    cashPrize: null,
    rewardHeadline: "Tech Course Scholarship + International Scholarship Support",
    benefits: [
      "Scholarship to study any Tech-related Course",
      "International Scholarship Application & Mentorship Support",
      "Official ESSD State Finalist Certificate of Distinction",
    ],
    description: "Honoring the exceptional intellect and advocacy of our 4th and 5th apex finalists.",
    iconName: "Sparkles",
    badgeColor: "gold",
    displayOrder: 4,
  },
];

const MOTIONS = [
  "This House would replace traditional standardized examinations with adaptive generative AI evaluation models across secondary education in Nigeria.",
  "This House believes that human-led philosophical reasoning is fundamentally superior to artificial algorithmic optimization in civic leadership.",
  "This House would mandate that at least 50% of secondary school pedagogical hours be dedicated to dialectical critical thinking and logic.",
  "This House believes that proprietary algorithms exacerbate socioeconomic disparities in educational attainment between urban and rural schools.",
  "This House would grant copyright and intellectual property rights solely to human authors and prohibit artificial intelligence from holding patent claims.",
  "This House believes that automated ethical reasoning models lack the emotional and moral nuance required for judicial sentencing in human affairs.",
  "This House would prohibit secondary school students from using AI code-generation tools during foundational computer science learning.",
  "This House believes that personalized artificial tutoring agents will accelerate African educational equity faster than public institutional reforms.",
  "This House believes that algorithmic curation of academic research creates cognitive echo chambers that threaten authentic scholarly debate.",
  "This House would hold commercial AI developers legally liable for biased educational outcomes produced by algorithmic grading engines.",
  "This House believes that human teachers are indispensable moral mentors whose pedagogical intuition cannot be replicated by artificial networks.",
  "This House would enforce strict national quotas on automated educational software to protect indigenous cultural curricula in West Africa.",
  "This House believes that the pursuit of artificial superintelligence poses an existential challenge to the intrinsic value of human intellectual effort.",
  "This House would ban synthetic cognitive agents from participating in public democratic policy formulation.",
  "This House believes that in the age of artificial intelligence, the ultimate goal of secondary education must be the cultivation of human wisdom over algorithmic efficiency.",
];

const VENUE = "HOTR Auditorium, House on the Rock Church, Enugu";

export function generateDefaultMatches(): MatchData[] {
  return [
    // Round of 16 (8 Matches)
    {
      id: "m_1",
      matchNumber: 1,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 1,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[0],
      date: "16th Oct 2026",
      time: "09:00 AM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_2",
      matchNumber: 2,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 2,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[1],
      date: "16th Oct 2026",
      time: "09:45 AM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_3",
      matchNumber: 3,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 3,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[2],
      date: "16th Oct 2026",
      time: "10:30 AM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_4",
      matchNumber: 4,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 4,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[3],
      date: "16th Oct 2026",
      time: "11:15 AM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_5",
      matchNumber: 5,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 5,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[4],
      date: "16th Oct 2026",
      time: "12:00 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_6",
      matchNumber: 6,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 6,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[5],
      date: "16th Oct 2026",
      time: "12:45 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_7",
      matchNumber: 7,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 7,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[6],
      date: "16th Oct 2026",
      time: "01:30 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_8",
      matchNumber: 8,
      round: "ROUND_OF_16",
      roundLabel: "Round of 16",
      roundOrder: 1,
      positionInRound: 8,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[7],
      date: "16th Oct 2026",
      time: "02:15 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    // Quarter-Finals
    {
      id: "m_9",
      matchNumber: 9,
      round: "QUARTER_FINALS",
      roundLabel: "Quarter-Finals",
      roundOrder: 2,
      positionInRound: 1,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[8],
      date: "16th Oct 2026",
      time: "03:30 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_10",
      matchNumber: 10,
      round: "QUARTER_FINALS",
      roundLabel: "Quarter-Finals",
      roundOrder: 2,
      positionInRound: 2,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[9],
      date: "16th Oct 2026",
      time: "04:15 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_11",
      matchNumber: 11,
      round: "QUARTER_FINALS",
      roundLabel: "Quarter-Finals",
      roundOrder: 2,
      positionInRound: 3,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[10],
      date: "16th Oct 2026",
      time: "05:00 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    {
      id: "m_12",
      matchNumber: 12,
      round: "QUARTER_FINALS",
      roundLabel: "Quarter-Finals",
      roundOrder: 2,
      positionInRound: 4,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[11],
      date: "16th Oct 2026",
      time: "05:45 PM",
      venueName: VENUE,
      judges: "Panel of Certified WSDC Adjudicators",
      status: "UPCOMING",
    },
    // Semi-Finals
    {
      id: "m_13",
      matchNumber: 13,
      round: "SEMI_FINALS",
      roundLabel: "Semi-Finals",
      roundOrder: 3,
      positionInRound: 1,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[12],
      date: "17th Oct 2026",
      time: "10:00 AM",
      venueName: VENUE,
      judges: "Grand Jury Panel",
      status: "UPCOMING",
    },
    {
      id: "m_14",
      matchNumber: 14,
      round: "SEMI_FINALS",
      roundLabel: "Semi-Finals",
      roundOrder: 3,
      positionInRound: 2,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[13],
      date: "17th Oct 2026",
      time: "11:30 AM",
      venueName: VENUE,
      judges: "Grand Jury Panel",
      status: "UPCOMING",
    },
    // Final
    {
      id: "m_15",
      matchNumber: 15,
      round: "FINAL",
      roundLabel: "Grand Final Championship",
      roundOrder: 4,
      positionInRound: 1,
      schoolAId: null,
      schoolBId: null,
      winnerId: null,
      scoreA: null,
      scoreB: null,
      motionTopic: MOTIONS[14],
      date: "17th Oct 2026",
      time: "02:30 PM",
      venueName: VENUE,
      judges: "State Keynote Panel: Ministry of Education, Tech Policy Council & WSDC Grand Adjudicators",
      status: "UPCOMING",
    },
  ];
}

// Resilient Data Getters
export async function getSafeSchools(): Promise<SchoolData[]> {
  try {
    const schools = await prisma.school.findMany({
      include: { teamMembers: true },
      orderBy: [{ points: "desc" }, { name: "asc" }],
    });
    if (schools) return schools as any;
  } catch (err) {
    console.warn("Prisma query fallback to default schools:", err);
  }
  return DEFAULT_SCHOOLS;
}

export async function getSafeMatches(): Promise<MatchData[]> {
  try {
    const matches = await prisma.match.findMany({
      include: { schoolA: true, schoolB: true, winner: true },
      orderBy: { matchNumber: "asc" },
    });
    if (matches && matches.length > 0) return matches as any;
  } catch (err) {
    console.warn("Prisma query fallback to default matches:", err);
  }
  return generateDefaultMatches();
}

export async function getSafePrizes(): Promise<PrizeData[]> {
  try {
    const prizes = await prisma.prize.findMany({
      orderBy: { displayOrder: "asc" },
    });
    if (prizes && prizes.length > 0) return prizes as any;
  } catch (err) {
    console.warn("Prisma query fallback to default prizes:", err);
  }
  return DEFAULT_PRIZES;
}

export async function getSafeRegistrations(): Promise<RegistrationData[]> {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return registrations as any;
  } catch (err) {
    console.warn("Prisma query fallback for registrations:", err);
    return [];
  }
}
