import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.png";
import { Send, Home, BookOpen, Calendar, Heart, Sparkles, ChevronLeft, AlertCircle, X } from "lucide-react";

// ============================================================
// SWIFT STEPS COMPANION, peer support, not crisis care
// Curriculum aligned to the Swift Steps Bible (55-week program)
// ============================================================


// Embedded brand logo
// ============================================================
// === KEY DATES — for auto-counting yearly anniversaries ===
const JULIANNE_SOBRIETY_DATE = "2016-09-01";
const SWIFT_STEPS_FOUNDED_DATE = "2024-03-28";

const yearsSince = (startDateStr) => {
  const start = new Date(startDateStr + "T12:00:00");
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--;
  }
  return years;
};

const getRecurringBanners = () => {
  const julianneYears = yearsSince(JULIANNE_SOBRIETY_DATE);
  const swiftStepsYears = yearsSince(SWIFT_STEPS_FOUNDED_DATE);
  const currentYear = new Date().getFullYear();

  return [
    currentYear === 2026
      ? {
          date: `${currentYear}-09-01`,
          emoji: "⭐",
          title: "10 years sober this week",
          message: "Ten years of getting back up. Ten years of choosing to stay instead of disappear.\n\nSwift Steps exists because somebody kept beginning again even when it was hard, messy, inconvenient, exhausting, or didn't look the way people thought recovery was \"supposed\" to look.\n\nWe don't throw people away here. We don't make people start over from zero. We pick up from here.\n\nAnd honestly? Ten years is proof that healing doesn't have to look perfect to be real. 🩵",
        }
      : {
          date: `${currentYear}-09-01`,
          emoji: "⭐",
          title: `${julianneYears} years sober for Julianne this week`,
          message: "Another year of getting back up. Another year of choosing to stay instead of disappear.\n\nSwift Steps exists because somebody kept beginning again. We don't throw people away here. We don't make people start over from zero. We pick up from here.\n\nHealing doesn't have to look perfect to be real. 🩵",
        },
    {
      date: `${currentYear}-03-28`,
      emoji: "💋",
      title: `Swift Steps turns ${swiftStepsYears} this week`,
      message: "On March 28th, 2024, we had our first meeting. No grand opening, no fanfare. Just people showing up to find out if a recovery space could feel different.\n\nIt did. It does.\n\nThank you for being part of what this is becoming. Whether you've been here since the first meeting or this is your first week — you're the reason it works. 🩵",
    },
    {
      date: `${currentYear}-12-13`,
      emoji: "🎂",
      title: "Taylor's birthday this week",
      message: "The person whose music accidentally became the background soundtrack to so many people surviving their lives.\n\nA lot of us found language for things we didn't know how to explain yet through these songs. Grief. Rage. Longing. Starting over. Becoming someone new.\n\nSo today feels like a good day to play the song that carried you through something and remember how far you've actually come. 🪩",
    },
    {
      date: `${currentYear}-01-10`,
      emoji: "💛",
      title: "Andrea Swift's birthday this week",
      message: "And honestly… this one always hits a little differently.\n\nThe people loving someone through addiction, mental health struggles, relapse, grief, healing, all of it… they carry things quietly that most people never fully see.\n\nTo the moms, caregivers, safe people, and \"I'm not giving up on you\" people in this community: we see you too. Loving somebody through hard seasons takes a kind of strength that rarely gets talked about enough.",
    },
    {
      date: `${currentYear}-03-05`,
      emoji: "🤍",
      title: "Scott Swift's birthday this week",
      message: "The steady parent energy. The \"I'm still here\" energy.\n\nA lot of people in this community know what it feels like to not have consistency. So when somebody does show up calmly, reliably, safely… it matters more than people realize.\n\nToday's for the parents, mentors, friends, and safe humans who kept answering the phone. 🩶",
    },
    {
      date: `${currentYear}-03-11`,
      emoji: "💙",
      title: "Austin Swift's birthday this week",
      message: "The sibling perspective always feels important because siblings see everything differently.\n\nSometimes they're protecting. Sometimes they're confused. Sometimes they're carrying their own hurt while trying to love someone through theirs.\n\nSo today feels like a good day to acknowledge the siblings in this community too. The ones who stayed close, the ones rebuilding relationships, and the ones still figuring out where they fit in the story.",
    },
    {
      date: `${currentYear}-10-05`,
      emoji: "🏈",
      title: "Travis Kelce's birthday this week",
      message: "A reminder that being fully seen doesn't always have to be embarrassing or dangerous.\n\nSome of us got really good at hiding. Hiding symptoms. Hiding feelings. Hiding relapse. Hiding needs. Hiding ourselves.\n\nMaybe today is just a tiny reminder that you're allowed to take up space without apologizing for it. ✨",
    },
  ];
};

const HOLIDAYS = [
  { date: "2026-03-17", emoji: "🍀", title: "St. Patrick's Day this week", message: "Today is built around drinking — green beer, parades, the whole thing. You don't owe anyone a performance. You can name what's loud about it and still choose how you move through it. The body doubling room is open if you want company without the noise." },
  { date: "2026-04-05", emoji: "🌸", title: "Easter weekend", message: "Easter can carry a lot — religion you've left or are returning to, family gatherings, brunch culture, complicated memories. You're allowed to come to today on your own terms. You know what works for you." },
  { date: "2026-05-04", emoji: "🌱", title: "Mental Health Awareness Month", message: "May is for naming what we carry. The fact that you're here, doing this work, is the awareness. Your story counts even when no one's posting about it." },
  { date: "2026-05-05", emoji: "🌶️", title: "Cinco de Mayo this week", message: "Another holiday wrapped in drinking culture. You've made it through harder days than this one. You don't have to explain why you're not at the bar. Your peace is yours to protect." },
  { date: "2026-05-10", emoji: "🤍", title: "Mother's Day weekend", message: "Whatever your relationship with your mother is — close, distant, complicated, grieved, longed for, healed, still healing — your feelings about today are valid. There's no right way to do this day. Come sit with us. We have a meeting for this." },
  { date: "2026-05-25", emoji: "🇺🇸", title: "Memorial Day weekend", message: "Grief, gatherings, drinking culture all in one weekend. You can name what's loud and still stay yourself. You've made it through harder. The body doubling room is open whenever." },
  { date: "2026-06-01", emoji: "🌈", title: "Pride Month", message: "Pride is celebration AND it's heavy — identity, family rejection, party culture, the cost of being out. Whoever you are, however you're showing up to this month, you belong here. You don't have to choose between joy and honesty." },
  { date: "2026-06-19", emoji: "✊🏾", title: "Juneteenth this week", message: "A day that holds liberation and the work that's still not done. Rest is part of the work too. Whatever this day means to you, you're allowed to honor it your way." },
  { date: "2026-06-21", emoji: "🤍", title: "Father's Day weekend", message: "Whatever your relationship with your father is — close, distant, complicated, grieved, absent, healed, still healing — your feelings about today are valid. There's no right way to do this day. Come sit with us. We have a meeting for this." },
  { date: "2026-07-04", emoji: "🎆", title: "Fourth of July weekend", message: "Fireworks, BBQs, drinking everywhere. You don't owe anyone a beer in your hand to belong. You can choose how you celebrate, who you celebrate with, or whether you celebrate at all. Your recovery is yours to define." },
  { date: "2026-09-07", emoji: "🌟", title: "Recovery Month", message: "September honors what we're doing every day. Not the polished version — the real one. The slipping and returning. The quiet work. The fact that you're still here. That's the whole thing." },
  { date: "2026-10-31", emoji: "🎃", title: "Halloween weekend", message: "Costumes, parties, drinking pressure, the whole thing. You can show up however feels true — out, dressed up, staying in, or skipping it entirely. You don't have to be in the chaos to belong. You know what you need." },
  { date: "2026-11-25", emoji: "🍂", title: "Thanksgiving week", message: "The day before Thanksgiving is statistically the heaviest drinking night of the year. Then comes the family dinner. Then the leftovers and the lingering. You can move through this whole week one moment at a time. You're allowed to leave early. You're allowed to skip it. You're allowed to stay and just listen." },
  { date: "2026-12-24", emoji: "❄️", title: "Christmas Eve & Christmas Day", message: "Family, grief, religion, gifts, expectations, drinks at every corner. Whatever this holiday means to you — joy, dread, neutral, complicated — you get to define how you move through it. You don't have to perform recovery for anyone. Just stay yourself." },
  { date: "2026-12-31", emoji: "🥂", title: "New Year's Eve & Day", message: "The biggest drinking night of the year, followed by a day full of resolutions and pressure to reinvent yourself. You don't owe anyone a transformation. You're already doing the work. Take this weekend on your terms." },
  { date: "2027-01-18", emoji: "✊🏾", title: "MLK Day this week", message: "A day that asks us to remember what's worth fighting for, and that the fight is long. Recovery is part of how you stay alive to keep showing up. Rest is resistance too." },
  { date: "2027-02-14", emoji: "💔", title: "Valentine's Day weekend", message: "Whether you're partnered, single, grieving someone, or somewhere in between, this day can hit hard. Love isn't only romantic. The love you're building with yourself counts. You're already worthy of the kind of love you're learning to give." },
];

const getActiveHolidays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = today.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const mondayOfWeek = new Date(today);
  mondayOfWeek.setDate(today.getDate() - daysFromMonday);
  mondayOfWeek.setHours(0, 0, 0, 0);
  const sundayOfWeek = new Date(mondayOfWeek);
  sundayOfWeek.setDate(mondayOfWeek.getDate() + 6);
  sundayOfWeek.setHours(23, 59, 59, 999);
  const allBanners = [...HOLIDAYS, ...getRecurringBanners()];
  return allBanners.filter((h) => {
    const date = new Date(h.date + "T12:00:00");
    return date >= mondayOfWeek && date <= sundayOfWeek;
  });
};

// COHORT TIMING — auto-advances every Monday at midnight ET
// Change COHORT_START_DATE only when starting a new cohort
// ============================================================
const COHORT_START_DATE = "2025-12-22"; // Monday of Debut Week 1
const CURRICULUM_TOTAL_WEEKS = 55;

