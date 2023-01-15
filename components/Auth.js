import { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { supabase } from "../utils/supabaseClient";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("メールに記載されているログインリンクをご確認ください");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "grid", gap: "20px" }}>
      <Typography variant="h1" fontSize="24px" fontWeight="bold">
        user manage app
      </Typography>
      <Typography variant="p">
        サインインするには以下にメールアドレスの入力が必要です。
      </Typography>
      <TextField
        type="email"
        size="small"
        placeholder="input your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        sx={{ maxWidth: "fit-content" }}
        variant="outlined"
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        ログイン
      </Button>
    </Container>
  );
};
