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
          <Title level={1}>Networkers</Title>
          <Spacer y={2} />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            varius metus magna, sit amet porta velit eleifend iaculis. Donec
            imperdiet rutrum lacus, luctus congue mauris iaculis ac. Suspendisse
            aliquet nibh vitae magna efficitur bibendum. Vivamus molestie, neque
            id feugiat fringilla, ante dui volutpat massa, non convallis erat mi
            eget urna. Integer feugiat, purus id porta semper, ipsum ex
            venenatis ante, ac rhoncus dolor sapien consequat nisi. Curabitur
            maximus sem ac tortor consequat posuere ac ac massa. Praesent
            imperdiet purus vel dui tempor finibus. Suspendisse arcu nunc,
            mattis at sapien in, rhoncus ultricies dui. Morbi luctus lorem quis
            aliquam dictum. Quisque porttitor mollis tellus, vel efficitur est
            pretium aliquet. Etiam ornare velit ac interdum lobortis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Maecenas vulputate vitae lorem a pulvinar.
            Curabitur ante mi, tempor at felis laoreet, ultrices venenatis
            turpis. Mauris scelerisque rhoncus diam sed ornare. Vestibulum at
            accumsan ligula, non blandit erat.
          </div>
        </Box>
        <Image
          src="/homeillustration.svg"
          alt="networkers"
          width={700}
          height={600}
        />
      </Space>
    </Layout>
  );
}