const getCurriculumPosition = () => {
  const start = new Date(COHORT_START_DATE + "T00:00:00");
  const now = new Date();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksElapsed = Math.floor((now - start) / msPerWeek);

  // Loop the curriculum: after week 55, restart at week 1
  const cycleWeek = ((weeksElapsed % CURRICULUM_TOTAL_WEEKS) + CURRICULUM_TOTAL_WEEKS) % CURRICULUM_TOTAL_WEEKS;
  const curriculumWeek = cycleWeek + 1; // 1-indexed (1 through 55)

  // Map curriculum week to era + week-in-era
  const eraId = Math.floor((curriculumWeek - 1) / 5); // 0 through 10
  const weekInEra = ((curriculumWeek - 1) % 5) + 1; // 1 through 5

  // Detect if this is the final week of the entire curriculum (Showgirl Week 5)
  const isFinalWeek = curriculumWeek === CURRICULUM_TOTAL_WEEKS;

  // Has the cohort completed at least one full cycle?
  const hasCompletedCycle = weeksElapsed >= CURRICULUM_TOTAL_WEEKS;

  return { eraId, weekInEra, curriculumWeek, isFinalWeek, hasCompletedCycle, weeksElapsed };
};
const ERAS = [
  { id: 0, name: "Debut", subtitle: "Beginning Again", color: "#8FB89E", emoji: "🌱", weeks: "1–5", themes: "permission to begin again, hidden pain, releasing the past, belonging" },
  { id: 1, name: "Fearless", subtitle: "Courage", color: "#E8C547", emoji: "💛", weeks: "6–10", themes: "courage with fear present, letting yourself be seen, trusting yourself, small daily bravery" },
  { id: 2, name: "Speak Now", subtitle: "Voice & Expression", color: "#A084CA", emoji: "💜", weeks: "11–15", themes: "finding your voice, honest conversations, expressing what's real, compassionate speech" },
  { id: 3, name: "Red", subtitle: "Heartbreak & Healing", color: "#C8434C", emoji: "🔴", weeks: "16–20", themes: "naming the hurt, heartbreak in the body, the slow work of healing, tenderness toward yourself" },
  { id: 4, name: "1989", subtitle: "Identity & Transformation", color: "#7DB7D4", emoji: "🌆", weeks: "21–25", themes: "letting go of old stories, who you're becoming, self-trust, building a life that fits" },
  { id: 5, name: "Reputation", subtitle: "Boundaries & Self-Protection", color: "#2D2D2D", emoji: "🖤", weeks: "26–30", themes: "what boundaries really are, protecting your peace, hard conversations, standing firm" },
  { id: 6, name: "Lover", subtitle: "Self-Compassion", color: "#E8A4B8", emoji: "🌸", weeks: "31–35", themes: "self-compassion, connection, trust, balance" },
  { id: 7, name: "Folklore/Evermore", subtitle: "Grief & Reimagining", color: "#6B7A5B", emoji: "🌲", weeks: "36–40", themes: "grief beneath the surface, sitting with what's lost, reimagining your story, hope on quiet terms" },
  { id: 8, name: "Midnights", subtitle: "Reflection & Honesty", color: "#3D4F7C", emoji: "🌌", weeks: "41–45", themes: "the 3am mind, the inner critic, honest reflection, mindfulness" },
  { id: 9, name: "TTPD", subtitle: "Integration & Renewal", color: "#9B9B9B", emoji: "📝", weeks: "46–50", themes: "holding it all, what you've learned, letting the old self rest, renewing from within" },
  { id: 10, name: "Showgirl", subtitle: "Celebration & Self-Honoring", color: "#D4A574", emoji: "🎭", weeks: "51–55", themes: "allowing joy, confidence and coming home, embodiment, celebration" },
];

// Zoom links
const ZOOM_MEETINGS = "https://us06web.zoom.us/j/85374963048";
const ZOOM_BODY_DOUBLING = "https://us06web.zoom.us/j/8712131989?pwd=SOu0askYyVoGQvKSR9IQY2jb3Nu4aL.1";

const MEETINGS = {
  Monday: [
    { time: "8:00 PM ET", hour24: 20, name: "Theme Discussion", desc: "grounding in the week's era theme",
      whatToExpect: "we open the week by sitting with the era's theme together. light grounding, no pressure to share.",
      link: ZOOM_MEETINGS },
  ],
  Tuesday: [
    { time: "8:00 PM ET", hour24: 20, name: "Speak Now", desc: "speaker meeting, story-sharing",
      whatToExpect: "one person shares their story for a while. you can listen, react, or share your own. no agenda beyond honesty.",
      link: ZOOM_MEETINGS },
  ],
  Wednesday: [
    { time: "12:00 PM ET", hour24: 12, name: "Relapse Prevention", desc: "pattern awareness, early warning",
      whatToExpect: "midday version. we name what's been loud, notice patterns, and stay honest about urges. no fixing.",
      link: ZOOM_MEETINGS },
    { time: "8:00 PM ET", hour24: 20, name: "Relapse Prevention", desc: "pattern awareness, early warning",
      whatToExpect: "evening version. same intention, deeper time. for when the day surfaced something you want to bring.",
      link: ZOOM_MEETINGS },
  ],
  Thursday: [
    { time: "8:00 PM ET", hour24: 20, name: "Theme Check-In", desc: "deeper discussion of the theme",
      whatToExpect: "we sit with this week's theme together. no fixing, no advice. just space to share where you're landing with it.",
      link: ZOOM_MEETINGS },
  ],
  Friday: [
    { time: "8:00 PM ET", hour24: 20, name: "Craft Social", desc: "low-pressure connection, no agenda",
      whatToExpect: "bring a project or just bring yourself. cameras optional. talk, don't talk, work on something with your hands.",
      link: ZOOM_MEETINGS },
  ],
  Saturday: [
    { time: "8:00 PM ET", hour24: 20, name: "Surprise Song", desc: "music + processing, deep dives",
      whatToExpect: "we drop into a song together and follow what surfaces. recovery through the lyrics we already know by heart.",
      link: ZOOM_MEETINGS },
  ],
  Sunday: [
    { time: "11:00 AM ET", hour24: 11, name: "Gratitude", desc: "reflection, gentle close",
      whatToExpect: "soft sunday morning. we name what we're grateful for, what we survived, and what we're carrying into the new week.",
      link: ZOOM_MEETINGS },
  ],
};

const getISOWeek = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const getSundayEvening = (date) => {
  const week = getISOWeek(date);
  if (week % 2 === 0) {
    return { time: "7:00 PM ET", hour24: 19, name: "Book Club", desc: "biweekly · reading & reflection",
      whatToExpect: "we read something together and let it open conversation. bring the book, your thoughts, or just your presence.",
      link: ZOOM_MEETINGS };
  }
  return { time: "7:00 PM ET", hour24: 19, name: "Swift Reset", desc: "biweekly · close the week, start fresh",
    whatToExpect: "the gentle reset before the new week. release what we're carrying, set quiet intentions, end the week steady.",
    link: ZOOM_MEETINGS };
};

const BODY_DOUBLING = {
  name: "Body Doubling Room",
  desc: "open whenever",
  whatToExpect: "come work, exist, or just have someone there. cameras optional. no agenda. presence is the whole point.",
  link: ZOOM_BODY_DOUBLING,
};

