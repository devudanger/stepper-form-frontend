import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const DynamicField = ({ field, value, onChange, error }) => {
  switch (field.type) {
    case "text":
      return (
        <TextField
          fullWidth
          label={field.label}
          value={value || ""}
          error={!!error}
          helperText={error}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      );

    case "select":
      return (
        <TextField
          select
          fullWidth
          label={field.label}
          value={value || ""}
          error={!!error}
          helperText={error}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          {field.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );

    case "radio":
      return (
        <FormControl error={!!error}>
          <FormLabel>{field.label}</FormLabel>

          <RadioGroup
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
          >
            {field.options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    default:
      return null;
  }
};

export default DynamicField;
