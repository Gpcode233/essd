const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PRIZES_DATA = [
  {
    tier: "CHAMPION",
    title: "ESSD 2026 GRAND CHAMPION",
    rewardHeadline: "International Scholarship + Cash Prize + Gold Championship Trophy",
    description: "Prestigious higher education scholarship abroad, official ESSD 2026 Gold Championship Trophy, gold medallions for each debater, and high-speed tech lab infrastructure grant for the winning school.",
    badgeColor: "gold",
    displayOrder: 1,
  },
  {
    tier: "RUNNER_UP",
    title: "1ST RUNNER-UP (FINALIST)",
    rewardHeadline: "Substantial Cash Prize + Silver Plaque + Leadership Fellowship",
    description: "Executive silver plaque, medals for squad debaters, substantial cash award for the debate society, and priority fellowship admission.",
    badgeColor: "orange",
    displayOrder: 2,
  },
  {
    tier: "THIRD_PLACE",
    title: "2ND RUNNER-UP (3RD PLACE)",
    rewardHeadline: "Cash Prize + Bronze Award + School Library Grant",
    description: "State certificate of distinction, bronze trophy, cash prize, and curated academic reference packs for the school.",
    badgeColor: "cream",
    displayOrder: 3,
  },
  {
    tier: "BEST_SPEAKER",
    title: "OVERALL BEST SPEAKER",
    rewardHeadline: "International Youth Summit Delegate + Laptops & Tech Suite",
    description: "Awarded to the debater with highest individual score across all tournament rounds, including high-spec laptops and international delegate sponsorship.",
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

const MATCHES_DATA = [
  // Round of 16
  { matchNumber: 1, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 1, motionTopic: MOTIONS[0], date: "16th Oct 2026", time: "09:00 AM", status: "UPCOMING" },
  { matchNumber: 2, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 2, motionTopic: MOTIONS[1], date: "16th Oct 2026", time: "09:45 AM", status: "UPCOMING" },
  { matchNumber: 3, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 3, motionTopic: MOTIONS[2], date: "16th Oct 2026", time: "10:30 AM", status: "UPCOMING" },
  { matchNumber: 4, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 4, motionTopic: MOTIONS[3], date: "16th Oct 2026", time: "11:15 AM", status: "UPCOMING" },
  { matchNumber: 5, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 5, motionTopic: MOTIONS[4], date: "16th Oct 2026", time: "12:00 PM", status: "UPCOMING" },
  { matchNumber: 6, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 6, motionTopic: MOTIONS[5], date: "16th Oct 2026", time: "12:45 PM", status: "UPCOMING" },
  { matchNumber: 7, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 7, motionTopic: MOTIONS[6], date: "16th Oct 2026", time: "01:30 PM", status: "UPCOMING" },
  { matchNumber: 8, round: "ROUND_OF_16", roundLabel: "Round of 16", roundOrder: 1, positionInRound: 8, motionTopic: MOTIONS[7], date: "16th Oct 2026", time: "02:15 PM", status: "UPCOMING" },
  // Quarter-Finals
  { matchNumber: 9, round: "QUARTER_FINALS", roundLabel: "Quarter-Finals", roundOrder: 2, positionInRound: 1, motionTopic: MOTIONS[8], date: "16th Oct 2026", time: "03:30 PM", status: "UPCOMING" },
  { matchNumber: 10, round: "QUARTER_FINALS", roundLabel: "Quarter-Finals", roundOrder: 2, positionInRound: 2, motionTopic: MOTIONS[9], date: "16th Oct 2026", time: "04:15 PM", status: "UPCOMING" },
  { matchNumber: 11, round: "QUARTER_FINALS", roundLabel: "Quarter-Finals", roundOrder: 2, positionInRound: 3, motionTopic: MOTIONS[10], date: "16th Oct 2026", time: "05:00 PM", status: "UPCOMING" },
  { matchNumber: 12, round: "QUARTER_FINALS", roundLabel: "Quarter-Finals", roundOrder: 2, positionInRound: 4, motionTopic: MOTIONS[11], date: "16th Oct 2026", time: "05:45 PM", status: "UPCOMING" },
  // Semi-Finals
  { matchNumber: 13, round: "SEMI_FINALS", roundLabel: "Semi-Finals", roundOrder: 3, positionInRound: 1, motionTopic: MOTIONS[12], date: "17th Oct 2026", time: "10:00 AM", status: "UPCOMING" },
  { matchNumber: 14, round: "SEMI_FINALS", roundLabel: "Semi-Finals", roundOrder: 3, positionInRound: 2, motionTopic: MOTIONS[13], date: "17th Oct 2026", time: "11:30 AM", status: "UPCOMING" },
  // Grand Final
  { matchNumber: 15, round: "FINAL", roundLabel: "Grand Final Championship", roundOrder: 4, positionInRound: 1, motionTopic: MOTIONS[14], date: "17th Oct 2026", time: "02:30 PM", status: "UPCOMING" },
];

async function main() {
  console.log("🌱 Initializing ESSD Tournament Database...");

  // Seed Prizes
  for (const p of PRIZES_DATA) {
    const existing = await prisma.prize.findFirst({ where: { tier: p.tier } });
    if (!existing) {
      await prisma.prize.create({ data: p });
    }
  }
  console.log(`✅ Seeded ${PRIZES_DATA.length} official prize tiers.`);

  // Seed 15 Tournament Matches
  for (const m of MATCHES_DATA) {
    const existing = await prisma.match.findUnique({ where: { matchNumber: m.matchNumber } });
    if (!existing) {
      await prisma.match.create({
        data: {
          ...m,
          venueName: "HOTR Auditorium, House on the Rock Church, Enugu",
          judges: "Panel of Certified WSDC State Adjudicators",
        },
      });
    }
  }
  console.log(`✅ Initialized ${MATCHES_DATA.length} official tournament bracket matches.`);
  console.log("🏆 ESSD Database setup ready for live registrations and matchmaking!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
