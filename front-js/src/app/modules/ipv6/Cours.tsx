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
        }
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
    <>
      <EmojiProvider data={emojiData}>
        <Space space="1rem">
          <Title level={2}>Introduction</Title>
          <Text>
            IPv6 (Internet Protocol version 6) est une version améliorée
            d&rsquo;IPv4, conçue pour répondre à la pénurie d&rsquo;adresses IP
            due à l&rsquo;explosion des appareils connectés. Alors qu’IPv4 offre
            environ 4,3 milliards d’adresses, IPv6 permet d’en générer 340
            sextillions, garantissant ainsi un espace suffisant pour l’avenir.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Structure IPv6
          </Title>
          <Text>
            IPv6 est composé de 128 bits, contre 32 bits pour IPv4. Cela permet
            de créer un nombre d&rsquo;adresses IP bien plus important.
            L&rsquo;IPv6 est représenté sous la forme de huit groupes de quatre
            chiffres hexadécimaux séparés par des deux-points. Exemple :
            <Spacer x={1} />
            <Code
              text="2001:0db8:85a3:0000:0000:8a2e:0370:7334"
              language="text"
              theme={solarizedLight}
            />
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Simplification d&rsquo;une adresse IPv6
          </Title>
          <Text>
            <Space direction="vertical" space="1rem">
              La simplification d&rsquo;une adresse IPv6 se fait en 2 étapes.
              Prenons une adresse IPv6 complète :
              <Code
                text="2001:0db8:0000:0000:0000:ff00:0042:8329"
                language="text"
                theme={solarizedLight}
              />
              <Text>
                1. Suppression des zéros initiaux dans chaque groupe :{" "}
              </Text>
              <Text>
                <Spacer x={2} /> -
                <Code text="0db8" language="text" theme={solarizedLight} />{" "}
                devient{" "}
                <Code text="db8" language="text" theme={solarizedLight} />{" "}
              </Text>
              <Text>
                <Spacer x={2} /> -
                <Code text="0042" language="text" theme={solarizedLight} />{" "}
                devient{" "}
                <Code text="42" language="text" theme={solarizedLight} />{" "}
              </Text>
              <Text>
                Résultat intermédiaire :{" "}
                <Code
                  text="2001:db8:0000:0000:0000:ff00:42:8329"
                  language="text"
                  theme={solarizedLight}
                />{" "}
              </Text>
              <Text>
                2. Remplacement des groupes consécutifs de{" "}
                <Code text="0000" language="text" theme={solarizedLight} /> par{" "}
                <Code text="::" language="text" theme={solarizedLight} /> :{" "}
              </Text>
              <Text>
                <Spacer x={2} /> - Une séquence continue de groupes{" "}
                <Code text="0000" language="text" theme={solarizedLight} /> peut
                être remplacée par{" "}
                <Code text="::" language="text" theme={solarizedLight} /> (une
                seule fois par adresse).{" "}
              </Text>
              <Text>
                <Spacer x={2} /> -Résultat final :{" "}
                <Code
                  text="2001:db8::ff00:42:8329"
                  language="text"
                  theme={solarizedLight}
                />
              </Text>
            </Space>
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
          Simplifiez cette adresse IPv6 en remplaçant les groupes de zéro
          <Code
            text="fe80:0000:0000:0000:0202:b3ff:fe1e:8329"
            language="text"
            theme={solarizedLight}
          />
          <form onSubmit={handleSimplify}>
            <Input
              onChange={(e) => setIPv6test(e.target.value)}
              value={ipv6test}
              type="text"
              placeholder="Adresse IPv6"
              margin={{ bottom: "20px" }}
              required
              label="Adresse IPv6 simplifiée"
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
