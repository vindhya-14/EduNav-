// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Star,
//   Trophy,
//   TrendingUp,
//   Brain,
//   Zap,
//   Sparkles,
//   Share2,
//   Download,
//   RotateCcw,
//   Home,
// } from "lucide-react";

// export default function ResultsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [copied, setCopied] = useState(false);

//   // Extract prediction object from state
//   const prediction = location.state?.result?.prediction;

//   useEffect(() => {
//     // Simulate loading for better UX
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   const normalize = (str) => str.trim();

//   const shareResults = async () => {
//     const shareText = `My career match: ${prediction.predicted_career}! Discover yours too!`;

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Career Prediction Results",
//           text: shareText,
//         });
//       } catch (error) {
//         console.log("Sharing cancelled");
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(shareText);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const downloadResults = () => {
//     const resultsText =
//       `Career Prediction Results\n\n` +
//       `Best Match: ${prediction.predicted_career}\n\n` +
//       `Top Recommendations:\n${prediction.top_careers
//         .map(
//           (career, idx) =>
//             `${idx + 1}. ${career} - ${(
//               (prediction.probabilities?.[normalize(career)] ?? 0) * 100
//             ).toFixed(1)}%`
//         )
//         .join("\n")}`;

//     const blob = new Blob([resultsText], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "career-prediction-results.txt";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   if (!prediction) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-2xl p-8">
//           <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//             <Zap className="w-10 h-10 text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             No Results Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             It seems there was an issue with your prediction. Please try again.
//           </p>
//           <Button
//             onClick={() => navigate("/")}
//             className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
//           >
//             <RotateCcw className="w-4 h-4 mr-2" />
//             Take Quiz Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <h3 className="text-xl font-semibold text-gray-700">
//             Analyzing your results...
//           </h3>
//           <p className="text-gray-500 mt-2">Preparing your career insights</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Header with Celebration */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="relative">
//               <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
//               <Trophy className="w-8 h-8 text-yellow-600 absolute -top-2 -right-2" />
//             </div>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Career Match Found!
//           </h1>
//           <p className="text-gray-600 mt-2 text-lg">
//             Based on your unique strengths and preferences
//           </p>
//         </div>

//         {/* Predicted Career - Main Result */}
//         <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 text-white transform hover:scale-[1.02] transition-all duration-300">
//           <CardHeader className="text-center pb-4">
//             <div className="flex justify-center mb-2">
//               <Star className="w-8 h-8 text-yellow-300 animate-bounce" />
//             </div>
//             <CardTitle className="text-2xl md:text-3xl font-bold">
//               Your Perfect Career Match
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center p-8">
//             <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-md">
//               <TrendingUp className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
//               <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
//                 {prediction.predicted_career}
//               </h2>
//               <div className="w-20 h-1 bg-yellow-300 mx-auto rounded-full"></div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Confidence Meter */}
//         <Card className="shadow-xl border-0 rounded-3xl bg-white">
//           <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-3xl">
//             <CardTitle className="text-xl font-bold text-center flex items-center justify-center">
//               <Brain className="w-5 h-5 mr-2" />
//               Prediction Confidence
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-gray-700 font-medium">
//                 Confidence Level
//               </span>
//               <span className="text-blue-600 font-bold text-lg">
//                 {(
//                   (prediction.probabilities?.[
//                     normalize(prediction.predicted_career)
//                   ] ?? 0) * 100
//                 ).toFixed(1)}
//                 %
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-4">
//               <div
//                 className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
//                 style={{
//                   width: `${
//                     (prediction.probabilities?.[
//                       normalize(prediction.predicted_career)
//                     ] ?? 0) * 100
//                   }%`,
//                 }}
//               ></div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Top Career Recommendations */}
//         {prediction.top_careers?.length > 0 && (
//           <Card className="shadow-xl border-0 rounded-3xl bg-white">
//             <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-3xl">
//               <CardTitle className="text-xl font-bold text-center flex items-center justify-center">
//                 <Trophy className="w-5 h-5 mr-2" />
//                 Top Career Recommendations
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6 space-y-4">
//               {prediction.top_careers.map((career, idx) => {
//                 const prob = prediction.probabilities
//                   ? prediction.probabilities[normalize(career)] ?? 0
//                   : 0;

//                 return (
//                   <div
//                     key={idx}
//                     className={`p-5 rounded-2xl transition-all duration-300 hover:shadow-md ${
//                       idx === 0
//                         ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 transform -translate-y-1"
//                         : idx === 1
//                         ? "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
//                         : idx === 2
//                         ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
//                         : "bg-gray-50 border border-gray-200"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4">
//                         <div
//                           className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
//                             idx === 0
//                               ? "bg-gradient-to-r from-green-500 to-emerald-500"
//                               : idx === 1
//                               ? "bg-gradient-to-r from-blue-500 to-cyan-500"
//                               : idx === 2
//                               ? "bg-gradient-to-r from-purple-500 to-pink-500"
//                               : "bg-gray-500"
//                           }`}
//                         >
//                           {idx + 1}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-bold text-gray-800">
//                             {career}
//                           </h3>
//                           <p className="text-gray-600 text-sm">
//                             Match score: {(prob * 100).toFixed(1)}%
//                           </p>
//                         </div>
//                       </div>
//                       <div
//                         className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                           prob > 0.8
//                             ? "bg-green-100 text-green-800"
//                             : prob > 0.6
//                             ? "bg-blue-100 text-blue-800"
//                             : prob > 0.4
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {prob > 0.8
//                           ? "Excellent"
//                           : prob > 0.6
//                           ? "Strong"
//                           : prob > 0.4
//                           ? "Good"
//                           : "Fair"}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
//           <Button
//             onClick={() => navigate("/")}
//             className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
//           >
//             <RotateCcw className="w-4 h-4 mr-2" />
//             Take Quiz Again
//           </Button>

//           <Button
//             onClick={shareResults}
//             variant="outline"
//             className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
//           >
//             <Share2 className="w-4 h-4 mr-2" />
//             {copied ? "Copied!" : "Share Results"}
//           </Button>

//           <Button
//             onClick={downloadResults}
//             variant="outline"
//             className="border-2 text-white border-green-500 text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
//           >
//             <Download className="w-4 h-4 mr-2 text-white" />
//             Download
//           </Button>
//         </div>

//         {/* Footer Note */}
//         <div className="text-center pt-8">
//           <p className="text-gray-500 text-sm">
//             💡 Remember, this is a starting point. Explore these careers further
//             to find your perfect fit!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  Rocket,
  BookOpen,
  Layout,
  FileText,
  ExternalLink,
  GraduationCap,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Target,
  Sparkles,
  Trophy,
  Brain,
  Users,
  Clock,
  RotateCcw,
  Share2,
  Download,
} from "lucide-react";
import { engineeringRoadmap } from "../data/roadmaps";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const prediction = location.state?.result?.prediction;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const normalize = (str) => str.trim();

  const shareResults = async () => {
    const shareText = `My career match: ${prediction.predicted_career}! Discover yours too!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Career Prediction Results",
          text: shareText,
        });
      } catch (error) {
        console.log("Sharing cancelled");
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadResults = () => {
    const resultsText =
      `Career Prediction Results\n\n` +
      `Best Match: ${prediction.predicted_career}\n\n` +
      `Top Recommendations:\n${prediction.top_careers
        .map(
          (career, idx) =>
            `${idx + 1}. ${career} - ${(
              (prediction.probabilities?.[normalize(career)] ?? 0) * 100
            ).toFixed(1)}%`
        )
        .join("\n")}`;

    const blob = new Blob([resultsText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "career-prediction-results.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!prediction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-2xl p-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Zap className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6">
            It seems there was an issue with your prediction. Please try again.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Quiz Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">
            Analyzing your results...
          </h3>
          <p className="text-gray-500 mt-2">Preparing your career insights</p>
        </div>
      </div>
    );
  }

  const isEngineering = true;

  // normalize(prediction.predicted_career) === "Engineering";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
              <Trophy className="w-8 h-8 text-yellow-600 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Career Match Found!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Based on your unique strengths and preferences
          </p>
        </div>

        {/* Predicted Career */}
        <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 text-white transform hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-2">
              <Star className="w-8 h-8 text-yellow-300 animate-bounce" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Your Perfect Career Match
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-md">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                {prediction.predicted_career}
              </h2>
              <div className="w-20 h-1 bg-yellow-300 mx-auto rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        {/* Confidence */}
        <Card className="shadow-xl border-0 rounded-3xl bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-3xl">
            <CardTitle className="text-xl font-bold text-center flex items-center justify-center">
              <Brain className="w-5 h-5 mr-2" />
              Prediction Confidence
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">
                Confidence Level
              </span>
              <span className="text-blue-600 font-bold text-lg">
                {(
                  (prediction.probabilities?.[
                    normalize(prediction.predicted_career)
                  ] ?? 0) * 100
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${
                    (prediction.probabilities?.[
                      normalize(prediction.predicted_career)
                    ] ?? 0) * 100
                  }%`,
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Top Career Recommendations */}
        {prediction.top_careers?.length > 0 && (
          <Card className="shadow-xl border-0 rounded-3xl bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-3xl">
              <CardTitle className="text-xl font-bold text-center flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2" />
                Top Career Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {prediction.top_careers.map((career, idx) => {
                const prob = prediction.probabilities?.[normalize(career)] ?? 0;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl transition-all duration-300 hover:shadow-md bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold bg-blue-500 text-white">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {career}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Match score: {(prob * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          prob > 0.8
                            ? "bg-green-100 text-green-800"
                            : prob > 0.6
                            ? "bg-blue-100 text-blue-800"
                            : prob > 0.4
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {prob > 0.8
                          ? "Excellent"
                          : prob > 0.6
                          ? "Strong"
                          : prob > 0.4
                          ? "Good"
                          : "Fair"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Engineering Roadmap */}
        {isEngineering && engineeringRoadmap && (
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-white to-gray-50/80 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white rounded-t-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center relative z-10 py-2">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Star className="w-6 h-6 text-yellow-300 fill-current" />
                </div>
                Engineering Career Roadmap
                <Rocket className="w-6 h-6 ml-3 text-yellow-300" />
              </CardTitle>
              <div className="text-center text-emerald-100 text-sm mt-2 relative z-10">
                Your pathway to engineering excellence
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Overview */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-xl font-bold mb-3 flex items-center text-emerald-800">
                  <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                  Overview
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {engineeringRoadmap.overview}
                </p>
              </div>

              {/* Streams */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                  <Layout className="w-5 h-5 mr-2 text-green-600" />
                  Career Streams
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {engineeringRoadmap.streams.map((stream, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:border-green-300 transition-colors duration-200 group"
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors"></div>
                        <span className="text-gray-700 font-medium group-hover:text-emerald-700 transition-colors">
                          {stream}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exams */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold mb-4 flex items-center text-blue-800">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Essential Exams & Entrance Tests
                </h3>
                <div className="space-y-4">
                  {engineeringRoadmap.essentialExams.map((exam, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 border border-blue-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-blue-700 text-lg flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <a
                            href={exam.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-900 hover:underline transition-colors"
                          >
                            {exam.name}
                          </a>
                        </strong>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                          {exam.frequency}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold text-gray-700">
                          Eligibility:
                        </span>{" "}
                        {exam.eligibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* High School Tips */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <h3 className="text-xl font-bold mb-4 flex items-center text-amber-800">
                  <GraduationCap className="w-5 h-5 mr-2 text-amber-600" />
                  High School Preparation Tips
                </h3>
                <div className="grid gap-3">
                  {engineeringRoadmap.highSchool.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start bg-white/80 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="bg-amber-100 text-amber-600 rounded-full p-1 mr-3 mt-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 flex-1">{tip}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-white rounded-lg p-4 border border-amber-200">
                  <h4 className="font-semibold text-amber-700 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Recommended Resources:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.khanacademy.org/science"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
                    >
                      Khan Academy
                    </a>
                    <a
                      href="https://www.coursera.org/courses?query=engineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
                    >
                      Coursera Engineering
                    </a>
                    <a
                      href="https://www.edx.org/learn/engineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
                    >
                      edX Engineering
                    </a>
                  </div>
                </div>
              </div>

              {/* Higher Education */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold mb-4 flex items-center text-purple-800">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Higher Education & Professional Development
                </h3>
                <div className="grid gap-3 mb-4">
                  {engineeringRoadmap.higherEducation.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start bg-white/80 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                        <Target className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 flex-1">{tip}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Professional Organizations:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.ieee.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                      IEEE
                    </a>
                    <a
                      href="https://www.asme.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                      ASME
                    </a>
                    <a
                      href="https://www.asee.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                      ASEE
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 rounded-b-3xl px-8 py-6 border-t border-gray-200">
              <div className="text-center w-full text-gray-600 text-sm">
                <p className="flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Start your engineering journey today! This roadmap is
                  regularly updated with the latest information.
                </p>
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Quiz Again
          </Button>

          <Button
            onClick={shareResults}
            variant="outline"
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Share Results"}
          </Button>

          <Button
            onClick={downloadResults}
            variant="outline"
            className="border-2 text-white border-green-500 text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            <Download className="w-4 h-4 mr-2 text-white" />
            Download
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-gray-500 text-sm">
            💡 Remember, this is a starting point. Explore these careers further
            to find your perfect fit!
          </p>
        </div>
      </div>
    </div>
  );
}
