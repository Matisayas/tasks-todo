"use client";
import { LOCAL_STORAGE_KEYS, ROUTES } from "@/constants";
import { login } from "@/services";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

interface FormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const loginFormSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email requerido"),
  password: yup.string().required("Password requerido"),
});

export default function LoginPage() {
  const form = useForm<FormData>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: FormData) => {
    const loginDto = {
      email: data.email.toLowerCase(),
      password: data.password,
    };

    try {
      const loginRes = await login(loginDto);

      if (loginRes && loginRes.token) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_JWT_TOKEN, loginRes.token);
        router.push(ROUTES.admin.tasks.list);
      } else {
        console.error("Token no recibido");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoadingBtn = useMemo(
    () => form.formState.isSubmitting,
    [form.formState.isSubmitting]
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Stack
            gap={{ xs: 2, md: 3 }}
            p={{ xs: 4, md: 6 }}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              width: "400px",
              height: "400px",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <TextField {...field} label="Email" fullWidth />
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                />
              )}
            />
            <Button
              component="button"
              variant="contained"
              type="submit"
              disabled={isLoadingBtn}
              data-cy="login-button"
              fullWidth
            >
              {isLoadingBtn ? (
                <CircularProgress color="secondary" size={26} />
              ) : (
                "Login"
              )}
            </Button>
          </Stack>
        </form>
      </FormProvider>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid credentials. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
}
