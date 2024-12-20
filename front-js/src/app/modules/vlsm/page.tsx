"use client";

import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Box from "@/components/Box";
import Text from "@/components/Text";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Spacer } from "@nextui-org/spacer";
import Space from "@/components/Space";
import axios from "@/axiosConfig";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function VLSM() {
    const router = useRouter();
  
    const [, setHasAccessToken] = useState(false);

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

    const [ipv4, setIPv4] = useState("");
    const [subnet, setSubnet] = useState("");
    const [res, setRes] = useState("");

    const handleVLSM = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
          const response = await axios.get("/ipv4/vlsm/" + ipv4 + "/" + subnet, {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            console.log(data);
            setRes(data.ipv6);
          }
        } catch (error: unknown) {
        }
      };

    return (
      <Layout type="logged">
        <Box align="center" margin={{ top: "50px", bottom: "50px" }}>
            <Header
                tabs={{
                    dashboard: "Tableau de bord",
                    profile: "Mon profil",
                }}
                activeTab=""
                onClick={(tab) => router.push(`/${tab.toLowerCase()}`)}
                onClickLogout={() => router.push("/auth/logout")}
                onClickLogo={() => router.push("/")}
                />
        </Box>
        <Box margin={{ top: "50px", bottom: "50px", left: "10%" }}>
            <Title level={1}>
                VLSM
            </Title>
            <Spacer y={2} />
          <div>
            <Title level={2}>Introduction</Title>
            <Spacer y={1} />
            <Text>
                ...
            </Text>
          </div>
          <Spacer y={2} />
            <Title level={2}>Exercices</Title>
            <Spacer y={1} />
            <Title level={3}>???</Title>
            <Spacer y={1} />
            <form onSubmit={handleVLSM}>
                <Input
                type="text"
                placeholder="192.168.1.1"
                value={ipv4}
                margin={{ bottom: "20px" }}
                onChange={(e) => setIPv4(e.target.value)}
                required
                label="Adresse IPv4"
                />
                <Input
                type="text"
                placeholder="12"
                value={subnet}
                margin={{ bottom: "20px" }}
                onChange={(e) => setSubnet(e.target.value)}
                required
                label="Sous-réseau"
                />
                <Button
                text="???"
                primary
                form="submit"
                type="input"
                margin={{ top: "20px" }}
                disabled={!ipv4 || !subnet}
                onClick={(e) => {
                    handleVLSM(e);
                }}
                />
            </form>
            {res ? 
            <>
            <Text>Résultat : {res}</Text>
            </>
            : null}
        </Box>
    </Layout>
    );
  }
  
