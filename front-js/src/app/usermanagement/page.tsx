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

  const [role, setRole] = useState("");

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        setRole(response.data.role);
        if (response.data.role !== "admin") {
          router.push("/");
        }
      } catch {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        router.push("/");
      }
    };

    getRole();
  }, [router]);

  return (
    <Layout type="logged">
      <Box align="center" margin={{ top: "50px", bottom: "150px" }}>
        <Header
          tabs={{
            dashboard: "Tableau de bord",
            profile: "Mon profil",
            ...(role == "admin" && { userManagement: "Gestion des utilisateurs" }),
          }}
          activeTab="Gestion des utilisateurs"
          onClick={(tab) => router.push(`/${tab.toLowerCase()}`)}
          onClickLogout={() => router.push("/auth/logout")}
          onClickLogo={() => router.push("/")}
        />
      </Box>
      <Box align="center">
        <Modal>
          <Title level={3}>Gestion des utilisateurs</Title>
        </Modal>
      </Box>
    </Layout>

  )
}