"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { Spacer } from "@nextui-org/spacer";
import Box from "@/components/Box";
import Space from "@/components/Space";
import Image from "next/image";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "@/axiosConfig";
import Footer from "@/components/Footer";
import Text from "@/components/Text";
export default function Home() {
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
    };

    checkTokens();
  }, []);

  return (
    <Layout type="home">
      <Space
        spaceBetween
        direction="horizontal"
        margin={{ top: "20px", left: "20px", right: "20px" }}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={200}
          style={{ width: "auto", height: "auto" }}
        />
        {hasAccessToken ? (
          <Box>
            <Button
              text="Déconnexion"
              onClick={() => router.push("/auth/logout")}
              secondary
            />
            <Spacer x={4} />
            <Button
              text="Tableau de bord"
              onClick={() => router.push("/dashboard")}
              primary
            />
          </Box>
        ) : (
          <Box>
            <Button
              text="Inscription"
              onClick={() => router.push("/auth/signup")}
              secondary
            />
            <Spacer x={4} />
            <Button
              text="Connexion"
              onClick={() => router.push("/auth/login")}
              primary
            />
          </Box>
        )}
      </Space>
      <Space
        direction="horizontal"
        margin={{ top: "100px", left: "20px", right: "20px" }}
        sizes={["50%", "50%"]}
        space="200px"
      >
        <Box
          margin={{
            left: "20px",
            top: "100px",
          }}
        >
          <Title level={1}>NetWorkers</Title>
          <Spacer y={2} />
          <Space space="1rem">
          <Text>
          NetWorkers est une plateforme en ligne spécialement conçue pour simplifier 
          l&rsquo;accès des étudiants à leurs ressources universitaires. Son interface permet de trouver rapidement les documents, supports de cours
          et autres contenus partagés par les professeurs, 
          rendant ainsi le processus d&rsquo;apprentissage plus fluide et efficace. Notre mission est de faciliter le quotidien des étudiants 
          en leur offrant une solution fiable, performante et facile à utiliser.
          </Text>
          <Text>
          Que vous recherchiez des cours ou des supports d&rsquo;exercices, tout est centralisé en un seul 
          endroit accessible à tout moment. En vous connectant, vous bénéficiez d&rsquo;un espace organisé et sécurisé, spécialement 
          pensé pour répondre à vos besoins académiques.
          </Text>
          <Text>
          Grâce à NetWorkers, nous souhaitons créer un environnement d&rsquo;apprentissage moderne, où chaque étudiant dispose des outils 
          nécessaires pour travailler efficacement et atteindre ses objectifs.
          </Text>
          </Space>
        </Box>
        
        <Image
          src="/homeillustration.svg"
          alt="networkers"
          width={700}
          height={600}
          style={{height:"auto"}}
        />
      </Space>
      <Footer/>
    </Layout>
  );
}
