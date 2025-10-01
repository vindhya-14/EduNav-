import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/Checkbox";
import { useNavigate } from "react-router-dom";
import { Progress } from "../ui/Progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Map Likert options to numeric values for backend
const likertMap = {
  strongly_disagree: 1,
  disagree: 2,
  neutral: 3,
  agree: 4,
  strongly_agree: 5,
};

// Likert options
const likertOptions = [
  { value: "strongly_disagree", label: "Strongly Disagree" },
  { value: "disagree", label: "Disagree" },
  { value: "neutral", label: "Neutral" },
  { value: "agree", label: "Agree" },
  { value: "strongly_agree", label: "Strongly Agree" },
];

// Initial answers: empty strings (no default selection)
const initialAnswers = Object.fromEntries(
  Array.from({ length: 30 }, (_, i) => [`q${i + 1}`, ""])
);

const questions = [
  {
    id: "q1",
    title: "Do you enjoy repairing or building things with tools?",
    subtitle: "Hands-on and practical activities.",
    encouragement: "Typical for Realistic types.",
  },
  {
    id: "q2",
    title: "Do you like working outdoors or in nature?",
    subtitle: "Think about gardening, farming, or fieldwork.",
    encouragement: "Linked to Realistic careers.",
  },
  {
    id: "q3",
    title: "Do you enjoy operating machines or equipment?",
    subtitle: "Mechanical or technical activities.",
    encouragement: "Relevant to Realistic skills.",
  },
  {
    id: "q4",
    title: "Do you prefer physical, hands-on activities over desk work?",
    subtitle: "Action over paperwork.",
    encouragement: "Realistic personality traits.",
  },
  {
    id: "q5",
    title: "Do you enjoy solving practical, real-world problems?",
    subtitle: "Everyday issues and solutions.",
    encouragement: "Strong Realistic indicator.",
  },
  {
    id: "q6",
    title: "Do you enjoy working with numbers, formulas, or data?",
    subtitle: "Mathematical and logical focus.",
    encouragement: "Investigative careers thrive here.",
  },
  {
    id: "q7",
    title: "Do you like exploring scientific ideas or theories?",
    subtitle: "Abstract and conceptual thinking.",
    encouragement: "Investigative personality trait.",
  },
  {
    id: "q8",
    title: "Do you prefer solving puzzles or logical problems?",
    subtitle: "Critical and analytical thinking.",
    encouragement: "Investigative skills apply here.",
  },
  {
    id: "q9",
    title: "Do you enjoy conducting experiments or research?",
    subtitle: "Science-driven curiosity.",
    encouragement: "Investigative careers excel here.",
  },
  {
    id: "q10",
    title: "Do you like analyzing problems to find detailed solutions?",
    subtitle: "Problem-solving and analysis.",
    encouragement: "Core Investigative strength.",
  },
  {
    id: "q11",
    title: "Do you enjoy painting, drawing, or other visual arts?",
    subtitle: "Creative and visual tasks.",
    encouragement: "Artistic careers shine here.",
  },
  {
    id: "q12",
    title: "Do you like writing stories, poems, or creative content?",
    subtitle: "Literary and creative writing.",
    encouragement: "Artistic type preference.",
  },
  {
    id: "q13",
    title: "Do you enjoy performing arts such as music, dance, or drama?",
    subtitle: "Creative expression.",
    encouragement: "Artistic RIASEC types fit here.",
  },
  {
    id: "q14",
    title:
      "Do you prefer expressing yourself creatively rather than following strict rules?",
    subtitle: "Freedom over routine.",
    encouragement: "Artistic mindset.",
  },
  {
    id: "q15",
    title: "Do you enjoy designing new things or innovative ideas?",
    subtitle: "Inventive and creative work.",
    encouragement: "Artistic strength.",
  },
  {
    id: "q16",
    title: "Do you enjoy helping people solve personal problems?",
    subtitle: "Supporting others.",
    encouragement: "Social careers thrive here.",
  },
  {
    id: "q17",
    title: "Do you like teaching, tutoring, or mentoring others?",
    subtitle: "Knowledge-sharing.",
    encouragement: "Social type fits here.",
  },
  {
    id: "q18",
    title: "Do you enjoy volunteering or community service?",
    subtitle: "Working for others' well-being.",
    encouragement: "Social indicator.",
  },
  {
    id: "q19",
    title: "Do you like working in teams and collaborating?",
    subtitle: "Teamwork and cooperation.",
    encouragement: "Social careers are team-driven.",
  },
  {
    id: "q20",
    title: "Do you feel satisfied when supporting or caring for others?",
    subtitle: "Helping-driven activities.",
    encouragement: "Key Social quality.",
  },
  {
    id: "q21",
    title: "Do you enjoy leading or persuading others?",
    subtitle: "Motivating and guiding people.",
    encouragement: "Enterprising careers align here.",
  },
  {
    id: "q22",
    title: "Do you like starting projects or businesses?",
    subtitle: "Entrepreneurial spirit.",
    encouragement: "Enterprising quality.",
  },
  {
    id: "q23",
    title: "Do you enjoy taking risks for potential rewards?",
    subtitle: "Risk-taking and ambition.",
    encouragement: "Enterprising strength.",
  },
  {
    id: "q24",
    title: "Do you like making decisions that influence others?",
    subtitle: "Leadership-driven thinking.",
    encouragement: "Enterprising careers need this.",
  },
  {
    id: "q25",
    title: "Do you prefer persuading or convincing people?",
    subtitle: "Negotiation and influence.",
    encouragement: "Enterprising type.",
  },
  {
    id: "q26",
    title: "Do you enjoy organizing schedules, files, or data?",
    subtitle: "Structured and detail-focused.",
    encouragement: "Conventional careers excel here.",
  },
  {
    id: "q27",
    title: "Do you prefer following rules and guidelines?",
    subtitle: "Order over flexibility.",
    encouragement: "Conventional type indicator.",
  },
  {
    id: "q28",
    title:
      "Do you like working with numbers in structured ways (e.g., accounting)?",
    subtitle: "Organized data tasks.",
    encouragement: "Conventional careers fit this.",
  },
  {
    id: "q29",
    title: "Do you enjoy tasks that require attention to detail?",
    subtitle: "Accuracy and precision.",
    encouragement: "Conventional strength.",
  },
  {
    id: "q30",
    title: "Do you prefer organizing or managing office records?",
    subtitle: "Clerical and administrative tasks.",
    encouragement: "Key Conventional trait.",
  },
].map((q) => ({ ...q, options: likertOptions }));

