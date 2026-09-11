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
  logoUrl?: string | null;
  motto?: string | null;
  status: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  points: number;
  seedRank?: number | null;
  teamMembers?: TeamMemberData[];
}

export interface TeamMemberData {
  id: string;
  schoolId: string;
  fullName: string;
  role: string;
  classGrade: string;
  email?: string | null;
  phone?: string | null;
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
  schoolName: string;
  schoolType: string;
  schoolAddress: string;
  lga: string;
  state: string;
  schoolEmail: string;
  schoolPhone: string;
  contactName: string;
  contactRole: string;
  contactPhone: string;
  contactEmail: string;
  debaterCount: number;
  debaterNames: string[];
  debaterClasses: string[];
  captainName: string;
  teacherName: string;
  debater1ParentName?: string | null;
  debater1ParentPhone?: string | null;
  debater1ParentEmail?: string | null;
  debater2ParentName?: string | null;
  debater2ParentPhone?: string | null;
  debater2ParentEmail?: string | null;
  referralSource?: string | null;
  agreedToTerms: boolean;
  status: string;
  createdAt: string;
}

export interface PrizeData {
  id: string;
  tier: "CHAMPION" | "RUNNER_UP" | "THIRD_PLACE" | "BEST_SPEAKER" | "SPECIAL" | string;
  title: string;
  rewardHeadline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  displayOrder: number;
  isAnnounced: boolean;
}

export const ENUGU_LGAS = [
  "Aninri",
  "Awgu",
  "Enugu East",
  "Enugu North",
  "Enugu South",
  "Ezeagu",
  "Igbo Etiti",
  "Igbo Eze North",
  "Igbo Eze South",
  "Isi Uzo",
  "Nkanu East",
  "Nkanu West",
  "Nsukka",
  "Oji River",
  "Udenu",
  "Udi",
  "Uzo Uwani",
];
