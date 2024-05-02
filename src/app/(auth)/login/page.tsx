"use client";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HttpsIcon from "@mui/icons-material/Https";
import * as yup from "yup";

type Inputs = {
    email: string;
    password: string;
};
type EndAdormentProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

export default function Login() {
    const [progress, setProgress] = useState<Boolean>(false);
    const [visible, setVisible] = useState(false);

    const schema = yup.object({
        email: yup.string().email("Email Formatı Uygun Değil"),
        password: yup.string().min(6, "Şifre 6 karakterden az olamaz").required("Şifre gerekli*"),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setProgress(true);
        setTimeout(() => {
            setProgress(false);
        }, 2000);
    };

    // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    const EndAdorment = ({ visible, setVisible }: EndAdormentProps) => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible(!visible)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {visible ? <VisibilityIcon color="secondary" /> : <VisibilityOffIcon />}
                </IconButton>
            </InputAdornment>
        );
    };
    return (
        // <div onSubmit={handleSubmit(onSubmit)} className="flex flex-col  max-w-[300px] mx-auto justify-center items-center xl:h-[500px] h-[400px] mt-48  rounded-[14px] bg-white">
        <div className="h-screen bg-login flex flex-col items-center justify-center mx-auto ">
            <div className=" p-5 flex flex-col items-center justify-center  h-[400px] bg-zinc-50 xl:w-[450px] w-[350px] rounded-md shadow-xl">
                <h3 className="text-3xl font-semibold my-5">Login</h3>
                {/* <button className="bg-[#0288D1] p-2 text-white rounded-md font-bold">Google Giriş</button> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="email"
                        label="Email"
                        sx={{ color: "white" }}
                        type={"email"}
                        autoComplete="current-password"
                        color="info"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle color="info" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="outlined"
                        id="password"
                        label="Şifre"
                        sx={{ color: "white" }}
                        type={visible ? "text" : "password"}
                        autoComplete="current-password"
                        color="info"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        InputProps={{
                            endAdornment: <EndAdorment visible={visible} setVisible={setVisible} />,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HttpsIcon color="info" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
                        color="info"
                        disabled={progress}
                        startIcon={
                            progress ? (
                                <CircularProgress color="inherit" size={"16px"} />
                            ) : (
                                <LoginIcon />
                            )
                        }
                    >
                        Giriş Yap
                    </Button>
                </form>
            </div>
        </div>
    );
}
