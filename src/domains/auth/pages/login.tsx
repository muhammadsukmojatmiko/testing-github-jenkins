import { AgButton, AgCheckbox, AgText } from "@agriaku/base-ui";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import { useLogin } from "@pankod/refine-core";
import logo from "@public/images/logo.svg";
import pattern from "@public/images/pattern.png";
import Image from "next/image";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export const Login: FC = () => {
  const { handleSubmit, control } = useForm<FormValues>({ mode: "all" });
  const { mutate: login } = useLogin<FormValues>();

  const onLogin: SubmitHandler<FormValues> = (data) => {
    login(data);
  };

  return (
    <Box>
      <Grid container spacing={0} sx={{ height: "100vh" }}>
        <Grid
          item
          xs={0}
          md={6}
          sx={{ overflow: "hidden", position: "relative" }}
        >
          <Image
            src={pattern}
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Image src={logo} alt="Agriaku logo" />
            </Box>

            <AgText
              variant="headline1"
              value="Login ke Akun Anda"
              sx={{
                margin: "25px 0",
              }}
            />

            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onLogin)}
              sx={{
                width: 328,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  required: "Email required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                }}
                render={({
                  field: { onChange, value, ...otherField },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      {...otherField}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      type="email"
                      id="email"
                      label="Email"
                      placeholder="Email anda"
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
              />

              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{ required: "Password required" }}
                render={({
                  field: { onChange, value, ...otherField },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      {...otherField}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      type="password"
                      id="password"
                      label="Password"
                      placeholder="Ketik password anda"
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      helperText={error ? error.message : null}
                      sx={{
                        margin: "24px 0",
                      }}
                    />
                  );
                }}
              />

              <Controller
                name="remember"
                defaultValue={false}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <AgCheckbox onChange={onChange} value={value} />
                        }
                        label="Ingat akun saya"
                        sx={{
                          marginTop: "12px",
                          userSelect: "none",
                        }}
                      />
                    </FormGroup>
                  );
                }}
              />

              <AgButton
                type="submit"
                sx={{
                  margin: "36px 0",
                }}
              >
                Login
              </AgButton>
            </Box>

            <Link href="#" underline="none" variant="labelMBold">
              Lupa Password?
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
