export function calculatePercentage(score: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 0;
  return Math.round((score / totalQuestions) * 100);
}

export function isCorrectAnswer(selectedIndex: number, correctAnswer: number): boolean {
  return selectedIndex === correctAnswer;
}