export default function Quiz() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
    else handleComplete();
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Convert answers to numeric for backend
      const numericAnswers = Object.fromEntries(
        Object.entries(answers).map(([key, val]) => [key, likertMap[val] || 3])
      );

      const res = await fetch("http://localhost:5000/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numericAnswers),
      });

      const data = await res.json();
      console.log("Backend returned:", data);
      setLoading(false);

      if (!res.ok) {
        console.error("Backend error:", data.error);
        return;
      }

      navigate("/result", { state: { result: data } });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const current = questions[currentQuestion];
  const selected = answers[current.id];
  const canProceed = selected !== "";
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-0 transition-all">
      <Card className="mb-6 shadow-lg border-2 border-purple-100 rounded-xl bg-white/90">
        <CardContent className="pt-5 flex justify-between">
          <span className="text-xs sm:text-sm font-medium text-purple-700 tracking-wide">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-xs sm:text-sm font-bold text-purple-700 tracking-wide">
            {Math.round(progress)}% Complete
          </span>
        </CardContent>
        <Progress value={progress} className="h-2 rounded bg-purple-100" />
      </Card>

      <Card className="shadow-xl border-2 border-purple-100 rounded-2xl bg-white/98 animate-fadein">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl pb-6">
          <CardTitle className="text-2xl font-bold text-center leading-tight">
            {current.title}
          </CardTitle>
          <p className="text-center text-lg font-medium opacity-90 mt-2">
            {current.subtitle}
          </p>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {current.encouragement && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-2 flex items-start rounded-lg shadow-sm">
              <p className="text-blue-700 italic text-base">
                {current.encouragement}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-2">
            {current.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-150 shadow-sm ${
                  selected === option.value
                    ? "bg-purple-50 border-purple-500"
                    : "border-slate-200 hover:bg-purple-50 hover:border-purple-300"
                }`}
                onClick={() => handleAnswerChange(current.id, option.value)}
              >
                <Checkbox checked={selected === option.value} readOnly />
                <span className="flex items-center gap-2 text-base sm:text-sm font-medium leading-none select-none flex-1">
                  {option.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed || loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center space-x-2 font-bold shadow-lg disabled:opacity-60 disabled:cursor-default"
            >
              <span>
                {currentQuestion === questions.length - 1
                  ? "Complete Quiz!"
                  : "Next Question"}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
