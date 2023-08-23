import React from "react";
import { useEffect, useState, useRef } from "react";
import InsideLayout from "~/layouts/InsideLayout";
import {
  Paper,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  Autocomplete,
  Box,
  Avatar,
  Badge,
  IconButton,
  Modal,
  Slider,
  Chip,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CountryType } from "~/shared/types";
import { countries } from "~/shared/data";
import AvatarEditor from "react-avatar-editor";
import ReactAvatarEditor from "react-avatar-editor";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { validatePhoneNumber, getFileExtension } from "~/utils/utils";
import { useRouter } from "next/navigation";
import { CurrencyData } from "~/shared/CurrencyData";
// language Selector
import { LanguageData } from "~/shared/data";
import { SelectChangeEvent } from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
// Phone number input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// Redux
import useSetAuthState from "~/hooks/useSetAuthState";
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";
// Image Upload
import AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

// dayjs.extend(utc);
// dayjs.extend(timezone);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface PictureState {
  img: string | null;
  zoom: number;
  croppedImg: string;
}

const labelStyle = "original";
const timezones = {
  ...allTimezones,
};

const EditProfilePage = () => {
  const [user, setUser] = useState<any>();
  const curUser = useSelector(selectAuthState);
  const [firstName, setFirstName] = useState<string>(curUser.first_name);
  const [lastName, setLastName] = useState<string>(curUser.last_name);
  const [birthday, setBirthday] = useState<any>(dayjs(curUser.birthday));
  const [gender, setGender] = useState<"MALE" | "FEMALE">(curUser.gender);
  const initialCountry = countries.find(
    (country) => country.code === curUser.country
  );
  const [country, setCountry] = useState<CountryType | undefined>(
    initialCountry
  );
  const [title, setTitle] = useState(curUser.title);
  const [preEmail, setPreEmail] = useState<string>(curUser.email);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>(curUser.phone);
  const [skype, setSkype] = useState<string>(curUser.skype);
  const [zoom, setZoom] = useState<string>(curUser.zoom);
  const [slack, setSlack] = useState<string>(curUser.slack);
  const [discord, setDiscord] = useState<string>(curUser.discord);
  const [hangouts, setHangouts] = useState<string>(curUser.hangouts);
  const [profile, setProfile] = useState<string>(curUser.profile);
  const [avatar, setAvatar] = useState(curUser.avatar);
  const [timezone, setTimezone] = useState<any>(curUser.timezone);
  const [trialPrice, setTrialPrice] = useState<number>(5);
  const [isTeacher, setIsTeacher] = useState<boolean>(curUser.is_teacher);
  const [meAsTeacher, setMeAsTeacher] = useState<string>(curUser.MAT);
  const [lessonStyle, setLessonStyle] = useState<string>(curUser.LS);
  const [saving, setSaving] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // Video state
  const [uploading, setUploading] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>(curUser.intro_video);
  const [videoKey, setVideoKey] = useState<number>(0);
  // Avatar State
  const [picture, setPicture] = useState<PictureState>({
    img: null,
    zoom: 1.2,
    croppedImg: "",
  });
  // Currency state
  const [currency, setCurrency] = useState<string>(curUser.currency);
  // lang select
  const [languages, setLanguages] = React.useState<string[]>(
    JSON.parse(curUser.language.replace(/'/g, '"'))
  );
  const LangSelectBox = React.useRef<HTMLSelectElement>(null);

  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle,
    timezones,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<ReactAvatarEditor | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const setAuthState = useSetAuthState();

  // Language select
  const handleLangChange = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value },
    } = event;
    setLanguages(typeof value === "string" ? value.split(",") : value);
  };

  const deSelect = (value: any) => {
    setLanguages(languages.filter((item) => item !== value));
    if (LangSelectBox.current) LangSelectBox.current.blur();
  };

  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const api = "/api/common/updateProfile";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: curUser?.id,
        first_name: firstName,
        last_name: lastName,
        avatar,
        title,
        timezone,
        birthday: JSON.stringify(birthday.$d).slice(1, 11),
        gender,
        country: country?.code,
        language: JSON.stringify(languages),
        currency,
        phone,
        profile,
        intro_video: videoURL,
        MAT: meAsTeacher,
        LS: lessonStyle,
        trial_price: trialPrice,
        skype,
        slack,
        zoom,
        discord,
        hangouts,
      }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => {
        setAuthState(data.user);
      })
      .catch((err) => console.error(err))
      .finally(() => setSaving(false));
  };

  const handleTimezone = (timezone: any) => {
    setTimezone(timezone.value);
  };

  function openFileChoose() {
    fileInputRef.current?.click();
  }

  const handleAvatarSlider = (event: Event, value: number | number[]) => {
    setPicture({
      ...picture,
      zoom: value as number,
    });
  };

  const handleAvatarCancel = () => {
    setModalOpen(!modalOpen);
    setPicture({
      ...picture,
    });
  };

  const handleAvatarSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      setModalOpen(!modalOpen);
      setPicture({
        ...picture,
        img: null,
        croppedImg: croppedImg,
      });
      uploadAvatar(croppedImg);
    }
  };

  function uploadAvatar(base64Data: string) {
    const uploadToast = toast("Uploading avatar...", {
      type: toast.TYPE.INFO,
      autoClose: false,
      closeButton: false,
    });

    const api = "/api/aws/imageUpload";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath: `avatar/${nanoid()}.png`,
        file: base64Data,
      }),
    };

    fetch(api, request)
      .then((res) => res.json())
      .then((data) => {
        toast.update(uploadToast, {
          render:
            "Avatar changed successfully! Please do not forget to click SAVE button.",
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          closeButton: true,
          className: "rotateY animated",
        });
        setAvatar(data.imagePath);
      })
      .catch((err) => {
        toast.update(uploadToast, {
          render: "Network Error!",
          type: toast.TYPE.ERROR,
          autoClose: 3000,
          closeButton: true,
          className: "rotateY animated",
        });
      });
  }

  function getVideo() {
    videoInputRef.current?.click();
  }

  async function changeVideo(event: React.ChangeEvent<HTMLInputElement>) {
    const video = event.target.files?.[0];
    if (video) {
      setUploading(true);
      const fileName = `${nanoid()}.${getFileExtension(video.name)}`;
      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
        Key: `intro_video/${fileName}`,
        Body: video,
        ContentType: video.type,
      };
      console.log(uploadParams);
      try {
        const uploadResponse = await s3.upload(uploadParams).promise();
        setVideoKey(videoKey + 1);
        setVideoURL(uploadResponse.Location);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  }

  const currencyItems: JSX.Element[] = [];

  for (const currencyCode in CurrencyData) {
    const currency = CurrencyData[currencyCode];
    currencyItems.push(
      <MenuItem key={currency.code} value={currency.code}>
        {currency.code}
      </MenuItem>
    );
  }

  return (
    <InsideLayout>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            setModalOpen(!modalOpen);
            const url = URL.createObjectURL(file);
            setPicture({
              ...picture,
              img: url,
            });
          }
        }}
      />
      <Modal open={modalOpen}>
        <Box className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-lg">
          <AvatarEditor
            ref={(ref: any) => (editorRef.current = ref)}
            image={picture.img || ""}
            width={200}
            height={200}
            borderRadius={100}
            color={[255, 255, 255, 0.6]} // RGBA
            rotate={0}
            scale={picture.zoom}
          />
          <Slider
            aria-label="raceSlider"
            value={picture.zoom}
            min={1}
            max={10}
            step={0.1}
            onChange={handleAvatarSlider}
            className="mt-3"
          />
          <div className="mt-4 flex justify-between">
            <Button
              variant="outlined"
              className="block"
              onClick={handleAvatarCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="block  bg-primary-600"
              onClick={handleAvatarSave}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
      <Paper className="mx-auto max-w-2xl p-2 md:p-4">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  color="primary"
                  className="bg-white shadow-md hover:bg-slate-100"
                  aria-label="edit avatar"
                  onClick={openFileChoose}
                >
                  <EditIcon />
                </IconButton>
              }
            >
              <Avatar
                alt={firstName + lastName}
                src={
                  avatar === "null"
                    ? "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
                    : avatar
                }
                sx={{ width: "150px", height: "150px" }}
              />
            </Badge>
          </div>
          <div className="flex flex-wrap">
            <p className="w-full px-2 text-lg font-semibold text-slate-600">
              Basic Information
            </p>
            <div className="w-full p-2 sm:w-1/2">
              <p>First Name*</p>
              <TextField
                size="small"
                required
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <p>Last Name*</p>
              <TextField
                size="small"
                required
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <p>Birthday*</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-full"
                  value={birthday}
                  // timezone="UTC"
                  onChange={(newDate) => {
                    setBirthday(newDate);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      // error: !birthValid && true,
                      // helperText: !birthValid && 'Set your birthday',
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <p>Gender*</p>
              <FormControl className="w-full" size="small">
                <Select
                  labelId="demo-select-small-label"
                  value={gender}
                  required
                  onChange={(e) =>
                    setGender(e.target.value as "MALE" | "FEMALE")
                  }
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <p>Country*</p>
              <Autocomplete
                className="w-full"
                size="small"
                value={country}
                options={countries}
                getOptionLabel={(option) => option.label}
                aria-required
                onChange={(event, value) => {
                  if (value) {
                    setCountry(value);
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
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <p>Timezone</p>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timezone}
                  onChange={(e) => {
                    handleTimezone(parseTimezone(e.target.value));
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="w-full p-2 sm:w-1/2">
              <p>Currency</p>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencyItems}
                </Select>
              </FormControl>
            </div>
            {!!+isTeacher && (
              <div className="w-full p-2 sm:w-1/2">
                <p>Your lesson&apos;s trial price</p>
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  value={trialPrice}
                  onChange={(e) => setTrialPrice(Number(e.target.value))}
                />
              </div>
            )}
            <div className={"w-full p-2 " + (!+isTeacher && "sm:w-1/2")}>
              <p>Language</p>
              <FormControl size="small" className="w-full">
                <Select
                  multiple
                  ref={LangSelectBox}
                  value={languages}
                  onChange={handleLangChange}
                  MenuProps={MenuProps}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          variant="outlined"
                          onDelete={() => deSelect(value)}
                          size="small"
                          deleteIcon={
                            <IconButton
                              onMouseDown={stopPropagation}
                              size="small"
                            >
                              <CancelIcon className="text-lg" />
                            </IconButton>
                          }
                        />
                      ))}
                    </Box>
                  )}
                >
                  {LanguageData.items.map((option) => (
                    <MenuItem key={option.key} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {!!+isTeacher && (
              <Box className="my-4 w-full">
                <p className="w-full px-2 text-lg font-semibold text-slate-600">
                  Introduction Video
                </p>
                <input
                  type="file"
                  accept="video/mp4, video/webm"
                  hidden
                  ref={videoInputRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeVideo(e);
                  }}
                />
                <div className="w-full px-4 py-4 md:px-8">
                  <video
                    key={videoKey}
                    controls
                    src={videoURL}
                    className="w-full"
                  ></video>
                </div>
                <LoadingButton
                  className="mx-auto flex"
                  onClick={getVideo}
                  loading={uploading}
                  loadingPosition="start"
                  startIcon={<CloudUploadIcon />}
                  variant="outlined"
                  size="large"
                >
                  {uploading ? (
                    <span>Uploading Video</span>
                  ) : (
                    <span>Change Video</span>
                  )}
                </LoadingButton>
              </Box>
            )}
            <div className="w-full p-2">
              <p>Title</p>
              <TextField
                fullWidth
                value={title}
                size="small"
                onChange={(e) => setTitle(e.target.value)}
                FormHelperTextProps={{
                  sx: {
                    display: "block",
                    marginLeft: "auto",
                  },
                }}
              />
            </div>
            <div className="w-full p-2">
              <p>About me</p>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                inputProps={{ maxLength: 1500 }}
                helperText="Less than 1500 characters"
                FormHelperTextProps={{
                  sx: {
                    display: "block",
                    marginLeft: "auto",
                  },
                }}
              />
            </div>

            {!!+isTeacher && (
              <>
                <div className="w-full p-2">
                  <p>Me as a Teacher</p>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    value={meAsTeacher}
                    onChange={(e) => setMeAsTeacher(e.target.value)}
                    inputProps={{ maxLength: 700 }}
                    helperText="Less than 700 characters"
                    FormHelperTextProps={{
                      sx: {
                        display: "block",
                        marginLeft: "auto",
                      },
                    }}
                  />
                </div>
                <div className="w-full p-2">
                  <p>My Lesson & Teaching Style</p>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    value={lessonStyle}
                    onChange={(e) => setLessonStyle(e.target.value)}
                    inputProps={{ maxLength: 700 }}
                    helperText="Less than 700 characters"
                    FormHelperTextProps={{
                      sx: {
                        display: "block",
                        marginLeft: "auto",
                      },
                    }}
                  />
                </div>
              </>
            )}

            <p className="mt-4 w-full px-2 text-lg font-semibold text-slate-600">
              Contact Information
            </p>
            <div className="w-full p-2 sm:w-1/2">
              <p>Email Address*</p>
              <TextField
                type="email"
                fullWidth
                required
                size="small"
                value={preEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <p>Phone number(Optional)</p>
              <PhoneInput
                value={phone}
                inputStyle={{ height: "40px", width: "100%" }}
                onChange={(value) => setPhone("+" + value)}
              />
            </div>
            <p className="mt-4 w-full px-2 text-lg font-semibold text-slate-600">
              Communication Tools
            </p>
            <div className="w-full p-2">
              <p>Skype</p>
              <TextField
                type="url"
                size="small"
                value={skype}
                onChange={(e) => setSkype(e.target.value)}
                fullWidth
              />
            </div>
            <div className="w-full p-2">
              <p>Zoom</p>
              <TextField
                type="url"
                size="small"
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                fullWidth
              />
            </div>
            <div className="w-full p-2">
              <p>Slack</p>
              <TextField
                type="url"
                size="small"
                value={slack}
                onChange={(e) => setSlack(e.target.value)}
                fullWidth
              />
            </div>
            <div className="w-full p-2">
              <p>Google Hangouts</p>
              <TextField
                type="url"
                size="small"
                value={hangouts}
                onChange={(e) => setHangouts(e.target.value)}
                fullWidth
              />
            </div>
            <div className="w-full p-2">
              <p>Discord</p>
              <TextField
                type="url"
                size="small"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                fullWidth
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end">
            <Button
              variant="outlined"
              className="mr-4"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <LoadingButton
              color="primary"
              className="mr-2 flex items-center bg-primary-600"
              type="submit"
              loading={saving}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              disabled={saving}
            >
              <span>Save</span>
            </LoadingButton>
          </div>
        </form>
      </Paper>
    </InsideLayout>
  );
};

export default EditProfilePage;
