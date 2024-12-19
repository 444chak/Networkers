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
                modules: "Mes modules",
                profile: "Mon profil",
              }}
              activeTab="modules"
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
            <Box margin={{ top: "150px", bottom: "50px", left: "10%" }}>
                <Title level={1}>Ethernet</Title>
            </Box>
          </>
        )}
      </Layout>
    </EmojiProvider>
  );
}
