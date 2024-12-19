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
import { AxiosError } from "axios";

export default function Dashboard() {
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

    const [ipv6, setIPv6] = useState("");
    const [res, setRes] = useState("");

    const handleSimplify = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
          const response = await axios.get("/ipv6/simplify/" + ipv6, {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            setRes(data.ipv6);
          }
        } catch (error: unknown) {
        //   const axiosError = error as AxiosError;
        //   if (
        //     axiosError.response?.status === 400 ||
        //     axiosError.response?.status === 404
        //   ) {
        //     setError("Nom d'utilisateur ou mot de passe incorrect");
        //   } else if (axiosError.response?.status === 403) {
        //     setError("Erreur lors de la connexion");
        //   } else {
        //     setError("Erreur lors de la connexion");
        //   }
        }
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
        <Box margin={{ top: "50px", bottom: "50px", left: "10%" }}>
            <Title level={1}>
                IPv6
            </Title>
            <Spacer y={2} />
          <div>
            <Title level={2}>Introduction</Title>
            <Spacer y={1} />
            <Text>
                IPv6 (Internet Protocol version 6) est une version du protocole Internet (IP).
                Cette version a été développé pour remplacer IPv4 (Internet Protocol version 4) qui n&apos;était plus suffisant pour répondre aux besoins de l&apos;Internet.
            </Text>
          </div>
          <Spacer y={2} />
          <Title level={2}>Structure IPv6</Title>
          <Spacer y={1} />
          <Text>
            IPv6 est composé de 128 bits, contre 32 bits pour IPv4. Cela permet de créer un nombre d&apos;adresses IP bien plus important.
            L&apos;IPv6 est représenté sous la forme de huit groupes de quatre chiffres hexadécimaux séparés par des deux-points.
            <Space />
            Exemple : <Text isItalic={true}>2001:0db8:85a3:0000:0000:8a2e:0370:7334</Text>
          </Text>
          <Spacer y={2} />
            <Title level={2}>Exercices</Title>
            <Spacer y={1} />
            <Title level={3}>Simplification d&apos;une IPv6</Title>
            <Spacer y={1} />
            <form onSubmit={handleSimplify}>
                <Input
                type="text"
                placeholder="1234:5678:9abc:def0:1234:5678:9abc:def0"
                value={ipv6}
                margin={{ bottom: "20px" }}
                onChange={(e) => setIPv6(e.target.value)}
                required
                label="Adresse IPv6"
                />
                <Button
                text="Simplifier"
                primary
                form="submit"
                type="input"
                margin={{ top: "20px" }}
                disabled={!ipv6}
                onClick={(e) => {
                    handleSimplify(e);
                }}
                />
            </form>
            {res ? 
            <>
            <Text>Résultat : {res}</Text>
            <Title level={4}>Explication des résultats</Title>
            <Spacer y={1} />
            <Text>
                La simplification d&apos;une adresse IPv6 se fait en 2 étapes :
                <ol>
                    <li>
                        Remplacement des groupes de zéro (0000) par un zéro seul.<Space />
                        <Text isItalic={true}>2001:0db8:85a3:0000:0000:8a2e:0370:0000</Text> devient <Text isItalic={true}>2001:db8:85a3:0:0:8a2e:370:0</Text>
                    </li>
                    <li>
                        Remplacement d&apos;un seul groupe de zéro (0:0:...) par &quot;::&quot; (double colon).<Space />
                        <Text isItalic={true}>2001:db8:85a3:0:0:8a2e:370:0</Text> devient <Text isItalic={true}>2001:db8:85a3::8a2e:370:0</Text>
                    </li>
                </ol>
            </Text>
            </>
            
            : null}
            <Spacer y={1} />
            <Title level={3}>Extention d&apos;une IPv6</Title>
            <Spacer y={1} />
            <form onSubmit={handleSimplify}>
                <Input
                type="text"
                placeholder="1234:5678:9abc::1234:5678:9abc:def0"
                value={ipv6}
                margin={{ bottom: "20px" }}
                onChange={(e) => setIPv6(e.target.value)}
                required
                label="Adresse IPv6"
                />
                <Button
                text="Etendre"
                primary
                form="submit"
                type="input"
                margin={{ top: "20px" }}
                disabled={!ipv6}
                onClick={(e) => {
                    handleSimplify(e);
                }}
                />
            </form>
            {res ? 
            <>
            <Text>Résultat : {res}</Text>
            <Title level={4}>Explication des résultats</Title>
            <Spacer y={1} />
            <Text>
                L&apos;extension d&apos;une adresse IPv6 se fait en 2 étapes :
                <ol>
                    <li>
                        Remplacement des zéros (0) par quatre zéros (000).<Space />
                        <Text isItalic={true}>2001:0db8:85a3::8a2e:0370:0</Text> devient <Text isItalic={true}>2001:db8:85a3::8a2e:370:0000</Text>
                    </li>
                    <li>
                        Remplacement des doubles colons (::) par <Text isItalic={true}>n</Text> groupe de zéro. <Text isItalic={true}>n</Text> correspondant au nombre d&apos;octet manquant pour que l&apos;addresse IPv6 soit complète.<Space />
                        <Text isItalic={true}>2001:db8:85a3:0:0:8a2e:370:0</Text> devient <Text isItalic={true}>2001:db8:85a3::8a2e:370:0</Text>
                    </li>
                </ol>
            </Text>
            </>
            
            : null}
        </Box>
    </Layout>
    );
  }
  
