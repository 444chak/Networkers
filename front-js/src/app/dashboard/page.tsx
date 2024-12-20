"use client";

import Box from "@/components/Box";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@/axiosConfig";
import { useEffect, useState } from "react";
import { CircularProgress, Grid2 } from "@mui/material";
import Title from "@/components/Title";
import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import { Spacer } from "@nextui-org/spacer";
import Card from "@/components/Card";

export default function Dashboard() {
  const router = useRouter();
  const [hasAccessToken, setHasAccessToken] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const[isAdmin, setIsAdmin] = useState(false);

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

  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        setUsername(response.data.username);
      } catch {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        router.push("/");
      }
      setIsLoading(false);
    };

    getUser();
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
      } catch {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        router.push("/");
      }
    };

    getRole();
  }, [router]);

  return (
    <EmojiProvider data={emojiData}>
      <Layout type="logged">
        <Box align="center" margin={{ top: "50px", bottom: "50px" }}>
          {hasAccessToken && (
            <Header
              tabs={{
                dashboard: "Tableau de bord",
                modules: "Mes modules",
                profile: "Mon profil",
                ...(role=="admin" && {userManagement: "Gestion des utilisateurs"}),
              }}
              activeTab="dashboard"
              onClick={(tab) => router.push(`/${tab.toLowerCase()}`)}
              onClickLogout={() => router.push("/auth/logout")}
              onClickLogo={() => router.push("/")}
              
            />
          )}
        </Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Box margin={{ top: "50px", bottom: "50px", left: "10%" }}>
              <Title level={1}>
                Bonjour {username}
                <Spacer x={2} />
                <Emoji name="waving-hand" width={40} />
              </Title>
            </Box>
            <Box
              margin={{
                top: "50px",
                bottom: "50px",
                left: "10%",
                right: "10%",
              }}
            >
              <Grid2 container spacing={2}>
                <Grid2 size={4}>
                  <Card
                    title="IPv6"
                    description="Simplifiez ou étendez une adresse IPv6 avec ce module."
                    image="/modules_assets/ipv6.svg"
                    onClick={() => router.push("/modules/ipv6")}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Calcul IPv4"
                    description="..."
                    image="/modules_assets/ipv4.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Conversion IPv4"
                    description="..."
                    image="/modules_assets/ipv4.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="VLSM"
                    description="..."
                    image="/modules_assets/ipv4.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Ethernet"
                    description="..."
                    image="/modules_assets/scapy.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Ping"
                    description="..."
                    image="/modules_assets/scapy.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="TCP"
                    description="..."
                    image="/modules_assets/scapy.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Interface réseau"
                    description="..."
                    image="/modules_assets/scapy.svg"
                  />
                </Grid2>
              </Grid2>
            </Box>
          </>
        )}
      </Layout>
    </EmojiProvider>
  );
}
