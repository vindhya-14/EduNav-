import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Sparkles, Home, ClipboardList } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/quiz", label: "Take Quiz", icon: ClipboardList },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white p-4 shadow-2xl border-b border-white/10 backdrop-blur-lg relative"
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <Compass className="h-8 w-8 text-white relative z-10" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 z-20" />
          </motion.div>
          <motion.h1
            className="font-extrabold text-2xl tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            EduNav
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`
                    relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 
                    flex items-center space-x-2 group
                    ${
                      isActive
                        ? "bg-white/20 text-white shadow-lg"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }
                    ${
                      item.label === "Take Quiz"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
                        : ""
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>

                  {/* Active indicator */}
                  {isActive && item.label !== "Take Quiz" && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 border-2 border-white/30 rounded-xl"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Special glow effect for Take Quiz button */}
                  {item.label === "Take Quiz" && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden flex flex-col space-y-1 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-slate-800/95 backdrop-blur-lg rounded-xl mt-2 border border-white/10"
      >
        <div className="p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-semibold
                  ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }
                  ${
                    item.label === "Take Quiz"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      : ""
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IconComponent className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
}
