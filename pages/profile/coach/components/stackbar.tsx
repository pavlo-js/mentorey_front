import styled from "@emotion/styled";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import axios from "axios";
import { useQuery } from "react-query";

export default function StackBar({ coachID }: { coachID: number }) {
  const { data: categories } = useQuery({
    queryKey: ["getCoachCategories"],
    queryFn: async () => {
      const api = "/api/common/getCoachCategory";
      const { data: res } = await axios.post(api, { coachID });
      return res.categories;
    },
  });

  return (
    <>
      <p className="mb-2 mr-4 text-sm font-semibold text-slate-500">
        <WorkspacePremiumIcon sx={{ color: "#facc15" }} className="mr-1" />
        Teaches :
      </p>
      <div className="flex">
        <div className="justify-starts flex flex-wrap items-center text-xs font-medium text-white">
          {categories &&
            categories.map((item: any, index: number) => (
              <span
                key={index}
                className="m-1 cursor-default rounded bg-primary-500 px-2 py-1"
              >
                {item.label}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}
