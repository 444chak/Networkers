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

const IpSandbox: React.FC = () => {
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
          <Title level={2}>Simplification d&rsquo;une IPv6</Title>

          <Input
            type="text"
            placeholder="1234:5678:9abc:def0:1234:5678:9abc:def0"
            value={simpleIpv6}
            margin={{ bottom: "20px" }}
            onChange={(e) => setSimpleIpv6(e.target.value)}
            required
            label="Adresse IPv6"
          />
          <Button
            text="Simplifier"
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
          <Title level={2}>Extention d&rsquo;une IPv6</Title>

          <Input
            type="text"
            placeholder="1234:5678:9abc::1234:5678:9abc:def0"
            value={extendIpv6}
            margin={{ bottom: "20px" }}
            onChange={(e) => setExtendIpv6(e.target.value)}
            required
            label="Adresse IPv6"
          />
          <Button
            text="Étendre"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!extendIpv6}
            onClick={(e) => {
              handleExtend(e);
            }}
          />
          {extendRes ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Résultat : {extendRes}
              </Alert>
            </Box>
          ) : null}
        </form>
      </Space>
    </>
  );
};

export default IpSandbox;
