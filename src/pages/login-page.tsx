import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

import toast from "react-hot-toast";
import { login, registerUser } from "../services/auth.service";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { getCurrentAccountThunk } from "../redux-toolkit/auth/auth-thunk";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ระบบลาออนไลน์
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("ป้อนอีเมลลืด้วย")
      .email("รูปแบบอีเมลล์ไม่ถูกต้อง"),
    password: yup
      .string()
      .required("ป้อนรหัสผ่านด้วย")
      .min(6, "รหัสผ่านต้อง อย่างน้อย 6 ตัวอักษร")
      .minSymbols(1, "ต้องมี อักษระพิเศษ อย่างน้อง 1 ตัว")
      .minUppercase(1, "ต้องมี ตัวอักษรตัวใหญ่ อย่างน้อย 1 ตัว"),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all", // ไม่จำเป็นต้อง กด submit ก็ให้ขึ้น log error ได้
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await login(data.email, data.password!);
      if (userCredential.user != null) {
        dispatch(getCurrentAccountThunk(userCredential.user.uid));
        toast.success("ล็อกอินสำเร็จ");
        navigate("/dashboard");
      }
    } catch (error: any) {
      //https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      switch (error.code) {
        case "auth/too-many-requests":
          toast.error("คุณล็อกอินบ่อยเกินไป กรุณารอ 1นาที 30 วินาที");
          break;

        case "auth/wrong-password":
          toast.error("รหัสผ่านหรืออีเมลล์ผิด");
          break;

        default:
          toast.error(error.message);
          break;
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email && errors.email.message}
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password")}
                fullWidth
                error={errors.password ? true : false}
                helperText={errors.password && errors.password.message}
                label="Password"
                type="password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
            loadingIndicator="กำลังลงทะเบียน..."
          >
            Login
          </LoadingButton>
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                ยังไม่มี ผู้ใช้งานหรือไม่? ลงทะเบียน
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
