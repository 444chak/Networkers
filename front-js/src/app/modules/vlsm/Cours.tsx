import Title from "@/components/Title";
import Text from "@/components/Text";
import React from "react";
import Space from "@/components/Space";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import { Alert } from "@mui/material";
import axios from "@/axiosConfig";
import Cookies from 'js-cookie';
import { Code, solarizedLight } from "react-code-blocks";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Cours: React.FC = () => {
  const [addrRestante, setAddrRestante] = React.useState("");
  const [res, setRes] = React.useState("");

  const handleAddrRestante = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/vlsm/192.168.1.0/15,30,50", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        let lastRange = data.subnet[data.subnet.length - 1].range;
        lastRange = lastRange.split(" - ")[1];
        const listLastRange = lastRange.split(".");
        const newLastDigit = parseInt(listLastRange[listLastRange.length - 1]) + 1;
        listLastRange.pop();
        listLastRange.push(newLastDigit.toString());
        const ok = listLastRange.join('.') + " - 192.168.1.254";
        if (addrRestante == ok) {
          setRes("Bravo !");
        }
        else {
          setRes("");
        }
      }
    } catch (error: unknown) {
    }
  };

  return (
    <>
      <EmojiProvider data={emojiData}>
        <Space space="1rem">
          <Title level={2}>Introduction</Title>
          <Text>
            VLSM (Variable Length Subnet Masking) est une technique de
            sous-réseautage qui permet de créer des sous-réseaux de différentes
            tailles. Cette technique est utilisée pour optimiser l&rsquot;utilisation
            des adresses IP.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Fonctionnement VLSM
          </Title>
          <Text>
            VLSM permet de diviser un réseau en sous-réseaux de différentes
            tailles. Chaque sous-réseau peut accueillir un nombre minimisé
            de machine. Cela permet d&rsquot;optimiser l&rsquo;utilisation
            des adresses IP.
            <Space />
            Attention il ne faut pas oublier de réserver une adresse pour le
            réseau et une pour le broadcast.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
          <Text>
            Notre réseau (<Code text="192.168.1.0" language="text" theme={solarizedLight} />) contient des sous-réseaux avec 15 machines, 30 machines et 50 machines.
            Qu&rsquo;elle est la plage d&rsquo;adresses IP restante ?
          </Text>
          <form onSubmit={handleAddrRestante}>
            <Input
              onChange={(e) => setAddrRestante(e.target.value)}
              value={addrRestante}
              type="text"
              placeholder="192.168.1.xxx - 192.168.1.xxx"
              margin={{ bottom: "20px" }}
              required
              label="Plage restante"
            />
            <Button text="Répondre" primary form="submit" type="input" />
          </form>
          <Box margin={{ top: "20px", bottom: "20px" }}>
            {res ? (
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Bien joué !
              </Alert>
            ) : (
              <Alert
                severity="error"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Et non !
              </Alert>
            )}
          </Box>
        </Space>
      </EmojiProvider>
    </>
  );
};

export default Cours;
