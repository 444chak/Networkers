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

export default function Interface() {
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

    const [interfaces, setInterfaces] = useState<Array<{name: string, mac: string, ip: string}>>([]);

    const handleInterfaces = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
          const response = await axios.get("/scapy/interfaces/", {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            const formattedInterfaces = Object.entries(data.interfaces).map(([name, details]: [string, any]) => ({
                name,
                mac: details.mac,
                ip: details.ip
            }));
            setInterfaces(formattedInterfaces);
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
                Interface réseau
            </Title>
            <Spacer y={2} />
            <Title level={2}>Introduction</Title>
            <Spacer y={1} />
            <Text>
                L&apos;interface réseau est un composant logiciel ou matériel qui permet à un ordinateur de se connecter à un réseau. 
                En utilisant la commande ifconfig (ou ip addr sur les systèmes Linux récents), on peut obtenir des informations importantes comme :
            </Text>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                <li><Text>L&apos;adresse IP de l&apos;interface</Text></li>
                <li><Text>L&apos;adresse MAC (identifiant physique)</Text></li>
                <li><Text>Le masque de sous-réseau</Text></li>
                <li><Text>L&apos;état de l&apos;interface (active ou non)</Text></li>
            </ul>
            <Text>
                Sur les systèmes Windows, on peut utiliser la commande ipconfig pour obtenir ces informations.
            </Text>
          <Spacer y={2} />
            <Title level={2}>Exemple d&apos;une interface réseau</Title>
            <Spacer y={1} />
            <form onSubmit={handleInterfaces}>
                <Button
                text="Obtenir les interfaces de la machine hôte"
                primary
                form="submit"
                type="input"
                margin={{ top: "20px" }}
                onClick={(e) => {
                    handleInterfaces(e);
                }}
                />
            </form>
            {interfaces.length > 0 ? 
            <>
            <Text>
                Résultats :
            </Text>
            <table>
                <tr>
                    <th>Interface</th>
                    <th>Adresse IP</th>
                    <th>Adresse MAC</th>
                </tr>
                {interfaces.map((iface, index) => (
                    <tr key={index}>
                        <td>{iface.name}</td>
                        <td>{iface.ip}</td>
                        <td>{iface.mac}</td>
                    </tr>
                ))}
            </table>
            <Title level={3}>Explication des résultats</Title>
            <Spacer y={1} />
            <Text>
                Les résultats ci-dessus montrent les interfaces réseau de la machine hôte. 
                Chaque interface a une adresse IP unique et une adresse MAC (identifiant physique). 
                <Space />
                L&apos;interface &apos;lo&apos; est une interface spéciale qui est utilisée pour les communications internes de la machine hôte.
                <Space />
                Sur cette exemple, l&apos;interface &apos;eth0&apos; est l&apos;interface principale de la machine hôte qui est connectée au réseau internet.
                Les autres interfaces sont des interfaces virtuelles qui sont utilisées pour Docker. Elles ne nous intéressent pas pour le moment.
            </Text>
            </>
            
            : null}
        </Box>
    </Layout>
    );
  }
  
