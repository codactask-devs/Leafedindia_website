import React, { useRef, useState, useCallback, useEffect } from "react";
import jsPDF from "jspdf";
import { svg2pdf } from "svg2pdf.js";
import { exportStageAsSVG } from "../utils/svgExporter";
import LeftSidebar from "../components/LeftSidebar";
import Sidebar from "../components/Sidebar";
import CanvasArea from "../components/CanvasArea";
import Toolbar from "../components/Toolbar";
import QuickAction from "../components/QuickAction";
import useStore from "../store/useStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TourProvider, useTour } from "@reactour/tour";
import "../StudioEditor.css";

// ─── Tour Step Definitions ────────────────────────────────────────────────────
const TOUR_STEPS = [
  {
    selector: '[data-tour="tab-templates"]',
    tab: "templates",
    icon: "🎨",
    title: "Design Templates",
    body: "Start your project by choosing a pre-made template. Simply click or drag any design onto the canvas to set a professional base for your box design.",
  },
  {
    selector: '[data-tour="tab-shapes"]',
    tab: "shapes",
    icon: "📐",
    title: "Shape Elements",
    body: "Add geometric shapes to your design. Use squares, circles, and stars to create background patterns or callout boxes for your brand.",
  },
  {
    selector: '[data-tour="tab-images"]',
    tab: "images",
    icon: "📸",
    title: "Image Management",
    body: "Upload your company logos or choose from our pre-uploaded gallery. Drag and drop onto the canvas to add personal touches to your packaging.",
  },
  {
    selector: '[data-tour="tab-text"]',
    tab: "text",
    icon: "✍️",
    title: "Text & Typography",
    body: "Add headings and body text to communicate your brand message. Click the text on the canvas to customize fonts, sizes, and colors instantly.",
  },
  {
    selector: '[data-tour="save-btn"]',
    icon: "💾",
    title: "Save Progress",
    body: 'Clicking "Save Changes" stores a snapshot of your design in the "Attachments" list. This allows you to create multiple versions of a design within a single session.',
  },
  {
    selector: '[data-tour="export-btn"]',
    icon: "🚀",
    title: "Email The Design",
    body: 'Send your saved designs directly to us along with your details. Just click "Email Design" to share your work instantly and keep the process moving smoothly.',
  },
];

// Build reactour-compatible steps
const tourSteps = TOUR_STEPS.map((s) => ({ selector: s.selector }));

