"use client";

import Box from "@/components/Box";
import Text from "@/components/Text";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@/axiosConfig";
import { useEffect, useState } from "react";
import { CircularProgress, Grid, Grid2, Input } from "@mui/material";
import Title from "@/components/Title";
import { EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import Space from "@/components/Space";
import Image from "next/image";

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
                        <Box margin={{ top: "50px", bottom: "50px", left: "10%" }}>
                            <Grid2 container spacing={5}>
                                <Grid2 size={6}>
                                    <Space space="15px">
                                        <Title level={1}>Ethernet</Title>
                                        <Text>
                                            Bienvenue sur le module Ethernet. Ce module génère une trame Ethernet basée sur les paramètres fournis.
                                            Elle utilise les informations sur les adresses MAC source et destination ainsi que le type Ethernet (exprimé en hexadécimal).
                                            La trame générée est renvoyée au format JSON.
                                        </Text>
                                    </Space>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Space space="15px">
                                        <Title level={2}>Entrées : </Title>
                                        <Text>・Adresse MAC de destination, (par exemple, FF:FF:FF:FF:FF:FF).</Text>
                                        <Text>・Adresse MAC source, (par exemple, 00:11:22:33:44:55).</Text>
                                        <Text>・Type de trame ethernet, (cf Types de trames).</Text>
                                    </Space>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Space space="15px">
                                        <Title level={2}>Types de trames Ethernet :</Title>
                                        <Text>・0x0800 pour IPv4</Text>
                                        <Text>・0x0806 pour ARP</Text>
                                        <Text>・0x86DD pour IPv6</Text>
                                        <Text>・0x8100 pour VLAN</Text>
                                    </Space>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Space space="15px">
                                        <Title level={2}>Exemple de réponse 200 OK</Title>
                                        <Image
                                            src="/modules_assets/example_ethernet.png"
                                            alt="Example ethernet"
                                            width={500}
                                            height={200}
                                            style={{ width: "auto", height: "auto" }} />
                                    </Space>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Space space="15px">
                                        <Title level={2}>Exemple :</Title>
                                        <Input
                                            placeholder="Adresse MAC de destination" fullWidth />
                                        <Input
                                            placeholder="Adresse MAC source" fullWidth />
                                        <Input
                                            placeholder="Type de trame Ethernet" fullWidth />
                                    </Space>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Title level={2}>Réponse :</Title>
                                </Grid2>
                            </Grid2>
                        </Box>

                    </>
                )}
            </Layout>
        </EmojiProvider>
    );
}
