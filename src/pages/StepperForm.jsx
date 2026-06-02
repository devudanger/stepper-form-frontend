import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import submissionApi from "../api/submission";
import DynamicField from "../components/DynamicFields";

import {
  Box,
  CircularProgress,
  Stack,
  Button,
  Card,
  Chip,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { Edit, EditAttributes } from "@mui/icons-material";
import moment from "moment";

const StepperForm = () => {
  const { id } = useParams();

  const [config, setConfig] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const currentFields = config?.steps[currentStep]?.fields || [];
  const activeStep = config?.steps[currentStep];

  useEffect(() => {
    const handler = (event) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    loadSubmission();
  }, []);

  const loadSubmission = () => {
    submissionApi.getSubmissionById({ id }).then((response) => {
      setConfig(response.data.config);
      setAnswers(response.data.submission.answers);
      setCurrentStep(response.data.submission.currentStep);
      setCompletedSteps(response.data.submission.completedSteps);
      setLastUpdated(response.data.submission.lastUpdated);
    });
  };

  const handleFieldChange = (fieldName, value) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setHasUnsavedChanges(true);
  };

  const validateCurrentStep = () => {
    const errors = [];
    currentFields.forEach((field) => {
      if (field.required && !answers[field.name]?.toString().trim()) {
        errors.push(field.label);
      }
    });
    if (errors.length) {
      alert(`Please fill: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleSaveDraft = () => {
    submissionApi
      .updateSubmission({
        id,
        answers,
        step: currentStep,
        completedSteps,
        isDraft: true,
      })
      .then((res) => {
        setHasUnsavedChanges(false);
        alert("Draft Saved");
      })
      .catch((error) => console.log(error));
  };

  const handleNext = () => {
    const isValid = validateCurrentStep();
    if (!isValid) return;
    const updatedCompletedSteps = completedSteps.includes(currentStep)
      ? completedSteps
      : [...completedSteps, currentStep];
    const nextStep = currentStep + 1;
    submissionApi
      .updateSubmission({
        id,
        answers,
        step: currentStep,
        completedSteps: updatedCompletedSteps,
      })
      .then((res) => {
        loadSubmission();
        // setCompletedSteps(updatedCompletedSteps);
        // setCurrentStep(nextStep);
        setHasUnsavedChanges(false);
      })
      .catch((error) => console.log(error));
  };
  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const isValid = validateCurrentStep();
    if (!isValid) return;

    submissionApi
      .submitSubmission({
        id,
        answers,
      })
      .then(() => {
        alert("Form Submitted Successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  if (!config) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left,
          rgba(37,99,235,0.12),
          transparent 35%),
          radial-gradient(circle at top right,
          rgba(16,185,129,0.10),
          transparent 35%),
          #f8fafc
        `,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* HERO */}
          <Box
            sx={{
              p: 5,
              mb: 5,
              borderRadius: 6,
              background: "linear-gradient(135deg,#2563eb,#1f1f1f)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                right: -100,
                top: -100,
                width: 250,
                height: 250,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,.08)",
              }}
            />
            <Stack
              direction={{ xs: "column", lg: "row" }}
              justifyContent="space-between"
              spacing={4}
            >
              {/* LEFT */}

              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: "rgba(255,255,255,.7)",
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}
                >
                  EMPLOYEE ONBOARDING
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mt: 1,
                    lineHeight: 1.1,
                  }}
                >
                  {config.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: "rgba(255,255,255,.85)",
                    fontSize: "1.05rem",
                  }}
                >
                  Complete your onboarding journey step by step
                </Typography>

                {lastUpdated && (
                  <Chip
                    label={`Updated ${moment(lastUpdated).format(
                      "DD MMM • hh:mm A",
                    )}`}
                    size="small"
                    sx={{
                      mt: 2,
                      bgcolor: "rgba(255,255,255,.12)",
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,.15)",
                    }}
                  />
                )}
              </Box>

              {/* RIGHT */}

              <Card
                sx={{
                  minWidth: 220,
                  alignSelf: "center",

                  bgcolor: "rgba(255,255,255,.08)",

                  backdropFilter: "blur(20px)",

                  border: "1px solid rgba(255,255,255,.1)",

                  borderRadius: 4,

                  p: 3,
                }}
              >
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,.7)",
                        fontSize: 13,
                      }}
                    >
                      Progress
                    </Typography>

                    <Typography variant="h4" fontWeight={800} color="white">
                      {completedSteps.length}/{config.steps.length}
                    </Typography>
                  </Box>

                  <Chip
                    label={
                      completedSteps.length === config.steps.length
                        ? "Ready To Submit"
                        : "Draft"
                    }
                    color={
                      completedSteps.length === config.steps.length
                        ? "success"
                        : "warning"
                    }
                    sx={{
                      width: "fit-content",
                      fontWeight: 700,
                    }}
                  />
                </Stack>
              </Card>
            </Stack>
          </Box>
          {/* STEP JOURNEY */}
          <Box display="flex" alignItems="center">
            {config.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = currentStep === index;
              return (
                <>
                  <Paper
                    key={step._id}
                    elevation={isActive ? 6 : 1}
                    sx={{
                      flex: 1,
                      p: 2.5,
                      borderRadius: 4,
                      bgcolor: isCompleted
                        ? "#ecfdf5"
                        : isActive
                          ? "#eff6ff"
                          : "#ffffff",
                      border: isActive
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",
                      opacity: isCompleted || isActive ? 1 : 0.65,
                      transition: "all .25s ease",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: isCompleted
                            ? "success.main"
                            : isActive
                              ? "primary.main"
                              : "#d1d5db",
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircleIcon
                            sx={{
                              fontSize: 20,
                            }}
                          />
                        ) : (
                          index + 1
                        )}
                      </Box>

                      <Box>
                        <Typography fontWeight={700}>{step.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Step {index + 1}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  {index !== config.steps.length - 1 && (
                    <Box
                      sx={{
                        flex: 0.25,
                        height: 4,
                        mx: 1,
                        borderRadius: 20,
                        bgcolor: completedSteps.includes(index)
                          ? "success.main"
                          : "#dbeafe",
                      }}
                    />
                  )}
                </>
              );
            })}
          </Box>
          {/* FORM */}
          <motion.div
            key={currentStep}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <Card
              sx={{
                p: 5,
                borderRadius: 6,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
              }}
            >
              <Stack spacing={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Edit color="primary" />
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {activeStep.title}
                    </Typography>
                    <Typography color="text.secondary">
                      Step {currentStep + 1} of {config.steps.length}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  {currentFields.map((field) => (
                    <DynamicField
                      key={field._id}
                      field={field}
                      value={answers[field.name]}
                      onChange={handleFieldChange}
                    />
                  ))}
                </Stack>
              </Stack>
            </Card>
          </motion.div>
          {/* UNSAVED */}
          {hasUnsavedChanges && (
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "#fff7ed",
                border: "1px solid #fed7aa",
              }}
            >
              <Typography color="#c2410c" fontWeight={600}>
                You have unsaved changes.
              </Typography>
            </Paper>
          )}

          {/* FOOTER */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "rgba(255,255,255,0.8)",
            }}
          >
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                size="large"
                disabled={currentStep === 0}
                sx={{
                  borderRadius: 3,
                }}
              >
                ← Back
              </Button>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={handleSaveDraft}
                  size="large"
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  Save Draft
                </Button>

                {currentStep === config.steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    size="large"
                    sx={{
                      borderRadius: 3,
                      px: 4,
                    }}
                  >
                    Submit Form
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                    }}
                  >
                    Next →
                  </Button>
                )}
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default StepperForm;
