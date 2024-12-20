"use client";

import Box from "@/components/Box";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ValidatePsw from "@/components/ValidatePsw";
import { validate_passwd } from "@/utils/validatePasswd";
import { useEffect, useState } from "react";
import Title from "@/components/Title";
import axios from "@/axiosConfig";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";

export default function Profile() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    const checkTokens = async () => {
      const token = Cookies.get("access_token");
      const refresh = Cookies.get("refresh_token");
      if (!token && refresh) {
        try {
          const response = await axios.post("/auth/refresh", {
            refresh_token: refresh,
          });
          const data = response.data;
          if (response.status === 200) {
            Cookies.set("access_token", data.access_token);
            Cookies.set("refresh_token", refresh);
          }
        } catch {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
        }
      }
      setHasAccessToken(!!token);

      if (!token && !refresh) {
        router.push("/");
      }
    };

    checkTokens();
  }, [router]);

  const changePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      const response = await axios.patch(
        "/users/me/password",
        {
          old_password: oldPassword,
          password: password,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        },
      );
      const data = response.data;
      if (response.status === 200) {
        setSuccess("Mot de passe modifié avec succès");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (
        axiosError.response?.status === 400 ||
        axiosError.response?.status === 404
      ) {
        setError("L'ancien mot de passe est incorrect");
      } else if (axiosError.response?.status === 403) {
        setError("Erreur lors de la connexion");
      } else {
        setError("Erreur lors de la connexion");
      }
    }
  };
  return (
    <Layout type="logged">
      <Box align="center" margin={{ top: "50px", bottom: "150px" }}>
        <Header
          tabs={{
            dashboard: "Tableau de bord",
            modules: "Mes modules",
            profile: "Mon profil",
          }}
          activeTab="profile"
          onClick={(tab) => router.push(`/${tab.toLowerCase()}`)}
          onClickLogout={() => router.push("/auth/logout")}
          onClickLogo={() => router.push("/")}
        />
      </Box>
      <Box align="center">
        <Modal>
          <Title level={3}>Modifier mon mot de passe</Title>
          <form onSubmit={changePassword}>
            <Input
              type="password"
              placeholder="Password123&"
              value={oldPassword}
              margin={{ bottom: "20px" }}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              label="Ancien mot de passe"
            />
            <Input
              type="password"
              placeholder="Password123&"
              value={password}
              margin={{ bottom: "20px" }}
              onChange={(e) => setPassword(e.target.value)}
              required
              label="Nouveau mot de passe"
            />
            <Input
              type="password"
              placeholder="Password123&"
              value={confirmPassword}
              margin={{ bottom: "20px" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              label="Confirmer nouveau mot de passe"
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
            {success !== "" ? (
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {success}
              </Alert>
            ) : null}
            <Button
              text="Valider"
              primary
              type="input"
              form="submit"
              onClick={changePassword}
              margin={{ top: "20px" }}
              disabled={
                !password ||
                !confirmPassword ||
                password !== confirmPassword ||
                !validate_passwd(password)
              }
            />
          </form>
        </Modal>
      </Box>
    </Layout>
  );
}
