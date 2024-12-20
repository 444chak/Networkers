import Header from "@/components/Header"
import Layout from "@/components/Layout"
import Space from "@/components/Space"
import Title from "@/components/Title"
import { Box, CircularProgress, Grid2, Input } from "@mui/material"
import axios, { AxiosError } from "axios"
import router from "next/router"
import { useState } from "react"
import { EmojiProvider } from "react-apple-emojis"
import Cookies from "js-cookie";
import Image from "next/image";
import Text from "@/components/Text"
import emojiData from "react-apple-emojis/src/data.json";



const CoursEthernet: React.FC = () => {

    const [ipv6test, setIPv6test] = useState("");
    const [res, setRes] = useState("");
    const [valid, setValid] = useState(false);

    const handleSimplify = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                "/ipv6/simplify/fe80:0000:0000:0000:0202:b3ff:fe1e:8329",
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                },
            );
            const data = response.data;
            if (response.status === 200) {
                setRes(data.ipv6);
                setValid(res == ipv6test);
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 400) {
                const data = axiosError.response.data as { detail: string };
                if (data.detail === "Invalid IPv6") {
                    setRes("false");
                } else {
                    setRes("false");
                }
            } else {
                setRes("false");
            }
        }
    };

    return (
        <EmojiProvider data={emojiData}>

            <Space space="1rem">
                <Title level={1} margin={{ top: "2rem" }}>Ethernet</Title>
                <Text>
                    Bienvenue sur le module Ethernet. Ce module génère une trame Ethernet basée sur les paramètres fournis.
                    Elle utilise les informations sur les adresses MAC source et destination ainsi que le type Ethernet (exprimé en hexadécimal).
                    La trame générée est renvoyée au format JSON.
                </Text>

                <Title level={2} margin={{ top: "2rem" }}>Entrées : </Title>
                <Text>・Adresse MAC de destination, (par exemple, FF:FF:FF:FF:FF:FF).</Text>
                <Text>・Adresse MAC source, (par exemple, 00:11:22:33:44:55).</Text>
                <Text>・Type de trame ethernet, (cf Types de trames).</Text>

                <Title level={2} margin={{ top: "2rem" }}>Types de trames Ethernet :</Title>
                <Text>・0x0800 pour IPv4</Text>
                <Text>・0x0806 pour ARP</Text>
                <Text>・0x86DD pour IPv6</Text>
                <Text>・0x8100 pour VLAN</Text>

                <Title level={2} margin={{ top: "2rem" }}>Exemple de réponse 200 OK</Title>
                <Image
                    src="/modules_assets/example_ethernet.png"
                    alt="Example ethernet"
                    width={500}
                    height={200}
                    style={{ width: "auto", height: "auto" }} />
            </Space>
        </EmojiProvider>
    )
}

export default CoursEthernet