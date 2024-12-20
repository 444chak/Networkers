import Title from "@/components/Title";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { Alert } from "@mui/material";
import Box from "@/components/Box";

const EthernetSandbox: React.FC = () => {
  const [simpleIpv6, setSimpleIpv6] = useState("");
  const [simpleRes, setSimpleRes] = useState("");

  const handleSimplify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv6/simplify/ " + simpleIpv6, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setSimpleRes(data.ipv6);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv6") {
          setSimpleRes("Adresse IPv6 invalide");
        } else {
          setSimpleRes("Adresse IPv6 invalide");
        }
      } else {
        setSimpleRes("Erreur lors de la simplification de l'adresse IPv6");
      }
    }
  };

  const [extendIpv6, setExtendIpv6] = useState("");
  const [extendRes, setExtendRes] = useState("");

  const handleExtend = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv6/extend/" + extendIpv6, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setExtendRes(data.ipv6);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv6") {
          setExtendRes("Adresse IPv6 invalide");
        } else {
          setExtendRes("Adresse IPv6 invalide");
        }
      } else {
        setExtendRes("Erreur lors de l'extension de l'adresse IPv6");
      }
    }
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handleSimplify}>
          <Title level={2}>Rédiger votre trame Ethernet :</Title>

          <Input
            type="text"
            placeholder="FF:FF:FF:FF:FF:FF"
            value={simpleIpv6}
            margin={{ bottom: "20px" }}
            onChange={(e) => setSimpleIpv6(e.target.value)}
            required
            label="Adresse mac destination"
          />
          <Input
            type="text"
            placeholder="00:11:22:33:44:55"
            value={simpleIpv6}
            margin={{ bottom: "20px" }}
            onChange={(e) => setSimpleIpv6(e.target.value)}
            required
            label="Adresse mac source"
          />
          <Input
            type="text"
            placeholder="0x0800"
            value={simpleIpv6}
            margin={{ bottom: "20px" }}
            onChange={(e) => setSimpleIpv6(e.target.value)}
            required
            label="Type de trame Ethernet"
          />
          <Button
            text="Envoyer"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!simpleIpv6}
            onClick={(e) => {
              handleSimplify(e);
            }}
          />
          {simpleRes ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Résultat : {simpleRes}
              </Alert>
            </Box>
          ) : null}
        </form>

        <form onSubmit={handleExtend}>
          <Title level={2}>Réponse : </Title>
        </form>
      </Space>
    </>
  );
};

export default EthernetSandbox;