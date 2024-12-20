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
  return (
    <EmojiProvider data={emojiData}>
      <Layout type="logged">
        <Box align="center" margin={{ top: "50px", bottom: "50px" }}>
          {hasAccessToken && (
            <Header
              tabs={{
                dashboard: "Tableau de bord",
                profile: "Mon profil",
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
                    description="Simplifiez ou étendez une adresse IPv6."
                    image="/modules_assets/ipv6.svg"
                    onClick={() => router.push("/modules/ipv6")}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Calcul IPv4"
                    onClick={() => router.push("/modules/calcul_ipv4")}
                    description="Faites le calcul d'une adresse IPv4."
                    image="/modules_assets/ipv4-calcul.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Conversion IPv4"
                    description="Découvrez comment convertir une adresse IPv4 de différentes manières."
                    image="/modules_assets/ipv4-convert.svg"
                    onClick={() => router.push("/modules/convert_ipv4")}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="VLSM"
                    description="Décomposez votre réseau avec VLSM"
                    image="/modules_assets/vlsm.svg"
                    onClick={() => router.push("/modules/vlsm")}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Ethernet"
                    description="Établissez une trame ethernet"
                    image="/modules_assets/ethernet.svg"
                    onClick={() => router.push("/modules/ethernet")}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Ping ICMP"
                    description="Expérimentez l'envoi de paquets à travers les couches OSI."
                    image="/modules_assets/pingicmp.svg"
                    onClick={() => router.push("/modules/ping")}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="TCP"
                    description="Testez une connexion TCP"
                    image="/modules_assets/tcp.svg"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Card
                    title="Interface réseau"
                    description="Affichez l'interface réseau du client"
                    image="/modules_assets/interface_reseau.svg"
                    onClick={() => router.push("/modules/interface_reseau")}
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
