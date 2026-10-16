import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  Briefcase,
  Layers,
  Compass,
  Info,
  PhoneCall,
  Users,
  Image as ImageIcon,
  FileText,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  Save,
  Upload,
  Download,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  X,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  Send,
  Building2,
  HardHat,
  Award,
  LogOut,
  Sliders,
  Globe,
  Database,
  Share2,
  Sun,
  Moon,
  Bell,
  Play,
  Film,
  History,
  Activity,
  AlertTriangle,
  AlertCircle,
  Search,
  Filter,
  Check,
  ShieldAlert,
} from "lucide-react";
import { BorderBeam } from "../components/ui/BorderBeam";
import { soundManager } from "../lib/sound";
import { useCMS } from "../context/CMSContext";
import { useTheme } from "../context/ThemeContext";

export const AdminPage = ({ onRouteChange }) => {
  const {
    adminUser,
    isAuthenticated,
    credentials,
    login,
    logout,
    updateCredentials,
    requestPasswordResetOTP,
    verifyOTPAndResetPassword,
    homeContent,
    setHomeContent,
    brandPartners,
    addBrandPartner,
    updateBrandPartner,
    deleteBrandPartner,
    auditLogs,
    logActivity,
    clearAuditLogs,
    exportAuditLogsCSV,
    services,
    addService,
    updateService,
    deleteService,
    projects,
    addProject,
    updateProject,
    deleteProject,
    interior,
    addInteriorSpace,
    updateInteriorSpace,
    deleteInteriorSpace,
    team,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    aboutContent,
    setAboutContent,
    contactContent,
    setContactContent,
    siteImages,
    addSiteImage,
    updateSiteImage,
    deleteSiteImage,
    siteVideos,
    addSiteVideo,
    updateSiteVideo,
    deleteSiteVideo,
    inquiries,
    addInquiry,
    markInquiriesAsRead,
    deleteInquiry,
    toggleInquiryStatus,
    exportInquiriesCSV,
    unreadInquiriesCount,
    news,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    processImageFile,
    exportDatabaseSQL,
  } = useCMS();

  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  // Active Menu in Dashboard
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Login Form State
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Rate Limiting & Brute-Force Lockout State (15-Minute Shield)
  const [failedAttempts, setFailedAttempts] = useState(() => {
    try {
      return parseInt(localStorage.getItem("infravision_failed_attempts") || "0", 10);
    } catch {
      return 0;
    }
  });

  const [lockoutUntil, setLockoutUntil] = useState(() => {
    try {
      const val = localStorage.getItem("infravision_lockout_until");
      return val ? parseInt(val, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Lockout countdown timer
  useEffect(() => {
    const checkLockout = () => {
      const now = Date.now();
      if (lockoutUntil > now) {
        setLockoutRemaining(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setLockoutRemaining(0);
        if (lockoutUntil !== 0) {
          setLockoutUntil(0);
          localStorage.removeItem("infravision_lockout_until");
        }
      }
    };
    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Forgot Password / Email OTP Recovery Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotConfirmPass, setForgotConfirmPass] = useState("");
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [otpDevHint, setOtpDevHint] = useState("");
  const [otpTimerSeconds, setOtpTimerSeconds] = useState(600);

  // OTP Countdown timer when on step 2
  useEffect(() => {
    let timer;
    if (showForgotModal && forgotStep === 2 && otpTimerSeconds > 0) {
      timer = setInterval(() => {
        setOtpTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showForgotModal, forgotStep, otpTimerSeconds]);

  // Success Toast notification
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    soundManager?.playSuccessChime?.();
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Login Handler with Brute-Force Rate Limiting
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    setIsSubmittingAuth(true);
    setAuthError("");

    try {
      const res = await login(usernameInput, passwordInput);
      if (!res.success) {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        localStorage.setItem("infravision_failed_attempts", nextAttempts.toString());

        if (nextAttempts >= 5) {
          const lockTime = Date.now() + 15 * 60 * 1000; // 15 minutes lockout
          setLockoutUntil(lockTime);
          localStorage.setItem("infravision_lockout_until", lockTime.toString());
          setAuthError("BRUTE-FORCE SHIELD ACTIVE: 5 failed attempts reached. Server access locked for 15 minutes.");
          logActivity?.("BRUTE_FORCE_LOCKOUT", "SECURITY", `Access locked for 15 minutes due to 5 consecutive failed login attempts on username "${usernameInput || 'unknown'}"`, "ALERT");
        } else {
          setAuthError(`${res.error || "Invalid username or passcode."} (${5 - nextAttempts} attempts remaining before 15-minute lock)`);
        }
        soundManager?.playHapticClick?.(350, 0.08);
      } else {
        setFailedAttempts(0);
        localStorage.removeItem("infravision_failed_attempts");
        localStorage.removeItem("infravision_lockout_until");
        setUsernameInput("");
        setPasswordInput("");
      }
    } catch {
      setAuthError("Authentication service unavailable. Please try again.");
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // Request OTP Handler
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotLoading(true);

    const res = await requestPasswordResetOTP(forgotEmail);
    setForgotLoading(false);

    if (res.success) {
      setForgotStep(2);
      setOtpTimerSeconds(600);
      setForgotSuccess(res.message);
      if (res.devOTP) setOtpDevHint(res.devOTP);
      logActivity?.("OTP_REQUESTED", "SECURITY", `Recovery OTP requested for email ${forgotEmail}`, "WARNING");
      triggerToast("6-Digit Recovery OTP Dispatched!");
    } else {
      setForgotError(res.error);
    }
  };

  // Verify OTP and Proceed to Step 3
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotOtp || forgotOtp.trim().length !== 6) {
      setForgotError("Please enter the complete 6-digit verification OTP code.");
      return;
    }
    setForgotStep(3);
  };

  // Reset Password Handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotError("");

    if (forgotNewPass.length < 6) {
      setForgotError("Passcode must be at least 6 characters long.");
      return;
    }

    if (forgotNewPass !== forgotConfirmPass) {
      setForgotError("Passcodes do not match. Please re-enter.");
      return;
    }

    setForgotLoading(true);
    const res = await verifyOTPAndResetPassword(forgotEmail, forgotOtp, forgotNewPass);
    setForgotLoading(false);

    if (res.success) {
      setForgotSuccess("Passcode successfully updated! You can now log in.");
      logActivity?.("PASSWORD_RESET_SUCCESS", "SECURITY", `Passcode reset completed via OTP verification for ${forgotEmail}`, "SUCCESS");
      triggerToast("Passcode Reset Successful!");
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotEmail("");
        setForgotOtp("");
        setForgotNewPass("");
        setForgotConfirmPass("");
        setForgotError("");
        setForgotSuccess("");
        setOtpDevHint("");
      }, 1200);
    } else {
      setForgotError(res.error);
    }
  };

  // ==========================================
  // SECTION 1: UNIQUE REAL ESTATE LOGIN PAGE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none bg-[#030816]">
        {/* Full-Page Real Estate Cover Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/drone/villa_completed_exterior.jpg"
            alt="INFRA VISION Luxury Real Estate"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.40] contrast-[1.18]"
          />
          {/* Futuristic Deep Obsidian Gradient Wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030816] via-[#06122E]/85 to-[#030816]/95 backdrop-blur-[2px]" />
          {/* CAD Blueprint Geometric Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Ambient Radial Spotlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/20 blur-[140px] rounded-full pointer-events-none" />
        </div>

        {/* Stylish Compact Architectural Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[400px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0F224D]/95 via-[#0A1838]/95 to-[#050D20]/98 border border-sky-400/40 ring-1 ring-sky-300/25 p-6 sm:p-7 shadow-2xl shadow-black/95 backdrop-blur-2xl text-white space-y-4.5"
        >
          {/* Animated Circulating Border Beam */}
          <BorderBeam size={200} duration={10} colorFrom="#FFFFFF" colorTo="#38BDF8" />

          {/* Top Brand Bar */}
          <div className="flex items-center justify-between border-b border-sky-400/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 shadow-md shadow-sky-500/30 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-sm font-extrabold tracking-wider text-white">
                INFRA<span className="text-sky-400">VISION</span>
              </span>
            </div>

            <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[8.5px] font-bold text-emerald-400 uppercase tracking-widest">
                PORTAL ACTIVE
              </span>
            </div>
          </div>

          {/* Clean Title & Subtitle */}
          <div className="text-center space-y-0.5 pt-0.5">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Login</span>
            </h2>
            <p className="text-xs text-slate-300/90 font-sans tracking-wide">
              Please login here
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            {/* Username Input */}
            <div className="space-y-1">
              <label className="block font-mono text-[10.5px] font-bold text-slate-300 uppercase tracking-wider">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username (e.g. admin)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#06112C] border border-sky-400/30 text-white placeholder-slate-500 text-xs font-mono focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 outline-none transition-all shadow-inner"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-[10.5px] font-bold text-slate-300 uppercase tracking-wider">
                  Security Passcode
                </label>
                <span className="font-mono text-[9.5px] text-slate-400">Encrypted Passcode</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#06112C] border border-sky-400/30 text-white placeholder-slate-500 text-xs font-mono focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 outline-none transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => {
                    soundManager?.playHapticClick?.(800, 0.02);
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                  title={showPassword ? "Hide Passcode" : "Show Passcode"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-sky-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400 hover:text-sky-400" />
                  )}
                </button>
              </div>

              {authError && (
                <p className="text-[10.5px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg px-2.5 py-1 mt-1">
                  {authError}
                </p>
              )}

              {/* Active Lockout Warning Banner */}
              {lockoutRemaining > 0 && (
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono text-[10px] flex items-center justify-between gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-rose-400 shrink-0 animate-pulse" />
                    <div>
                      <div className="font-bold text-rose-200">SECURITY LOCKOUT ACTIVE</div>
                      <p className="text-[9.5px] text-rose-300/90">
                        5 failed attempts. Retry in {Math.floor(lockoutRemaining / 60)}m {(lockoutRemaining % 60).toString().padStart(2, '0')}s.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("infravision_lockout_until");
                      localStorage.removeItem("infravision_failed_attempts");
                      setLockoutRemaining(0);
                      setFailedAttempts(0);
                      setAuthError("");
                    }}
                    className="px-2 py-1 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-[9px] font-bold uppercase transition-all cursor-pointer whitespace-nowrap"
                  >
                    Reset Lock
                  </button>
                </div>
              )}

              {/* Forgot Passcode Link */}
              <div className="pt-0.5 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setForgotStep(1);
                    setForgotError("");
                    setForgotSuccess("");
                  }}
                  className="font-mono text-[10.5px] text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Mail className="h-3 w-3 text-sky-400" />
                  <span>Forgot Passcode?</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmittingAuth || lockoutRemaining > 0}
                className={`w-full py-2.5 rounded-xl text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
                  lockoutRemaining > 0
                    ? "bg-slate-700/60 border border-slate-600/50 cursor-not-allowed text-slate-400"
                    : "bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 shadow-sky-500/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                }`}
              >
                {lockoutRemaining > 0 ? (
                  <>
                    <Lock className="h-3.5 w-3.5 text-rose-400" />
                    <span>Locked ({Math.floor(lockoutRemaining / 60)}:{(lockoutRemaining % 60).toString().padStart(2, '0')})</span>
                  </>
                ) : isSubmittingAuth ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-white" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5 text-white" />
                    <span>Login to Control Center</span>
                    <ArrowRight className="h-3.5 w-3.5 text-white ml-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Back to Live Website Link */}
          <div className="pt-2 border-t border-sky-400/15 flex items-center justify-between text-[10.5px] font-mono text-slate-400">
            <button
              onClick={() => {
                if (onRouteChange) onRouteChange("home");
              }}
              className="text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>← Back to Website</span>
            </button>
            <span className="text-[9.5px] text-slate-500 font-mono tracking-wider">ITLC INDIA &bull; 2026</span>
          </div>
        </motion.div>

        {/* 3-STEP EMAIL OTP PASSWORD RECOVERY MODAL */}
        <AnimatePresence>
          {showForgotModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-md rounded-[28px] bg-gradient-to-b from-[#0F224D] via-[#0A1838] to-[#050D20] border-2 border-sky-400/50 ring-1 ring-sky-300/30 p-6 sm:p-8 text-white space-y-5 shadow-2xl shadow-black relative font-mono"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wider uppercase text-white font-display">
                        Passcode Recovery
                      </h3>
                      <span className="text-[10px] text-sky-400 font-mono tracking-widest uppercase">
                        STEP {forgotStep} OF 3 &bull; EMAIL OTP ENGINE
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Status Messages */}
                {forgotError && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">
                    {forgotError}
                  </p>
                )}
                {forgotSuccess && (
                  <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2">
                    {forgotSuccess}
                  </p>
                )}
                {otpDevHint && (
                  <div className="text-[11px] text-sky-300 bg-sky-500/10 border border-sky-400/30 rounded-xl p-2.5 flex items-center justify-between">
                    <span>Dev Mode OTP Code:</span>
                    <span className="font-bold text-sky-400 text-sm tracking-widest">{otpDevHint}</span>
                  </div>
                )}

                {/* STEP 1: Enter Registered Email */}
                {forgotStep === 1 && (
                  <form onSubmit={handleRequestOTP} className="space-y-4">
                    <p className="text-xs text-slate-300 font-sans">
                      Enter the registered Administrator Recovery Email to receive a 6-digit verification code.
                    </p>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                        Recovery Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="e.g. contact@itlcindia.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#06112C] border border-sky-400/30 text-white placeholder-slate-500 text-xs focus:border-sky-400 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      {forgotLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-white" />
                          <span>Dispatching OTP...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-white" />
                          <span>Send 6-Digit OTP</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 2: Enter 6-Digit OTP */}
                {forgotStep === 2 && (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <p className="text-xs text-slate-300 font-sans">
                      We have sent a 6-digit code to <strong className="text-sky-300">{forgotEmail}</strong>. Please enter it below.
                    </p>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] font-bold text-slate-300 uppercase">
                          Enter 6-Digit Code
                        </label>
                        <span className="text-[10px] text-amber-400 font-mono">
                          Expires in {Math.floor(otpTimerSeconds / 60)}:{(otpTimerSeconds % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="w-full px-4 py-3 rounded-xl bg-[#06112C] border border-sky-400/30 text-white placeholder-slate-600 text-center text-xl font-bold tracking-[8px] focus:border-sky-400 outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <button
                        type="button"
                        onClick={handleRequestOTP}
                        disabled={forgotLoading || otpTimerSeconds > 540}
                        className="text-sky-400 hover:text-sky-300 underline cursor-pointer disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => setForgotStep(1)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        Change Email
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <CheckCircle2 className="h-4 w-4 text-white" />
                      <span>Verify Code & Proceed</span>
                    </button>
                  </form>
                )}

                {/* STEP 3: Set New Passcode */}
                {forgotStep === 3 && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <p className="text-xs text-slate-300 font-sans">
                      OTP verified! Create your new administrative passcode below.
                    </p>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                        New Passcode (Min 6 Characters)
                      </label>
                      <div className="relative">
                        <input
                          type={showForgotPass ? "text" : "password"}
                          required
                          value={forgotNewPass}
                          onChange={(e) => setForgotNewPass(e.target.value)}
                          placeholder="Enter new passcode"
                          className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#06112C] border border-sky-400/30 text-white placeholder-slate-500 text-xs focus:border-sky-400 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowForgotPass(!showForgotPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400 cursor-pointer"
                        >
                          {showForgotPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                        Confirm New Passcode
                      </label>
                      <input
                        type={showForgotPass ? "text" : "password"}
                        required
                        value={forgotConfirmPass}
                        onChange={(e) => setForgotConfirmPass(e.target.value)}
                        placeholder="Re-enter new passcode"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#06112C] border border-sky-400/30 text-white placeholder-slate-500 text-xs focus:border-sky-400 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      {forgotLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-white" />
                          <span>Updating Passcode...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-white" />
                          <span>Save Passcode & Authorize</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ==========================================
  // SECTION 2: ADMIN DASHBOARD (EXACT ARRANGEMENT)
  // ==========================================
  const sidebarMenuItems = [
    { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard },
    { id: "inquiries", label: "INQUIRIES", icon: Mail, badge: unreadInquiriesCount },
    { id: "home", label: "HOME", icon: Home },
    { id: "services", label: "SERVICES", icon: Briefcase },
    { id: "projects", label: "PROJECTS", icon: Building2 },
    { id: "interior", label: "INTERIOR", icon: Layers },
    { id: "about", label: "ABOUT", icon: Info },
    { id: "contact", label: "CONTACT", icon: PhoneCall },
    { id: "my-team", label: "MY TEAM", icon: Users },
    { id: "site-images", label: "SITE MEDIA", icon: ImageIcon },
    { id: "news", label: "NEWS & BLOGS", icon: FileText },
    { id: "audit-logs", label: "AUDIT LOGS", icon: History },
    { id: "security", label: "SECURITY & PROFILE", icon: Shield },
  ];

  return (
    <div className="min-h-screen pt-6 pb-16 px-3 sm:px-6 bg-[#F1F5F9] dark:bg-[#040A1A] bg-[radial-gradient(ellipse_at_top,#D8E8F8_0%,#EEF4FA_50%,#F8FAFC_100%)] dark:bg-[radial-gradient(ellipse_at_top,#0C1D45_0%,#040A1A_100%)] text-slate-800 dark:text-slate-100 font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-mono text-xs font-bold shadow-2xl shadow-emerald-500/30 border border-emerald-300/40 flex items-center gap-2.5"
          >
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1500px] mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-gradient-to-r dark:from-[#0F224D]/90 dark:via-[#0B1A3B]/90 dark:to-[#061026]/95 border-2 border-sky-400/50 ring-1 ring-sky-300/30 shadow-xl dark:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                  INFRA<span className="text-sky-500 dark:text-sky-400">VISION</span> CONTROL MATRIX
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 font-mono text-[9px] text-sky-600 dark:text-sky-300 font-bold">
                  v2026.1
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                Signed in as: <strong className="text-sky-600 dark:text-sky-300">{adminUser?.username || "SuperAdmin"}</strong> • Verified Session
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Live Website Button */}
            <button
              onClick={() => {
                if (onRouteChange) onRouteChange("home");
              }}
              className="px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border-2 border-sky-400/40 hover:border-sky-400 text-sky-600 dark:text-sky-300 hover:text-blue-700 dark:hover:text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>View Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  const nextState = !showNotifications;
                  setShowNotifications(nextState);
                  if (nextState && unreadInquiriesCount > 0) {
                    markInquiriesAsRead();
                  }
                }}
                className="relative h-9 w-9 rounded-full bg-slate-100 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/30 text-slate-700 dark:text-sky-300 hover:text-blue-600 dark:hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
                aria-label="Client Inquiries Notifications"
                title={unreadInquiriesCount > 0 ? `${unreadInquiriesCount} new client inquiries` : "0 new inquiries"}
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadInquiriesCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                    {unreadInquiriesCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 z-50 w-[330px] sm:w-[420px] rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400/50 ring-1 ring-sky-300/30 shadow-2xl p-4 sm:p-5 text-slate-900 dark:text-white space-y-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-sky-500" />
                        <span className="font-bold text-sm">Client Inquiries & Leads</span>
                      </div>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {inquiries.length === 0 ? (
                      <div className="py-8 text-center text-slate-500 dark:text-slate-400 font-sans text-xs">
                        No incoming client inquiries yet. Form submissions from Contact page or Consultation will appear here instantly!
                      </div>
                    ) : (
                      <div className="max-h-[360px] overflow-y-auto space-y-2.5 pr-1 font-sans">
                        {inquiries.map((inq) => (
                          <div
                            key={inq.id}
                            className={`p-3.5 rounded-2xl border transition-all ${
                              inq.status === "unread"
                                ? "bg-sky-50 dark:bg-sky-500/10 border-sky-400 ring-1 ring-sky-300/40"
                                : "bg-slate-50 dark:bg-[#040C20] border-slate-200 dark:border-sky-400/20"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{inq.name}</span>
                                <span className="block text-[11px] font-mono text-sky-600 dark:text-sky-400">
                                  {inq.type} • {inq.date}
                                </span>
                              </div>
                              <button
                                onClick={() => deleteInquiry(inq.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                                title="Delete inquiry"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed bg-white/70 dark:bg-black/20 p-2 rounded-xl">
                              "{inq.message}"
                            </p>

                            <div className="pt-2 mt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
                              <span className="text-slate-500 dark:text-slate-400">{inq.phone}</span>
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={`tel:${inq.phone.replace(/\s+/g, "")}`}
                                  className="px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 font-bold"
                                >
                                  Call
                                </a>
                                <a
                                  href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${inq.name}, thanking you for contacting INFRA VISION.`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-2 py-1 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 font-bold"
                                >
                                  WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Day / Night Theme Icon-Only Toggle */}
            <button
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full bg-slate-100 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/30 text-sky-600 dark:text-sky-300 hover:text-blue-700 dark:hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
              aria-label="Toggle Theme Mode"
              title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isDark ? (
                <Sun className="h-4.5 w-4.5 text-amber-400" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-sky-500 dark:text-sky-300" />
              )}
            </button>

            {/* Lock / Logout Session */}
            <button
              onClick={logout}
              className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border-2 border-rose-400/40 hover:border-rose-400 text-rose-500 dark:text-rose-300 hover:text-rose-600 dark:hover:text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* 2-Column Administrative Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Fixed Ordered Sidebar */}
          <div className="lg:col-span-3 p-4 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D]/95 dark:to-[#081432]/95 border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/30 shadow-xl dark:shadow-2xl space-y-2 sticky top-6 transition-colors">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 uppercase tracking-widest block font-bold px-3 py-1">
                ADMIN NAVIGATION MENU
              </span>

              {sidebarMenuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager?.playHapticClick?.(700, 0.02);
                      setActiveMenu(item.id);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30 border border-sky-300/50"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`h-4 w-4 ${isActive ? "text-white" : "text-sky-600 dark:text-sky-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-extrabold animate-pulse shadow-sm">
                        {item.badge} NEW
                      </span>
                    ) : (
                      <span className="text-[11px] opacity-75">↗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Dynamic Workspace */}
          <div className="lg:col-span-9 p-5 sm:p-8 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D]/90 via-[#0B1A3B]/95 dark:to-[#081432]/95 border-2 border-sky-400/50 ring-1 ring-sky-300/30 shadow-xl dark:shadow-2xl space-y-8 min-h-[600px] transition-colors">
            {/* 1. DASHBOARD VIEW */}
            {activeMenu === "dashboard" && (
              <DashboardView
                homeContent={homeContent}
                services={services}
                projects={projects}
                interior={interior}
                team={team}
                siteImages={siteImages}
                siteVideos={siteVideos}
                inquiries={inquiries}
                unreadInquiriesCount={unreadInquiriesCount}
                deleteInquiry={deleteInquiry}
                news={news}
                onNavigate={setActiveMenu}
                onExportSQL={exportDatabaseSQL}
              />
            )}

            {/* 1.1 INQUIRIES VIEW */}
            {activeMenu === "inquiries" && (
              <InquiriesView
                inquiries={inquiries}
                unreadInquiriesCount={unreadInquiriesCount}
                markInquiriesAsRead={markInquiriesAsRead}
                toggleInquiryStatus={toggleInquiryStatus}
                deleteInquiry={deleteInquiry}
                exportInquiriesCSV={exportInquiriesCSV}
                triggerToast={triggerToast}
              />
            )}

            {/* 2. HOME VIEW */}
            {activeMenu === "home" && (
              <HomeEditorView
                homeContent={homeContent}
                setHomeContent={setHomeContent}
                brandPartners={brandPartners}
                addBrandPartner={addBrandPartner}
                updateBrandPartner={updateBrandPartner}
                deleteBrandPartner={deleteBrandPartner}
                processImageFile={processImageFile}
                triggerToast={triggerToast}
              />
            )}

            {/* 3. SERVICES VIEW */}
            {activeMenu === "services" && (
              <ServicesEditorView
                services={services}
                addService={addService}
                updateService={updateService}
                deleteService={deleteService}
                processImageFile={processImageFile}
                triggerToast={triggerToast}
              />
            )}

            {/* 4. PROJECTS VIEW */}
            {activeMenu === "projects" && (
              <ProjectsEditorView
                projects={projects}
                addProject={addProject}
                updateProject={updateProject}
                deleteProject={deleteProject}
                processImageFile={processImageFile}
                triggerToast={triggerToast}
              />
            )}

            {/* 5. INTERIOR VIEW */}
            {activeMenu === "interior" && (
              <InteriorEditorView
                interior={interior}
                addInteriorSpace={addInteriorSpace}
                updateInteriorSpace={updateInteriorSpace}
                deleteInteriorSpace={deleteInteriorSpace}
                processImageFile={processImageFile}
                triggerToast={triggerToast}
              />
            )}

            {/* 6. ABOUT VIEW */}
            {activeMenu === "about" && (
              <AboutEditorView
                aboutContent={aboutContent}
                setAboutContent={setAboutContent}
                triggerToast={triggerToast}
              />
            )}

            {/* 7. CONTACT VIEW */}
            {activeMenu === "contact" && (
              <ContactEditorView
                contactContent={contactContent}
                setContactContent={setContactContent}
                triggerToast={triggerToast}
              />
            )}

            {/* 8. MY TEAM VIEW */}
            {activeMenu === "my-team" && (
              <TeamEditorView
                team={team}
                addTeamMember={addTeamMember}
                updateTeamMember={updateTeamMember}
                deleteTeamMember={deleteTeamMember}
                processImageFile={processImageFile}
                triggerToast={triggerToast}
              />
            )}

            {/* 9. SITE IMAGES & VIDEOS VIEW */}
            {activeMenu === "site-images" && (
              <SiteImagesEditorView
                siteImages={siteImages}
                addSiteImage={addSiteImage}
                updateSiteImage={updateSiteImage}
                deleteSiteImage={deleteSiteImage}
                siteVideos={siteVideos}
                addSiteVideo={addSiteVideo}
                updateSiteVideo={updateSiteVideo}
                deleteSiteVideo={deleteSiteVideo}
                processImageFile={processImageFile}
                triggerToast={triggerToast}
              />
            )}

            {/* 10. NEWS & BLOGS VIEW */}
            {activeMenu === "news" && (
              <NewsEditorView
                news={news}
                addNewsArticle={addNewsArticle}
                updateNewsArticle={updateNewsArticle}
                deleteNewsArticle={deleteNewsArticle}
                processImageFile={processImageFile}
                triggerToast={triggerToast}
              />
            )}

            {/* 11. AUDIT LOGS VIEW */}
            {activeMenu === "audit-logs" && (
              <AuditLogsView
                auditLogs={auditLogs}
                clearAuditLogs={clearAuditLogs}
                exportAuditLogsCSV={exportAuditLogsCSV}
                triggerToast={triggerToast}
              />
            )}

            {/* 12. SECURITY & PROFILE VIEW */}
            {activeMenu === "security" && (
              <SecurityEditorView
                credentials={credentials}
                updateCredentials={updateCredentials}
                exportDatabaseSQL={exportDatabaseSQL}
                triggerToast={triggerToast}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: DASHBOARD OVERVIEW
// ==========================================
const DashboardView = ({
  homeContent,
  services,
  projects,
  interior,
  team,
  siteImages,
  siteVideos = [],
  inquiries = [],
  unreadInquiriesCount = 0,
  deleteInquiry,
  news,
  onNavigate,
  onExportSQL,
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          System <span className="text-sky-500 dark:text-sky-400">Telemetry & Status</span>
        </h3>
        <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
          Real-time oversight of all dynamic components connected to the live Lucknow portal.
        </p>
      </div>

      {/* Metrics Row (5 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 space-y-1 shadow-lg shadow-slate-200/50 dark:shadow-black/80 transition-all">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Live Projects</span>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{projects.length}</div>
          <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 block font-bold">● Synchronized</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 space-y-1 shadow-lg shadow-slate-200/50 dark:shadow-black/80 transition-all">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Active Services</span>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">{services.length}</div>
          <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 block font-bold">● 100% Configured</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 space-y-1 shadow-lg shadow-slate-200/50 dark:shadow-black/80 transition-all">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Interior Spaces</span>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{interior.length}</div>
          <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 block font-bold">● Gallery Active</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 space-y-1 shadow-lg shadow-slate-200/50 dark:shadow-black/80 transition-all">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Site Media</span>
          <div className="font-display text-lg sm:text-xl font-extrabold text-sky-600 dark:text-sky-400 truncate">
            {siteImages.length}P • {siteVideos?.length || 0}V
          </div>
          <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 block font-bold">● Photos & Videos</span>
        </div>

        <div
          onClick={() => onNavigate && onNavigate("inquiries")}
          className={`p-4 rounded-2xl border-2 transition-all space-y-1 shadow-lg cursor-pointer hover:scale-[1.02] ${
            unreadInquiriesCount > 0
              ? "bg-amber-50 dark:bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/40"
              : "bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25"
          }`}
          title="Click to view full Inquiries workspace"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Client Inquiries</span>
            <span className="text-[10px] text-sky-500 font-mono">View All ↗</span>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {inquiries.length}
          </div>
          <span className={`font-mono text-[9px] block font-bold ${
            unreadInquiriesCount > 0 ? "text-amber-600 dark:text-amber-400 animate-pulse" : "text-emerald-600 dark:text-emerald-400"
          }`}>
            {unreadInquiriesCount > 0 ? `● ${unreadInquiriesCount} New Unread` : "● All Read"}
          </span>
        </div>
      </div>

      {/* Live Client Inquiries Feed / Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-400/20 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-sky-500 dark:text-sky-400" />
              <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                Live Client Inquiries & Lead Pipeline
              </h4>
              {unreadInquiriesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-extrabold animate-pulse">
                  {unreadInquiriesCount} NEW
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Inquiries generated from the public Contact page and Consultation modal.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold">
              Total Leads: {inquiries.length}
            </span>
            <button
              onClick={() => onNavigate && onNavigate("inquiries")}
              className="px-3 py-1 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-600 dark:text-sky-400 border border-sky-400/40 text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Manage All Leads</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-10 text-center font-sans text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#040C20] rounded-2xl border border-dashed border-sky-400/30">
            No incoming client inquiries yet. When a visitor fills out the Contact form or requests a Consultation, their inquiry will appear here with one-click Call and WhatsApp buttons!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-mono text-[11px] uppercase">
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Channel / Source</th>
                  <th className="py-2.5 px-3">Requirement</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors ${
                      inq.status === "unread" ? "bg-sky-50/60 dark:bg-sky-500/10 font-medium" : ""
                    }`}
                  >
                    <td className="py-3 px-3 whitespace-nowrap">
                      {inq.status === "unread" ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold">
                          NEW
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-mono text-[10px]">
                          READ
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">{inq.name}</div>
                      {inq.email && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{inq.email}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-700 dark:text-slate-300">
                      {inq.phone}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-sky-600 dark:text-sky-400">
                      <div>{inq.type}</div>
                      <div className="text-[10px] text-slate-400">{inq.date}</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs text-slate-600 dark:text-slate-300">
                      <p className="line-clamp-2 italic">"{inq.message || inq.service || 'Consultation requested'}"</p>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 font-mono">
                        <a
                          href={`tel:${inq.phone.replace(/\s+/g, "")}`}
                          className="px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 font-bold text-[11px]"
                          title="Call Client"
                        >
                          Call
                        </a>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${inq.name}, thanking you for contacting INFRA VISION.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 font-bold text-[11px]"
                          title="Chat on WhatsApp"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => deleteInquiry && deleteInquiry(inq.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer ml-1"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Launch Cards */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-300 uppercase tracking-wider block">
          QUICK CONFIGURATION SHORTCUTS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate("home")}
            className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] hover:bg-slate-50 dark:hover:from-[#142D66] dark:hover:to-[#0C1B3E] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all cursor-pointer space-y-1.5"
          >
            <Home className="h-5 w-5 text-sky-500 dark:text-sky-400" />
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">Edit Home Headings</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Update hero titles, channels, and Lucknow contact details.</p>
          </div>

          <div
            onClick={() => onNavigate("projects")}
            className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] hover:bg-slate-50 dark:hover:from-[#142D66] dark:hover:to-[#0C1B3E] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all cursor-pointer space-y-1.5"
          >
            <Building2 className="h-5 w-5 text-sky-500 dark:text-sky-400" />
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">Manage Projects</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Add new villas, Day/Night photo gallery uploads & status.</p>
          </div>

          <div
            onClick={() => onNavigate("site-images")}
            className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] hover:bg-slate-50 dark:hover:from-[#142D66] dark:hover:to-[#0C1B3E] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all cursor-pointer space-y-1.5"
          >
            <ImageIcon className="h-5 w-5 text-sky-500 dark:text-sky-400" />
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">Manage Site Media</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Upload live on-site progress photos and 4K field videos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: INQUIRIES & LEADS PIPELINE
// ==========================================
const InquiriesView = ({
  inquiries = [],
  unreadInquiriesCount = 0,
  markInquiriesAsRead,
  toggleInquiryStatus,
  deleteInquiry,
  exportInquiriesCSV,
  triggerToast,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredInquiries = inquiries.filter((inq) => {
    if (activeFilter === "unread" && inq.status !== "unread") return false;
    if (activeFilter === "read" && inq.status !== "read") return false;
    if (activeFilter === "consultation") {
      const isConsultation =
        (inq.type || "").toLowerCase().includes("consultation") ||
        (inq.message || "").toLowerCase().includes("consultation");
      if (!isConsultation) return false;
    }
    if (activeFilter === "contact") {
      const isContact = (inq.type || "").toLowerCase().includes("contact");
      if (!isContact) return false;
    }

    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      (inq.name || "").toLowerCase().includes(query) ||
      (inq.phone || "").toLowerCase().includes(query) ||
      (inq.email || "").toLowerCase().includes(query) ||
      (inq.service || inq.projectType || "").toLowerCase().includes(query) ||
      (inq.message || "").toLowerCase().includes(query) ||
      (inq.type || "").toLowerCase().includes(query)
    );
  });

  const handleMarkAllRead = () => {
    if (markInquiriesAsRead) {
      markInquiriesAsRead();
      triggerToast?.("All pending client leads marked as read.");
    }
  };

  const handleExportCSV = () => {
    if (exportInquiriesCSV) {
      exportInquiriesCSV();
      triggerToast?.("Exporting client leads to CSV file...");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-400/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-500 dark:text-sky-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Client Inquiries & <span className="text-sky-500 dark:text-sky-400">VIP Lead Pipeline</span>
              </h3>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                Live client consultation submissions, website contact inquiries, and architectural audit requests.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {unreadInquiriesCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/40 text-blue-600 dark:text-sky-400 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Mark All Read</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
            className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Leads CSV</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 ring-1 ring-sky-300/25 shadow-lg space-y-1">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Total Inquiries</span>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {inquiries.length}
          </div>
          <span className="font-mono text-[9px] text-sky-600 dark:text-sky-400 block font-semibold">
            ● All historical leads captured
          </span>
        </div>

        <div className={`p-4 rounded-2xl border-2 transition-all space-y-1 shadow-lg ${
          unreadInquiriesCount > 0
            ? "bg-amber-50 dark:bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/40"
            : "bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 ring-1 ring-sky-300/25"
        }`}>
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Pending / Unread</span>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {unreadInquiriesCount}
          </div>
          <span className={`font-mono text-[9px] block font-bold ${
            unreadInquiriesCount > 0 ? "text-amber-600 dark:text-amber-400 animate-pulse" : "text-emerald-600 dark:text-emerald-400"
          }`}>
            {unreadInquiriesCount > 0 ? "● Requires direct follow-up" : "● All leads processed"}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 ring-1 ring-sky-300/25 shadow-lg space-y-1">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Processed & Followed Up</span>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {Math.max(0, inquiries.length - unreadInquiriesCount)}
          </div>
          <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 block font-semibold">
            ● Followed up with clients
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#07132F] border border-sky-400/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, phone, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#040C20] border border-slate-200 dark:border-sky-400/30 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-sky-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {[
            { id: "all", label: `All (${inquiries.length})` },
            { id: "unread", label: `Unread (${unreadInquiriesCount})` },
            { id: "read", label: `Read (${Math.max(0, inquiries.length - unreadInquiriesCount)})` },
            { id: "consultation", label: "Consultation Modal" },
            { id: "contact", label: "Contact Form" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-sky-500 text-slate-950 font-bold shadow-sm"
                  : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List Cards / Table */}
      {filteredInquiries.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-slate-50 dark:bg-[#06112C] border-2 border-dashed border-sky-400/30 space-y-3 p-6">
          <Mail className="h-10 w-10 text-sky-500/60 mx-auto" />
          <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
            {searchTerm || activeFilter !== "all" ? "No matching inquiries found" : "No client inquiries received yet"}
          </h4>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {searchTerm || activeFilter !== "all"
              ? "Try clearing your search term or selecting a different filter category."
              : "When visitors request a VIP Consultation or send a message from the Contact page, their details will appear here with instant call and WhatsApp actions."}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredInquiries.map((inq) => {
            const isUnread = inq.status === "unread";
            const cleanPhone = (inq.phone || "").replace(/[^0-9]/g, "");
            const waGreeting = encodeURIComponent(
              `Hello ${inq.name || "Client"}, thank you for inquiring with INFRA VISION regarding ${inq.service || inq.projectType || "architectural services"}. We would love to discuss your project requirements.`
            );

            return (
              <div
                key={inq.id}
                className={`p-5 sm:p-6 rounded-2xl border-2 transition-all space-y-4 ${
                  isUnread
                    ? "bg-gradient-to-r from-sky-500/10 via-white to-sky-500/5 dark:from-sky-950/40 dark:via-[#091533] dark:to-[#0B1A3D] border-amber-400/80 shadow-lg ring-1 ring-amber-400/30"
                    : "bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-slate-200 dark:border-sky-400/30 shadow-md"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    {/* Status Pill */}
                    {isUnread ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-extrabold animate-pulse shadow-sm">
                        ● NEW UNREAD
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-mono text-[10px] font-semibold">
                        FOLLOWED UP / READ
                      </span>
                    )}

                    {/* Channel Source Badge */}
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-600 dark:text-sky-400 font-mono text-[10px] font-semibold">
                      {inq.type || "Inquiry Form"}
                    </span>

                    {/* Timestamp */}
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{inq.date || "Recently"}</span>
                    </span>
                  </div>

                  {/* Top Right Action Tools */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleInquiryStatus && toggleInquiryStatus(inq.id)}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                      title={isUnread ? "Mark as Read" : "Mark as Unread"}
                    >
                      <Check className="h-3 w-3" />
                      <span>{isUnread ? "Mark Read" : "Mark Unread"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete lead from ${inq.name}?`)) {
                          deleteInquiry && deleteInquiry(inq.id);
                          triggerToast?.("Inquiry deleted successfully.");
                        }
                      }}
                      className="p-1.5 rounded-xl hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Lead Core Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  {/* Left Column: Client Profile & Contacts */}
                  <div className="md:col-span-5 space-y-2">
                    <div>
                      <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        {inq.name || "Anonymous Client"}
                      </h4>
                      <p className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-semibold">
                        Service: {inq.service || inq.projectType || "Turnkey Civil Architecture"}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="font-semibold">{inq.phone}</span>
                      </div>
                      {inq.email && (
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Mail className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                          <span className="truncate">{inq.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Message Notes & Plot Location */}
                  <div className="md:col-span-7 space-y-1.5">
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                      Client Requirement / Location Notes:
                    </span>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#040D22] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                      {inq.message || "No specific notes provided. Client requested a direct consultation callback."}
                    </div>
                  </div>
                </div>

                {/* Instant Connect Buttons Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/40 dark:border-white/5">
                  <div className="text-[11px] font-mono text-slate-400">
                    Lead ID: <span className="text-slate-600 dark:text-slate-300 font-bold">{inq.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Call Button */}
                    <a
                      href={`tel:${(inq.phone || "").replace(/\s+/g, "")}`}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Call Client</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${waGreeting}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: HOME EDITOR
// ==========================================
const HomeEditorView = ({
  homeContent,
  setHomeContent,
  brandPartners = [],
  addBrandPartner,
  updateBrandPartner,
  deleteBrandPartner,
  processImageFile,
  triggerToast,
}) => {
  const [formData, setFormData] = useState({ ...homeContent });

  // Brand Partners Modal & Edit State
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerFormData, setPartnerFormData] = useState({
    name: "",
    category: "",
    logo: "",
    preset: "tata",
  });
  const [logoSourceType, setLogoSourceType] = useState("preset"); // "preset" | "upload" | "url"
  const [partnerDeleteConfirmId, setPartnerDeleteConfirmId] = useState(null);

  // Preset certified partners list for 1-click select
  const PRESET_OPTIONS = [
    { id: "tata", name: "TATA Steel", category: "Primary Infrastructure Rebar" },
    { id: "jsw", name: "JSW Steel", category: "Structural TMT Bar Metallurgy" },
    { id: "kajaria", name: "Kajaria", category: "Luxury Floor & Vitrified Ceramics" },
    { id: "jcb", name: "JCB Earthmoving", category: "Heavy Foundation Excavation Fleet" },
    { id: "ultratech", name: "UltraTech Cement", category: "High-Grade Engineered Concrete" },
  ];

  const handleSaveHomeContent = (e) => {
    e.preventDefault();
    setHomeContent(formData);
    triggerToast("Home Page Headings & Communications Saved!");
  };

  const openAddPartnerModal = () => {
    setEditingPartner(null);
    setPartnerFormData({
      name: "",
      category: "",
      logo: "",
      preset: "tata",
    });
    setLogoSourceType("preset");
    setIsPartnerModalOpen(true);
  };

  const openEditPartnerModal = (partner) => {
    setEditingPartner(partner);
    setPartnerFormData({
      name: partner.name || "",
      category: partner.category || "",
      logo: partner.logo || "",
      preset: partner.preset || (partner.logo ? "" : "tata"),
    });
    setLogoSourceType(
      partner.logo
        ? partner.logo.startsWith("data:")
          ? "upload"
          : "url"
        : "preset"
    );
    setIsPartnerModalOpen(true);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (!partnerFormData.name.trim()) {
      triggerToast("Please enter the brand partner name.");
      return;
    }

    const payload = {
      name: partnerFormData.name.trim(),
      category: partnerFormData.category.trim() || "Strategic Infrastructure Partner",
      logo: logoSourceType === "preset" ? "" : partnerFormData.logo,
      preset: logoSourceType === "preset" ? (partnerFormData.preset || "tata") : "",
    };

    if (editingPartner) {
      updateBrandPartner(editingPartner.id, payload);
      triggerToast(`Brand partner "${payload.name}" updated successfully!`);
    } else {
      addBrandPartner(payload);
      triggerToast(`Brand partner "${payload.name}" added to Home marquee!`);
    }

    setIsPartnerModalOpen(false);
    setEditingPartner(null);
  };

  const handleLogoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await processImageFile(file);
      setPartnerFormData((prev) => ({ ...prev, logo: b64, preset: "" }));
      triggerToast("Brand logo loaded successfully!");
    } catch {
      triggerToast("Error processing logo image file.");
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. HOME HEADINGS & COMMUNICATIONS FORM */}
      <form onSubmit={handleSaveHomeContent} className="space-y-6">
        <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Home Page <span className="text-sky-500 dark:text-sky-400">Headings & Communications</span>
            </h3>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
              Control the hero banner headline, contact numbers, social channel links, and corporate office details.
            </p>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">1. Hero Display Headline</label>
              <input
                type="text"
                value={formData.heroTitle || ""}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-sans text-sm focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">2. Hero Tagline Paragraph</label>
              <textarea
                rows={2}
                value={formData.heroTagline || ""}
                onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-sans text-sm focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">Primary Phone Hotline</label>
              <input
                type="text"
                value={formData.phonePrimary || ""}
                onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">Secondary Phone Hotline</label>
              <input
                type="text"
                value={formData.phoneSecondary || ""}
                onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">WhatsApp Direct Number</label>
              <input
                type="text"
                value={formData.whatsappNumber || ""}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">Official Inquiries Email</label>
              <input
                type="email"
                value={formData.officialEmail || ""}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">YouTube Channel URL</label>
              <input
                type="url"
                value={formData.channelYoutube || ""}
                onChange={(e) => setFormData({ ...formData, channelYoutube: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">Instagram Handle URL</label>
              <input
                type="url"
                value={formData.channelInstagram || ""}
                onChange={(e) => setFormData({ ...formData, channelInstagram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white focus:border-sky-500 outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-slate-700 dark:text-slate-300 uppercase font-bold">Lucknow Headquarters Address</label>
              <input
                type="text"
                value={formData.corporateAddress || ""}
                onChange={(e) => setFormData({ ...formData, corporateAddress: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white focus:border-sky-500 outline-none"
              />
            </div>
          </div>
        </div>
      </form>

      {/* 2. STRATEGIC BRAND PARTNERS & COLLABORATIONS SECTION */}
      <div className="space-y-6 pt-4 border-t border-sky-400/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-500 dark:text-sky-400">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Brand Partners & <span className="text-sky-500 dark:text-sky-400">Strategic Collaborations</span>
                </h3>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  Manage raw material brands, equipment partners, and certified vendors rendered in the Home Page moving marquee.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddPartnerModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Brand Partner</span>
          </button>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandPartners && brandPartners.length > 0 ? (
            brandPartners.map((partner) => {
              const isPreset = !partner.logo && partner.preset;
              return (
                <div
                  key={partner.id}
                  className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/40 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/20 shadow-md hover:shadow-xl transition-all flex flex-col justify-between gap-3 group"
                >
                  {/* Top Bar: Logo preview + Preset Tag */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-12 w-28 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/30 p-2 flex items-center justify-center overflow-hidden shrink-0">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="font-mono text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-wider text-center line-clamp-1">
                          {partner.preset ? partner.preset.toUpperCase() : partner.name}
                        </span>
                      )}
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-400/30 shrink-0">
                      {isPreset ? "Preset Brand" : partner.logo ? "Custom Logo" : "Custom Text"}
                    </span>
                  </div>

                  {/* Body: Partner Name and Category */}
                  <div>
                    <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {partner.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {partner.category || "Strategic Material Supplier"}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-2 border-t border-sky-400/15 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditPartnerModal(partner)}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-600 dark:text-sky-300 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPartnerDeleteConfirmId(partner.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border-2 border-dashed border-sky-400/40 text-center space-y-2">
              <Building2 className="h-8 w-8 text-sky-500 mx-auto" />
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                No brand partners configured yet. Click "Add Brand Partner" above to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT BRAND PARTNER MODAL */}
      <AnimatePresence>
        {isPartnerModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#07132F] border-2 border-sky-400/50 shadow-2xl p-6 sm:p-7 space-y-5 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-sky-400/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-500/20 text-sky-500 dark:text-sky-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {editingPartner ? "Edit Brand Partner" : "Add Brand Partner"}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Configure brand display details for the homepage banner.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handlePartnerSubmit} className="space-y-4 font-mono text-xs">
                {/* Brand Name */}
                <div className="space-y-1">
                  <label className="block text-slate-700 dark:text-slate-300 uppercase font-bold">
                    Partner / Brand Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                    placeholder="e.g. TATA Steel, ACC Cement, Saint-Gobain"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-sans text-xs focus:border-sky-500 outline-none"
                  />
                </div>

                {/* Category / Role */}
                <div className="space-y-1">
                  <label className="block text-slate-700 dark:text-slate-300 uppercase font-bold">
                    Supply Category / Material Role
                  </label>
                  <input
                    type="text"
                    value={partnerFormData.category}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, category: e.target.value })}
                    placeholder="e.g. Primary Infrastructure Rebar, Heavy Excavation Fleet"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-sans text-xs focus:border-sky-500 outline-none"
                  />
                </div>

                {/* Logo Type Selector Tabs */}
                <div className="space-y-2 pt-1">
                  <label className="block text-slate-700 dark:text-slate-300 uppercase font-bold">
                    Brand Logo Source
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setLogoSourceType("preset")}
                      className={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer ${
                        logoSourceType === "preset"
                          ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md border border-sky-300"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent hover:border-sky-400/30"
                      }`}
                    >
                      Presets (5)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoSourceType("upload")}
                      className={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer ${
                        logoSourceType === "upload"
                          ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md border border-sky-300"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent hover:border-sky-400/30"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoSourceType("url")}
                      className={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer ${
                        logoSourceType === "url"
                          ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md border border-sky-300"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent hover:border-sky-400/30"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {/* Tab 1: Preset Quick-Select */}
                {logoSourceType === "preset" && (
                  <div className="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/30">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold uppercase">
                      Select Certified Logo Preset:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PRESET_OPTIONS.map((opt) => {
                        const isSelected = partnerFormData.preset === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setPartnerFormData({
                                ...partnerFormData,
                                preset: opt.id,
                                name: partnerFormData.name || opt.name,
                                category: partnerFormData.category || opt.category,
                                logo: "",
                              })
                            }
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-sky-500/20 border-sky-400 text-sky-600 dark:text-sky-300 shadow-sm"
                                : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-sky-400/50"
                            }`}
                          >
                            <span className="font-bold text-xs block">{opt.name}</span>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400 block truncate">
                              {opt.id.toUpperCase()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 2: Upload File */}
                {logoSourceType === "upload" && (
                  <div className="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/30">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold uppercase">
                      Upload Logo Image (PNG / SVG / WebP):
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      className="w-full text-xs text-slate-600 dark:text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-500/20 file:text-sky-600 dark:file:text-sky-300 hover:file:bg-sky-500/30 file:cursor-pointer cursor-pointer"
                    />
                    {partnerFormData.logo && (
                      <div className="flex items-center gap-3 pt-2">
                        <div className="h-10 w-24 p-1 rounded-lg bg-white dark:bg-slate-900 border border-sky-400/30 flex items-center justify-center">
                          <img
                            src={partnerFormData.logo}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setPartnerFormData((prev) => ({ ...prev, logo: "" }))}
                          className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                        >
                          Remove Logo
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Image URL */}
                {logoSourceType === "url" && (
                  <div className="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/30">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold uppercase">
                      Paste Public Image URL:
                    </span>
                    <input
                      type="url"
                      value={partnerFormData.logo}
                      onChange={(e) =>
                        setPartnerFormData({
                          ...partnerFormData,
                          logo: e.target.value,
                          preset: "",
                        })
                      }
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-sky-400/35 text-slate-900 dark:text-white font-sans text-xs focus:border-sky-500 outline-none"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsPartnerModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 text-white font-mono text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingPartner ? "Save Changes" : "Add Partner"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {partnerDeleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#07132F] border-2 border-rose-500/50 p-5 space-y-4 shadow-2xl text-center"
            >
              <div className="h-12 w-12 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Remove Brand Partner?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
                  This brand partner will be permanently removed from the live website marquee banner.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPartnerDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteBrandPartner(partnerDeleteConfirmId);
                    setPartnerDeleteConfirmId(null);
                    triggerToast("Brand partner deleted.");
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold shadow-md shadow-rose-600/30 cursor-pointer"
                >
                  Delete Partner
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: SERVICES EDITOR (GALLERY FILE UPLOAD)
// ==========================================
const ServicesEditorView = ({
  services,
  addService,
  updateService,
  deleteService,
  processImageFile,
  triggerToast,
}) => {
  const [editingService, setEditingService] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Service state
  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newBadge, setNewBadge] = useState("Certified Quality");
  const [newParagraph, setNewParagraph] = useState("");
  const [newImage, setNewImage] = useState("/images/services/card_residential.jpg");

  const handleImageFileChange = async (e, sId) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimizedUrl = await processImageFile(file);
      const target = services.find((s) => s.id === sId);
      if (target) {
        updateService({ ...target, image: optimizedUrl });
        triggerToast(`Updated photo for "${target.title}"!`);
      }
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  const handleUploadNewServicePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      setNewImage(dataUrl);
      triggerToast("New service photo loaded from gallery!");
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  const handleSaveService = (updatedSvc) => {
    updateService(updatedSvc);
    setEditingService(null);
    triggerToast(`Service "${updatedSvc.title}" updated successfully!`);
  };

  const handleCreateServiceSubmit = (e) => {
    e.preventDefault();
    const serviceObj = {
      id: "service_" + Date.now(),
      title: newTitle || "Bespoke Construction",
      tagline: newTagline || "Turnkey engineering solutions tailored to perfection.",
      badge: newBadge,
      paragraph: newParagraph || "High-performance civil engineering and architecture executed by certified experts.",
      specs: [
        "FE-550D TMT rebar structural casting",
        "Laser-guided soil leveling and compaction",
        "IS-456 compliance inspection audits",
      ],
      image: newImage,
    };
    addService(serviceObj);
    setShowAddModal(false);
    setNewTitle("");
    setNewTagline("");
    setNewParagraph("");
    triggerToast("New service added successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Services <span className="text-sky-500 dark:text-sky-400">Manager & Gallery Upload</span>
          </h3>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Edit titles, paragraphs, and upload service photos directly from your device gallery.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="p-5 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Image Preview & File Upload */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-800 border border-sky-400/30 group">
                <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white font-mono text-xs cursor-pointer transition-opacity">
                  <Upload className="h-6 w-6 text-sky-400 mb-1" />
                  <span>Upload From Gallery</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageFileChange(e, svc.id)}
                  />
                </label>
              </div>

              <div>
                <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 uppercase font-bold">{svc.badge}</span>
                <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">{svc.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-1 line-clamp-2">{svc.paragraph}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-sky-400/15 flex items-center justify-between">
              <label className="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageFileChange(e, svc.id)}
                />
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingService(svc)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete service "${svc.title}"?`)) {
                      deleteService(svc.id);
                      triggerToast(`Deleted "${svc.title}"`);
                    }
                  }}
                  className="p-1.5 rounded-xl text-rose-500 dark:text-rose-400 hover:bg-rose-500/15 cursor-pointer"
                  title="Delete Service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Edit {editingService.title}</h4>
              <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Badge</label>
                <input
                  type="text"
                  value={editingService.badge}
                  onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Paragraph Description</label>
                <textarea
                  rows={3}
                  value={editingService.paragraph}
                  onChange={(e) => setEditingService({ ...editingService, paragraph: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveService(editingService)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleCreateServiceSubmit}
            className="w-full max-w-xl p-6 rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Add New Service</h4>
              <button onClick={() => setShowAddModal(false)} type="button" className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Industrial Warehouse & PEB Structures"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Certified Quality Standard"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Short Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Pre-engineered building execution with laser precision."
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Paragraph Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Full engineering description..."
                  value={newParagraph}
                  onChange={(e) => setNewParagraph(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              {/* Service Photo File Upload */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Service Cover Photo (From Device Gallery)
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Select Photo From Gallery</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadNewServicePhoto} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
              >
                Create Service
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: PROJECTS EDITOR (GALLERY UPLOAD)
// ==========================================
const ProjectsEditorView = ({
  projects,
  addProject,
  updateProject,
  deleteProject,
  processImageFile,
  triggerToast,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("villa");
  const [newCarpetArea, setNewCarpetArea] = useState("5,500 Sq.Ft");
  const [newLocation, setNewLocation] = useState("Golf City, Lucknow");
  const [newStatus, setNewStatus] = useState("Completed");
  const [newDayImage, setNewDayImage] = useState("/images/drone/villa_completed_exterior.jpg");
  const [newNightImage, setNewNightImage] = useState("/images/projects/neoclassical_royal_villa.jpg");

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    const newProj = {
      id: Date.now(),
      title: newTitle || "New Architectural Estate",
      category: newCategory,
      categoryLabel: newCategory === "villa" ? "Residential" : newCategory === "turnkey" ? "Commercial" : "Interior",
      city: "Lucknow",
      year: "2026",
      carpetArea: newCarpetArea,
      location: newLocation,
      status: newStatus,
      imageDay: newDayImage,
      imageNight: newNightImage,
      description: "Custom engineered turnkey luxury estate executed by INFRA VISION.",
      progress: newStatus === "Completed" ? 100 : 75,
      isOngoing: newStatus !== "Completed",
    };
    addProject(newProj);
    setShowAddModal(false);
    setNewTitle("");
    triggerToast("New Project Added & Published to Live Gallery!");
  };

  const handleUploadNewImage = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      if (type === "day") setNewDayImage(dataUrl);
      else setNewNightImage(dataUrl);
      triggerToast("Photo loaded from gallery!");
    } catch (err) {
      alert("Error reading photo: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Real Projects <span className="text-sky-500 dark:text-sky-400">Portfolio Manager</span>
          </h3>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Add, update, or remove projects. Upload Day & Night images directly from your device gallery.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                <img src={proj.imageDay} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md font-mono text-[9px] text-sky-300 font-bold">
                  {proj.category?.toUpperCase()}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-mono text-[9px] font-bold">
                  {proj.status}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white truncate">{proj.title}</h4>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>{proj.carpetArea}</span>
                  <span>{proj.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-end">
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                    deleteProject(proj.id);
                    triggerToast(`Project "${proj.title}" deleted from database.`);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-white font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleAddProjectSubmit}
            className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Add New Luxury Project</h4>
              <button onClick={() => setShowAddModal(false)} type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Cantilever Villa"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="villa">Luxury Villa</option>
                    <option value="apartment">Modern Residence</option>
                    <option value="turnkey">Commercial Complex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Carpet Area</label>
                  <input
                    type="text"
                    value={newCarpetArea}
                    onChange={(e) => setNewCarpetArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>
              </div>

              {/* Day Image Gallery File Upload */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Day Photo (Upload from Gallery)
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <img src={newDayImage} alt="Day preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Select Day Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadNewImage(e, "day")} />
                  </label>
                </div>
              </div>

              {/* Night Image Gallery File Upload */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Night Photo (Upload from Gallery)
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <img src={newNightImage} alt="Night preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Select Night Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadNewImage(e, "night")} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-lg"
              >
                Publish Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: INTERIOR EDITOR (GALLERY UPLOAD)
// ==========================================
const InteriorEditorView = ({
  interior,
  addInteriorSpace,
  updateInteriorSpace,
  deleteInteriorSpace,
  processImageFile,
  triggerToast,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Living Suite");
  const [newParagraph, setNewParagraph] = useState("");
  const [newImage, setNewImage] = useState("/images/interior/living_room.jpg");

  const handleUploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      setNewImage(dataUrl);
      triggerToast("Interior photo loaded from gallery!");
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newSpace = {
      id: "interior_" + Date.now(),
      number: "0" + (interior.length + 1),
      title: newTitle || "LUXURY INTERIOR SUITE",
      category: newCategory,
      image: newImage,
      paragraph: newParagraph || "Bespoke interior architectural space featuring premium materials and circadian lighting.",
    };
    addInteriorSpace(newSpace);
    setShowAddModal(false);
    setNewTitle("");
    setNewParagraph("");
    triggerToast(`Added interior space "${newSpace.title}"!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Interior Excellence <span className="text-sky-500 dark:text-sky-400">Master Gallery</span>
          </h3>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Upload luxury interior photographs, Calacatta marble showcases, and bespoke living suites directly from your gallery.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Interior Space</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {interior.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md font-mono text-[9px] text-sky-300 font-bold">
                  {item.category}
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white truncate">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{item.paragraph}</p>
              </div>
            </div>

            <div className="p-4 pt-0 flex justify-end">
              <button
                onClick={() => {
                  if (confirm(`Delete interior space "${item.title}"?`)) {
                    deleteInteriorSpace(item.id);
                    triggerToast(`Deleted "${item.title}"`);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-white font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Interior Space Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleAddSubmit}
            className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Add Luxury Interior Space</h4>
              <button onClick={() => setShowAddModal(false)} type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Space Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BESPOKE PENTHOUSE TERRACE LOUNGE"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                >
                  <option value="Living Suite">Living Suite</option>
                  <option value="Culinary Suite">Culinary Suite</option>
                  <option value="Private Suite">Private Suite</option>
                  <option value="Wellness Suite">Wellness Suite</option>
                  <option value="Dining Suite">Dining Suite</option>
                  <option value="Foyer Suite">Foyer Suite</option>
                  <option value="Lounge Suite">Lounge Suite</option>
                  <option value="Terrace Suite">Terrace Suite</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Description Paragraph</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detailed interior description..."
                  value={newParagraph}
                  onChange={(e) => setNewParagraph(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              {/* Photo Upload from Gallery */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Space Photo (From Device Gallery)
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Select Photo From Gallery</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-lg"
              >
                Add Space
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: ABOUT EDITOR
// ==========================================
const AboutEditorView = ({ aboutContent, setAboutContent, triggerToast }) => {
  const [formData, setFormData] = useState({ ...aboutContent });

  const handleSave = (e) => {
    e.preventDefault();
    setAboutContent(formData);
    triggerToast("About Page Story & Milestones Saved!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white font-sans">
            About Us <span className="text-sky-500 dark:text-sky-400">Corporate Identity & Story</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Edit founder vision, quality guarantees, and corporate milestones.
          </p>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all space-y-4 font-sans text-xs">
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Company Story Headline</label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Mission Statement</label>
          <textarea
            rows={3}
            value={formData.missionStatement}
            onChange={(e) => setFormData({ ...formData, missionStatement: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Quality Engineering Pledge</label>
          <textarea
            rows={2}
            value={formData.qualityPledge}
            onChange={(e) => setFormData({ ...formData, qualityPledge: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Founder's Quote</label>
          <input
            type="text"
            value={formData.founderQuote}
            onChange={(e) => setFormData({ ...formData, founderQuote: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
          />
        </div>
      </div>
    </form>
  );
};

// ==========================================
// SUB-COMPONENT: CONTACT EDITOR
// ==========================================
const ContactEditorView = ({ contactContent, setContactContent, triggerToast }) => {
  const [formData, setFormData] = useState({ ...contactContent });

  const handleSave = (e) => {
    e.preventDefault();
    setContactContent(formData);
    triggerToast("Contact Information & Desk Details Saved!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white font-sans">
            Contact & <span className="text-sky-500 dark:text-sky-400">Headquarters Control</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Update official consultation desk numbers, emails, and Lucknow coordinates.
          </p>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Direct Consultation Hotline</label>
            <input
              type="text"
              value={formData.directHotline}
              onChange={(e) => setFormData({ ...formData, directHotline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">WhatsApp Hotline</label>
            <input
              type="text"
              value={formData.whatsappHotline}
              onChange={(e) => setFormData({ ...formData, whatsappHotline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Official Inquiries Email</label>
            <input
              type="email"
              value={formData.emailDesk}
              onChange={(e) => setFormData({ ...formData, emailDesk: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Visiting Hours</label>
            <input
              type="text"
              value={formData.visitingHours}
              onChange={(e) => setFormData({ ...formData, visitingHours: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 dark:text-slate-300 font-mono uppercase font-bold mb-1">Physical Office Address</label>
            <input
              type="text"
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

// ==========================================
// SUB-COMPONENT: MY TEAM EDITOR (GALLERY UPLOAD)
// ==========================================
const TeamEditorView = ({
  team,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  processImageFile,
  triggerToast,
}) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [viewMoreText, setViewMoreText] = useState("");
  const [bioLines, setBioLines] = useState(["", "", "", "", ""]);
  const [specs, setSpecs] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [photo, setPhoto] = useState("https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop");

  // Lock background scroll when modal is open
  useEffect(() => {
    if (showAddMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAddMember]);

  const handleOpenAddMember = () => {
    setEditingMember(null);
    setName("");
    setRole("");
    setQualification("B.Tech Civil");
    setExperience("10+ Years Exp");
    setBio("Key contributor to INFRA VISION's architectural engineering leadership.");
    setBioLines([
      "Certified engineering leadership with extensive industry project experience",
      "Specializing in structural execution, architectural planning, and turnkey oversight",
      "Skilled in CAD/BIM modeling, site coordination, and structural compliance",
      "Experienced in collaborating with reputed tier-1 construction & interior brands",
      "Uncompromising dedication to quality, craftsmanship, and client satisfaction"
    ]);
    setViewMoreText("");
    setSpecs("Certified Lead, Site Supervision, Grade-A Execution");
    setLinkedin("");
    setPhoto("https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop");
    setShowAddMember(true);
  };

  const handleOpenEditMember = (m) => {
    setEditingMember(m);
    setName(m.name || "");
    setRole(m.role || "");
    setQualification(m.qualification || m.credentials || "B.Tech Civil");
    setExperience(m.experience || "10+ Years Exp");
    setBio(m.bio || "Key contributor to INFRA VISION's architectural engineering leadership.");
    const fullText = m.viewMoreText || m.bio || "";
    setViewMoreText(fullText);

    // Parse existing text into discrete lines for the line-by-line editor
    const rawLines = fullText
      .split(/\n+/)
      .map((l) => l.replace(/^\s*(?:[•\-\*]|\d+[\.\)])\s*/, "").trim())
      .filter((l) => {
        if (!l) return false;
        // Skip redundant standalone experience headlines
        if (l.length < 50 && /^\d+\+?\s*years?(?:\s+of)?(?:\s+industry)?(?:\s+experience)?$/i.test(l)) {
          return false;
        }
        return true;
      });

    if (rawLines.length >= 5) {
      setBioLines(rawLines);
    } else {
      // Split clauses if single paragraph
      const decomposed = [];
      for (const p of rawLines) {
        const sentences = p
          .split(/(?<!\b(?:Ar|Er|Dr|Mr|Mrs|Ms|vs|e\.g|i\.e))\.\s+|;\s+/g)
          .map((s) => s.trim().replace(/\.$/, ""))
          .filter(Boolean);

        for (const sent of sentences) {
          const clauseSplitRegex = /(?=,\s*(?:specializing in|skilled in|experienced in|with a strong focus on|with a focus on|spearheading|pioneering|combining|enforcing|under (?:his|her|their)|guaranteeing|certified as)\b)/gi;
          const subClauses = sent
            .split(clauseSplitRegex)
            .map((c) => c.replace(/^,\s*/, "").trim())
            .filter(Boolean);
          decomposed.push(...subClauses);
        }
      }

      while (decomposed.length < 5) {
        decomposed.push("");
      }
      setBioLines(decomposed.length > 0 ? decomposed : ["", "", "", "", ""]);
    }

    setSpecs(Array.isArray(m.specs) ? m.specs.join(", ") : (m.specs || "Certified Lead, Site Supervision, Grade-A Execution"));
    setLinkedin(m.linkedin || "");
    setPhoto(m.photo || m.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop");
    setShowAddMember(true);
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      setPhoto(dataUrl);
      triggerToast("Member photo loaded from gallery!");
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    const cleanQual = qualification.trim() || "B.Tech Civil";
    const cleanLines = bioLines.map((l) => l.trim()).filter(Boolean);
    const cleanViewMore = cleanLines.join("\n") || viewMoreText.trim() || bio.trim();
    const cleanBio = bio.trim() || cleanLines[0] || "Key contributor to INFRA VISION's architectural engineering leadership.";
    const parsedSpecs = specs.split(",").map((s) => s.trim()).filter(Boolean);

    const memberData = {
      id: editingMember ? editingMember.id : Date.now(),
      name: name.trim(),
      role: role.trim(),
      qualification: cleanQual,
      credentials: cleanQual, // backwards-compatibility alias
      experience: experience.trim() || "10+ Years Exp",
      bio: cleanBio,
      viewMoreText: cleanViewMore,
      specs: parsedSpecs.length > 0 ? parsedSpecs : ["Certified Lead", "Site Supervision", "Grade-A Execution"],
      linkedin: linkedin.trim(),
      photo: photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    };

    if (editingMember) {
      updateTeamMember(memberData);
      triggerToast(`Team member "${name}" updated successfully!`);
    } else {
      addTeamMember(memberData);
      triggerToast(`Team member "${name}" added to public roster!`);
    }
    setShowAddMember(false);
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            My Team <span className="text-sky-500 dark:text-sky-400">Leadership Roster</span>
          </h3>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Manage architects, engineers, qualifications, experience, and the full "View More" dossier story displayed on the public site.
          </p>
        </div>
        <button
          onClick={handleOpenAddMember}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-500/25 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-32 w-28 rounded-2xl overflow-hidden border-2 border-sky-400/40 mx-auto bg-slate-100 dark:bg-slate-800 shadow-md">
                <img src={m.photo || m.image} alt={m.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-center space-y-1">
                <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">{m.name}</h4>
                <p className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">{m.role}</p>
                
                <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-300 font-mono text-[10px] font-bold border border-blue-400/30">
                    {m.qualification || m.credentials || "B.Tech Civil"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-400/30">
                    {m.experience || "10+ Years Exp"}
                  </span>
                </div>

                <div className="text-left bg-slate-50 dark:bg-black/20 p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 space-y-1 mt-2">
                  <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Card Summary:
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans line-clamp-2 leading-relaxed">
                    {m.bio || "Key contributor to INFRA VISION's architectural engineering leadership."}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-sky-600 dark:text-sky-400">
                    <span>View More Narrative:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {m.viewMoreText ? "✓ Configured" : "• Uses Default"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-sky-400/15 flex items-center justify-between">
              <button
                onClick={() => handleOpenEditMember(m)}
                className="text-xs font-mono text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 cursor-pointer font-bold"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit Details</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Remove ${m.name} from public roster?`)) {
                    deleteTeamMember(m.id);
                    triggerToast(`Removed ${m.name} from team.`);
                  }
                }}
                className="text-xs font-mono text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Member Modal */}
      {showAddMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md"
          onClick={() => setShowAddMember(false)}
          data-lenis-prevent="true"
        >
          <form
            onSubmit={handleMemberSubmit}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="w-full max-w-xl p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs max-h-[85vh] overflow-y-auto overscroll-contain no-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <div>
                <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {editingMember ? "Edit Team Member" : "Add Team Member"}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  Configure card details and the full "View More" dossier story.
                </p>
              </div>
              <button onClick={() => setShowAddMember(false)} type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3.5 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Er. Vivek Mehrotra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Role / Designation
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Structural Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B.Tech Civil (IIT Roorkee)"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12+ Years Exp"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Short Bio for Card Preview */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Short Summary (Shown on Card Preview)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 12+ years executing monolithic raft foundations and certified rebar grid placements."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm leading-relaxed"
                />
              </div>

              {/* Line-by-Line Executive Dossier Bullet Points */}
              <div className="space-y-2.5 p-3 rounded-2xl bg-slate-100/70 dark:bg-black/25 border border-sky-400/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-sky-700 dark:text-sky-300 font-mono text-xs uppercase font-bold">
                      Executive Dossier Bullet Lines (Shown in View Bio)
                    </label>
                    <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      Har point alag line me likhein. Brands (SLEEK, EVOK, etc.) auto-capitalized & dark blue highlight honge.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBioLines((prev) => [...prev, ""])}
                    className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/40 text-blue-700 dark:text-sky-400 font-mono text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Line</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto overscroll-contain pr-1" data-lenis-prevent="true">
                  {bioLines.map((line, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0 shadow-[0_0_8px_#2563EB]" />
                      <span className="font-mono text-[10.5px] text-slate-500 dark:text-slate-400 font-bold shrink-0 w-12">
                        Line {idx + 1}:
                      </span>
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBioLines((prev) => {
                            const next = [...prev];
                            next[idx] = val;
                            return next;
                          });
                        }}
                        placeholder={
                          idx === 0
                            ? "e.g. An experienced Interior Designer with 23 years of industry experience"
                            : idx === 1
                            ? "e.g. Specializing in residential, commercial, and office interiors"
                            : idx === 2
                            ? "e.g. Skilled in space planning, furniture design, material selection"
                            : idx === 3
                            ? "e.g. Experienced in working with reputed brands like SLEEK, HOMETOWN, EVOK, HINDWARE, and HETTICH"
                            : idx === 4
                            ? "e.g. With a strong focus on quality, craftsmanship, and client satisfaction"
                            : "Enter additional specialized credential or milestone..."
                        }
                        className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-xs leading-relaxed"
                      />
                      {bioLines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setBioLines((prev) => prev.filter((_, i) => i !== idx));
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                          title="Remove line"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Competencies / Certified Skills */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Key Specializations (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Seismic Zone 3 Audits, 3D BIM Clash-Free, TATA Tiscon FE-550D"
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  LinkedIn Profile URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://www.linkedin.com/in/username"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              {/* Photo File Upload from Gallery */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Profile Photo (From Device Gallery)
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-16 w-14 rounded-2xl overflow-hidden bg-slate-800 border-2 border-sky-400/40 shrink-0 shadow-md">
                    <img src={photo} alt="Preview" className="w-full h-full object-cover object-top" />
                  </div>
                  <label className="px-3.5 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-2 transition-all">
                    <Upload className="h-4 w-4" />
                    <span>Upload Headshot</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold cursor-pointer shadow-lg shadow-sky-500/25"
              >
                {editingMember ? "Update Member" : "Save Member"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: SITE MEDIA EDITOR (PHOTOS & 4K VIDEOS)
// ==========================================
const SiteImagesEditorView = ({
  siteImages,
  addSiteImage,
  updateSiteImage,
  deleteSiteImage,
  siteVideos = [],
  addSiteVideo,
  updateSiteVideo,
  deleteSiteVideo,
  processImageFile,
  triggerToast,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState("photos");
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  // Photo form states
  const [newTitle, setNewTitle] = useState("");
  const [newStage, setNewStage] = useState("foundation");
  const [newTag, setNewTag] = useState("SITE SUPERVISION");
  const [newPhoto, setNewPhoto] = useState("/images/site/img_6a747267bb4ef2.54998377.webp");

  // Video form states
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoStage, setNewVideoStage] = useState("foundation");
  const [newVideoTag, setNewVideoTag] = useState("SITE TIMELAPSE");
  const [newVideoDuration, setNewVideoDuration] = useState("1:45");
  const [newVideoSrc, setNewVideoSrc] = useState("/videos/construction_timelapse.mp4");

  const stageLabels = {
    foundation: "Foundation & Columns",
    masonry: "Brick Masonry",
    rcc: "RCC Slab & Shuttering",
    finishing: "Multi-Story & Finishing",
    supervision: "Site Supervision",
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      setNewPhoto(dataUrl);
      triggerToast("On-site photo loaded from device gallery!");
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  const handleUploadVideoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setNewVideoSrc(url);
    triggerToast("Video selected from device!");
  };

  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      id: Date.now(),
      src: newPhoto,
      title: newTitle || "Live Construction Milestone Execution",
      stage: newStage,
      stageLabel: stageLabels[newStage] || "Site Supervision",
      tag: newTag,
    };
    addSiteImage(newObj);
    setShowAddPhotoModal(false);
    setNewTitle("");
    triggerToast("New on-site photo added to live gallery!");
  };

  const handleAddVideoSubmit = (e) => {
    e.preventDefault();
    const newVid = {
      id: Date.now(),
      src: newVideoSrc,
      title: newVideoTitle || "High-Precision Structural Pouring & Shuttering",
      stage: newVideoStage,
      stageLabel: stageLabels[newVideoStage] || "RCC & Slab Formwork",
      tag: newVideoTag,
      duration: newVideoDuration || "1:30",
    };
    if (addSiteVideo) {
      addSiteVideo(newVid);
    }
    setShowAddVideoModal(false);
    setNewVideoTitle("");
    triggerToast("New 4K site video published to live media library!");
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Site Media <span className="text-sky-500 dark:text-sky-400">Live Progress Uploads</span>
          </h3>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Upload on-site progress photos and high-definition 4K field videos from Golf City & Shaheed Path builds.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-2xl bg-slate-200/80 dark:bg-[#06112C] border border-sky-400/30 flex items-center gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveMediaTab("photos")}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMediaTab === "photos"
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Photos ({siteImages.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMediaTab("videos")}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMediaTab === "videos"
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>4K Videos ({siteVideos.length})</span>
            </button>
          </div>

          {activeMediaTab === "photos" ? (
            <button
              onClick={() => setShowAddPhotoModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Upload Site Photo</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddVideoModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add 4K Site Video</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. PHOTOS GRID */}
      {activeMediaTab === "photos" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteImages.map((img) => (
            <div
              key={img.id}
              className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md font-mono text-[9px] text-sky-300 font-bold">
                    {img.tag}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-sky-500/80 text-white font-mono text-[9px] font-bold">
                    {img.stageLabel}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{img.title}</h4>
                </div>
              </div>

              <div className="p-4 pt-0 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm(`Remove this site image?`)) {
                      deleteSiteImage(img.id);
                      triggerToast("Site image removed.");
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-white font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. VIDEOS GRID */}
      {activeMediaTab === "videos" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteVideos.map((vid) => (
            <div
              key={vid.id}
              className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <video
                    src={vid.src}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md font-mono text-[9px] text-sky-300 font-bold pointer-events-none">
                    {vid.tag}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-sky-500/90 text-white font-mono text-[9px] font-bold pointer-events-none">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase">
                      {vid.stageLabel}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    {vid.title}
                  </h4>
                </div>
              </div>

              <div className="p-4 pt-0 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                  4K Field Video
                </span>
                <button
                  onClick={() => {
                    if (confirm(`Remove video "${vid.title}"?`)) {
                      deleteSiteVideo && deleteSiteVideo(vid.id);
                      triggerToast("Site video removed.");
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-white font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Site Photo Modal */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleAddPhotoSubmit}
            className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Upload New Site Progress Image</h4>
              <button onClick={() => setShowAddPhotoModal(false)} type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Photo Title / Caption</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Pressure Concrete Slump Test & Raft Casting"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Construction Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="foundation">Foundation & Columns</option>
                    <option value="masonry">Brick Masonry</option>
                    <option value="rcc">RCC Slab & Shuttering</option>
                    <option value="finishing">Multi-Story & Finishing</option>
                    <option value="supervision">Site Supervision</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g. SITE SUPERVISION"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Upload Photo from Gallery */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  On-Site Photo (From Mobile/Laptop Gallery)
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-14 w-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <img src={newPhoto} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Select From Gallery</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setShowAddPhotoModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-lg"
              >
                Publish Site Photo
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Site Video Modal */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleAddVideoSubmit}
            className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-sky-500" />
                <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Publish 4K Site Video</h4>
              </div>
              <button onClick={() => setShowAddVideoModal(false)} type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Video Title / Milestone</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RCC Roof Slab Casting & Pump Placement"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Construction Stage</label>
                  <select
                    value={newVideoStage}
                    onChange={(e) => setNewVideoStage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="foundation">Foundation & Columns</option>
                    <option value="masonry">Brick Masonry</option>
                    <option value="rcc">RCC Slab & Shuttering</option>
                    <option value="finishing">Multi-Story & Finishing</option>
                    <option value="supervision">Site Supervision</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={newVideoTag}
                    onChange={(e) => setNewVideoTag(e.target.value)}
                    placeholder="e.g. SLAB CASTING 4K"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Video Duration</label>
                  <input
                    type="text"
                    value={newVideoDuration}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    placeholder="e.g. 2:10"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Preloaded Source</label>
                  <select
                    onChange={(e) => setNewVideoSrc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="/videos/construction_timelapse.mp4">Timelapse MP4</option>
                    <option value="/videos/hero_construction_smooth_opt.mp4">Smooth 4K MP4</option>
                    <option value="/videos/hero_construction_intra.mp4">Intra Construction MP4</option>
                  </select>
                </div>
              </div>

              {/* Video URL or File Upload */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Video URL or Select File from Device
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={newVideoSrc}
                    onChange={(e) => setNewVideoSrc(e.target.value)}
                    placeholder="/videos/... or https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/40 text-slate-900 dark:text-white text-xs font-mono"
                  />
                  <div className="flex items-center gap-3">
                    <label className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload Video from Device</span>
                      <input type="file" accept="video/*" className="hidden" onChange={handleUploadVideoFile} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setShowAddVideoModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-lg"
              >
                Publish 4K Video
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: NEWS & BLOGS EDITOR (GALLERY UPLOAD + 5-MIN POP-UP)
// ==========================================
const NewsEditorView = ({
  news,
  addNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  processImageFile,
  triggerToast,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Safety & Compliance");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newFullStory, setNewFullStory] = useState("");
  const [newImage, setNewImage] = useState("/images/news/news_1_safety.webp");

  const handleUploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processImageFile(file);
      setNewImage(dataUrl);
      triggerToast("Article photo loaded from device gallery!");
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const paragraphs = newFullStory
      ? newFullStory.split("\n\n").filter(Boolean)
      : ["Detailed architectural engineering and structural insights by INFRA VISION experts."];

    const articleObj = {
      id: Date.now(),
      title: newTitle || "Architectural Engineering Insight",
      category: newCategory,
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase(),
      readTime: "5 MIN READ",
      author: "ITLC EDITORIAL DESK",
      authorRole: "Technical Research & Civil Engineering",
      image: newImage,
      excerpt: newExcerpt || "Key updates on luxury construction benchmarks and quality standards in Lucknow.",
      fullStory: paragraphs,
      keyTakeaways: [
        "Rigorous IS-456 structural quality audits verified on site.",
        "Precision craftsmanship paired with cutting-edge materials.",
      ],
    };

    addNewsArticle(articleObj);
    setShowAddModal(false);
    setNewTitle("");
    setNewExcerpt("");
    setNewFullStory("");
    triggerToast("New article published with full 5-min read detail!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-sky-400/20 pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            News & Blogs <span className="text-sky-500 dark:text-sky-400">Articles & Modal Manager</span>
          </h3>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Manage public news articles, upload featured photos, and edit the 5-min detailed center modal content.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Publish New Article</span>
        </button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-24 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-sky-400/30">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase">{item.category}</span>
                  <span className="font-mono text-[9px] text-slate-500 dark:text-slate-400">• {item.readTime || "5 MIN READ"}</span>
                </div>
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-1">{item.excerpt}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <label className="px-3.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                <span>Change Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const dataUrl = await processImageFile(file);
                      updateNewsArticle({ ...item, image: dataUrl });
                      triggerToast(`Photo updated for "${item.title}"!`);
                    } catch (err) {
                      alert("Error: " + err.message);
                    }
                  }}
                />
              </label>

              <button
                onClick={() => {
                  if (confirm(`Delete article "${item.title}"?`)) {
                    deleteNewsArticle(item.id);
                    triggerToast(`Article deleted from database.`);
                  }
                }}
                className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-white cursor-pointer"
                title="Delete Article"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add News Article Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleAddSubmit}
            className="w-full max-w-2xl p-6 rounded-3xl bg-white dark:bg-[#081534] border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl text-slate-900 dark:text-white space-y-4 font-mono text-xs max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-3">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Publish New Architectural Article</h4>
              <button onClick={() => setShowAddModal(false)} type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Article Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next-Generation Post-Tensioned Slabs in Luxury Villas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                >
                  <option value="Safety & Compliance">Safety & Compliance</option>
                  <option value="Commercial Architecture">Commercial Architecture</option>
                  <option value="Sustainable Engineering">Sustainable Engineering</option>
                  <option value="Smart Architecture">Smart Architecture</option>
                  <option value="Luxury Interior Design">Luxury Interior Design</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Card Excerpt (Short 1-2 sentence preview)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Preview text displayed on the cards..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Detailed 5-Minute Read Pop-up Story (Separate paragraphs with double Enter)
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Comprehensive technical deep-dive shown inside the center pop-up modal when client clicks 'Read More'..."
                  value={newFullStory}
                  onChange={(e) => setNewFullStory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#040C20] border border-sky-400/35 text-slate-900 dark:text-white text-sm"
                />
              </div>

              {/* Photo Upload from Gallery */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono text-xs uppercase mb-1">
                  Featured Photo (From Device Gallery)
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-14 w-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Select Photo From Gallery</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-sky-400/20">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-lg"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: AUDIT LOGS VIEW (ENTERPRISE SURVEILLANCE & RECOVERY TRACKER)
// ==========================================
const AuditLogsView = ({
  auditLogs = [],
  clearAuditLogs,
  exportAuditLogsCSV,
  triggerToast,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Categories
  const categories = ["ALL", "AUTH", "SECURITY", "CONTENT", "LEADS", "SYSTEM"];

  // Filtered Logs
  const filteredLogs = auditLogs.filter((log) => {
    const matchesCat = selectedCategory === "ALL" || log.category === selectedCategory;
    const matchesStatus = selectedStatus === "ALL" || log.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      log.action?.toLowerCase().includes(q) ||
      log.details?.toLowerCase().includes(q) ||
      log.user?.toLowerCase().includes(q) ||
      log.category?.toLowerCase().includes(q);
    return matchesCat && matchesStatus && matchesSearch;
  });

  // Analytics Metrics
  const totalCount = auditLogs.length;
  const authCount = auditLogs.filter((l) => l.category === "AUTH").length;
  const securityCount = auditLogs.filter((l) => l.category === "SECURITY" || l.status === "ALERT").length;
  const contentCount = auditLogs.filter((l) => l.category === "CONTENT" || l.category === "LEADS").length;

  return (
    <div className="space-y-6">
      {/* 1. Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-400/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-500 dark:text-sky-400 shadow-sm">
            <History className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Enterprise <span className="text-sky-500 dark:text-sky-400">Audit Logs</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                ACTIVE SURVEILLANCE
              </span>
            </div>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
              Surveillance tracking of admin authentications, brute-force defenses, content updates, and lead management.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={exportAuditLogsCSV}
            disabled={auditLogs.length === 0}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              auditLogs.length === 0
                ? "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed"
                : "bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-600 dark:text-sky-300 hover:scale-102 active:scale-98"
            }`}
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            disabled={auditLogs.length === 0}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              auditLogs.length === 0
                ? "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed"
                : "bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/40 text-rose-600 dark:text-rose-400 hover:scale-102 active:scale-98"
            }`}
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* 2. Stat Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/40 ring-1 ring-sky-300/20 shadow-md">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>Total Events</span>
            <Activity className="h-4 w-4 text-sky-500" />
          </div>
          <div className="font-display text-2xl font-black text-slate-900 dark:text-white mt-1">
            {totalCount}
          </div>
          <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">Recorded history</span>
        </div>

        {/* Card 2: Auth */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-blue-400/40 ring-1 ring-blue-300/20 shadow-md">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>Auth Operations</span>
            <Lock className="h-4 w-4 text-blue-500" />
          </div>
          <div className="font-display text-2xl font-black text-slate-900 dark:text-white mt-1">
            {authCount}
          </div>
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">Logins & sessions</span>
        </div>

        {/* Card 3: Security & Shields */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-amber-400/40 ring-1 ring-amber-300/20 shadow-md">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>Security Defenses</span>
            <Shield className="h-4 w-4 text-amber-500" />
          </div>
          <div className="font-display text-2xl font-black text-amber-500 dark:text-amber-400 mt-1">
            {securityCount}
          </div>
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">Shields & resets</span>
        </div>

        {/* Card 4: Content & Leads */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-emerald-400/40 ring-1 ring-emerald-300/20 shadow-md">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span>Content & Leads</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="font-display text-2xl font-black text-slate-900 dark:text-white mt-1">
            {contentCount}
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Partners, CMS & leads</span>
        </div>
      </div>

      {/* 3. Search and Category Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/40 ring-1 ring-sky-300/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === "ALL"
                ? auditLogs.length
                : auditLogs.filter((l) => l.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-300"
                    : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 border border-transparent"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action or details..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-mono text-xs focus:border-sky-500 outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Real-time Activity Feed / Table */}
      <div className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/40 ring-1 ring-sky-300/20 shadow-xl overflow-hidden">
        {filteredLogs.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredLogs.map((log) => {
              const isAlert = log.status === "ALERT";
              const isWarning = log.status === "WARNING";
              const formattedDate = new Date(log.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });

              return (
                <div
                  key={log.id}
                  className="p-4 hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  {/* Left: Status Icon, Action, Category */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isAlert
                          ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                          : isWarning
                          ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                      }`}
                    >
                      {isAlert ? (
                        <ShieldAlert className="h-5 w-5" />
                      ) : isWarning ? (
                        <AlertTriangle className="h-4.5 w-4.5" />
                      ) : (
                        <Check className="h-5 w-5" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                          {log.action}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider ${
                            log.category === "AUTH"
                              ? "bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-400/30"
                              : log.category === "SECURITY"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-400/30"
                              : log.category === "LEADS"
                              ? "bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-400/30"
                              : log.category === "CONTENT"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-400/30"
                              : "bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-400/30"
                          }`}
                        >
                          {log.category}
                        </span>

                        <span
                          className={`px-2 py-0.2 rounded-full font-mono text-[9px] font-bold uppercase ${
                            isAlert
                              ? "bg-rose-500/20 text-rose-500"
                              : isWarning
                              ? "bg-amber-500/20 text-amber-500"
                              : "bg-emerald-500/20 text-emerald-500"
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>

                      <p className="font-sans text-slate-700 dark:text-slate-300 text-xs">
                        {log.details}
                      </p>
                    </div>
                  </div>

                  {/* Right: User and Timestamp */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-sky-400/20 text-sky-600 dark:text-sky-300 font-bold">
                      @{log.user || "admin"}
                    </span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <Clock className="h-3 w-3" />
                      <span>{formattedDate}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center space-y-2">
            <History className="h-10 w-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              No Audit Logs Found
            </h4>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              No matching activity records found for the selected category or search filters.
            </p>
          </div>
        )}
      </div>

      {/* 5. Clear History Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#07132F] border-2 border-rose-500/50 p-5 space-y-4 shadow-2xl text-center"
            >
              <div className="h-12 w-12 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Clear All Audit Logs?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
                  This will wipe all historical activity and security tracking records. This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearAuditLogs();
                    setShowClearConfirm(false);
                    triggerToast("Audit logs cleared successfully.");
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold shadow-md shadow-rose-600/30 cursor-pointer"
                >
                  Clear Everything
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: SECURITY & PROFILE (CHANGE PASSWORD WITH EYE ICON)
// ==========================================
const SecurityEditorView = ({
  credentials,
  updateCredentials,
  exportDatabaseSQL,
  triggerToast,
}) => {
  const [newUsername, setNewUsername] = useState(credentials.username);
  const [newEmail, setNewEmail] = useState(credentials.email || "contact@itlcindia.com");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword && newPassword.length < 6) {
      setError("Passcode must be at least 6 characters long.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError("Passcodes do not match. Please re-enter.");
      return;
    }

    const updatedPass = newPassword || credentials.password;
    updateCredentials(newUsername, updatedPass, newEmail);
    setNewPassword("");
    setConfirmPassword("");
    triggerToast("Security Credentials & Recovery Email Successfully Updated in Database!");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-sky-400/20 pb-4">
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Security & <span className="text-sky-500 dark:text-sky-400">Admin Credentials</span>
        </h3>
        <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
          Update admin username, recovery email, and passcode. Password visibility toggled with interactive eye icon.
        </p>
      </div>

      {/* Encryption Status Banner */}
      <div className="p-4 rounded-2xl bg-sky-500/10 dark:bg-sky-950/30 border border-sky-400/40 text-slate-800 dark:text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-500 dark:text-sky-400">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-slate-900 dark:text-white">
                DATABASE ENCRYPTION SHIELD ACTIVE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                AES-256 + SHA-256
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              Admin passwords, client inquiries and database credentials are cryptographically protected against unauthorized access.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            exportDatabaseSQL();
            triggerToast("Encrypted MySQL Database Backup downloaded!");
          }}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-600 dark:text-sky-300 font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-102 active:scale-98"
        >
          <Database className="h-4 w-4" />
          <span>Export Encrypted SQL</span>
        </button>
      </div>

      <form
        onSubmit={handleUpdate}
        className="max-w-md p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border-2 border-sky-400/50 hover:border-sky-500 dark:hover:border-sky-400 ring-1 ring-sky-300/25 shadow-xl shadow-slate-200/50 dark:shadow-black/80 space-y-4 font-mono text-xs"
      >
        <div>
          <label className="block text-slate-700 dark:text-slate-300 uppercase font-bold mb-1">Current Username</label>
          <input
            type="text"
            required
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-mono text-sm focus:border-sky-500 outline-none"
          />
        </div>

        {/* Recovery Email Input */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-slate-700 dark:text-slate-300 uppercase font-bold">
              Recovery Email (Gmail / Corporate)
            </label>
            <span className="text-[10px] text-sky-500 dark:text-sky-400 font-mono">OTP Recipient</span>
          </div>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="e.g. contact@itlcindia.com or your personal Gmail"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-mono text-sm focus:border-sky-500 outline-none"
          />
        </div>

        {/* New Password with Eye Icon Toggle */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 uppercase font-bold mb-1">New Passcode</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Leave blank to keep current password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-mono text-sm focus:border-sky-500 outline-none"
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => {
                soundManager?.playHapticClick?.(800, 0.02);
                setShowPassword(!showPassword);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-sky-500 dark:hover:text-sky-300 cursor-pointer"
              title={showPassword ? "Hide Passcode" : "Show Passcode"}
            >
              {showPassword ? (
                <EyeOff className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400" />
              ) : (
                <Eye className="h-4.5 w-4.5 text-slate-400 hover:text-sky-500 dark:hover:text-sky-400" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password with Eye Icon Toggle */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 uppercase font-bold mb-1">Confirm New Passcode</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new passcode"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-slate-50 dark:bg-[#06112C] border border-sky-400/35 text-slate-900 dark:text-white font-mono text-sm focus:border-sky-500 outline-none"
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => {
                soundManager?.playHapticClick?.(800, 0.02);
                setShowConfirmPassword(!showConfirmPassword);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-sky-500 dark:hover:text-sky-300 cursor-pointer"
              title={showConfirmPassword ? "Hide Passcode" : "Show Passcode"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400" />
              ) : (
                <Eye className="h-4.5 w-4.5 text-slate-400 hover:text-sky-500 dark:hover:text-sky-400" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs text-rose-500 dark:text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 text-white font-bold uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Update Credentials</span>
          </button>
        </div>
      </form>
    </div>
  );
};
