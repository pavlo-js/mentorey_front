import { TextField, Select, FormControl, MenuItem } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { CountryType } from "~/shared/types";
import Spinner from "~/components/common/Spinner";
import { toast } from "react-toastify";
import { countries } from "~/shared/data";
import { useRouter } from "next/router";
import useSetAuthState from "~/hooks/useSetAuthState";

// Set the datepicker's timezone as UTC
dayjs.extend(utc);
dayjs.extend(timezone);

export default function SignUpPage() {
  // Signup parameters
  const [firstName, setFirstname] = React.useState("");
  const [lastName, setLastname] = React.useState("");
  const [gender, setGender] = React.useState("MALE");
  const [email, setEmail] = React.useState<string>("");
  const [emailValid, setEmailValid] = React.useState<boolean>(true);
  const [password, setPassword] = React.useState<string>("");
  const [cpwd, setCpwd] = React.useState<string>("");
  const [pwdValid, setPwdValid] = React.useState<string>("valid");
  const [birthday, setBirthday] = React.useState<any>();
  const [birthValid, setBirthValid] = React.useState<boolean>(true);
  const [country, setCountry] = React.useState<CountryType | null>();
  const [countryValid, setCountryValid] = React.useState<boolean>(true);
  // Spinner state
  const [spin, setSpin] = React.useState<boolean>(false);
  // Next Router
  const router = useRouter();
  // User info setting hook
  const setAuthState = useSetAuthState();

  function isValidPwd(password: string, confirmPassword: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password !== confirmPassword) {
      setPwdValid("notMatch");
      return false;
    } else if (!passwordRegex.test(password)) {
      setPwdValid("invalid");
      return false;
    } else {
      setPwdValid("valid");
      return true;
    }
  }

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValid(true);
      return true;
    } else {
      setEmailValid(false);
      return false;
    }
  }

  function isValidBirth() {
    if (!birthday) {
      setBirthValid(false);
      return false;
    }
    return true;
  }

  function isValidCountry() {
    if (!country) {
      setCountryValid(false);
      return false;
    }
    return true;
  }

  function formValidate() {
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPwd(password, cpwd);
    const isBirthdayValid = isValidBirth();
    const isCountryValid = isValidCountry();
    return isEmailValid && isPasswordValid && isBirthdayValid && isCountryValid;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValidate() == true) {
      Register();
    }
  };

  function Register() {
    const tempDay = new Date(birthday);
    const formattedDate = tempDay.toISOString().split("T")[0];

    const url = "/api/auth/signup";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        gender,
        country: country?.code,
        birthday: formattedDate,
      }),
    };
    setSpin(true);
    fetch(url, request)
      .then((res) => res.json())
      .then((data) => handleResponse(data))
      .catch((err) => {
        console.error("wee", err);
        toast.error("Registration failed. Please insert valid information.");
      })
      .finally(() => {
        setSpin(false);
      });
  }

  function handleResponse(data: any) {
    if (data.message) {
      console.log(data.message);
      if (data.message === "Email_Exists")
        toast.error("Your email has already taken. Please sign in.");
      return false;
    } else if (data.newUser) {
      console.log(data.newUser);
      setAuthState(data.newUser);
      router.push(`/auth/verify/`);
    }
  }

  return (
    <>
      {spin && <Spinner title="Signing up... One moment please" />}
      <div className="mx-auto my-10 max-w-lg rounded-xl border border-slate-300 bg-white p-8">
        <h1 className="mb-2 text-4xl font-medium">Sign Up</h1>
        <p className="text-slate-500">Hi 👋, Welcome to mentorey</p>
        <div className="my-5">
          <button className="my-3 flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-400 py-3 text-center text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="h-6 w-6"
              alt=""
            />
            <span>Sign Up with Google</span>
          </button>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="mb-5 mt-10"
          autoComplete="false"
        >
          <div className="flex flex-col space-y-5">
            <div className="flex">
              <div className="flex-1 pr-2">
                <p className="mb-1 select-none font-medium text-slate-700">
                  First name
                </p>
                <TextField
                  className="w-full"
                  value={firstName}
                  required
                  placeholder="First name"
                  size="small"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="flex-1 pl-2">
                <p className="mb-1 select-none font-medium text-slate-700">
                  Last name
                </p>
                <TextField
                  className="w-full"
                  value={lastName}
                  required
                  placeholder="Last name"
                  size="small"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="mb-1 select-none font-medium text-slate-700">
                Email address
              </p>
              <TextField
                className="w-full"
                value={email}
                required
                error={!emailValid}
                helperText={
                  emailValid ? undefined : "Please insert valid email address"
                }
                placeholder="Enter your email address"
                size="small"
                onBlur={(e) => isValidEmail(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex">
              <div className="flex-1 pr-2">
                <p className="mb-1 select-none font-medium text-slate-700">
                  Birthday
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={birthday}
                    timezone="UTC"
                    onChange={(newDate) => {
                      setBirthday(newDate);
                      setBirthValid(true);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        error: !birthValid && true,
                        helperText: !birthValid && "Set your birthday",
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex-1 pl-2">
                <p className="mb-1 select-none font-medium text-slate-700">
                  Gender
                </p>
                <FormControl className="w-full" size="small">
                  <Select
                    labelId="demo-select-small-label"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div>
              <p className="mb-1 select-none font-medium text-slate-700">
                Country
              </p>
              <Autocomplete
                className="w-full"
                size="small"
                options={countries}
                getOptionLabel={(option) => option.label}
                aria-required
                onChange={(event, value) => {
                  if (value) {
                    setCountry(value);
                    setCountryValid(true);
                  }
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    placeholder="Choose your region"
                    error={!countryValid && true}
                    helperText={!countryValid && "You must choose your region"}
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>

            <div>
              <p className="mb-1 select-none font-medium text-slate-700">
                Password
              </p>
              <TextField
                className="w-full"
                type="password"
                value={password}
                error={pwdValid == "invalid" ? true : undefined}
                helperText={
                  pwdValid == "invalid"
                    ? "Password must contain at least 8 characters, one Uppercase letter, one symbol (@$!%*?&), and one number."
                    : undefined
                }
                required
                placeholder="Enter your password"
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <p className="mb-1 select-none font-medium text-slate-700">
                Confirm Password
              </p>
              <TextField
                className="w-full"
                type="password"
                value={cpwd}
                error={pwdValid == "notMatch" ? true : undefined}
                helperText={
                  pwdValid == "notMatch" ? "Password do not match." : undefined
                }
                required
                placeholder="Please confirm your password"
                size="small"
                onChange={(e) => setCpwd(e.target.value)}
              />
            </div>

            <button className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border-primary-500 bg-primary-600 py-3 font-medium text-white hover:bg-primary-500 hover:shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Sign Up</span>
            </button>
            <p className="text-center">
              Already a member? &nbsp;&nbsp; &nbsp;{" "}
              <a
                href="/signin"
                className="inline-flex items-center space-x-1 font-medium text-primary-600"
              >
                <span>Sign In now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
