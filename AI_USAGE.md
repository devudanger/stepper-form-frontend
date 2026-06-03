# AI Usage Report

## AI Tools Used

- ChatGPT (OpenAI)
- CURSOR IDE (for occasional code suggestions and autocompletion)

---

## How AI Was Used

AI was used as a development assistant during the implementation process. Its primary role was to help with:

- Brainstorming architecture approaches
- Reviewing API design decisions
- Generating UI/UX improvement ideas
- Suggesting React and Material UI patterns
- Discussing MongoDB schema design
- Identifying edge cases and validation scenarios
- Reviewing deployment issues

Logic level thinking, Final implementation decisions, code integration, debugging, testing, and architectural choices were performed manually.

---

## Example Prompts Used

### Backend Architecture

> Design a scalable Node.js backend architecture using routes, controllers, services, and data access layers for a dynamic multi-step form application.

### MongoDB Schema Design

> How should a submission model be designed to support draft saving, progress tracking, and dynamic form configurations?

### API Validation

> Review this update submission flow and suggest validation strategies for dynamic form fields.

### React UI

> Suggest a modern dashboard UI for a multi-step form application using React and Material UI.

### Stepper Form Experience

> How can I improve the UX of a multi-step form with draft saving and progress indicators?

### Deployment

> Troubleshoot deployment issues for a Node.js Express application connected to MongoDB.

---

## What I Modified From AI Output

Most AI-generated suggestions were adapted before implementation.

Examples:

### User Tracking

AI initially suggested using a hardcoded user identifier for testing.

I modified the design to:

- Generate a UUID for first-time users
- Store it in localStorage
- Reuse the same identifier across future submissions

This provided realistic user separation without requiring authentication.

### Submission Workflow

AI proposed a simpler save flow.

I modified it to support:

- Draft saves without validation
- Step completion validation
- Progress tracking
- Final submission validation

### UI Design

AI suggested basic Material UI layouts.

I redesigned multiple sections to create:

- Improved visual hierarchy
- Progress indicators
- Modern dashboard and form layouts
- Better responsive behavior

---

## What AI Got Wrong

Some suggestions required correction before implementation.

### User Identification

Initial approaches would have caused different users to see each other's submissions.

This was corrected by introducing a generated UUID per user.

### Draft Saving Logic

Some suggested flows validated required fields during draft saves.

Draft saving was adjusted to allow incomplete data while preserving validation for step completion and final submission.

### Deployment Suggestions

Certain deployment configurations were not compatible with the final hosting setup and required manual debugging and adjustment.

---

## How I Verified Correctness

### Backend Testing

Manually tested all APIs using Postman:

- Create Submission
- Update Submission
- Save Draft
- Get Submission By Id
- Get User Submissions
- Final Submit

### Validation Testing

Verified:

- Required field validation
- Invalid option handling
- Draft save behavior
- Step progression rules

### Frontend Testing

Verified:

- Dynamic field rendering
- Draft persistence
- Navigation between steps
- Progress indicators
- Responsive layouts

### End-to-End Testing

Created multiple submissions and verified:

- Draft restoration
- Progress tracking
- Final submission workflow
- User-specific submission visibility

---

## Reflection

AI significantly accelerated brainstorming, UI ideation, and troubleshooting. However, the project required substantial manual engineering decisions, debugging, architecture design, validation logic, and testing to arrive at the final solution.

The final implementation represents a combination of AI-assisted development and developer-driven decision making.
