"use client";

import Box from "@/components/Box";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@/axiosConfig";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Title from "@/components/Title";
import CoursEthernet from "./Cours";
import EthernetSandbox from "./EthernetSandbox";

export default function Ethernet() {
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

    const [activeTab, setActiveTab] = useState("cours");

    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
    };

    return (
        <Layout type="logged">
          <Box align="center" margin={{ top: "50px", bottom: "50px" }}>
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
          </Box>
          <Box align="center" margin={{ top: "50px", bottom: "50px" }}>
            <Title level={1} align="center">
              IPv6
            </Title>
          </Box>
    
          <Tabs
            value={activeTab}
            onChange={(_, tab) => handleTabChange(tab)}
            centered
          >
            <Tab label="Cours & exercice" value="cours" />
            <Tab label="Bac à sable" value="sandbox" />
          </Tabs>
    
          <Box margin={{ top: "50px", bottom: "50px", left: "20%", right: "20%" }}>
            {activeTab === "cours" ? <CoursEthernet /> : <EthernetSandbox />}
          </Box>
        </Layout>
      );
}