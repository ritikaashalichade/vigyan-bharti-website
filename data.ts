// Dummy data for the mentor pages (students come from the shared store). Replace with real API calls later.
export const MENTOR = { sessions: 12 };

export const ASSIGNMENTS = [
  { id: 1, title: "Algebra worksheet 4", subject: "Maths", due: "Due tomorrow", marks: 20, desc: "Solve all 15 questions on linear equations. Show your working." },
  { id: 2, title: "Science project outline", subject: "Science", due: "Due in 3 days", marks: 10, desc: "Write a one-page outline for your chosen science project." },
  { id: 3, title: "Reading log – Week 6", subject: "English", due: "Due in 5 days", marks: 10, desc: "Summarise the chapters you read this week in 5–6 lines." },
  { id: 4, title: "Geometry quiz", subject: "Maths", due: "Due in 7 days", marks: 15, desc: "Online quiz on triangles and circles. Attempt all questions." },
];

export const SUBMISSIONS = [
  { id: 1, student: "Aarav Sharma", work: "Algebra worksheet 4", date: "Today", answer: "x = 4, y = 7 (full working attached)" },
  { id: 2, student: "Riya Patil", work: "Science project outline", date: "Yesterday", answer: "Project on solar-powered water heaters." },
  { id: 3, student: "Kabir Singh", work: "Reading log – Week 6", date: "2 days ago", answer: "Read chapters 4 and 5 of the class novel." },
];
