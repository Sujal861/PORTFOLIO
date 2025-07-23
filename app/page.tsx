"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  BotIcon as Robot,
  Code,
  Cpu,
  Zap,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Send,
  Download,
  Eye,
  Wrench,
  Brain,
  Monitor,
  Users,
  Award,
  FileText,
  Calendar,
  Building,
  CheckCircle,
  Star,
  Trophy,
  GraduationCap,
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster" // Import Toaster
import { useToast } from "@/hooks/use-toast" // Import useToast
import { ThemeToggle } from "@/components/theme-toggle" // Import ThemeToggle

export default function RoboticPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0) // New state for download progress
  const { toast } = useToast() // Initialize useToast

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "certifications", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("change", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleDownloadResume = async () => {
    setIsDownloading(true)
    setDownloadProgress(0) // Reset progress at the start

    try {
      const response = await fetch("/resume/Sujal_Gupta_Resume.pdf")
      if (!response.ok) {
        // Log the status and statusText for debugging
        console.error(`Failed to fetch resume: ${response.status} ${response.statusText}`)
        toast({
          title: "Download Failed",
          description: `Could not download resume. Server responded with status: ${response.status}`,
          variant: "destructive",
        })
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentLength = response.headers.get("Content-Length")
      const total = contentLength ? Number.parseInt(contentLength, 10) : 0
      let loaded = 0

      const reader = response.body?.getReader()
      if (!reader) {
        toast({
          title: "Download Failed",
          description: "Failed to read download stream.",
          variant: "destructive",
        })
        throw new Error("Failed to get readable stream reader.")
      }

      const chunks: Uint8Array[] = []
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        chunks.push(value)
        loaded += value.length
        if (total > 0) {
          setDownloadProgress(Math.round((loaded / total) * 100))
        }
      }

      const blob = new Blob(chunks, { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "Sujal_Gupta_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url) // Clean up the object URL

      toast({
        title: "Download Complete",
        description: "Your resume has been downloaded successfully!",
      })

      // Add a small delay for user feedback
      setTimeout(() => {
        setIsDownloading(false)
        setDownloadProgress(0) // Reset progress after successful download
      }, 1500)
    } catch (error) {
      console.error("Download failed:", error)
      // Only show a generic error toast if a more specific one wasn't already shown
      if (!error.message.includes("HTTP error!") && !error.message.includes("readable stream reader")) {
        toast({
          title: "Download Failed",
          description: "An unexpected error occurred during download.",
          variant: "destructive",
        })
      }
      setIsDownloading(false)
      setDownloadProgress(0) // Reset progress on error
    }
  }

  const projects = [
    {
      title: "R C Robot (Kalabhairav)",
      description:
        "Designed and built a remote-controlled robotic system, integrating advanced mechanical and electronic components. Led team presentation at university technical symposiums.",
      tech: ["Arduino", "Mechanical Design", "Electronics", "C++"],
      icon: <Robot className="w-6 h-6" />,
    },
    {
      title: "Smart Monitoring System",
      description:
        "Developed an IoT-based monitoring solution using Arduino for real-time data collection and environmental analysis with wireless connectivity.",
      tech: ["Arduino", "IoT", "Python", "Sensors"],
      icon: <Monitor className="w-6 h-6" />,
    },
    {
      title: "The Best AI Mentor",
      description:
        "AI-powered wearable application that listens continuously and provides real-time personalized advice via in-app notifications using generative AI techniques.",
      tech: ["TypeScript", "AI/ML", "Mobile Dev", "Generative AI"],
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Hiring AI Platform",
      description:
        "Collaborated on an AI-driven recruitment platform to optimize candidate selection processes with automated resume screening and ML algorithms.",
      tech: ["Machine Learning", "Frontend", "Backend", "AI"],
      icon: <Users className="w-6 h-6" />,
    },
  ]

  const skills = [
    { name: "Python", level: 90, icon: <Code className="w-5 h-5" /> },
    { name: "C++", level: 85, icon: <Code className="w-5 h-5" /> },
    { name: "Robotic Perception", level: 88, icon: <Eye className="w-5 h-5" /> },
    { name: "Mechanical Design", level: 82, icon: <Wrench className="w-5 h-5" /> },
    { name: "Arduino", level: 90, icon: <Cpu className="w-5 h-5" /> },
    { name: "ROS", level: 75, icon: <Robot className="w-5 h-5" /> },
    { name: "Fusion 360", level: 80, icon: <Wrench className="w-5 h-5" /> },
    { name: "Electrical Engineering", level: 85, icon: <Zap className="w-5 h-5" /> },
  ]

  const certifications = [
    {
      name: "MoE's Innovation Ambassador (IA) Training",
      organization: "Ministry of Education, India",
      date: "2024",
      level: "Foundation, Reskilling, Advanced Levels",
      category: "Innovation & Leadership",
      icon: <Trophy className="w-6 h-6" />,
      description:
        "Comprehensive training program focusing on innovation methodologies and leadership in educational technology.",
    },
    {
      name: "Generative AI Model Development",
      organization: "Industry Certification",
      date: "2024",
      level: "Professional",
      category: "Artificial Intelligence",
      icon: <Brain className="w-6 h-6" />,
      description: "Advanced certification in developing and implementing generative AI models and applications.",
    },
    {
      name: "Mechanics and Control of Robotic Manipulator",
      organization: "Robotics Institute",
      date: "2024",
      level: "Advanced",
      category: "Robotics",
      icon: <Robot className="w-6 h-6" />,
      description: "Specialized training in robotic manipulator mechanics, kinematics, and control systems.",
    },
    {
      name: "Prompt Design in Vertex AI",
      organization: "Google Cloud",
      date: "2024",
      level: "Professional",
      category: "AI/ML",
      icon: <Code className="w-6 h-6" />,
      description: "Google Cloud certification focusing on effective prompt engineering and AI model optimization.",
    },
    {
      name: "Build Real World AI Applications with Gemini and Imagen",
      organization: "Google",
      date: "2024",
      level: "Professional",
      category: "AI Development",
      icon: <Zap className="w-6 h-6" />,
      description:
        "Hands-on certification for building production-ready AI applications using Google's Gemini and Imagen.",
    },
    {
      name: "Develop GenAI Apps with Gemini and Streamlit",
      organization: "Google",
      date: "2024",
      level: "Professional",
      category: "App Development",
      icon: <Monitor className="w-6 h-6" />,
      description: "Certification in developing generative AI applications using Gemini API and Streamlit framework.",
    },
    {
      name: "Comparative Analysis of Converter Techniques for Ripple Reduction",
      organization: "Zigma Medicare India",
      date: "2024",
      level: "Research",
      category: "Electrical Engineering",
      icon: <Cpu className="w-6 h-6" />,
      description: "Research-based certification focusing on power electronics and converter optimization techniques.",
    },
    {
      name: "Advanced Robotics Applications",
      organization: "Technical Institute",
      date: "2024",
      level: "Advanced",
      category: "Robotics",
      icon: <Wrench className="w-6 h-6" />,
      description: "Advanced certification covering cutting-edge robotics applications and implementation strategies.",
    },
    {
      name: "TCS iON Career Edge",
      organization: "Tata Consultancy Services",
      date: "2024",
      level: "Professional",
      category: "Career Development",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Professional development certification focusing on industry-ready skills and career advancement.",
    },
  ]

  const certificationCategories = [
    "All",
    "Artificial Intelligence",
    "Robotics",
    "AI/ML",
    "Innovation & Leadership",
    "Electrical Engineering",
    "Career Development",
  ]

  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredCertifications =
    selectedCategory === "All" ? certifications : certifications.filter((cert) => cert.category === selectedCategory)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white text-lg font-mono"
          >
            Initializing Systems...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-white/20 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <Robot className="w-8 h-8 text-white" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-jersey">
                SUJAL.GUPTA
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["hero", "about", "projects", "skills", "certifications", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {section === "hero" ? "Home" : section}
                </button>
              ))}

              {/* Resume Download Button in Navigation */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  className="bg-white text-black hover:bg-gray-200 border-0 transition-all duration-300"
                  size="sm"
                >
                  {isDownloading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Download className="w-4 h-4" />
                      </motion.div>
                      {downloadProgress > 0 ? `Downloading ${downloadProgress}%` : "Downloading..."}
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Resume
                    </>
                  )}
                </Button>
              </motion.div>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              <button className="ml-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900 border-t border-white/20"
            >
              <div className="px-4 py-2 space-y-2">
                {["hero", "about", "projects", "skills", "certifications", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left py-2 capitalize text-gray-300 hover:text-white transition-colors"
                  >
                    {section === "hero" ? "Home" : section}
                  </button>
                ))}
                <div className="pt-2 border-t border-white/20">
                  <Button
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                    className="w-full bg-white text-black hover:bg-gray-200"
                    size="sm"
                  >
                    {isDownloading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 mr-2"
                        >
                          <Download className="w-4 h-4" />
                        </motion.div>
                        {downloadProgress > 0 ? `Downloading ${downloadProgress}%` : "Downloading..."}
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Download Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Animated Robot Icon for Mobile */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-24 h-24 mx-auto lg:hidden mb-8 relative"
              >
                <div className="absolute inset-0 border-4 border-white/30 rounded-full" />
                <div className="absolute inset-2 border-2 border-white/50 rounded-full" />
                <Robot className="w-12 h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent robotic-name">
                  SUJAL GUPTA
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 font-mono"
              >
                {"<"} Robotics & AI Engineer {" />"}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Innovative engineering student specializing in robotics, AI, and autonomous systems. Passionate about
                building intelligent machines that shape the future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Profile Image with Enhanced Black Theme Effects */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 w-80 h-80 md:w-96 md:h-96 border-2 border-dashed border-white/30 rounded-full"
                />

                {/* Inner rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-4 w-72 h-72 md:w-88 md:h-88 border border-white/20 rounded-full"
                />

                {/* Glowing background circle */}
                <div className="absolute inset-8 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-white/10 to-gray-400/10 rounded-full blur-xl" />

                {/* Profile image container with enhanced black theme styling */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl"
                  style={{
                    boxShadow: "0 0 50px rgba(255, 255, 255, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    src="/images/sujal-profile.jpg"
                    alt="Sujal Gupta - Robotics & AI Engineer"
                    fill
                    className="object-cover object-center"
                    style={{
                      filter: "contrast(1.1) brightness(1.1) saturate(1.2)",
                    }}
                    priority
                    sizes="(max-width: 768px) 256px, 320px"
                  />

                  {/* Enhanced overlay for black theme integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-white/10 mix-blend-overlay" />
                </motion.div>

                {/* Floating tech icons around the image */}
                {[
                  { icon: <Robot className="w-6 h-6" />, position: "top-4 right-4", delay: 0 },
                  { icon: <Code className="w-5 h-5" />, position: "bottom-8 left-4", delay: 1 },
                  { icon: <Cpu className="w-5 h-5" />, position: "top-12 left-8", delay: 2 },
                  { icon: <Zap className="w-5 h-5" />, position: "bottom-4 right-8", delay: 3 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: item.delay,
                    }}
                    className={`absolute ${item.position} p-2 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">About Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-300 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-white/20 to-gray-400/20 rounded-full flex items-center justify-center">
                  <Robot className="w-32 h-32 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm an outgoing and innovative Robotics and AI engineering student with a strong foundation in robotics
                principles, mechanical design, and systems integration. Currently pursuing my Bachelor's degree at
                Bangalore Technological Institute.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Proficient in Python programming, Rust Programming, Robotic perception, and Electrical engineering
                concepts. I have hands-on experience in developing smart robotic systems and AI-driven projects.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-white/20">
                  <MapPin className="w-6 h-6 text-white mb-2" />
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">Bangalore, Karnataka</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-white/20">
                  <Award className="w-6 h-6 text-white mb-2" />
                  <p className="text-sm text-gray-400">Education</p>
                  <p className="text-white">B.E. Robotics & AI</p>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
                >
                  {isDownloading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Download className="w-4 h-4" />
                      </motion.div>
                      {downloadProgress > 0 ? `Downloading ${downloadProgress}%` : "Downloading..."}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore my latest robotics and AI projects that showcase innovation and technical expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gray-900/50 border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">{project.icon}</div>
                      <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-white/20 text-white border-white/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-200"
                        onClick={() =>
                          window.open(
                            "https://www.linkedin.com/in/sujalgupta352/details/projects/",
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                        aria-label={`View details for ${project.title} on LinkedIn`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 bg-transparent"
                        onClick={() => window.open("https://github.com/Sujal861", "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              My technical proficiencies spanning robotics, programming, and engineering disciplines
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">{skill.icon}</div>
                    <span className="text-lg font-semibold text-white">{skill.name}</span>
                  </div>
                  <span className="text-white font-mono">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Additional Expertise</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Machine Learning",
                "Computer Vision",
                "IoT Development",
                "3D Modeling",
                "Circuit Design",
                "Embedded Systems",
                "Data Analysis",
                "Project Management",
              ].map((expertise, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-white/20 to-gray-400/20 px-4 py-2 rounded-full border border-white/30"
                >
                  <span className="text-white">{expertise}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Certifications & Training
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional certifications and specialized training that validate my expertise in robotics, AI, and
              emerging technologies
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {certificationCategories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-white text-black shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/20"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Certifications Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCertifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-gray-900/50 border-white/20 hover:border-white/40 transition-all duration-300 h-full relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                          <div className="text-white group-hover:text-gray-200 transition-colors duration-300">
                            {cert.icon}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                            {cert.level}
                          </Badge>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </motion.div>
                        </div>
                      </div>

                      <CardTitle className="text-lg text-white mb-2 group-hover:text-gray-200 transition-colors duration-300">
                        {cert.name}
                      </CardTitle>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Building className="w-4 h-4 mr-2 text-white" />
                          {cert.organization}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-white" />
                          {cert.date}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="mb-4">
                        <Badge variant="outline" className="border-white/30 text-white bg-white/10 text-xs">
                          {cert.category}
                        </Badge>
                      </div>

                      <CardDescription className="text-gray-300 text-sm leading-relaxed">
                        {cert.description}
                      </CardDescription>

                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="mt-4 h-1 bg-gradient-to-r from-white to-gray-300 rounded-full"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Certification Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Total Certifications", value: certifications.length, icon: <Award className="w-6 h-6" /> },
              {
                label: "AI/ML Certifications",
                value: certifications.filter(
                  (c) => c.category.includes("AI") || c.category.includes("Artificial Intelligence"),
                ).length,
                icon: <Brain className="w-6 h-6" />,
              },
              {
                label: "Robotics Certifications",
                value: certifications.filter((c) => c.category === "Robotics").length,
                icon: <Robot className="w-6 h-6" />,
              },
              {
                label: "Professional Level",
                value: certifications.filter((c) => c.level === "Professional").length,
                icon: <Star className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 p-6 rounded-lg border border-white/20 text-center hover:border-white/40 transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to collaborate on innovative robotics projects? Let's connect and build the future together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gray-900/50 p-8 rounded-lg border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white">Sujalgupta352@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-white">+91 861-841-6816</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400">Location</p>
                      <p className="text-white">Bangalore, Karnataka</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://github.com/Sujal861"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/40"
                      aria-label="Visit Sujal's GitHub profile"
                    >
                      <Github className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://www.linkedin.com/in/sujalgupta352/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/40"
                      aria-label="Visit Sujal's LinkedIn profile"
                    >
                      <Linkedin className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors" />
                    </motion.a>
                  </div>
                  <p className="text-sm text-gray-400 mt-3">Follow my journey in robotics and AI development</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
                  <CardDescription className="text-gray-400">I'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <Input
                        placeholder="John"
                        className="bg-gray-800/50 border-white/30 text-white placeholder-gray-400 focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="bg-gray-800/50 border-white/30 text-white placeholder-gray-400 focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-gray-800/50 border-white/30 text-white placeholder-gray-400 focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <Input
                      placeholder="Project Collaboration"
                      className="bg-gray-800/50 border-white/30 text-white placeholder-gray-400 focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <Textarea
                      placeholder="Tell me about your project or inquiry..."
                      rows={5}
                      className="bg-gray-800/50 border-white/30 text-white placeholder-gray-400 focus:border-white resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-white text-black hover:bg-gray-200 py-3">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gray-900/30 rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Follow my latest projects and professional updates on GitHub and LinkedIn
              </p>
              <div className="flex justify-center space-x-6">
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/Sujal861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-white hover:to-gray-200 hover:text-black px-6 py-3 rounded-lg transition-all duration-300 border border-white/30 hover:border-white/40"
                  aria-label="Visit Sujal's GitHub profile"
                >
                  <Github className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  <span className="text-white group-hover:text-black font-medium transition-colors">GitHub</span>
                  <ExternalLink className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/sujalgupta352/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-white hover:to-gray-200 hover:text-black px-6 py-3 rounded-lg transition-all duration-300 border border-white/30 hover:border-white/40"
                  aria-label="Visit Sujal's LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  <span className="text-white group-hover:text-black font-medium transition-colors">LinkedIn</span>
                  <ExternalLink className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Robot className="w-6 h-6 text-white" />
              <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-jersey">
                SUJAL.GUPTA
              </span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 Sujal Gupta. Built with passion for robotics and innovation.
            </p>
          </div>
        </div>
      </footer>
      <Toaster /> {/* Toaster component for notifications */}
    </div>
  )
}
