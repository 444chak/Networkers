"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Title from "@/components/Title";
import Text from "@/components/Text";
import { useState } from "react";
import Link from "@/components/Link";
import ValidatePsw from "@/components/ValidatePsw";
import { validate_passwd } from "./validatePasswd";
import Backlink from "@/components/Backlink";
import { useRouter } from "next/navigation";
import axios from "@/axiosConfig";
import { AxiosError } from "axios";
import { Alert, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        setError("Nom d'utilisateur déjà utilisé");
      } else {
        setError("Erreur lors de l'inscription");
      }
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        router.replace("/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <Layout type="home">
      <Backlink onClick={router.back} />
      <Box align="center" margin={{ top: "100px", bottom: "50px" }}>
        <Title level={1}>Networkers</Title>
      </Box>
      <Box align="center">
        <Modal>
          <Title level={3}>Inscription</Title>
          <form onSubmit={handleSignup}>
            <Input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              margin={{ bottom: "20px" }}
              onChange={(e) => setUsername(e.target.value)}
              required
              label="Nom d'utilisateur"
            />
            <Input
              type="password"
              placeholder="Password123&"
              value={password}
              margin={{ bottom: "20px" }}
              onChange={(e) => setPassword(e.target.value)}
              required
              label="Mot de passe"
            />
            <Input
              type="password"
              placeholder="Password123&"
              value={confirmPassword}
              margin={{ bottom: "20px" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              label="Confirmer mot de passe"
            />
            <ValidatePsw password={password} />
            {error !== "" ? (
              <Alert
                severity="error"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {error}
              </Alert>
            ) : null}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                text="Inscription"
                primary
                type="input"
                margin={{ top: "20px" }}
                disabled={
                  !username ||
                  !password ||
                  !confirmPassword ||
                  password !== confirmPassword ||
                  !validate_passwd(password)
                }
                form="submit"
                onClick={(e) => {
                  setLoading(true);
                  handleSignup(e).finally(() => setLoading(false));
                }}
              />
            )}
          </form>
          <Box align="right">
            <Text align="right" margin={{ top: "20px" }} size="15px">
              Déjà un compte ? <Link href="/auth/login">Se connecter</Link>
            </Text>
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
}
