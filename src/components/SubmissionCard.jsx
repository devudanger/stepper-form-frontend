import {
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

const SubmissionCard = ({ submission, onContinue }) => {
  const [completed, total] = submission.progress.split("/");

  const progressPercent = (Number(completed) / Number(total)) * 100;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            {submission.title}
          </Typography>

          <Chip
            label={submission.status}
            color={submission.status === "completed" ? "success" : "warning"}
            sx={{ width: "fit-content" }}
          />

          <LinearProgress variant="determinate" value={progressPercent} />

          <Typography variant="body2" color="text.secondary">
            Progress: {submission.progress}
          </Typography>

          <Button variant="outlined" onClick={onContinue}>
            Continue
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
