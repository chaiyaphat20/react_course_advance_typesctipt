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

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

import toast from "react-hot-toast";
import { registerUser } from "../services/auth.service";

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

  const schema = yup.object().shape({
    firstName: yup.string().required("ป้อนข้อมูลชื่อด้วย"),
    lastName: yup.string().required("ป้อนข้อมูลสกุลด้วย"),
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all", // ไม่จำเป็นต้อง กด submit ก็ให้ขึ้น log error ได้
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const userCredential = await registerUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password!
      );

      if (userCredential.user != null) {
        toast.success("ลงทะเบียนสำเร็จ");
        navigate("/");
      }
    } catch (error: any) {
      //https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      if (error.code === "auth/email-already-in-use") {
        toast.error("มีผู้ใช้งานอีเมลล์นี้แล้วในระบบ");
      } else {
        toast.error(error.message);
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
          ลงทะเบียนผู้ใช้ใหม่
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName")}
                error={errors.firstName ? true : false}
                helperText={errors.firstName && errors.firstName.message}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={errors.lastName ? true : false}
                helperText={errors.lastName && errors.lastName.message}
              />
            </Grid>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ลงทะเบียน
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