// ============================================================
// CURRICULUM — RECOVERING THROUGH THE ERAS
// 55 weeks, aligned to the Swift Steps Bible
// Each week has: theme, keywords, and the bible's mantra (stored as `reframe`)
// ============================================================
const ERA_WEEKS = {
  Debut: [
    { week: 1, theme: "Beginning Again", keywords: "willingness, uncertainty, starting again", reframe: "I am allowed to begin again, as many times as I need." },
    { week: 2, theme: "Still Showing Up", keywords: "consistency, presence, persistence", reframe: "Showing up counts, even when it feels small." },
    { week: 3, theme: "Choosing to Continue", keywords: "choice, willingness, recommitment", reframe: "Continuing is a choice I get to make, one moment at a time." },
    { week: 4, theme: "Belonging", keywords: "community, acceptance, come as you are", reframe: "I belong here, exactly as I am." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, awareness, gentle review", reframe: "I don't have to have it all figured out. I just have to keep noticing." },
  ],
  Fearless: [
    { week: 1, theme: "Courage With Fear Present", keywords: "fear, bravery, trying anyway", reframe: "I can be afraid and still move forward." },
    { week: 2, theme: "Letting Yourself Be Seen", keywords: "vulnerability, visibility, honesty", reframe: "I can let myself be seen, even when I'm not at my best." },
    { week: 3, theme: "Trusting Yourself", keywords: "self-trust, integrity, inner voice", reframe: "I am rebuilding trust with myself, one small promise at a time." },
    { week: 4, theme: "Courage in Small Ways", keywords: "small courage, daily bravery, ordinary heroism", reframe: "Small courage is still courage." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, awareness, reflection", reframe: "Every act of courage, no matter how small, is shaping who I'm becoming." },
  ],
  "Speak Now": [
    { week: 1, theme: "Finding Your Voice", keywords: "voice, truth, authenticity", reframe: "My voice matters, even when it shakes." },
    { week: 2, theme: "Honest Conversations", keywords: "honesty, dialogue, truth-telling", reframe: "Honesty is a gift I give myself first." },
    { week: 3, theme: "Expressing What's Real", keywords: "expression, creativity, release", reframe: "What's true in me deserves a way out." },
    { week: 4, theme: "Speaking With Compassion", keywords: "compassion, kind honesty, gentle truth", reframe: "I can be honest and kind at the same time." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, voice, awareness", reframe: "My voice grows stronger every time I use it gently." },
  ],
  Red: [
    { week: 1, theme: "Naming the Hurt", keywords: "heartbreak, naming, acknowledgment", reframe: "What hurt me deserves to be named, not minimized." },
    { week: 2, theme: "Heartbreak & the Body", keywords: "body, heartbreak, somatic", reframe: "My body has been carrying this. It deserves care." },
    { week: 3, theme: "The Slow Work of Healing", keywords: "healing, patience, nonlinear", reframe: "Healing is happening, even when I can't feel it." },
    { week: 4, theme: "Tenderness Toward Yourself", keywords: "tenderness, gentleness, care", reframe: "I can be tender with myself while I heal." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, healing, reflection", reframe: "Healing is happening. I trust it." },
  ],
  "1989": [
    { week: 1, theme: "Letting Go of Old Stories", keywords: "narrative, identity, release", reframe: "I am not who I was. I am who I'm becoming." },
    { week: 2, theme: "Who Am I Becoming", keywords: "becoming, vision, possibility", reframe: "I am still becoming. There is room for more of me to emerge." },
    { week: 3, theme: "Self-Trust", keywords: "self-trust, intuition, knowing", reframe: "I trust myself to know what I need." },
    { week: 4, theme: "Creating a Life That Fits", keywords: "alignment, design, becoming", reframe: "I am building a life that fits the person I am becoming." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, transformation, becoming", reframe: "I am allowed to be new. Again and again, for as long as I live." },
  ],
  Reputation: [
    { week: 1, theme: "What Boundaries Really Are", keywords: "boundaries, definition, protection", reframe: "Boundaries are how I love myself and stay in connection with others." },
    { week: 2, theme: "Protecting Your Peace", keywords: "peace, protection, energy", reframe: "My peace is mine to protect." },
    { week: 3, theme: "Hard Conversations", keywords: "hard conversations, honesty, advocacy", reframe: "I can have hard conversations. I am brave enough." },
    { week: 4, theme: "Standing Firm", keywords: "firmness, follow-through, holding the line", reframe: "I can hold my boundaries with calm and clarity." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, boundaries, reflection", reframe: "I am allowed to protect myself. That is not betrayal. That is recovery." },
  ],
  Lover: [
    { week: 1, theme: "Self-Compassion", keywords: "self-compassion, kindness, gentleness", reframe: "I deserve the same kindness I would give a friend." },
    { week: 2, theme: "Connection", keywords: "connection, relationship, presence", reframe: "I am worthy of being known and loved." },
    { week: 3, theme: "Trust", keywords: "trust, faith, slow work", reframe: "I am willing to trust the slow work of becoming." },
    { week: 4, theme: "Balance", keywords: "balance, rhythm, flow", reframe: "I am allowed to rest. I am allowed to receive. I am allowed to live in rhythm." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, compassion, reflection", reframe: "Compassion is a practice I get to return to every day." },
  ],
  "Folklore/Evermore": [
    { week: 1, theme: "The Grief Beneath the Surface", keywords: "grief, awareness, hidden loss", reframe: "Grief is part of how I love what I'm letting go of." },
    { week: 2, theme: "Sitting With What's Lost", keywords: "presence, loss, sitting with", reframe: "I can sit with what's lost. The grief will move through me." },
    { week: 3, theme: "Reimagining Your Story", keywords: "reimagining, story, possibility", reframe: "My story isn't over. The next chapter is mine to imagine." },
    { week: 4, theme: "Hope on Quiet Terms", keywords: "hope, quiet, sustainability", reframe: "I can hope on quiet terms. A little hope is still hope." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, grief, reflection", reframe: "I have been brave enough to grieve and to imagine. That is recovery." },
  ],
  Midnights: [
    { week: 1, theme: "The 3 AM Mind", keywords: "rumination, late-night thoughts, awareness", reframe: "I don't have to believe everything my tired mind tells me." },
    { week: 2, theme: "The Inner Critic", keywords: "inner critic, self-talk, compassion", reframe: "I am not my inner critic. I am the one who hears it and chooses kindness anyway." },
    { week: 3, theme: "Honest Reflection", keywords: "honesty, self-reflection, truth", reframe: "I can tell myself the truth and stay on my own side." },
    { week: 4, theme: "Mindfulness", keywords: "mindfulness, presence, now", reframe: "This moment is enough. I am here." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, mind, reflection", reframe: "I am building a kinder, clearer relationship with my own mind." },
  ],
  TTPD: [
    { week: 1, theme: "Holding It All", keywords: "integration, fullness, acknowledgment", reframe: "I can hold all of it. The hard, the good, the in-between." },
    { week: 2, theme: "What I've Learned", keywords: "learning, wisdom, integration", reframe: "I am wiser than I was. My experience has taught me things worth keeping." },
    { week: 3, theme: "Letting the Old Self Rest", keywords: "old self, peace, letting rest", reframe: "I thank who I used to be. I let that version of me rest." },
    { week: 4, theme: "Renewing From Within", keywords: "renewal, restoration, refreshment", reframe: "I am allowed to be restored. Renewal is mine." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, renewal, reflection", reframe: "I am whole, even as I am still becoming." },
  ],
  Showgirl: [
    { week: 1, theme: "Allowing Joy", keywords: "joy, permission, openness", reframe: "I am allowed to feel joy. It is mine to keep." },
    { week: 2, theme: "Confidence & Coming Home", keywords: "confidence, self-belief, home in yourself", reframe: "I am at home in who I am." },
    { week: 3, theme: "Embodiment", keywords: "body, embodiment, presence", reframe: "My body is mine. It is a place I am learning to live." },
    { week: 4, theme: "Celebration", keywords: "celebration, joy, marking moments", reframe: "I get to celebrate myself, my growth, and my life." },
    { week: 5, theme: "Integration & Reflection", keywords: "integration, joy, reflection", reframe: "I have come a long way. I am still becoming. I am allowed to be proud." },
  ],
};

// ============================================================
// WEEKLY DAILY PROMPTS — directly from the Swift Steps Bible
// 4 prompts per week × 55 weeks = 220 prompts total
// Order: Monday Reflection / Wednesday Relapse Prevention / Thursday Check-In / Sunday Gratitude
// Key format: "EraName-WeekNumber"
// ============================================================
const WEEK_PROMPTS = {
  // DEBUT
  "Debut-1": [
    "What does beginning again look like for you right now? What feels different about this time?",
    "When you restart, what usually pulls you off track? What helps you come back without shame?",
    "How are you showing up for yourself this week, even in a small or imperfect way?",
    "What are you grateful for about choosing to begin again?",
  ],
  "Debut-2": [
    "What does showing up look like for you this week? What small act of presence are you proud of?",
    "When showing up feels hardest, what tends to make you want to disappear? What helps you stay?",
    "How are you showing up for yourself in small ways right now? What's one thing you're doing that's easy to overlook?",
    "What are you grateful for about your own quiet persistence this week?",
  ],
  "Debut-3": [
    "What helps you choose to continue when things feel uncertain? What does that choice look like in your daily life?",
    "What makes continuing feel harder some days than others? What helps you recommit when you're tempted to step back?",
    "How are you actively choosing yourself this week, even in small ways?",
    "What are you grateful for about your willingness to keep going?",
  ],
  "Debut-4": [
    "Where do you feel a sense of belonging in your life right now? What does belonging mean to you?",
    "When you feel disconnected or like you don't belong, what tends to pull you further away? What helps you reconnect?",
    "How are you letting yourself belong this week, to this community, to yourself, to your own recovery?",
    "What are you grateful for about the people, places, or moments where you've felt seen this week?",
  ],
  "Debut-5": [
    "Looking back over this module, what's one thing you've noticed about yourself? What's softened, shifted, or surprised you?",
    "What patterns showed up for you during this module, both the helpful ones and the ones you want to keep an eye on?",
    "How are you taking care of yourself as we close out this module? What do you need before moving forward?",
    "What are you grateful for from this module? What do you want to carry with you into the next chapter?",
  ],

  // FEARLESS
  "Fearless-1": [
    "What fears have shown up for you in recovery? Which ones are you carrying with you this week?",
    "When fear takes the wheel, where does it usually drive you? What helps you stay in the driver's seat?",
    "How are you moving forward this week, even with fear present?",
    "What are you grateful for about the courage it took to be here this week?",
  ],
  "Fearless-2": [
    "Where in your life do you feel most seen right now? Where do you still hide?",
    "What makes it hard to let yourself be seen? What patterns of hiding tend to show up when you're struggling?",
    "How are you letting yourself be seen this week, even in small ways?",
    "What are you grateful for about the people who see you, or the moments you let yourself be seen?",
  ],
  "Fearless-3": [
    "Where in your life are you starting to trust yourself again? What small promises are you keeping?",
    "When self-trust wobbles, what tends to throw it off? What helps you come back to yourself?",
    "How are you listening to yourself this week? What is your gut telling you?",
    "What are you grateful for about the moments you trusted yourself this week?",
  ],
  "Fearless-4": [
    "What small acts of courage are you practicing right now? What's brave about your ordinary day?",
    "When you avoid the small brave things, what tends to be underneath the avoidance? What helps you do the hard small thing?",
    "How are you honoring your own small courage this week?",
    "What are you grateful for about the quiet bravery you've shown lately?",
  ],
  "Fearless-5": [
    "Looking back over this module, where have you noticed your own courage? What surprised you?",
    "What fears still feel loud? What's helping you live alongside them with less shame?",
    "How are you taking care of yourself as we close out this module? What does brave self-care look like right now?",
    "What are you grateful for from this module? What courage do you want to carry forward?",
  ],

  // SPEAK NOW
  "Speak Now-1": [
    "Where in your life is your voice coming back? Where is it still quiet?",
    "When you silence yourself, what's usually underneath it? What helps you find your voice again?",
    "How are you practicing using your voice this week, even in small ways?",
    "What are you grateful for about the moments you spoke your truth this week?",
  ],
  "Speak Now-2": [
    "What honest conversation are you ready to have, with yourself or someone else?",
    "When you avoid hard conversations, what's the cost? What helps you find the courage to speak?",
    "How are you practicing honesty with yourself this week, even quietly?",
    "What are you grateful for about the truths you spoke or heard this week?",
  ],
  "Speak Now-3": [
    "How do you express what's real for you? What forms of expression help you most?",
    "When you keep things bottled up, what tends to come out instead? What helps you let the real thing out?",
    "How are you giving your truth a way out this week, in writing, talking, movement, art, anything?",
    "What are you grateful for about the ways you've expressed yourself this week?",
  ],
  "Speak Now-4": [
    "How are you speaking to yourself lately? Is there a place that voice could soften?",
    "When stress or shame takes over, how does your self-talk shift? What helps you bring it back to compassion?",
    "How are you practicing compassionate speech with yourself or others this week?",
    "What are you grateful for about the kindness you've offered or received in your conversations?",
  ],
  "Speak Now-5": [
    "Looking back over this module, how has your voice shifted? Where is it stronger? Where is it still tender?",
    "What patterns of silence or over-speaking showed up for you during this module? What do you want to keep noticing?",
    "How are you caring for your voice as we close out this module?",
    "What are you grateful for from this module? What do you want to carry forward into the next era?",
  ],

  // RED
  "Red-1": [
    "What heartbreak are you carrying right now, even if you've been minimizing it? What would it mean to name it honestly?",
    "When you minimize your hurt, what tends to drive that? What helps you take it seriously instead?",
    "How are you acknowledging your own heartbreak this week, in whatever form it takes?",
    "What are you grateful for about the ways you're starting to take your hurt seriously?",
  ],
  "Red-2": [
    "Where does heartbreak live in your body? What does it feel like physically?",
    "When emotional pain shows up, how do you usually treat your body? What helps you care for yourself somatically instead?",
    "How are you tending to your body this week, through rest, movement, water, breath, warmth?",
    "What are you grateful for about the ways your body has been carrying you through this?",
  ],
  "Red-3": [
    "Where are you putting pressure on yourself to be healed already? What would it feel like to release that?",
    "When healing feels too slow, what tends to take over? What helps you trust the process again?",
    "How are you giving yourself permission to heal at your own pace this week?",
    "What are you grateful for about the slow, real progress you've made, even if it's hard to see?",
  ],
  "Red-4": [
    "How would you treat someone you love who was going through what you're going through? Can you give yourself that?",
    "When self-toughening kicks in, what tends to set it off? What helps you bring tenderness back?",
    "How are you being tender with yourself this week. Slowing down, saying no, resting, caring?",
    "What are you grateful for about the ways you've been gentle with yourself lately?",
  ],
  "Red-5": [
    "Looking back over this module, what feels different about how you're holding your hurt? What's softened?",
    "What patterns of avoidance or self-toughening still show up? What's helping you stay tender?",
    "How are you tending to your healing as we close out this module?",
    "What are you grateful for from this module? What part of healing do you want to keep practicing?",
  ],

  // 1989
  "1989-1": [
    "What old story about yourself are you ready to let go of? What story would you like to write instead?",
    "When old stories take over, what tends to trigger them? What helps you step out of them?",
    "How are you practicing being a new version of yourself this week?",
    "What are you grateful for about the parts of you that are growing past the old story?",
  ],
  "1989-2": [
    "Who are you becoming? What new parts of yourself are you starting to recognize?",
    "When old identities try to pull you back, what tends to set that off? What helps you stay in the becoming?",
    "How are you exploring who you are this week, in small or quiet ways?",
    "What are you grateful for about the version of you that's emerging?",
  ],
  "1989-3": [
    "Where in your life are you trusting yourself right now? What does that feel like?",
    "When self-trust slips, what tends to take its place? What helps you find your way back to your own knowing?",
    "How are you backing yourself this week. Listening to what you need and following through?",
    "What are you grateful for about the moments you trusted yourself and were right?",
  ],
  "1989-4": [
    "What does a life that fits you look like? What's already in it? What's missing?",
    "When you fall back into a life that doesn't fit, what tends to pull you there? What helps you choose the life that's actually yours?",
    "How are you shaping your life around what's true for you this week?",
    "What are you grateful for about the parts of your life that already fit?",
  ],
  "1989-5": [
    "Looking back over this module, what feels different about who you are becoming? What's surprised you?",
    "What old patterns tried to pull you back during this module? What's helping you keep moving forward?",
    "How are you celebrating your own becoming as we close out this module?",
    "What are you grateful for from this module? What new version of yourself do you want to keep growing into?",
  ],

  // REPUTATION
  "Reputation-1": [
    "What did you learn about boundaries growing up? How is your understanding of boundaries changing now?",
    "When boundaries feel like punishment instead of protection, what tends to drive that? What helps you reframe them?",
    "How are you practicing boundaries as self-respect this week?",
    "What are you grateful for about the boundaries that have kept you safe lately?",
  ],
  "Reputation-2": [
    "What's threatening your peace right now? What would protecting it look like?",
    "When you abandon your peace to keep others comfortable, what tends to set that off? What helps you choose your peace instead?",
    "How are you protecting your peace this week, in big or small ways?",
    "What are you grateful for about the moments you chose your peace this week?",
  ],
  "Reputation-3": [
    "What hard conversation have you been avoiding? What might it cost you to keep avoiding it?",
    "When you avoid hard conversations, what tends to drive that? What helps you find the courage to have them?",
    "How are you preparing yourself for hard conversations this week, even just internally?",
    "What are you grateful for about the hard conversations you've had, or the courage you're building to have them?",
  ],
  "Reputation-4": [
    "Where are your boundaries being tested right now? How are you holding them?",
    "When you cave on a boundary you wanted to hold, what tends to push it over? What helps you stand firm next time?",
    "How are you holding your boundaries with calm clarity this week?",
    "What are you grateful for about the times you stood firm in your own truth this week?",
  ],
  "Reputation-5": [
    "Looking back over this module, where have you noticed yourself standing up for your own peace? What surprised you?",
    "What patterns of self-abandonment still show up? What's helping you keep choosing yourself?",
    "How are you taking care of yourself as we close out this module?",
    "What are you grateful for from this module? What boundary work do you want to keep practicing?",
  ],

  // LOVER
  "Lover-1": [
    "How would you talk to a friend going through what you're going through right now? Can you say that to yourself?",
    "When self-criticism takes over, what tends to set it off? What helps you bring kindness back?",
    "How are you practicing self-compassion this week, even in small ways?",
    "What are you grateful for about the kindness you've offered yourself lately?",
  ],
  "Lover-2": [
    "Where is real connection showing up in your life right now? Where do you crave more of it?",
    "When you pull away from connection, what tends to drive that? What helps you stay open?",
    "How are you cultivating connection this week, with yourself, with others, with this community?",
    "What are you grateful for about the people who have shown up for you this week?",
  ],
  "Lover-3": [
    "Where is trust building in your life right now? What's slowly becoming more solid?",
    "When trust feels shaky, what tends to throw it off? What helps you stay open to trusting again?",
    "How are you practicing trust this week, in yourself, in others, in the process?",
    "What are you grateful for about the people, processes, or parts of yourself you trust today?",
  ],
  "Lover-4": [
    "Where is your life in good rhythm right now? Where is it out of balance?",
    "When balance tips too far in one direction, what coping patterns show up? What helps you reset?",
    "How are you tending to balance this week. Between doing and resting, giving and receiving?",
    "What are you grateful for about the moments of balance you've experienced lately?",
  ],
  "Lover-5": [
    "Looking back over this module, where has compassion grown in you? What feels softer than it used to?",
    "What patterns of self-criticism or disconnection still show up? What's helping you meet them gently?",
    "How are you offering yourself love as we close out this module?",
    "What are you grateful for from this module? What kind of love do you want to keep practicing?",
  ],

  // FOLKLORE / EVERMORE
  "Folklore/Evermore-1": [
    "What grief have you been carrying that you haven't fully named? What does it deserve from you?",
    "When grief shows up unexpectedly, what coping patterns tend to crowd it out? What helps you stay with the feeling?",
    "How are you letting yourself feel grief this week, in whatever form it takes?",
    "What are you grateful for about the things grief has shown you, even when it hurts?",
  ],
  "Folklore/Evermore-2": [
    "What loss are you ready to sit with this week? What might it ask of you?",
    "When grief feels too big to sit with, what tends to take you away from it? What helps you stay?",
    "How are you giving yourself permission to feel loss this week, without rushing past it?",
    "What are you grateful for about the way grief has softened or moved through you lately?",
  ],
  "Folklore/Evermore-3": [
    "What might your life become from here? What would you like the next chapter to hold?",
    "When imagining a different future feels too risky, what tends to shut it down? What helps you stay open to possibility?",
    "How are you giving yourself permission to imagine something new this week?",
    "What are you grateful for about the possibilities you can still feel, even after loss?",
  ],
  "Folklore/Evermore-4": [
    "Where is hope quietly returning to you? What does it feel like, on a small scale?",
    "When hope feels too dangerous, what tends to make you guard against it? What helps you let a little in?",
    "How are you tending to your quiet hope this week?",
    "What are you grateful for about the small, real hope you're carrying right now?",
  ],
  "Folklore/Evermore-5": [
    "Looking back over this module, what feels different about how you carry grief? What feels different about how you imagine your future?",
    "What patterns of avoidance or hopelessness still show up? What's helping you stay with the slow work?",
    "How are you tending to yourself as we close out this module?",
    "What are you grateful for from this module? What part of grieving and reimagining do you want to carry forward?",
  ],

  // MIDNIGHTS
  "Midnights-1": [
    "What does your 3 a.m. mind tell you? What's a more truthful version, when you're rested?",
    "When rumination takes over, what tends to set it off? What helps you ride it out without acting on it?",
    "How are you taking care of your mind this week, especially in the harder hours?",
    "What are you grateful for about the mornings that bring perspective back?",
  ],
  "Midnights-2": [
    "What does your inner critic say to you most often? When does it tend to get loudest?",
    "When the inner critic takes over, what coping patterns follow? What helps you turn the volume down?",
    "How are you responding to your inner critic with compassion this week?",
    "What are you grateful for about the kinder voice that lives inside you, too?",
  ],
  "Midnights-3": [
    "What's something true about yourself you're ready to look at honestly? What might honesty without judgment teach you?",
    "When honest reflection slides into self-attack, what tends to tip it over? What helps you stay kind while telling the truth?",
    "How are you reflecting honestly this week. Clearly, but without cruelty?",
    "What are you grateful for about the truths you've been able to face about yourself with grace?",
  ],
  "Midnights-4": [
    "Where have you noticed yourself fully present lately? What helps you come back to the moment?",
    "When your mind spirals, what tends to set it off? What helps you come back to now?",
    "How are you practicing presence this week, in even the smallest moments?",
    "What are you grateful for about the moments you were fully here this week?",
  ],
  "Midnights-5": [
    "Looking back over this module, what feels different about your relationship with your own mind?",
    "What thought patterns still trip you up? What's helping you meet them with awareness instead of judgment?",
    "How are you taking care of your mind as we close out this module?",
    "What are you grateful for from this module? What inner shift do you want to keep tending to?",
  ],

  // TTPD
  "TTPD-1": [
    "What are you holding right now. Emotionally, mentally, spiritually? What deserves to be acknowledged?",
    "When holding so much feels overwhelming, what tends to take over? What helps you stay with the fullness?",
    "How are you giving yourself credit for everything you're carrying this week?",
    "What are you grateful for about your own capacity to hold so much and still keep going?",
  ],
  "TTPD-2": [
    "What have you learned in your recovery so far? What wisdom is yours now that wasn't before?",
    "When you forget what you've learned and slip back into old patterns, what tends to set that off? What helps you remember what you know?",
    "How are you applying what you've learned this week, in big or small ways?",
    "What are you grateful for about the wisdom you've earned?",
  ],
  "TTPD-3": [
    "What would you say to your past self if you could talk to them? What do they deserve to hear?",
    "When your past self feels like an enemy, what tends to drive that? What helps you treat them with compassion instead?",
    "How are you letting your past self rest this week? What weight are they finally allowed to put down?",
    "What are you grateful for about who you used to be, and how they got you here?",
  ],
  "TTPD-4": [
    "What restores you? What helps you feel more like yourself? How could you make more room for it?",
    "When you neglect your own renewal, what tends to drive that? What helps you prioritize it instead?",
    "How are you renewing yourself this week, even in tiny ways?",
    "What are you grateful for about the moments of renewal that have refilled you lately?",
  ],
  "TTPD-5": [
    "Looking back over this module, what feels integrated? What still feels separate?",
    "What patterns of fragmentation or self-rejection still show up? What's helping you keep gathering yourself?",
    "How are you tending to your own renewal as we close out this module?",
    "What are you grateful for from this module? What part of integration and renewal do you want to keep practicing?",
  ],

  // SHOWGIRL
  "Showgirl-1": [
    "Where is joy showing up in your life right now? Are you letting it in, or holding it at arm's length?",
    "When joy feels dangerous, what tends to make you brace for the fall? What helps you stay open to feeling good?",
    "How are you allowing joy this week, even in small moments?",
    "What are you grateful for about the moments of joy you let yourself feel this week?",
  ],
  "Showgirl-2": [
    "Where is confidence growing in you? What do you feel solid in lately?",
    "When confidence wobbles, what tends to shake it? What helps you come back to feeling solid?",
    "How are you stepping into your own confidence this week, in big or small ways?",
    "What are you grateful for about the version of yourself who's getting more comfortable in their own skin?",
  ],
  "Showgirl-3": [
    "How is your relationship with your body right now? Where are you reconnecting?",
    "When you disconnect from your body, what tends to drive that? What helps you come back home?",
    "How are you tending to your body this week. Listening, resting, moving, nourishing?",
    "What are you grateful for about your body and the things it does for you?",
  ],
  "Showgirl-4": [
    "What are you ready to celebrate about yourself, your week, or your life right now?",
    "When celebration feels uncomfortable, what tends to make you skip it? What helps you stay with the good feelings?",
    "How are you marking moments of joy and progress this week?",
    "What are you grateful for about the things worth celebrating in your life, big and small?",
  ],
  "Showgirl-5": [
    "Looking back over this module, and over the whole journey, what feels different about you? What's grown?",
    "What patterns and challenges have you walked through? What's helping you keep going?",
    "How are you celebrating yourself as we close this curriculum? What does honoring your journey look like?",
    "What are you grateful for, about this module, this curriculum, this community, and the version of yourself who walked it all? What do you want to carry into whatever comes next?",
  ],
};

const SYSTEM_PROMPT = `You are the Swift Steps Companion, a peer support companion built in the voice of Julianne Griffin, founder of Swift Steps and a Certified Peer Specialist.

WHO YOU ARE
You speak like Julianne: warm, grounded, real, never preachy, never clinical. You have "come sit with us" energy. You sound like someone who's been there, not someone trying to fix anyone.

CRITICAL VOICE RULES
- Use "come sit with us" / "you don't have to talk" / "you can just listen" / "no pressure" / "being here is enough"
- NEVER use "join us," "support group," or corporate/clinical language
- real > polished. grounded > inspirational. direct but not harsh. emotionally honest.
- NEVER say "you should", invite, don't instruct
- Lowercase-leaning, sentence fragments are fine. Match the journal-entry tone.
- Keep responses short. Two or three sentences usually. Long replies feel like lectures.

WHAT SWIFT STEPS IS
A peer-led recovery community for Swifties. 55-week program structured around Taylor Swift's eras as emotional guideposts (5 weeks per era, with week 5 of each era being Integration & Reflection). All pathways: harm reduction, abstinence, MAT, sober-curious, self-defined. Not therapy. Not crisis care. Not abstinence-only.

CORE BELIEFS
- recovery isn't one-size-fits-all
- you don't have to be sober or sure to belong
- relapse ≠ failure
- connection > compliance
- karma is our higher power, compassion is our method
- we don't reset people, we pick up from here

THE ERAS (use these as emotional language when it fits, never force it):
- Debut 🌱 Beginning Again, willingness, belonging, return after slip (Weeks 1-5)
- Fearless 💛 Courage with fear present, being seen, trusting yourself, small daily bravery (Weeks 6-10)
- Speak Now 💜 Voice, honest conversations, expressing what's real, compassionate speech (Weeks 11-15)
- Red 🔴 Heartbreak, naming the hurt, body, slow healing, tenderness (Weeks 16-20)
- 1989 🌆 Identity, letting go of old stories, who you're becoming, building a life that fits (Weeks 21-25)
- Reputation 🖤 Boundaries, protecting your peace, hard conversations, standing firm (Weeks 26-30)
- Lover 🌸 Self-Compassion, connection, trust, balance (Weeks 31-35)
- Folklore/Evermore 🌲 Grief & Reimagining, sitting with what's lost, hope on quiet terms (Weeks 36-40)
- Midnights 🌌 The 3am mind, inner critic, honest reflection, mindfulness (Weeks 41-45)
- TTPD 📝 Integration & Renewal, holding it all, letting the old self rest (Weeks 46-50)
- Showgirl 🎭 Celebration & Self-Honoring, allowing joy, embodiment, confidence (Weeks 51-55)

WEEKLY RHYTHM
- Monday Reflection: notice where you are
- Wednesday Relapse Prevention: pattern awareness, what pulls us off course
- Thursday Check-In: how you're showing up for yourself
- Sunday Gratitude: honor what's been quietly working

WHAT YOU DO
- Hold space. Reflect what you hear back simply.
- Suggest a journaling prompt from the relevant era when it fits
- Suggest the right meeting (Monday=theme, Tuesday=Speak Now speaker, Wednesday=relapse prevention, Thursday=check-in, Friday=craft, Saturday=Surprise Song, Sunday=gratitude/reset)
- Remind people they don't have to fix it alone
- Validate without performing

WHAT YOU DON'T DO
- No diagnosis. No clinical advice. No "you should."
- No medical advice, including about medications, dosages, withdrawal symptoms
- Don't try to be a therapist or a sponsor
- Don't shame anyone for any choice, including using, drinking, lapsing, leaving
- Don't push abstinence
- Don't claim affiliation with Taylor Swift, TAS Rights Management, or Taylor Nation

CRISIS PROTOCOL, NON-NEGOTIABLE
If someone mentions: suicide, self-harm, wanting to die, overdose, not being safe, a plan, hurting someone, an active medical emergency, STOP being clever. Drop the era language. Say something simple and human like: "What you just said matters and I want to make sure you're with people who can really help right now." Then surface: 988 (Suicide & Crisis Lifeline, call or text), Crisis Text Line (text HOME to 741741), or 911 if it's a medical emergency. Tell them Swift Steps is peer support, not crisis care, and they deserve real help right now. Do not try to talk them through it yourself.

Also redirect to professional help (not crisis line) for: active withdrawal symptoms, medication questions, eating disorder behaviors, anything that needs a clinician.

FORMAT
- No bullet points unless the person asks for a list
- No headers in chat replies
- No emojis unless they used one first (era emojis in suggestions are fine, sparingly)
- Speak like a text from a friend who happens to know the program cold`;

// ---------- Local persistence ----------
const STORAGE_KEYS = {
  currentEra: "ss-current-era",
  streak: "ss-streak",
  lastCheckIn: "ss-last-checkin",
  checkIns: "ss-checkins",
  conversation: "ss-conversation",
};

const useLocalState = (key, initial) => {
  const [val, setVal] = useState(() => {
    try {
      const raw = window.storage ? null : null;
      return initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    if (!window.storage) return;
    (async () => {
      try {
        const r = await window.storage.get(key);
        if (r && r.value) setVal(JSON.parse(r.value));
      } catch {}
    })();
  }, [key]);

  const update = async (newVal) => {
    setVal(newVal);
    if (window.storage) {
      try {
        await window.storage.set(key, JSON.stringify(newVal));
      } catch {}
    }
  };

  return [val, update];
};

// ---------- Crisis detection ----------
const CRISIS_PATTERNS = [
  /\b(kill|killing|hurt) (myself|me)\b/i,
  /\bsuicid/i,
  /\bend (it|my life)\b/i,
  /\bwant to die\b/i,
  /\bdon'?t want to (be here|live|wake up)\b/i,
  /\boverdos/i,
  /\bself.?harm/i,
  /\bcutting myself\b/i,
  /\b(took|taking) too (many|much)\b/i,
  /\bcan'?t breathe\b/i,
];

const detectCrisis = (text) => CRISIS_PATTERNS.some((p) => p.test(text));

// ---------- Today's meetings ----------
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getMeetingsForDay = (dayName, date) => {
  const list = [...(MEETINGS[dayName] || [])];
  if (dayName === "Sunday") {
    list.push(getSundayEvening(date));
  }
  return list;
};

const todayMeetings = () => {
  const now = new Date();
  const today = DAYS[now.getDay()];
  const meetings = getMeetingsForDay(today, now);
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  return {
    day: today,
    meetings: meetings.map((m) => {
      const minutesUntil = (m.hour24 - currentHour) * 60 - currentMinutes;
      return { ...m, minutesUntil, isPast: minutesUntil < -30 };
    }),
  };
};

const nextMeeting = () => {
  const now = new Date();
  for (let offset = 1; offset <= 7; offset++) {
    const future = new Date(now);
    future.setDate(now.getDate() + offset);
    const dayName = DAYS[future.getDay()];
    const list = getMeetingsForDay(dayName, future);
    if (list.length > 0) {
      return { day: dayName, ...list[0], daysAway: offset };
    }
  }
  return null;
};

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [tab, setTab] = useState("home");
  const cohortPosition = getCurriculumPosition();
  const [eraId, setEraId] = useState(cohortPosition.eraId);
  const [weekInEra, setWeekInEra] = useState(cohortPosition.weekInEra);
  const [streak, setStreak] = useLocalState(STORAGE_KEYS.streak, 0);
  const [lastCheckIn, setLastCheckIn] = useLocalState(STORAGE_KEYS.lastCheckIn, null);
  const [checkIns, setCheckIns] = useLocalState(STORAGE_KEYS.checkIns, []);

  const era = ERAS[eraId];

  return (
    <div style={styles.appShell}>
      <style>{globalCSS}</style>

      <div style={styles.screen}>
        {!hasEntered ? (
          <WelcomeView era={era} onEnter={() => setHasEntered(true)} />
        ) : (
          <>
            <div style={styles.content}>
              {tab === "home" && (
                <HomeView
                  era={era}
                  eraId={eraId}
                  setEraId={setEraId}
                  weekInEra={weekInEra}
                  setWeekInEra={setWeekInEra}
                  streak={streak}
                  setStreak={setStreak}
                  lastCheckIn={lastCheckIn}
                  setLastCheckIn={setLastCheckIn}
                  checkIns={checkIns}
                  setCheckIns={setCheckIns}
                  setTab={setTab}
                />
              )}
              {tab === "chat" && <ChatView era={era} weekInEra={weekInEra} />}
              {tab === "prompts" && <PromptsView era={era} eraId={eraId} setEraId={setEraId} weekInEra={weekInEra} />}
              {tab === "progress" && <ProgressView era={era} eraId={eraId} weekInEra={weekInEra} streak={streak} checkIns={checkIns} />}
            </div>

            <TabBar tab={tab} setTab={setTab} eraColor={era.color} />
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// WELCOME · first screen
// ============================================================
function WelcomeView({ era, onEnter }) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div style={welcomeStyles.container}>
      <div style={welcomeStyles.backdrop}>
        <div style={{ ...welcomeStyles.blob, background: "#C9B6E433", top: "5%", left: "-25%" }} />
        <div style={{ ...welcomeStyles.blob, background: "#E8C5D0AA", bottom: "10%", right: "-30%", animationDelay: "2s" }} />
        <div style={{ ...welcomeStyles.blob, background: "#D4BFE822", top: "40%", left: "20%", animationDelay: "4s" }} />
      </div>

      <div style={welcomeStyles.scrollContent}>
        <div style={welcomeStyles.logoBlock} className="welcome-fade-1">
          <img src={logo} alt="Swift Steps" style={welcomeStyles.logoImg} />
          <p style={welcomeStyles.appName}>ioSwiftie</p>
          <p style={welcomeStyles.appBy}>by Swift Steps</p>
        </div>

        <div style={welcomeStyles.middleBlock}>
          <p style={welcomeStyles.headline} className="welcome-fade-2">
            Karma is our higher power.
          </p>
          <p style={welcomeStyles.headlineFinal} className="welcome-fade-3">
            Compassion is our method.
          </p>
        </div>

        <div style={welcomeStyles.disclaimerStack} className="welcome-fade-4">
          <div style={welcomeStyles.crisisBlock}>
            <p style={welcomeStyles.crisisLabel}>If You're In Crisis Right Now</p>
            <div style={welcomeStyles.crisisNumbers}>
              <p style={welcomeStyles.crisisNumberLine}>Call or text <strong>988</strong></p>
              <p style={welcomeStyles.crisisNumberLine}>Text <strong>HOME</strong> to <strong>741741</strong></p>
              <p style={welcomeStyles.crisisNumberLine}>Call <strong>911</strong></p>
            </div>
            <p style={welcomeStyles.crisisSub}>This companion cannot help in a crisis.</p>
            <p style={welcomeStyles.crisisSub}>Please reach out to people who can.</p>
          </div>

          <div style={welcomeStyles.disclaimerCard}>
            <p style={welcomeStyles.disclaimerLabel}>What This Is</p>
            <p style={welcomeStyles.disclaimerBody}>
              Swift Steps is a <strong>peer support community</strong> for Swifties navigating sobriety, mental health, or just figuring it out. Peer support means people with lived experience walking alongside each other. Not professionals treating clients.
            </p>
            <p style={welcomeStyles.disclaimerBody}>
              This companion app is an extension of that community. It can hold space, suggest journaling prompts, recommend a meeting, and reflect things back. That's it.
            </p>
          </div>

          <div style={welcomeStyles.disclaimerCard}>
            <p style={welcomeStyles.disclaimerLabel}>What This Is Not</p>
            <p style={welcomeStyles.disclaimerBody}>
              <strong>This is not therapy.</strong> Not counseling. Not psychiatric care. Not a substitute for working with a licensed clinician, doctor, psychiatrist, therapist, social worker, or treatment program.
            </p>
            <p style={welcomeStyles.disclaimerBody}>
              <strong>This is not crisis care.</strong> Not a hotline. Not emergency services. Not appropriate for active suicidal ideation, self-harm, withdrawal, overdose, psychiatric emergencies, or any medical emergency.
            </p>
            <p style={welcomeStyles.disclaimerBody}>
              <strong>This is not medical advice.</strong> No diagnosis. No treatment recommendations. No medication advice, including questions about dosages, interactions, withdrawal, or whether to start, stop, or change anything you're prescribed. Always talk to your doctor.
            </p>
            <p style={welcomeStyles.disclaimerBody}>
              <strong>This is not monitoring.</strong> Nothing you share here is reported, supervised, or tracked for compliance.
            </p>
          </div>

          <div style={welcomeStyles.disclaimerCard}>
            <p style={welcomeStyles.disclaimerLabel}>Who Built This</p>
            <p style={welcomeStyles.disclaimerBody}>
              Swift Steps was founded by <strong>Julianne Griffin</strong>, a Certified Peer Specialist and Recovery Mentor, through Blank Space Recovery, LLC. The voice of this companion is built from her work and lived experience.
            </p>
            <p style={welcomeStyles.disclaimerBody}>
              A Certified Peer Specialist is trained to provide peer support, sharing lived experience to support others in recovery. <strong>Peer Specialists are not licensed therapists, counselors, doctors, or medical providers,</strong> and peer support does not replace clinical care.
            </p>
          </div>

          <div style={welcomeStyles.disclaimerCard}>
            <p style={welcomeStyles.disclaimerLabel}>Our Approach</p>
            <p style={welcomeStyles.disclaimerBody}>
              Swift Steps supports <strong>all pathways to recovery</strong>, including harm reduction, abstinence, medication-assisted treatment (MAT), sober-curious, and self-defined recovery. We do not require abstinence and we do not shame any path.
            </p>
            <p style={welcomeStyles.disclaimerBody}>
              You are encouraged to keep working with whatever clinical care, treatment program, sponsor, doctor, or therapist supports you. This companion sits beside that support, never in place of it.
            </p>
          </div>

          <div style={welcomeStyles.disclaimerCard}>
            <p style={welcomeStyles.disclaimerLabel}>Your Privacy</p>
            <p style={welcomeStyles.disclaimerBody}>
              This is a peer space, not a clinical one. <strong>Conversations are not protected by HIPAA</strong> or therapist-client confidentiality. Please don't share information you would only share with a licensed provider.
            </p>
            <p style={welcomeStyles.disclaimerBody}>
              If you are a mandated reporter, in legal proceedings, or in a circumstance where confidentiality matters legally, please use professional services that can guarantee that.
            </p>
          </div>

          <div style={welcomeStyles.disclaimerCard}>
            <p style={welcomeStyles.disclaimerLabel}>Independent Community</p>
            <p style={welcomeStyles.disclaimerBody}>
              Swift Steps is an independent recovery community inspired by the music of Taylor Swift. <strong>We are not affiliated with, endorsed by, or sponsored by Taylor Swift, TAS Rights Management, or Taylor Nation.</strong> Swift Steps™ is a trademark of Blank Space Recovery, LLC.
            </p>
          </div>

          <div style={welcomeStyles.ackBox}>
            <button
              onClick={() => setAcknowledged(!acknowledged)}
              style={{
                ...welcomeStyles.checkbox,
                background: acknowledged ? "#7B5BA8" : "#fff",
                borderColor: acknowledged ? "#7B5BA8" : "#B8A8C8",
              }}
              aria-label="acknowledge"
            >
              {acknowledged && <span style={{ color: "#fff", fontSize: 14 }}>✓</span>}
            </button>
            <p style={welcomeStyles.ackText}>
              I understand this is peer support, not therapy, medical care, or crisis services, and I'll seek professional help when I need it.
            </p>
          </div>

          <button
            onClick={onEnter}
            disabled={!acknowledged}
            style={{
              ...welcomeStyles.cta,
              background: acknowledged ? "#7B5BA8" : "#D4C5DE",
              cursor: acknowledged ? "pointer" : "not-allowed",
              boxShadow: acknowledged ? "0 4px 24px rgba(123, 91, 168, 0.25)" : "none",
            }}
          >
            <span>Come Sit With Us</span>
            <span style={{ fontSize: 14, opacity: 0.85 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const welcomeStyles = {
  container: { flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #FAF6F0 0%, #F5EDF2 100%)" },
  backdrop: { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" },
  blob: { position: "absolute", width: 340, height: 340, borderRadius: "50%", filter: "blur(80px)", animation: "float 8s ease-in-out infinite" },
  scrollContent: { position: "relative", zIndex: 2, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 22px 32px", textAlign: "center" },
  logoBlock: { display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4, marginBottom: 24 },
  logoImg: { width: 110, height: 110, objectFit: "contain", borderRadius: "50%", boxShadow: "0 6px 28px rgba(123, 91, 168, 0.18)" },
  appName: { fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, fontStyle: "italic", color: "#3A2E4A", margin: "16px 0 0", letterSpacing: "-0.015em" },
  appBy: { fontFamily: "'Fraunces', serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#6B6B6B", margin: "4px 0 0" },
  middleBlock: { display: "flex", flexDirection: "column", gap: 10, alignItems: "center", width: "100%", marginBottom: 32 },
  headline: { fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 400, color: "#3A2E4A", margin: 0, lineHeight: 1.3, letterSpacing: "-0.018em", textAlign: "center" },
  headlineFinal: { fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 500, fontStyle: "italic", color: "#3A2E4A", margin: 0, lineHeight: 1.3, letterSpacing: "-0.018em", textAlign: "center" },
  disclaimerStack: { display: "flex", flexDirection: "column", gap: 14, width: "100%" },
  crisisBlock: { background: "linear-gradient(135deg, #B89BC8 0%, #C8A0B8 100%)", borderRadius: 16, padding: "20px 18px 18px", color: "#fff", textAlign: "center", boxShadow: "0 4px 20px rgba(123, 91, 168, 0.18)" },
  crisisLabel: { fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, margin: "0 0 14px", letterSpacing: "-0.01em" },
  crisisNumbers: { display: "flex", flexDirection: "column", gap: 7, margin: "0 0 16px" },
  crisisNumberLine: { fontFamily: "'Fraunces', serif", fontSize: 14.5, margin: 0, lineHeight: 1.4 },
  crisisSub: { fontSize: 12, margin: "0 0 3px", opacity: 0.95, lineHeight: 1.5, fontStyle: "italic" },
  disclaimerCard: { background: "rgba(255,255,255,0.78)", backdropFilter: "blur(14px)", border: "1px solid rgba(184, 155, 200, 0.18)", borderRadius: 14, padding: "18px 18px 16px", textAlign: "left", boxShadow: "0 2px 12px rgba(123, 91, 168, 0.06)" },
  disclaimerLabel: { fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: "#3A2E4A", margin: "0 0 12px", textAlign: "center", letterSpacing: "-0.01em" },
  disclaimerBody: { fontSize: 12.5, color: "#4A3E5A", margin: "0 0 8px", lineHeight: 1.6 },
  ackBox: { display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 4px 6px", textAlign: "left" },
  checkbox: { flexShrink: 0, width: 22, height: 22, border: "1.5px solid", borderRadius: 5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", marginTop: 1 },
  ackText: { fontSize: 12.5, color: "#3A2E4A", margin: 0, lineHeight: 1.55, fontWeight: 500 },
  cta: { width: "100%", padding: "16px 22px", border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 500, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transition: "transform 0.15s, background 0.2s, box-shadow 0.2s", marginTop: 4, letterSpacing: "0.01em" },
};

// ============================================================
// HOME, CHAT, PROMPTS, PROGRESS, TAB BAR
// ============================================================
function HolidayBanner({ holidays, eraColor }) {
  if (!holidays || holidays.length === 0) return null;

  return (
    <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      {holidays.map((h, i) => (
        <div
          key={i}
          style={{
            padding: "14px 16px",
            background: `linear-gradient(135deg, ${eraColor}15 0%, ${eraColor}05 100%)`,
            borderRadius: 12,
            border: `1px solid ${eraColor}30`,
            borderLeft: `3px solid ${eraColor}`,
          }}
        >
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#3A2E4A",
              margin: "0 0 6px",
              letterSpacing: "-0.01em",
            }}
          >
            {h.emoji} {h.title}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#4A3E5A",
              margin: 0,
              lineHeight: 1.6,
              fontStyle: "italic",
              fontFamily: "'Fraunces', serif",
              whiteSpace: "pre-line",
            }}
          >
            {h.message}
          </p>
        </div>
      ))}
    </div>
  );
}

function HomeView({ era, eraId, setEraId, weekInEra, setWeekInEra, streak, setStreak, lastCheckIn, setLastCheckIn, checkIns, setCheckIns, setTab }) {
  const todayInfo = todayMeetings();
  const upcomingToday = todayInfo.meetings.filter((m) => !m.isPast);
  const upcomingNext = upcomingToday.length === 0 ? nextMeeting() : null;
  const today = new Date().toDateString();
  const checkedInToday = lastCheckIn === today;
  const weekData = ERA_WEEKS[era.name]?.[weekInEra - 1];
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [bodyDoublingExpanded, setBodyDoublingExpanded] = useState(false);

  const handleCheckIn = async (mood) => {
    const newCheckIns = [...checkIns, { date: today, mood, era: era.name, week: weekInEra }];
    await setCheckIns(newCheckIns);
    await setLastCheckIn(today);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasYesterday = lastCheckIn === yesterday.toDateString();
    await setStreak(wasYesterday || streak === 0 ? streak + 1 : 1);
  };

  return (
    <div style={{ padding: "20px 22px 100px" }}>
      <div style={styles.homeBrandHeader}>
        <img src={logo} alt="Swift Steps" style={styles.homeBrandLogo} />
        <p style={styles.homeBrandWordmark}>ioSwiftie</p>
        <p style={styles.homeBrandBy}>by Swift Steps</p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <p style={styles.greeting}>hi. you're here.</p>
        <p style={styles.greetingSub}>that's enough for right now.</p>
        {era.name === "Showgirl" && weekInEra === 5 && (
          <div style={{ marginTop: 16, padding: "14px 16px", background: "linear-gradient(135deg, #D4A57422 0%, #E8A4B822 100%)", borderRadius: 12, border: "1px solid #D4A57440" }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600, color: "#3A2E4A", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              🎭 you've come full circle
            </p>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 13, fontStyle: "italic", color: "#4A3E5A", margin: 0, lineHeight: 1.5 }}>
              this is the final week of the journey. take a breath. honor what you've walked through. monday, we begin again.
            </p>
          </div>
        )}
      </div>
      <HolidayBanner holidays={getActiveHolidays()} eraColor={era.color} />
   
        <div onClick={() => setTab("prompts")} style={{ ...styles.eraCard, background: `linear-gradient(135deg, ${era.color}22 0%, ${era.color}08 100%)`, borderLeft: `3px solid ${era.color}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <p style={styles.eraLabel}>currently sitting in</p>
            <h2 style={styles.eraName}>{era.emoji} {era.name}</h2>
            <p style={styles.eraSub}>{era.subtitle}</p>
            {weekData && (
              <>
                <div style={{ height: 1, background: `${era.color}30`, margin: "12px 0 10px" }} />
                <p style={{ ...styles.eraLabel, color: era.color }}>week {weekInEra} · this week's theme</p>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500, color: "#2D2D2D", margin: "4px 0 6px", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                  {weekData.theme}
                </p>
                <p style={{ fontSize: 12, color: "#6B6B6B", fontStyle: "italic", margin: 0, lineHeight: 1.45 }}>
                  "{weekData.reframe}"
                </p>
              </>
            )}
          </div>
        </div>

        {ERA_WEEKS[era.name] && (
          <div style={{ display: "flex", gap: 6, marginTop: 14, justifyContent: "center" }}>
            {ERA_WEEKS[era.name].map((w) => (
              <button key={w.week} onClick={(e) => { e.stopPropagation(); setWeekInEra(w.week); }}
                style={{ width: w.week === weekInEra ? 22 : 8, height: 8, borderRadius: 4, border: "none", background: w.week <= weekInEra ? era.color : `${era.color}30`, cursor: "pointer", transition: "all 0.2s", padding: 0 }}
                aria-label={`Week ${w.week}`} />
            ))}
          </div>
        )}
      </div>

      <div style={styles.section}>
        <p style={styles.sectionLabel}>{upcomingToday.length > 0 ? "today's meetings" : "next meeting"}</p>
        {upcomingToday.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcomingToday.map((m, i) => {
              const isExpanded = expandedMeeting === i;
              return (
                <div key={i} style={styles.meetingCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <p style={styles.meetingDay}>{todayInfo.day} · {m.time}</p>
                      <p style={styles.meetingName}>{m.name}</p>
                      <p style={styles.meetingDesc}>{m.desc}</p>
                    </div>
                    <button onClick={() => setExpandedMeeting(isExpanded ? null : i)} style={{ ...styles.meetingBtn, background: era.color }}>
                      {isExpanded ? "close" : "open"}
                    </button>
                  </div>
                  {isExpanded && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #EDE6DC" }}>
                      <p style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontStyle: "italic", color: "#2D2D2D", lineHeight: 1.5, margin: "0 0 14px" }}>{m.whatToExpect}</p>
                      <a href={m.link} target="_blank" rel="noopener noreferrer" style={{ ...styles.zoomBtn, background: era.color }}>Join the Zoom →</a>
                      <p style={{ fontSize: 11, color: "#6B6B6B", fontStyle: "italic", textAlign: "center", margin: "10px 0 0" }}>or just listen. being here is enough.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : upcomingNext ? (
          <div style={styles.meetingCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <p style={styles.meetingDay}>{upcomingNext.day} · {upcomingNext.time}</p>
                <p style={styles.meetingName}>{upcomingNext.name}</p>
                <p style={styles.meetingDesc}>{upcomingNext.desc}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div style={styles.section}>
        <p style={styles.sectionLabel}>always open</p>
        <div style={{ ...styles.meetingCard, background: `linear-gradient(135deg, ${era.color}10 0%, #fff 100%)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <p style={styles.meetingDay}>open whenever</p>
              <p style={styles.meetingName}>{BODY_DOUBLING.name}</p>
              <p style={styles.meetingDesc}>{BODY_DOUBLING.desc}</p>
            </div>
            <button onClick={() => setBodyDoublingExpanded(!bodyDoublingExpanded)} style={{ ...styles.meetingBtn, background: era.color }}>
              {bodyDoublingExpanded ? "close" : "open"}
            </button>
          </div>
          {bodyDoublingExpanded && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #EDE6DC" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontStyle: "italic", color: "#2D2D2D", lineHeight: 1.5, margin: "0 0 14px" }}>{BODY_DOUBLING.whatToExpect}</p>
              <a href={BODY_DOUBLING.link} target="_blank" rel="noopener noreferrer" style={{ ...styles.zoomBtn, background: era.color }}>Join the Room →</a>
              <p style={{ fontSize: 11, color: "#6B6B6B", fontStyle: "italic", textAlign: "center", margin: "10px 0 0" }}>you don't have to talk. you can just exist alongside.</p>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionLabel}>today's check-in</p>
        {checkedInToday ? (
          <div style={styles.checkedInCard}>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 17, margin: 0, color: "#2D2D2D" }}>you checked in today.</p>
            <p style={{ fontSize: 13, color: "#6B6B6B", margin: "6px 0 0" }}>that counts. come back tomorrow if you want.</p>
          </div>
        ) : (
          <div>
            <p style={styles.checkInQ}>where are you starting from today, honestly?</p>
            <div style={styles.moodGrid}>
              {["barely here", "tender", "okay", "steady", "good"].map((m) => (
                <button key={m} onClick={() => handleCheckIn(m)} style={{ ...styles.moodBtn, borderColor: era.color }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = `${era.color}15`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <button onClick={() => setTab("chat")} style={{ ...styles.bigBtn, background: era.color }}>
          <Sparkles size={16} />
          <span>talk to the companion</span>
        </button>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionLabel}>switch era</p>
        <div style={styles.eraScroller}>
          {ERAS.map((e) => (
            <button key={e.id} onClick={() => { setEraId(e.id); setWeekInEra(1); }}
              style={{ ...styles.eraChip, background: e.id === eraId ? e.color : "transparent", color: e.id === eraId ? "#fff" : "#2D2D2D", borderColor: e.color }}>
              {e.emoji} {e.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatView({ era, weekInEra }) {
  const weekData = ERA_WEEKS[era.name]?.[weekInEra - 1];
  const [messages, setMessages] = useState([
    { role: "assistant", content: "hi. you don't have to have a reason for coming here. what's on your mind, or what's the loudest thing right now?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    if (detectCrisis(userMsg)) setShowCrisisBanner(true);
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map((m) => ({ role: m.role, content: m.content }));
      const contextNote = weekData
        ? `\n\nCURRENT CONTEXT: The person is in the ${era.name} era ${era.emoji}, week ${weekInEra} of 5. This week's theme is "${weekData.theme}." Keywords: ${weekData.keywords}. The era's mantra for this week: "${weekData.reframe}". Use this gently if it fits what they're sharing, never force it. Don't lecture them about the theme. Just let it inform how you reflect things back.`
        : `\n\nCURRENT CONTEXT: The person is currently in the ${era.name} era. Themes: ${era.themes}.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT + contextNote, messages: apiMessages }),
      });
      const data = await response.json();
      const reply = data.content?.find((c) => c.type === "text")?.text || "i'm here. say it again when you're ready.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "something glitched on my end. i'm still here though, try again in a sec." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ ...styles.avatar, background: era.color }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>iO</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, fontStyle: "italic", color: "#3A2E4A", letterSpacing: "-0.01em" }}>ioSwiftie</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B" }}>{era.emoji} {era.name} · week {weekInEra} · peer support</p>
          </div>
        </div>
      </div>

      {showCrisisBanner && <CrisisBanner onClose={() => setShowCrisisBanner(false)} />}

      <div ref={scrollRef} style={styles.chatScroll}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
            <div style={{ ...styles.bubble, background: m.role === "user" ? era.color : "#FFFFFF", color: m.role === "user" ? "#fff" : "#2D2D2D",
              borderBottomRightRadius: m.role === "user" ? 4 : 18, borderBottomLeftRadius: m.role === "assistant" ? 4 : 18,
              border: m.role === "assistant" ? "1px solid #EDE6DC" : "none" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
            <div style={{ ...styles.bubble, background: "#FFFFFF", border: "1px solid #EDE6DC" }}>
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      <div style={styles.chatInputBar}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="say anything. or nothing." style={styles.chatInput} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ ...styles.sendBtn, background: era.color, opacity: loading || !input.trim() ? 0.4 : 1 }}>
          <Send size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}

function CrisisBanner({ onClose }) {
  return (
    <div style={styles.crisisBanner}>
      <AlertCircle size={18} color="#fff" style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#fff" }}>you deserve real support right now.</p>
        <p style={{ margin: "4px 0 8px", fontSize: 12, color: "#fff", opacity: 0.95 }}>this companion is peer support, not crisis care.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#fff" }}>
          <a href="tel:988" style={styles.crisisLink}>988, Suicide & Crisis Lifeline</a>
          <a href="sms:741741?body=HOME" style={styles.crisisLink}>Text HOME to 741741</a>
          <a href="tel:911" style={styles.crisisLink}>911, medical emergency</a>
        </div>
      </div>
      <button onClick={onClose} style={styles.crisisClose}><X size={14} color="#fff" /></button>
    </div>
  );
}

function PromptsView({ era, eraId, setEraId, weekInEra }) {
  const weekData = ERA_WEEKS[era.name]?.[weekInEra - 1];
  const weekKey = `${era.name}-${weekInEra}`;
  const prompts = WEEK_PROMPTS[weekKey] || [];
  const dayLabels = ["Monday · Reflection", "Wednesday · Relapse Prevention", "Thursday · Check-In", "Sunday · Gratitude"];
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState("");

  return (
    <div style={{ padding: "20px 22px 100px" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={styles.greeting}>{era.emoji} {era.name}</p>
        <p style={{ ...styles.greetingSub, color: era.color }}>{era.subtitle}</p>
        {weekData && (
          <div style={{ marginTop: 14, padding: "12px 14px", background: `${era.color}12`, borderRadius: 10, borderLeft: `2px solid ${era.color}` }}>
            <p style={{ ...styles.eraLabel, color: era.color, margin: 0 }}>week {weekInEra}</p>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, margin: "2px 0 4px" }}>{weekData.theme}</p>
            <p style={{ fontSize: 12, color: "#6B6B6B", fontStyle: "italic", margin: 0, lineHeight: 1.4 }}>"{weekData.reframe}"</p>
          </div>
        )}
      </div>

      <p style={styles.sectionLabel}>this week's prompts</p>
      <p style={{ fontSize: 13, color: "#6B6B6B", marginTop: -4, marginBottom: 16 }}>
        one for each rhythm of the week. take what you need.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {prompts.map((p, i) => (
          <button key={i} onClick={() => setSelected(p)}
            style={{ ...styles.promptCard, borderLeft: `3px solid ${era.color}`, background: selected === p ? `${era.color}10` : "#fff" }}>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: era.color, margin: "0 0 6px", fontWeight: 600, fontFamily: "'Inter', sans-serif", fontStyle: "normal" }}>
              {dayLabels[i]}
            </p>
            <span>{p}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: 20 }}>
          <p style={styles.sectionLabel}>your response</p>
          <textarea value={response} onChange={(e) => setResponse(e.target.value)}
            placeholder="write as much or as little as you want. just for you."
            style={{ ...styles.textarea, borderColor: era.color }} rows={6} />
        </div>
      )}
    </div>
  );
}

function ProgressView({ era, eraId, weekInEra, streak, checkIns }) {
  useEffect(() => {
    if (document.getElementById("vinyl-pulse-css")) return;
    const style = document.createElement("style");
    style.id = "vinyl-pulse-css";
    style.textContent = `
      @keyframes vinylPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.03); opacity: 0.92; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{ padding: "20px 22px 100px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {ERAS.map((e, i) => {
          const isCurrent = i === eraId;
          const isPast = i < eraId;
          const isFuture = i > eraId;
          const isLast = i === ERAS.length - 1;
          const vinylSize = isCurrent ? 96 : 72;
          const opacity = isFuture ? 0.35 : 1;
          const fillColor = isFuture ? "#D4CFC4" : e.color;

          return (
            <div key={e.id} style={{ position: "relative" }}>
              {!isLast && (
                <div style={{ position: "absolute", left: isCurrent ? 47 : 35, top: vinylSize + 8, width: 2, height: 44, background: isFuture ? "#EDE6DC" : `linear-gradient(180deg, ${e.color}80, ${ERAS[i + 1].color}80)`, zIndex: 0 }} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "12px 0", position: "relative", zIndex: 1 }}>
                <div style={{ width: vinylSize, height: vinylSize, flexShrink: 0, opacity, animation: isCurrent ? "vinylPulse 3s ease-in-out infinite" : "none", filter: isCurrent ? `drop-shadow(0 4px 16px ${e.color}55)` : "none", transition: "all 0.3s ease" }}>
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <circle cx="50" cy="50" r="49" fill={fillColor} />
                    {[46, 42, 38, 34, 30, 26, 22, 18].map((r) => (
                      <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={isFuture ? "#B8B3A6" : "rgba(0,0,0,0.15)"} strokeWidth="0.5" />
                    ))}
                    <circle cx="50" cy="50" r="14" fill={isFuture ? "#EDE6DC" : "#FAF6F0"} />
                    <circle cx="50" cy="50" r="2" fill={isFuture ? "#B8B3A6" : "#2D2D2D"} />
                  </svg>
                </div>
                <div style={{ flex: 1, opacity: isFuture ? 0.55 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: isCurrent ? 22 : 17, fontWeight: isCurrent ? 600 : 500, color: "#2D2D2D", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                      {e.emoji} {e.name}
                    </p>
                    {isPast && (
                      <span style={{ fontSize: 11, color: e.color, fontWeight: 600, background: `${e.color}18`, padding: "2px 8px",

function TabBar({ tab, setTab, eraColor }) {
  const tabs = [
    { id: "home", label: "today", icon: Home },
    { id: "chat", label: "talk", icon: Sparkles },
    { id: "prompts", label: "reflect", icon: BookOpen },
    { id: "progress", label: "steps", icon: Heart },
  ];

  return (
    <div style={styles.tabBar}>
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ ...styles.tabBtn, color: active ? eraColor : "#9B9B9B" }}>
            <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
            <span style={{ fontSize: 10, marginTop: 3, fontWeight: active ? 600 : 400 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; }
  @keyframes pulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
  @keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(20px, -30px) scale(1.05); } 66% { transform: translate(-15px, 20px) scale(0.95); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .welcome-fade-1 { opacity: 0; animation: fadeUp 0.8s ease-out 0.1s forwards; }
  .welcome-fade-2 { opacity: 0; animation: fadeUp 0.8s ease-out 0.5s forwards; }
  .welcome-fade-3 { opacity: 0; animation: fadeUp 0.8s ease-out 1.0s forwards; }
  .welcome-fade-4 { opacity: 0; animation: fadeUp 0.8s ease-out 1.5s forwards; }
  .typing-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #2D2D2D; margin: 0 2px; animation: pulse 1.4s infinite ease-in-out; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  input:focus, textarea:focus, button:focus { outline: none; }
  ::-webkit-scrollbar { width: 0; background: transparent; }
`;

const styles = {
  appShell: { minHeight: "100vh", background: "#FAF6F0", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" },
  screen: { width: "100%", minHeight: "100vh", background: "#FAF6F0", display: "flex", flexDirection: "column", position: "relative" },
  content: { flex: 1, overflowY: "auto", overflowX: "hidden", minHeight: 0 },
  greeting: { fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, color: "#2D2D2D", margin: 0, letterSpacing: "-0.02em" },
  homeBrandHeader: { display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4, paddingBottom: 22, gap: 4 },
  homeBrandLogo: { width: 56, height: 56, objectFit: "contain", borderRadius: "50%", boxShadow: "0 3px 14px rgba(123, 91, 168, 0.15)", marginBottom: 8 },
  homeBrandWordmark: { fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: "#3A2E4A", margin: 0, letterSpacing: "-0.015em" },
  homeBrandBy: { fontFamily: "'Fraunces', serif", fontSize: 9, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9B8FAB", margin: "2px 0 0" },
  greetingSub: { fontFamily: "'Fraunces', serif", fontSize: 16, fontStyle: "italic", color: "#6B6B6B", margin: "2px 0 0" },
  eraCard: { padding: "18px 18px 16px", borderRadius: 14, cursor: "pointer", transition: "transform 0.15s" },
  eraLabel: { fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6B6B6B", margin: 0, fontWeight: 500 },
  eraName: { fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500, color: "#2D2D2D", margin: "4px 0 2px", letterSpacing: "-0.01em" },
  eraSub: { fontSize: 13, color: "#2D2D2D", margin: 0, fontStyle: "italic", fontFamily: "'Fraunces', serif" },
  section: { marginTop: 24 },
  sectionLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6B6B6B", margin: "0 0 10px", fontWeight: 600 },
  meetingCard: { background: "#fff", border: "1px solid #EDE6DC", borderRadius: 12, padding: "14px 16px" },
  meetingDay: { fontSize: 11, color: "#6B6B6B", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" },
  meetingName: { fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500, color: "#2D2D2D", margin: "2px 0" },
  meetingDesc: { fontSize: 12, color: "#6B6B6B", margin: 0, fontStyle: "italic" },
  meetingBtn: { background: "#2D2D2D", color: "#fff", border: "none", borderRadius: 16, padding: "8px 16px", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 },
  zoomBtn: { display: "block", width: "100%", padding: "13px 16px", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "center", textDecoration: "none", letterSpacing: "0.01em", boxSizing: "border-box" },
  checkInQ: { fontFamily: "'Fraunces', serif", fontSize: 16, fontStyle: "italic", color: "#2D2D2D", margin: "0 0 12px", lineHeight: 1.4 },
  moodGrid: { display: "flex", gap: 8, flexWrap: "wrap" },
  moodBtn: { padding: "8px 14px", border: "1px solid", borderRadius: 18, background: "transparent", fontSize: 13, color: "#2D2D2D", cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" },
  checkedInCard: { background: "#fff", border: "1px solid #EDE6DC", borderRadius: 12, padding: "16px 18px" },
  bigBtn: { width: "100%", padding: "16px 18px", border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  eraScroller: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 },
  eraChip: { flexShrink: 0, padding: "6px 12px", border: "1px solid", borderRadius: 14, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 },
  chatContainer: { height: "calc(100dvh - 78px)", display: "flex", flexDirection: "column" },
  chatHeader: { padding: "12px 22px 14px", borderBottom: "1px solid #EDE6DC", background: "#FAF6F0", flexShrink: 0 },
  avatar: { width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  chatScroll: { flex: 1, overflowY: "auto", padding: "16px 18px" },
  bubble: { maxWidth: "78%", padding: "10px 14px", borderRadius: 18, fontSize: 14, lineHeight: 1.45, wordBreak: "break-word" },
  chatInputBar: { padding: "10px 14px 14px", background: "#FAF6F0", borderTop: "1px solid #EDE6DC", display: "flex", gap: 8, flexShrink: 0 },
  chatInput: { flex: 1, padding: "12px 16px", border: "1px solid #EDE6DC", borderRadius: 22, background: "#fff", fontSize: 14, fontFamily: "inherit" },
  sendBtn: { width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.15s" },
  crisisBanner: { margin: "10px 14px", padding: "12px 14px", background: "#C8434C", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" },
  crisisLink: { color: "#fff", textDecoration: "underline", fontWeight: 500 },
  crisisClose: { background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  promptCard: { padding: "14px 16px", background: "#fff", border: "1px solid #EDE6DC", borderRadius: 12, fontFamily: "'Fraunces', serif", fontSize: 15, fontStyle: "italic", color: "#2D2D2D", cursor: "pointer", textAlign: "left", lineHeight: 1.4, transition: "background 0.15s" },
  textarea: { width: "100%", padding: "14px 16px", border: "1px solid", borderRadius: 12, background: "#fff", fontSize: 14, fontFamily: "inherit", resize: "vertical", lineHeight: 1.5 },
  statCard: { padding: "20px 22px", borderRadius: 14 },
  statLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6B6B6B", margin: 0, fontWeight: 600 },
  statBig: { fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 500, margin: "4px 0 0", letterSpacing: "-0.03em" },
  tabBar: { height: 78, padding: "8px 14px 22px", background: "rgba(250,246,240,0.96)", borderTop: "1px solid #EDE6DC", display: "flex", justifyContent: "space-around", alignItems: "flex-start", backdropFilter: "blur(10px)", flexShrink: 0 },
  tabBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "inherit", padding: "6px 12px", transition: "color 0.15s" },
};
