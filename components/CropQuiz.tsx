"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";
import { submitQuizAttempt } from "@/app/actions/submitQuiz";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";
import { calculatePercentage, isCorrectAnswer } from "@/lib/quizScoring";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export function CropQuiz({
  cropId,
  questions,
}: {
  cropId: string;
  questions: Question[];
}) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleSelectAnswer(index: number) {
    if (showResult) return;
    setSelectedAnswer(index);
  }

  function handleSubmitAnswer() {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (isCorrectAnswer(selectedAnswer, currentQuestion.correctAnswer)) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      // `handleSubmitAnswer` already updated `score`, so we use `score` directly
      const finalScore = score;
      setQuizFinished(true);
      startTransition(async () => {
        try {
          await submitQuizAttempt(cropId, finalScore, questions.length);
          toast.success(t.toast.quizSubmitted);
        } catch (err) {
          toast.error(t.toast.signInToSaveQuiz);
        }
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }

  if (questions.length === 0) {
    return (
      <p className="text-gray-500">No quiz questions available for this crop yet.</p>
    );
  }

  if (quizFinished) {
    const finalScore = score;
    const percentage = calculatePercentage(finalScore, questions.length);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-700">
            {finalScore} / {questions.length}
          </p>
          <p className="text-gray-600 mb-4">{percentage}% correct</p>
          <Button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setQuizFinished(false);
            }}
            variant="outline"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-base">
            Question {currentIndex + 1} of {questions.length}
          </CardTitle>
        </div>
        <Progress value={((currentIndex + 1) / questions.length) * 100} />
      </CardHeader>
      <CardContent>
        <p className="font-medium mb-4">{currentQuestion.question}</p>

        <div className="space-y-2" role="radiogroup" aria-label="Answer options">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = isCorrectAnswer(index, currentQuestion.correctAnswer);

            let className =
              "w-full text-left px-4 py-3 rounded-md border transition-colors ";

            if (showResult) {
              if (isCorrect) {
                className += "border-green-600 bg-green-50 text-green-800";
              } else if (isSelected && !isCorrect) {
                className += "border-red-600 bg-red-50 text-red-800";
              } else {
                className += "border-gray-200 text-gray-500";
              }
            } else {
              className += isSelected
                ? "border-green-600 bg-green-50"
                : "border-gray-200 hover:border-gray-400";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Answer option: ${option}${
                  showResult && isCorrect ? " (correct answer)" : ""
                }${
                  showResult && isSelected && !isCorrect
                    ? " (your incorrect answer)"
                    : ""
                }`}
                className={
                  className +
                  " focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                }
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {!showResult ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={isPending}>
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}