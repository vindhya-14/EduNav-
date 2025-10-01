import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Heart,
  Sparkles,
  Compass,
  ChevronRight,
  BarChart2,
  Brain,
  Map,
  Cpu,
  BarChart3,
  Lightbulb,
  GitBranch,
  Clock,
  Target,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <Brain className="h-10 w-10" />,
      title: "AI-Powered Matching",
      description:
        "Our AI analyzes your unique profile against thousands of career paths to find your perfect match.",
      gradient: "from-blue-500 to-blue-700",
      hoverGradient: "from-blue-600 to-blue-800",
    },
    {
      icon: <Map className="h-10 w-10" />,
      title: "Personalized Roadmaps",
      description:
        "Get step-by-step guidance on education requirements, skill development, and milestones.",
      gradient: "from-purple-500 to-purple-700",
      hoverGradient: "from-purple-600 to-purple-800",
    },
    {
      icon: <Cpu className="h-10 w-10" />,
      title: "Skills Gap Analysis",
      description:
        "Identify the exact skills you need and receive curated learning resources to bridge the gaps.",
      gradient: "from-teal-500 to-teal-700",
      hoverGradient: "from-teal-600 to-teal-800",
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Future-Proof Analytics",
      description:
        "Stay informed with data on job market trends, automation risks, and future demand.",
      gradient: "from-indigo-500 to-indigo-700",
      hoverGradient: "from-indigo-600 to-indigo-800",
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Value-Based Matching",
      description:
        "We match careers not just to skills but also to your core values and interests.",
      gradient: "from-amber-500 to-amber-700",
      hoverGradient: "from-amber-600 to-amber-800",
    },
    {
      icon: <GitBranch className="h-10 w-10" />,
      title: "Alternative Pathways",
      description:
        "Discover multiple routes to your dream career, including non-traditional education.",
      gradient: "from-green-500 to-green-700",
      hoverGradient: "from-green-600 to-green-800",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full mb-16"
        >
          <Card className="bg-gradient-to-r from-slate-800/90 via-blue-800/90 to-purple-800/90 backdrop-blur-lg text-white border-0 shadow-2xl relative min-h-[400px] flex flex-col justify-center overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20"></div>

            <CardHeader className="text-center relative z-10 pt-12">
              <motion.div
                className="flex justify-center mb-6"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg"></div>
                  <Compass className="h-20 w-20 text-white relative z-10" />
                  <Sparkles className="h-8 w-8 absolute -top-2 -right-2 text-yellow-300 z-20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CardTitle className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  EduNav
                </CardTitle>
                <p className="text-xl md:text-2xl opacity-90 mt-2 font-light">
                  Your AI-Powered Career Navigator 🚀
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="text-center relative z-10 pb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Discover your perfect career path with our intelligent platform
                that combines artificial intelligence with expert guidance. Get
                personalized recommendations, skill roadmaps, and market
                insights tailored to your unique talents and aspirations.
              </motion.p>
            </CardContent>

            {/* Floating elements */}
            <motion.div
              className="absolute top-10 left-10 text-yellow-300"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Star className="h-6 w-6" />
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-10 text-green-300"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <Zap className="h-6 w-6" />
            </motion.div>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <Card
                className={`bg-gradient-to-br ${feature.gradient} text-white shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 group relative overflow-hidden min-h-[250px] flex flex-col justify-center`}
              >
                {/* Hover effect overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <CardHeader className="text-center relative z-10">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full"
        >
          <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white border-0 shadow-2xl relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]"></div>
            </div>

            <CardContent className="text-center py-16 px-6 relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <Sparkles className="h-12 w-12 text-yellow-300" />
                  <motion.div
                    className="absolute inset-0 bg-yellow-300 rounded-full blur-lg"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <h3 className="text-3xl font-bold mb-4">
                Ready to Transform Your Career?
              </h3>
              <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Take the RIASEC quiz and unlock a personalized roadmap to your
                dream career. Join thousands who've found their perfect path
                with EduNav.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link to="/quiz">
                  <Button
                    size="lg"
                    className="text-blue-700 hover:bg-blue-50 font-bold text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center group"
                  >
                    <Target className="mr-3 h-5 w-5" />
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <div className="mt-8 text-sm opacity-90 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-8">
                <p className="flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2" />
                  10–15 minute assessment
                </p>
                <p className="flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Personalized recommendations
                </p>
                <p className="flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Live market insights
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>


      </div>
    </div>
  );
};

export default Home;
