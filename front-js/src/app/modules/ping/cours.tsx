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
      const ipAddress = pingTest.replace('ping ', '');
      const response = await axios.get(
        "/scapy/ping/" + ipAddress,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        setRes(data.destination);
        setTimeout(() => {
          setValid(data.destination === "193.51.31.90");
        }, 0);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid ping") {
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
          Le ping est un outil de diagnostic réseau utilisé pour tester la connectivité entre deux hôtes
           sur un réseau IP. Il fonctionne en envoyant des paquets ICMP (Internet Control Message Protocol)
            de type à un hôte cible et en attendant des réponses. 
            Le ping est couramment utilisé pour vérifier si un hôte est accessible, mesurer le temps de
            latence entre deux hôtes, et diagnostiquer les problèmes de réseau.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Structure paquet ICMP
          </Title>
          <Text>
            Un paquet ICMP est encapsulé dans un paquet IP et contient plusieurs champs spécifiques.
            La structure d'un paquet ICMP Requête/Réponse est la suivante : 
          </Text>
          <Text>
            L'entête est composée de :
          </Text>
          <Text>
            1. Type (1 octet) : Ce champ indique le type de message ICMP.
          </Text>
          <Text>
            2. Code (1 octet) : Fournit des informations supplémentaires sur le type.
        </Text>
        <Text>
            3. Checksum (2 octets) : Ce champ contient une somme de contrôle utilisée pour vérifier l'intégrité du paquet ICMP.
          </Text>
          <Text>
            4. dentifiant (2 octets) : Identifie de manière unique une requête/réponse.
          </Text>
          <Text>
            5. Numéro de séquence (2 octets) : Ce champ est utilisé pour numéroter les paquets dans une session de ping,
             permettant de détecter les pertes de paquets.
          </Text>
          <Text>
            Après l'entête, nous retrouvons toutes les données qui sont envoyés dans le paquet ICMP.
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
          <Text>
          Envoi de l'Echo Request :
          </Text>
          <Text>
          Lorsque vous envoyez un ping à un autre appareil, votre ordinateur crée un petit message appelé "Echo Request".
          Ce message est envoyé à l'adresse IP de l'appareil cible.
          </Text>
          <Text>
          Réception de l'Echo Request :
          </Text>
          <Text>
          L'appareil cible reçoit le message "Echo Request".
          Il vérifie que le message n'est pas corrompu en utilisant une somme de contrôle (checksum).
          </Text>
          <Text>
          Création de l'Echo Reply :
          </Text>
          <Text>
          Si le message est correct, l'appareil cible crée un nouveau message appelé "Echo Reply".
          Ce message contient les mêmes informations que l'Echo Request, mais avec un type différent pour indiquer qu'il s'agit d'une réponse.
          </Text>
          <Text>
          Envoi de l'Echo Reply :
          </Text>
          <Text>
          L'appareil cible envoie le message "Echo Reply" à votre ordinateur.
          Votre ordinateur reçoit ce message et peut ainsi confirmer que l'appareil cible est accessible.
          </Text>
          <Text>
          Mesure du Temps de Réponse :
          </Text>
          <Text>
          Votre ordinateur mesure le temps écoulé entre l'envoi de l'Echo Request et la réception de l'Echo Reply.
          Ce temps est appelé "latence" et vous donne une idée de la rapidité de la connexion réseau.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
          Tentez de ping le site de l'iut de Vélizy.
          <Code
            text="https://www.iut-velizy-rambouillet.uvsq.fr/"
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
