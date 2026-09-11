import { prisma } from "./prisma";
import { MatchData, SchoolData, PrizeData, RegistrationData } from "./types";

export const DEFAULT_SCHOOLS: SchoolData[] = [];

export const DEFAULT_PRIZES: PrizeData[] = [
  {
    id: "p1",
    tier: "CHAMPION",
    title: "ESSD 2026 GRAND CHAMPION",
    rewardHeadline: "International Scholarship + Cash Prize + Gold Championship Trophy",
    description: "Prestigious higher education scholarship abroad, official ESSD 2026 Gold Championship Trophy, gold medallions for each debater, and high-speed tech lab infrastructure grant for the winning school.",
    iconName: "Trophy",
    badgeColor: "gold",
    displayOrder: 1,
    isAnnounced: true,
  },
  {
    id: "p2",
    tier: "RUNNER_UP",
    title: "1ST RUNNER-UP (FINALIST)",
    rewardHeadline: "Substantial Cash Prize + Silver Plaque + Leadership Fellowship",
    description: "Executive silver plaque, medals for squad debaters, substantial cash award for the debate society, and priority fellowship admission.",
    iconName: "Award",
    badgeColor: "orange",
    displayOrder: 2,
    isAnnounced: true,
  },
  {
    id: "p3",
    tier: "THIRD_PLACE",
    title: "2ND RUNNER-UP (3RD PLACE)",
    rewardHeadline: "Cash Prize + Bronze Award + School Library Grant",
    description: "State certificate of distinction, bronze trophy, cash prize, and curated academic reference packs for the school.",
    iconName: "Star",
    badgeColor: "cream",
    displayOrder: 3,
    isAnnounced: true,
  },
  {
    id: "p4",
    tier: "BEST_SPEAKER",
    title: "OVERALL BEST SPEAKER",
    rewardHeadline: "International Youth Summit Delegate + Laptops & Tech Suite",
    description: "Awarded to the debater with highest individual score across all tournament rounds, including high-spec laptops and international delegate sponsorship.",
    iconName: "Sparkles",
    badgeColor: "gold",
    displayOrder: 4,
    isAnnounced: true,
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
