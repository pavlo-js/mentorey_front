import StarIcon from "@mui/icons-material/Star";
import { useQuery } from "react-query";
import axios from "axios";

const Overview = ({ coachID }: { coachID: number }) => {
  const { data: lessons } = useQuery({
    queryKey: ["getCompletedLessons"],
    queryFn: async () => {
      const api = "/api/coach/get-completed-lessons";
      const { data: res } = await axios.post(api, { coachID });
      return res.lessons;
    },
  });

  return (
    <>
      <div className="mx-auto my-5 flex max-w-3xl flex-wrap justify-center">
        <div className="mt-2 w-1/3 text-center md:mt-0 md:w-1/5">
          <div className="mx-auto flex h-8 items-center justify-center">
            <StarIcon
              sx={{
                color: "#facc15",
                fontSize: "30px",
                "@media (max-width: 600px)": {
                  fontSize: "20px",
                },
              }}
            />
            <p
              className="ml-1 text-xl leading-none md:text-2xl lg:text-3xl"
              style={{ color: "#facc15" }}
            >
              5.0
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-700 md:text-lg lg:mt-1">
            Rating
          </p>
        </div>
        <div className="mt-2 w-1/3 text-center md:mt-0 md:w-1/5">
          <p className="h-8 text-xl font-bold md:text-2xl lg:text-3xl">236</p>
          <p className="text-sm font-semibold text-slate-700 md:text-lg lg:mt-1">
            Students
          </p>
        </div>
        <div className="mt-2 w-1/3 text-center md:mt-0 md:w-1/5">
          <p className="h-8 text-xl font-bold md:text-2xl lg:text-3xl">236</p>
          <p className="text-sm font-semibold text-slate-700 md:text-lg lg:mt-1">
            Lessons
          </p>
        </div>
        <div className="mt-2 w-1/3 text-center md:mt-0 md:w-1/5">
          <p className="h-8 text-xl font-bold md:text-2xl lg:text-3xl">100%</p>
          <p className="text-sm font-semibold text-slate-700 md:text-lg lg:mt-1">
            Attendance
          </p>
        </div>
        <div className="mt-2 w-1/3 text-center md:mt-0 md:w-1/5">
          <p className="h-8 text-xl font-bold md:text-2xl lg:text-3xl">100%</p>
          <p className="text-sm font-semibold text-slate-700 md:text-lg lg:mt-1">
            Response
          </p>
        </div>
      </div>
    </>
  );
};

export default Overview;
