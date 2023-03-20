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
import { useAppDispatch } from "../../redux-toolkit/hooks";
import { useAccount } from "../../hooks/use-account";
import {
  argsUpdateAccountType,
  getCurrentAccountThunk,
  updateAccountThunk,
} from "../../redux-toolkit/auth/auth-thunk";
import { Account } from "../../app-types/account.type";

export default function DEditProfilePage() {
  const navigate = useNavigate();
  const { account } = useAccount();
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    firstName: yup.string().required("ป้อนข้อมูลชื่อด้วย"),
    lastName: yup.string().required("ป้อนข้อมูลสกุลด้วย"),
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
      const args: argsUpdateAccountType = {
        userId: account?.userId,
        acc: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      };
      dispatch(updateAccountThunk(args));

      dispatch(getCurrentAccountThunk(account?.userId!));

      toast.success("แก้ไขข้อมูลส่วนตัวสำเร็จ");

      navigate("../"); //ตอนนี้อยู่  /dashboard/edit-profile  ถ้า ../ จะเป็น /dashboard
    } catch (error: any) {
      toast.error(error.message);
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
        <Avatar sx={{ width: 64, height: 64 }} src={account?.photoUrl}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          แก้ไขข้อมูลส่วนตัว
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
                defaultValue={account?.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={errors.lastName ? true : false}
                helperText={errors.lastName && errors.lastName.message}
                defaultValue={account?.lastName}
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
            บันทึก
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
