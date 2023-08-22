import * as React from "react";
import InsideLayout from "~/layouts/InsideLayout";
import { Paper, Button, InputAdornment } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  RadioButtonGroup,
  SelectElement,
} from "react-hook-form-mui";
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";
import { CurrencyData } from "~/shared/CurrencyData";
import { Category } from "~/shared/types";
import { useRouter } from "next/router";

export default function NewLessonPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [desc, setDesc] = React.useState<string>("");
  const [purpose, setPurpose] = React.useState<string>("");
  const curUser = useSelector(selectAuthState);
  const currencySymbol = CurrencyData[curUser?.currency]?.symbol;
  const router = useRouter();

  React.useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    const url = "/api/common/getAllCategories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error(err));
  }

  function submitData(data: any) {
    const url = "/api/coach/create_lesson";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userID: curUser?.id }),
    };
    fetch(url, request).then((res) => {
      console.log(res);
      router.push("/coach/dashboard");
    });
  }

  return (
    <InsideLayout>
      <FormContainer
        defaultValues={{ lessonType: "MIN60", lessonPack: 1, disRate: 0 }}
        onSuccess={(data) => submitData(data)}
      >
        <Paper className="mx-auto mb-4 flex max-w-3xl flex-wrap items-start px-2 py-4 md:px-3 md:py-6 lg:px-4 lg:py-8">
          <h2 className="mb-5 mt-3 w-full text-center text-2xl font-bold text-slate-700">
            Create a New Lesson
          </h2>
          <div className="my-2 w-full">
            <label htmlFor="lessonTitle">Lesson Title *</label>
            <TextFieldElement
              name="lessonTitle"
              size="small"
              required
              fullWidth
            />
          </div>
          <div className="my-2 w-full md:w-1/2 md:pr-2">
            <label htmlFor="lessonCategory">Lesson Category *</label>
            <SelectElement
              name="lessonCategory"
              options={categories}
              required
              size="small"
              className="w-full"
            />
          </div>
          <div className="my-2 w-full md:w-1/2 md:pl-2">
            <label htmlFor="price">Price per hour</label>
            <TextFieldElement
              name="price"
              required
              size="small"
              type="number"
              className="w-full"
              validation={{ min: 5, max: 100 }}
              InputProps={{
                inputProps: { min: 5, max: 100 },
                startAdornment: (
                  <InputAdornment position="start">
                    {currencySymbol}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="my-2 w-full md:w-1/2 md:pr-2">
            <label htmlFor="price">Lesson Pack</label>
            <TextFieldElement
              name="lessonPack"
              required
              size="small"
              type="number"
              className="w-full"
              helperText="Set how many lessons are there in your new class"
              validation={{ min: 1, max: 100 }}
              InputProps={{
                inputProps: { min: 1, max: 100 },
              }}
            />
          </div>
          <div className="my-2 w-full md:w-1/2 md:pl-2">
            <label htmlFor="price">Discount rate</label>
            <TextFieldElement
              name="disRate"
              size="small"
              type="number"
              className="w-full"
              helperText="Set the discount rate for lesson package."
              validation={{ min: 0, max: 100 }}
              InputProps={{
                inputProps: { min: 0, max: 100 },
              }}
            />
          </div>
          <div className="my-2 w-full items-center">
            <p>Lesson Type</p>
            <RadioButtonGroup
              row
              name="lessonType"
              options={[
                { id: "MIN30", label: "30min" },
                { id: "MIN60", label: "60min" },
                { id: "MIXED", label: "Let student choose" },
              ]}
            />
          </div>

          <div className="w-full">
            <TextFieldElement
              name="description"
              label="Description"
              placeholder="Insert some description about your coach..."
              multiline
              rows={5}
              className="mt-4 w-full"
              validation={{ minLength: 50, maxLength: 1200 }}
              onChange={(e) => setDesc(e.target.value)}
              helperText={`${desc.length} / 1200`}
              FormHelperTextProps={{ className: "ml-auto block" }}
            />
          </div>
          <div className="w-full">
            <TextFieldElement
              name="purpose"
              label="Purpose"
              placeholder="Describe students what they will get after this lesson."
              multiline
              rows={5}
              className="mt-4 w-full"
              validation={{ minLength: 50, maxLength: 1200 }}
              onChange={(e) => setPurpose(e.target.value)}
              helperText={`${purpose.length} / 1200`}
              FormHelperTextProps={{ className: "ml-auto block" }}
            />
          </div>
          <div className="mt-6 flex w-full justify-end">
            <div>
              <Button type="button" variant="outlined">
                Cancel
              </Button>
            </div>
            <div className="ml-4">
              <Button
                type="submit"
                variant="contained"
                className="bg-primary-600"
              >
                Submit
              </Button>
            </div>
          </div>
        </Paper>
      </FormContainer>
    </InsideLayout>
  );
}
