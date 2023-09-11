import * as React from "react";
import InsideLayout from "~/layouts/InsideLayout";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import ChooseLesson from "./ChooseLesson";
import LessonOption from "./LessonOption";
import ScheduleLesson from "./ScheduleLesson";
import Communication from "./Communication";
import TeacherCard from "./TeacherCard";
import { useRouter } from "next/router";
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";
import Calendar from "./CalendarDemo";

const steps = [
  "Lesson type",
  "Lesson Options",
  "Schedule lesson",
  "Communication",
];

export default function BookingPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [coach, setCoach] = React.useState();
  const [lessonID, setLessonID] = React.useState("trial");
  const [option, setOption] = React.useState<any>();

  const curUser = useSelector(selectAuthState);
  const router = useRouter();
  const coachID = router.query.coach_id;

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  React.useEffect(() => {
    if (coachID) {
      const api = "/api/common/getUser";
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: coachID }),
      };
      fetch(api, request)
        .then((res) => res.json())
        .then((data) => setCoach(data.user));
    }
  }, [coachID]);

  // React.useEffect(() => {
  //   console.log("This is coach", coach);
  // }, [coach]);

  return (
    coach && (
      <InsideLayout>
        <TeacherCard coach={coach} />
        <Box className="mx-auto max-w-screen-lg pb-10">
          <Stepper
            nonLinear
            activeStep={activeStep}
            className="mx-auto max-w-3xl pt-4"
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div className="pt-6">
            <React.Fragment>
              {activeStep === 0 ? (
                <ChooseLesson
                  curUser={curUser}
                  coach={coach}
                  sendLessonID={setLessonID}
                  selectedLessonID={lessonID}
                />
              ) : null}
              {activeStep === 1 ? (
                <LessonOption
                  curUser={curUser}
                  coach={coach}
                  lessonID={lessonID}
                  selectedOption={option}
                  sendOption={setOption}
                />
              ) : null}
              {activeStep === 2 ? <Calendar /> : null}
              {/* {activeStep === 2 ? <ScheduleLesson /> : null} */}
              {activeStep === 3 ? <Communication /> : null}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  variant="contained"
                  className="bg-primary-600 text-white"
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
                  Next
                </Button>
              </Box>
            </React.Fragment>
          </div>
        </Box>
      </InsideLayout>
    )
  );
}