// ─── Custom Tour Popover Content ─────────────────────────────────────────────
function TourContent({ currentStep, setCurrentStep, setIsOpen, steps }) {
  const { setActiveTab } = useStore();
  const total = steps.length;
  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === total - 1;

  // Auto-switch tabs based on the step's 'tab' property
  React.useEffect(() => {
    if (step && step.tab) {
      setActiveTab(step.tab);
    }
  }, [currentStep, step, setActiveTab]);

  const goNext = () => {
    if (isLast) {
      setIsOpen(false);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const skip = () => setIsOpen(false);

  if (!step) return null;

  return (
    <div
      className="tour-popover-inner"
      role="dialog"
      aria-labelledby="tour-title"
      style={{
        minWidth: "340px",
        zIndex: 1000001,
        padding: "32px",
        background: "#ffffff",
        borderRadius: "24px",
        fontFamily: "'Mazzard', sans-serif"
      }}
    >
      {/* progress dots */}
      <div
        className="tour-dots"
        style={{ marginBottom: "24px", display: "flex", gap: "8px", justifyContent: "center" }}
      >
        {TOUR_STEPS.map((_, i) => (
          <span
            key={i}
            className={`tour-dot${i === currentStep ? " active" : ""}`}
            onClick={() => setCurrentStep(i)}
            aria-label={`Go to step ${i + 1}`}
            style={{
              width: i === currentStep ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === currentStep ? "#7c3aed" : "#e4e4ee",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: i === currentStep ? "0 0 10px rgba(124, 58, 237, 0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* icon + text */}
      <div
        className="tour-step-icon"
        aria-hidden="true"
        style={{
          fontSize: "52px",
          marginBottom: "16px",
          animation: "icon-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        {step.icon}
      </div>
      <h3
        className="tour-step-title"
        id="tour-title"
        style={{
          fontSize: "26px",
          fontWeight: "800",
          color: "#1e1a3a",
          marginBottom: "12px",
          lineHeight: "1.2"
        }}
      >
        {step.title}
      </h3>
      <p
        className="tour-step-body"
        style={{
          fontSize: "15px",
          color: "#6b6b80",
          lineHeight: "1.7",
          marginBottom: "24px",
        }}
      >
        {step.body}
      </p>

      {/* step counter */}
      <div
        className="tour-step-counter"
        style={{
          color: "#9898b0",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
        }}
      >
        Step {currentStep + 1} / {total}
      </div>

      {/* navigation */}
      <div
        className="tour-nav"
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "12px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <button
          className="tour-btn-skip"
          onClick={skip}
          style={{
            flex: 1,
            padding: "14px",
            background: "#f1f1f7",
            color: "#6b6b80",
            border: "1px solid #e4e4ee",
            borderRadius: "14px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e4e4ee";
            e.currentTarget.style.color = "#1e1a3a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f1f1f7";
            e.currentTarget.style.color = "#6b6b80";
          }}
        >
          Skip
        </button>
        <button
          className="tour-btn-next"
          onClick={goNext}
          style={{
            flex: 2,
            padding: "14px",
            background: "#7c3aed",
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "14px",
            boxShadow: "0 8px 16px rgba(124, 58, 237, 0.25)",
            transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#6d28d9";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(124, 58, 237, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#7c3aed";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(124, 58, 237, 0.25)";
          }}
        >
          {isLast ? "Begin Designing ✨" : "Next Step →"}
        </button>
      </div>
    </div>
  );
}

// ─── Inner Editor (has access to useTour hook) ────────────────────────────────
function EditorInner() {
  const { setIsOpen } = useTour();

  const handleStartTour = () => {
    setIsOpen(true);
  };

  const {
    addObject,
    setTemplate,
    objects,
    savedDesigns,
    addSavedDesign,
    removeSavedDesign,
    clearSavedDesigns,
    hasChanges,
    setHasChanges,
    showConfirmModal,
    setShowConfirmModal,
    pendingTemplate,
    setPendingTemplate,
    resetCanvas,
    loadSvgTemplate: storeLoadSvgTemplate,
    selectedId,
    selectObject,
    canvasBackground,
  } = useStore();

  const stageRef = useRef(null);

  // States for modals and notifications
  const [isSending, setIsSending] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSaveNameModal, setShowSaveNameModal] = useState(false);
  const [showUniqueKeyModal, setShowUniqueKeyModal] = useState(false);
  const [generatedUniqueKey, setGeneratedUniqueKey] = useState("");
  const [notification, setNotification] = useState(null); // { message, type }
  const [isCopied, setIsCopied] = useState(false);

  // Design Name State
  const [tempDesignName, setTempDesignName] = useState("");

  // User Info Form State
  const [userInfo, setUserInfo] = useState({
    name: "",
    countryCode: "91",
    phoneNumber: "",
    email: "",
  });

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // ─── Cold Start Ping ────────────────────────────────────────────────────────
  // Netlify functions are triggered on demand. A ping is less critical here but can be added if needed.

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const payloadStr = e.dataTransfer.getData("payload");
    const payload = payloadStr ? JSON.parse(payloadStr) : {};

    const x = 100 + Math.random() * 50;
    const y = 100 + Math.random() * 50;

    const hasTemplate = objects.some((obj) => obj.type === "svg-path");

    if (type === "image") {
      addObject({
        type: "image",
        src: payload.src || "https://via.placeholder.com/150",
        x,
        y,
        width: 250,
        height: 250,
      });
    } else if (type === "text") {
      addObject({
        type: "text",
        text: payload.text || "Hello",
        fontSize: payload.fontSize || 32,
        fontWeight: payload.fontWeight || "400",
        fontFamily: payload.fontFamily || "'Mazzard', sans-serif",
        fill: "#0f172a",
        x,
        y,
      });
    } else if (type === "svg-template") {
      if (hasChanges && hasTemplate) {
        setPendingTemplate({ type: "svg-template", x, y, url: payload.url });
        setShowConfirmModal(true);
      } else {
        storeLoadSvgTemplate(x, y, payload.url);
      }
    } else if (type === "template") {
      if (hasChanges && hasTemplate) {
        setPendingTemplate({ type: "template", payload });
        setShowConfirmModal(true);
      } else {
        setTemplate(payload);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  /**
   * Export as a true vector PDF using svg2pdf.js on top of jsPDF.
   * The SVG paths from the box template + user content are embedded as
   * real vector objects — not a rasterised image — so CorelDraw (and
   * Illustrator / Inkscape) can open the PDF and edit every element.
   */
  const getCanvasBlob = async () => {
    // Deselect so handles don't appear in export
    const currentId = selectedId;
    if (currentId) {
      selectObject(null);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }

    try {
      // 1. Build the vector SVG from the canvas objects
      const svgBlob = await exportStageAsSVG(objects);
      const svgText = await svgBlob.text();

      // 2. Parse the SVG string into a DOM element that jsPDF can read
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
      const svgElement = svgDoc.documentElement;

      // 3. Create an A4-landscape PDF and embed the SVG as vector content
      // We enable 'compress: true' to minimize the final PDF file size.
      const pdf = new jsPDF({ 
        orientation: "landscape", 
        unit: "pt", 
        format: "a4",
        compress: true 
      });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();

      await svg2pdf(svgElement, pdf, {
        x: 0,
        y: 0,
        width: pdfW,
        height: pdfH
      });

      const blob = pdf.output("blob");

      // Restore selection
      if (currentId) selectObject(currentId);

      return blob;
    } catch (err) {
      console.error("PDF generation error:", err);
      if (currentId) selectObject(currentId);
      throw err;
    }
  };

  const initiateSave = () => {
    const hasTemplate = objects.some((obj) => obj.type === "svg-path");
    if (!hasTemplate) {
      notify("Please select a template before saving.", "error");
      return;
    }
    setTempDesignName(`Design ${savedDesigns.length + 1}`);
    setShowSaveNameModal(true);
  };

  const handleSaveDesign = async (e) => {
    if (e) e.preventDefault();
    if (!tempDesignName) return;

    const pdfBlob = await getCanvasBlob();
    if (pdfBlob) {
      addSavedDesign({ name: tempDesignName, blob: pdfBlob });
      setShowSaveNameModal(false);
      notify("Design saved to attachments!");

      // If we were in a "Save & Switch" flow, handle the switch now
      if (pendingTemplate) {
        executeTemplateSwitch();
      }
    }
  };

  const executeTemplateSwitch = () => {
    if (pendingTemplate) {
      if (pendingTemplate.type === "svg-template") {
        storeLoadSvgTemplate(
          pendingTemplate.x,
          pendingTemplate.y,
          pendingTemplate.url,
        );
      } else if (pendingTemplate.type === "template") {
        setTemplate(pendingTemplate.payload);
      }
    }
    setShowConfirmModal(false);
    setPendingTemplate(null);
  };

  const handleConfirmDiscard = () => {
    executeTemplateSwitch();
  };

  const handleConfirmSave = async () => {
    const hasTemplate = objects.some((obj) => obj.type === "svg-path");
    setShowConfirmModal(false);

    if (!hasTemplate) {
      executeTemplateSwitch();
      return;
    }

    initiateSave();
    // executeTemplateSwitch is called inside handleSaveDesign after saving
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    setPendingTemplate(null);
  };

  const handleExportClick = () => {
    const hasTemplate = objects.some((obj) => obj.type === "svg-path");
    const hasSavedDesigns = savedDesigns.length > 0;

    if (!hasTemplate && !hasSavedDesigns) {
      notify(
        "Nothing to export. Please select a template and create a design first.",
        "error",
      );
      return;
    }
    setShowUserModal(true);
  };

  const handleFinalExport = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.phoneNumber || !userInfo.email) {
      notify("Please fill in all details.", "error");
      return;
    }

    const fullContact = `+${userInfo.countryCode} ${userInfo.phoneNumber}`;

    setShowUserModal(false);
    setIsSending(true);

    try {
      const generateUniqueKey = () => {
        const now = new Date();
        const dateStr =
          now.getFullYear() +
          String(now.getMonth() + 1).padStart(2, "0") +
          String(now.getDate()).padStart(2, "0");
        const randomStr = Math.floor(1000 + Math.random() * 9000);
        return `IQ-${dateStr}-${randomStr}`;
      };

      const uniqueKey = generateUniqueKey();
      const formData = new FormData();

      formData.append("userName", userInfo.name);
      formData.append("userContact", fullContact);
      formData.append("userEmail", userInfo.email);
      formData.append("uniqueKey", uniqueKey);

      savedDesigns.forEach((design) => {
        formData.append(
          "pdfs",
          new File([design.blob], `${design.name}.pdf`, {
            type: "application/pdf",
          }),
        );
      });

      if (hasChanges && objects.length > 0) {
        const currentBlob = await getCanvasBlob();
        formData.append(
          "pdfs",
          new File([currentBlob], "current-design.pdf", {
            type: "application/pdf",
          }),
        );
      }
      const response = await fetch(
        "/api/send-pdf",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        setGeneratedUniqueKey(uniqueKey);
        setShowUniqueKeyModal(true);
        clearSavedDesigns();
        resetCanvas();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details
          ? `${errorData.error} (${errorData.details})`
          : errorData.error || "Unknown error";
        notify("Failed to send: " + errorMessage, "error");
      }
    } catch (error) {
      console.error("Export error:", error);
      notify("Cannot connect to backend server.", "error");
    } finally {
      setIsSending(false);
    }
  };

  const handleDownload = async () => {
    const hasTemplate = objects.some((obj) => obj.type === "svg-path");
    if (!hasTemplate && savedDesigns.length === 0) {
      notify("Please create or save a design before downloading.", "error");
      return;
    }

    try {
      notify("Generating PDF for download...");
      const blob = await getCanvasBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leafed-india-design.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      notify("Download started!");
    } catch (err) {
      console.error("Download error:", err);
      notify("Failed to generate PDF for download.", "error");
    }
  };

  return (
    <div className="studio-root">
      <div className="app-main-container">
        <Toolbar
          onExport={handleExportClick}
          onSave={initiateSave}
          onToggleSavedList={() => setShowAttachments(!showAttachments)}
          onStartTour={handleStartTour}
          onDownload={handleDownload}
        />
        <div className="app-content-layout">
          <LeftSidebar />
          <Sidebar />
          <main
            className="canvas-workspace"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              "--canvas-bg": `url("${canvasBackground}")`,
            }}
          >
            <CanvasArea stageRef={stageRef} />
            <QuickAction />
          </main>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Unsaved Changes</h3>
              <p>You have unsaved changes. Save before switching templates?</p>
              <div className="modal-footer">
                <button
                  className="btn btn-outline"
                  onClick={handleConfirmCancel}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDiscard}
                >
                  Discard
                </button>
                <button className="btn btn-success" onClick={handleConfirmSave}>
                  Save & Switch
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Name Modal */}
        {showSaveNameModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Save Design</h3>
              <p>Enter a name for this attachment.</p>
              <form onSubmit={handleSaveDesign}>
                <div className="user-modal">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Design Name"
                      value={tempDesignName}
                      onChange={(e) => setTempDesignName(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setShowSaveNameModal(false);
                      setPendingTemplate(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save Design
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Info Modal */}
        {showUserModal && (
          <div className="modal-overlay">
            <div className="modal-content user-modal">
              <h3>Your Details</h3>
              <p>Please enter your details to receive the export.</p>
              <form onSubmit={handleFinalExport}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group phone-input-split">
                  <div className="country-picker-wrapper">
                    <PhoneInput
                      country={"in"}
                      enableSearch={true}
                      disableSearchIcon={true}
                      value={userInfo.countryCode}
                      onChange={(value, data) =>
                        setUserInfo({ ...userInfo, countryCode: data.dialCode })
                      }
                      containerClass="picker-container"
                      inputClass="picker-input"
                      buttonClass="picker-button"
                      dropdownClass="picker-dropdown"
                      placeholder=""
                    />
                  </div>
                  <input
                    type="tel"
                    className="phone-number-input"
                    placeholder="Phone Number"
                    value={userInfo.phoneNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ""); // Only digits
                      setUserInfo({ ...userInfo, phoneNumber: val });
                    }}
                    maxLength={20}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send & Export
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Unique Key Modal */}

        {showUniqueKeyModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{ color: "#0d6e41" }}>Thank you!</h3>
              <p>
                Your design has been received. Please save your unique ID for
                all future communication regarding this submission
              </p>
              <div
                className="form-group"
                style={{ display: "flex", gap: "8px", marginTop: "15px" }}
              >
                <input
                  type="text"
                  value={generatedUniqueKey}
                  readOnly
                  style={{
                    background: "#f3f4f6",
                    flex: 1,
                    cursor: "text",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    color: "#1f2937",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedUniqueKey);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    backgroundColor: isCopied ? "#059669" : "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                    minWidth: "100px",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (!isCopied)
                      e.currentTarget.style.backgroundColor = "#059669";
                  }}
                  onMouseLeave={(e) => {
                    if (!isCopied)
                      e.currentTarget.style.backgroundColor = "#10b981";
                  }}
                >
                  {isCopied ? (
                    <>
                      <span
                        style={{
                          display: "inline-block",
                          animation: "checkmark 0.3s ease-in-out",
                        }}
                      >
                        ✓
                      </span>
                      Copied!
                    </>
                  ) : (
                    "Copy"
                  )}
                </button>
              </div>
              <div className="modal-footer" style={{ marginTop: "20px" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowUniqueKeyModal(false)}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#0d6e41",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0a5a36")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0d6e41")
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Attachment List Popup */}
        {showAttachments && (
          <div className="attachments-popup shadow-lg">
            <div className="popup-header">
              <h4>Saved Attachments ({savedDesigns.length})</h4>
              <button
                className="close-btn"
                onClick={() => setShowAttachments(false)}
              >
                &times;
              </button>
            </div>
            <div className="popup-body">
              {savedDesigns.length === 0 ? (
                <p className="empty-text">No designs saved yet.</p>
              ) : (
                <ul className="attachment-list">
                  {savedDesigns.map((design) => (
                    <li key={design.id} className="attachment-item">
                      <span>{design.name}</span>
                      <div className="attachment-actions">
                        <button
                          className="download-btn"
                          onClick={() => {
                            const url = URL.createObjectURL(design.blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `${design.name}.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                            notify(`Downloading ${design.name}...`);
                          }}
                        >
                          Download
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeSavedDesign(design.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Notifications */}
        {notification && (
          <div className={`notification-toast ${notification.type}`}>
            <p>{notification.message}</p>
          </div>
        )}

        {isSending && (
          <div className="sending-overlay">
            <div className="loading-spinner"></div>
            <p>Preparing and sending your designs...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root Editor with TourProvider ──────────────────────────────────────────
function Editor() {
  return (
    <TourProvider
      steps={tourSteps}
      defaultOpen={false}
      showNavigation={false}
      showBadge={false}
      showDots={false}
      showCloseButton={false}
      disableInteraction={false}
      ContentComponent={TourContent}
      styles={{
        popover: (base) => ({
          ...base,
          background: "white",
          color: "#333333",
          borderRadius: "28px",
          border: "1px solid #0d6e41",
          boxShadow: "0 25px 50px -12px rgba(13, 110, 65, 0.25)",
          padding: "0",
          maxWidth: 400,
          zIndex: 1000001,
          overflow: "visible",
        }),
        maskWrapper: (base) => ({
          ...base,
          opacity: 0.8,
          backdropFilter: "blur(4px)",
          zIndex: 1000000,
        }),
        maskArea: (base) => ({
          ...base,
          rx: 20,
        }),
        mask: (base) => ({
          ...base,
          color: "rgba(10, 93, 60, 0.3)", // Semi-transparent green mask
        }),
      }}
    >
      <EditorInner />
    </TourProvider>
  );
}

export default Editor;
