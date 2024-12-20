import Title from "@/components/Title";
import Text from "@/components/Text";
import React from "react";
import { Code, solarizedLight } from "react-code-blocks";
import { Spacer } from "@nextui-org/spacer";
import Space from "@/components/Space";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import Button from "@/components/Button";
import { Alert } from "@mui/material";
import Box from "@/components/Box";

const Cours: React.FC = () => {
  const [pingTest, setPing] = useState("");
  const [res, setRes] = useState("");
  const [valid, setValid] = useState(false);

  const handlePing = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "/scapy/ping/127.0.0.1",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        setRes(data.ipv6);
        setValid(res == pingTest);
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
    <>
      <EmojiProvider data={emojiData}>
        <Space space="1rem">
          <Title level={2}>Introduction</Title>
          <Text>
            Le ping est un outil réseau de base utilisé pour tester la connectivité entre deux appareils 
            sur un réseau, en envoyant des paquets ICMP Echo Request et en attendant des paquets ICMP.
            Dans ce cours, nous allons utiliser la librairie Scapy en Python pour simuler l'envoi d'un ping 
            à travers le réseau. Scapy permet de manipuler facilement les paquets à différents niveaux du 
            modèle OSI, et dans ce cas, nous allons nous concentrer sur les paquets ICMP au niveau de la 
            couche réseau (couche 3 du modèle OSI).
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Structure paquet ICMP
          </Title>
          <Text>
            Un paquet ICMP utilisé pour le ping est composé de plusieurs parties :
          </Text>
          <Text>
            1. IP : l'en-tête IP (version 4 ou 6) qui contient des informations sur l'adresse de 
            destination et l'origine du paquet.
          </Text>
          <Text>
            2. ICMP : l'en-tête du protocole ICMP qui contient le type, le code et des informations 
            supplémentaires comme un identifiant et un numéro de séquence.
        </Text>
        <Text>
           Voici un exemple de commande que vous pourriez utiliser afin de réaliser un ping :
            <Spacer x={1} />
            <Code
              text="ping 8.8.8.8"
              language="text"
              theme={solarizedLight}
            />
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Réponse d'une requête ping
          </Title>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
          Tentez de ping le site de Google.
          <Code
            text="https://google.com"
            language="text"
            theme={solarizedLight}
          />
          <form onSubmit={handlePing}>
            <Input
              onChange={(e) => setPing(e.target.value)}
              value={pingTest}
              type="text"
              placeholder="ex : ping 127.0.0.1"
              margin={{ bottom: "20px" }}
              required
              label="Requête ping"
            />
            <Button text="Vérifier" primary form="submit" type="input" />
          </form>
          <Box margin={{ top: "20px", bottom: "20px" }}>
            {res &&
              (valid ? (
                <Alert
                  severity="success"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Bravo !
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Raté !
                </Alert>
              ))}
          </Box>
        </Space>
      </EmojiProvider>
    </>
  );
};

export default Cours;
