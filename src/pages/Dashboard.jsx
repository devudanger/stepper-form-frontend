import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import configApi from "../api/config";
import submissionApi from "../api/submission";
import { useNavigate } from "react-router-dom";
import SubmissionCard from "../components/SubmissionCard";
import { useEffect, useState } from "react";
import { getUserId, setUserId } from "../utils/userStorage";

const Dashboard = () => {
  const [configs, setConfigs] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const [configRes, submissionRes] = await Promise.all([
        configApi.getConfigs(),
        submissionApi.getAllSubmissions({ userId }),
      ]);
      setConfigs(configRes.data);
      setSubmissions(submissionRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleCreateSubmission = async () => {
    const userId = getUserId();
    const response = await submissionApi.createSubmission({
      configId: configs[0]._id,
      userId,
    });
    if (!userId && response.data.userId) {
      setUserId(response.data.userId);
    }
    navigate(`/submission/${response.data.submission._id}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
      radial-gradient(circle at top left,
      rgba(37,99,235,.12),
      transparent 30%),
      radial-gradient(circle at bottom right,
      rgba(16,185,129,.10),
      transparent 30%),
      #f8fafc
    `,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: -180,
          left: -120,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(59,130,246,.15)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: "35%",
          right: -150,
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(16,185,129,.12)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: -180,
          left: "25%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(168,85,247,.12)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          minHeight: "100vh",
        }}
      >
        <Box py={6}>
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

            <Typography variant="h3" fontWeight={800}>
              Welcome Back ,
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9,
              }}
            >
              Manage your form submissions and continue where you left off.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: "30px" }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ marginBottom: "10px" }}
            >
              Available Forms
            </Typography>

            <Grid container spacing={3}>
              {configs.map((config) => (
                <Grid item xs={12} md={6} key={config._id}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 6,
                      backdropFilter: "blur(20px)",
                      background: "rgba(255,255,255,.85)",
                      border: "1px solid rgba(255,255,255,.5)",
                      boxShadow: "0 10px 40px rgba(15,23,42,.06)",
                      transition: "all .25s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 60px rgba(37,99,235,.15)",
                      },
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Chip
                          label={`${config.steps.length} Steps`}
                          color="primary"
                          sx={{
                            width: "fit-content",
                          }}
                        />

                        <Typography variant="h6" fontWeight={700}>
                          {config.title}
                        </Typography>

                        <Typography color="text.secondary">
                          Track your progress with draft saving support.
                        </Typography>

                        <Button
                          variant="contained"
                          onClick={handleCreateSubmission}
                          sx={{
                            borderRadius: 3,
                            py: 1,
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow: "0 10px 30px rgba(37,99,235,.25)",
                            fontSize: "16px",
                          }}
                        >
                          Create Submission
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ marginBottom: "10px" }}
            >
              My Submissions
            </Typography>
            {submissions.length === 0 ? (
              <Card
                sx={{
                  p: 8,
                  borderRadius: 6,
                  textAlign: "center",
                  background: "rgba(255,255,255,.8)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 70,
                    mb: 2,
                  }}
                >
                  {" "}
                  📋
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  No submissions yet
                </Typography>
                <Typography color="text.secondary" mt={1}>
                  Create your first form submission from one of the forms above.
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {submissions.map((submission) => (
                  <Grid item xs={12} md={6} lg={4} key={submission.id}>
                    <SubmissionCard
                      submission={submission}
                      onContinue={() =>
                        navigate(`/submission/${submission.id}`)
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
