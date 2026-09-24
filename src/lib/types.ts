export interface SchoolData {
  id: string;
  name: string;
  slug: string;
  type: string;
  address?: string | null;
  lga: string;
  state: string;
  email?: string | null;
  phone?: string | null;
  status: string;
  points: number;
}

export interface MatchData {
  id: string;
  matchNumber: number;
  round: "ROUND_OF_16" | "QUARTER_FINALS" | "SEMI_FINALS" | "FINAL" | "THIRD_PLACE" | string;
  roundLabel: string;
  roundOrder: number;
  positionInRound: number;
  schoolAId?: string | null;
  schoolA?: SchoolData | null;
  schoolBId?: string | null;
  schoolB?: SchoolData | null;
  winnerId?: string | null;
  winner?: SchoolData | null;
  scoreA?: number | null;
  scoreB?: number | null;
  motionTopic: string;
  date: string;
  time: string;
  venueName: string;
  judges: string;
  status: "UPCOMING" | "LIVE" | "FINAL" | string;
  nextMatchId?: string | null;
  speechBreakdown?: string | null;
  liveMotionKey?: string | null;
}

export interface RegistrationData {
  id: string;
  regNumber: string;
  studentName: string;
  studentClass: string; // "SS1", "SS2", "SS3"
  studentGender?: string | null;
  studentEmail?: string | null;
  studentPhone?: string | null;
  schoolName: string;
  schoolType: string;
  schoolAddress: string;
  lga: string;
  state: string;
  schoolEmail?: string | null;
  schoolPhone?: string | null;
  parentName: string;
  parentPhone: string;
  parentEmail?: string | null;
  teacherName: string;
  teacherPhone: string;
  teacherEmail?: string | null;
  day1Motions: string[]; // Exactly 3 chosen out of 6
  day2Motions: string[]; // Exactly 2 chosen out of 5
  preferredStance?: string | null;
  referralSource?: string | null;
  agreedToTerms: boolean;
  status: string;
  createdAt: string;
}

export interface PrizeData {
  id: string;
  tier: "CHAMPION" | "RUNNER_UP" | "THIRD_PLACE" | "FOURTH_FIFTH" | string;
  title?: string;
  position: string;
  cashPrize?: string | null;
  rewardHeadline: string;
  benefits: string[];
  description: string;
  iconName: string;
  badgeColor: string;
  displayOrder: number;
}

export const ENUGU_CENTRAL_LGAS = [
  "Enugu North (Enugu Town)",
  "Enugu East (Trans-Ekulu / Abakpa)",
  "Enugu South (Achara Layout / Gariki)",
  "Enugu Central Urban District",
];

export const DAY1_MOTIONS = [
  {
    id: "d1_m1",
    title: "Motion 01 — Generative AI in Academic Assignments",
    motion: "This House Would Allow Secondary School Students to Use Generative AI in Academic Assignments, Provided They Disclose How It Was Used.",
    theme: "AI, Learning & Academic Assessment",
  },
  {
    id: "d1_m2",
    title: "Motion 02 — Project-Based Assessments",
    motion: "This House Would Replace a Significant Proportion of Traditional Written Examinations in Secondary Schools with Project-Based Assessments.",
    theme: "AI, Learning & Academic Assessment",
  },
  {
    id: "d1_m3",
    title: "Motion 03 — Responsible AI as an Academic Skill",
    motion: "This House Believes That the Ability to Use Artificial Intelligence Responsibly Should Be Recognised as an Academic Skill in Secondary Schools.",
    theme: "AI, Learning & Academic Assessment",
  },
  {
    id: "d1_m4",
    title: "Motion 04 — Supervised Writing Assignments",
    motion: "This House Would Replace Take-Home Essays as a Major Component of Secondary School Assessment with Supervised Writing Assignments.",
    theme: "AI, Learning & Academic Assessment",
  },
  {
    id: "d1_m5",
    title: "Motion 05 — Banning Generative AI in Assessments",
    motion: "This House Believes That Completely Banning Generative AI in Secondary School Academic Assessments Is an Ineffective Way to Prevent Academic Dishonesty.",
    theme: "AI, Learning & Academic Assessment",
  },
  {
    id: "d1_m6",
    title: "Motion 06 — Teaching and Assessment in the AI Era",
    motion: "This House Believes That Secondary Schools Should Adapt Their Teaching and Assessment Methods to Artificial Intelligence Rather Than Rely Mainly on Traditional Practices.",
    theme: "AI, Learning & Academic Assessment",
  },
];

export const DAY2_MOTIONS = [
  {
    id: "d2_m1",
    title: "Grand Finale Motion 01 — AI in Teacher Preparation",
    motion: "This House Would Require Secondary School Teachers to Use Artificial Intelligence in Lesson Planning and Classroom Preparation.",
    theme: "AI, Teachers, Equality & Educational Development",
  },
  {
    id: "d2_m2",
    title: "Grand Finale Motion 02 — Teacher AI Literacy",
    motion: "This House Believes That Secondary Schools Should Prioritise Training Teachers in AI Literacy Before Investing in Advanced AI Technologies for Students.",
    theme: "AI, Teachers, Equality & Educational Development",
  },
  {
    id: "d2_m3",
    title: "Grand Finale Motion 03 — AI Access and Educational Inequality",
    motion: "This House Believes That Widespread Use of AI in Secondary Schools Will Increase Educational Inequality Unless Students Have Equal Access to Digital Resources.",
    theme: "AI, Teachers, Equality & Educational Development",
  },
  {
    id: "d2_m4",
    title: "Grand Finale Motion 04 — Basic Infrastructure Before Advanced AI",
    motion: "This House Would Prioritise Government Funding for Basic Educational Infrastructure Over Advanced AI Technologies in Public Secondary Schools.",
    theme: "AI, Teachers, Equality & Educational Development",
  },
  {
    id: "d2_m5",
    title: "Grand Finale Motion 05 — AI-Powered Personalised Learning",
    motion: "This House Believes That the Government Should Fund AI-Powered Personalised Learning Services for Students in Public Secondary Schools.",
    theme: "AI, Teachers, Equality & Educational Development",
  },
];
