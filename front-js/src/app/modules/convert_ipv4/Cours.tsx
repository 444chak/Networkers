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
  const [dec2bin, setDec2bin] = useState("");
  const [resDec2bin, setResDec2bin] = useState("");
  const [validDec2bin, setValidDec2bin] = useState(false);

  const [dec2hex, setDec2hex] = useState("");
  const [resDec2hex, setResDec2hex] = useState("");
  const [validDec2hex, setValidDec2hex] = useState(false);

  const [hex2dec, setHex2dec] = useState("");
  const [resHex2dec, setResHex2dec] = useState("");
  const [validHex2dec, setValidHex2dec] = useState(false);

  const handleConvertToBinary = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/dec_to_bin/169.254.123.213", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setResDec2bin(data.ipv4);
        setValidDec2bin(resDec2bin == dec2bin);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setResDec2bin("false");
        } else {
          setResDec2bin("false");
        }
      } else {
        setResDec2bin("false");
      }
    }
  };

  const handleConvertToHexadecimal = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/dec_to_hex/169.254.123.213", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setResDec2hex(data.ipv4);
        setValidDec2hex(resDec2hex.toLowerCase() === dec2hex.toLowerCase());
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setResDec2hex("false");
        } else {
          setResDec2hex("false");
        }
      } else {
        setResDec2hex("false");
      }
    }
  };

  const handleConvertHexToDecimal = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/hex_to_dec/c0.a8.01.72", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setResHex2dec(data.ipv4);
        setValidHex2dec(resHex2dec == hex2dec);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setResHex2dec("false");
        } else {
          setResHex2dec("false");
        }
      } else {
        setResHex2dec("false");
      }
    }
  };

  return (
    <>
      <EmojiProvider data={emojiData}>
        <Space space="1rem">
          <Title level={2}>Introduction</Title>
          <Text>
            La conversion d&rsquo;une adresse IPv4 de décimale à binaire est une
            étape essentielle pour comprendre le fonctionnement des réseaux. Une
            adresse IPv4 est composée de 32 bits, généralement représentés en
            quatre octets décimaux séparés par des points.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Structure IPv4
          </Title>
          <Text>
            Une adresse IPv4 est composée de quatre octets (8 bits chacun),
            séparés par des points. Par exemple, l&rsquo;adresse IPv4
            192.168.1.1 peut être convertie en binaire comme suit :
            <Spacer x={1} />
            <Code
              text="11000000.10101000.00000001.00000001"
              language="text"
              theme={solarizedLight}
            />
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Conversion d&rsquo;une adresse IPv4
          </Title>
          <Text>
            <Space direction="vertical" space="1rem">
              La conversion d&rsquo;une adresse IPv4 de décimale à binaire se
              fait en suivant ces étapes :
              <Text>
                1. Prenez chaque octet de l&rsquo;adresse IPv4 et
                convertissez-le en binaire.
              </Text>
              <Text>Par exemple, pour l&rsquo;adresse 192.168.1.1 :</Text>
              <Text>
                <Spacer x={2} /> - 192 en binaire est{" "}
                <Code text="11000000" language="text" theme={solarizedLight} />
              </Text>
              <Text>
                <Spacer x={2} /> - 168 en binaire est{" "}
                <Code text="10101000" language="text" theme={solarizedLight} />
              </Text>
              <Text>
                <Spacer x={2} /> - 1 en binaire est{" "}
                <Code text="00000001" language="text" theme={solarizedLight} />
              </Text>
              <Text>
                <Spacer x={2} /> - 1 en binaire est{" "}
                <Code text="00000001" language="text" theme={solarizedLight} />
              </Text>
              <Text>
                Résultat final :{" "}
                <Code
                  text="11000000.10101000.00000001.00000001"
                  language="text"
                  theme={solarizedLight}
                />
              </Text>
            </Space>
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
          Convertissez cette adresse IPv4 en binaire
          <Code text="169.254.123.213" language="text" theme={solarizedLight} />
          <form onSubmit={handleConvertToBinary}>
            <Input
              onChange={(e) => setDec2bin(e.target.value)}
              value={dec2bin}
              type="text"
              placeholder="Adresse IPv4"
              margin={{ bottom: "20px" }}
              required
              label="Adresse IPv4"
            />
            <Button text="Convertir" primary form="submit" type="input" />
          </form>
          <Box margin={{ top: "20px", bottom: "20px" }}>
            {resDec2bin &&
              (validDec2bin ? (
                <Alert
                  severity="success"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Conversion réussie !
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Conversion échouée !
                </Alert>
              ))}
          </Box>
          <Title level={2} margin={{ top: "2rem" }}>
            Conversion d&rsquo;une adresse IPv4 en hexadécimal
          </Title>
          <Text>
            Cette fois-ci, nous allons voir comment convertir une adresse IPv4
            en hexadécimal.
          </Text>
          <Text>
            La conversion d&rsquo;une adresse IPv4 de décimale à hexadécimal
            suit les mêmes étapes que la conversion en binaire. Cependant, au
            lieu de convertir chaque octet en binaire, vous devez le convertir
            en hexadécimal.
          </Text>
          <Text>Par exemple, pour l&rsquo;adresse 192.168.1.1 :</Text>
          <Text>
            <Spacer x={2} /> - 192 en hexadécimal est{" "}
            <Code text="C0" language="text" theme={solarizedLight} />
          </Text>
          <Text>
            <Spacer x={2} /> - 168 en hexadécimal est{" "}
            <Code text="A8" language="text" theme={solarizedLight} />
          </Text>
          <Text>
            <Spacer x={2} /> - 1 en hexadécimal est{" "}
            <Code text="01" language="text" theme={solarizedLight} />
          </Text>
          <Text>
            <Spacer x={2} /> - 1 en hexadécimal est{" "}
            <Code text="01" language="text" theme={solarizedLight} />
          </Text>
          <Text>
            Résultat final :{" "}
            <Code text="C0.A8.01.01" language="text" theme={solarizedLight} />
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
          Convertissez cette adresse IPv4 en hexadécimal
          <Code text="169.254.123.213" language="text" theme={solarizedLight} />
          <form onSubmit={handleConvertToHexadecimal}>
            <Input
              onChange={(e) => setDec2hex(e.target.value)}
              value={dec2hex}
              type="text"
              placeholder="Adresse IPv4"
              margin={{ bottom: "20px" }}
              required
              label="Adresse IPv4"
            />
            <Button text="Convertir" primary form="submit" type="input" />
          </form>
          <Box margin={{ top: "20px", bottom: "20px" }}>
            {resDec2hex &&
              (validDec2hex ? (
                <Alert
                  severity="success"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Conversion réussie !
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Conversion échouée !
                </Alert>
              ))}
          </Box>
          <Title level={2} margin={{ top: "2rem" }}>
            Conversion d&rsquo;une adresse IPv4 héxadécimal en décimal
          </Title>
          <Text>
            Avec les mêmes étapes que précédemment, vous pouvez convertir une
            adresse IPv4 hexadécimal en décimal.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
          Convertissez cette adresse IPv4 en décimal
          <Code text="C0.A8.01.72" language="text" theme={solarizedLight} />
          <form onSubmit={handleConvertHexToDecimal}>
            <Input
              onChange={(e) => setHex2dec(e.target.value)}
              value={hex2dec}
              type="text"
              placeholder="Adresse IPv4"
              margin={{ bottom: "20px" }}
              required
              label="Adresse IPv4"
            />
            <Button text="Convertir" primary form="submit" type="input" />
          </form>
          <Box margin={{ top: "20px", bottom: "20px" }}>
            {resHex2dec &&
              (validHex2dec ? (
                <Alert
                  severity="success"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Conversion réussie !
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                >
                  Conversion échouée !
                </Alert>
              ))}
          </Box>
        </Space>
      </EmojiProvider>
    </>
  );
};

export default Cours;
