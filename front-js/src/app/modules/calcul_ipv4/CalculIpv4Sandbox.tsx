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

const CalculIpv4Sandbox: React.FC = () => {
  const [simpleIpv4, setSimpleIpv4] = useState("");
  const [simpleRes, setSimpleRes] = useState("");

  const handleClass = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/class/" + simpleIpv4, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        setSimpleRes(data.ipv4);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setSimpleRes("Adresse IPv4 invalide");
        } else {
          setSimpleRes("Adresse IPv4 invalide");
        }
      } else {
        setSimpleRes("Erreur lors du calcul de la classe de l'adresse IPv4");
      }
    }
  };


  const [simpleIpv4cidr, setSimpleIpv4cidr] = useState("");
  const [simpleRescidr, setSimpleRescidr] = useState("");

  const handleMask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/mask/" + simpleIpv4cidr, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        setSimpleRescidr(data.ipv4);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setSimpleRescidr("Adresse IPv4 invalide");
        } else {
          setSimpleRescidr("Adresse IPv4 invalide");
        }
      } else {
        setSimpleRescidr("Erreur lors du calcul du masque de l'adresse IPv4");
      }
    }
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handleClass}>
          <Title level={2}>Calcul d'une adresse IPv4</Title>

          <Input
            type="text"
            placeholder="192.168.1.69"
            value={simpleIpv4}
            margin={{ bottom: "20px" }}
            onChange={(e) => setSimpleIpv4(e.target.value)}
            required
            label="Adresse IPv4"
          />
          <Button
            text="Calculer la classe"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!simpleIpv4}
            onClick={(e) => {
              handleClass(e);
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
        <form onSubmit={handleMask}>
          <Title level={2}>Calcul du masque d'une adresse IPv4</Title>

          <Input
            type="text"
            placeholder="192.168.1.69/24"
            value={simpleIpv4cidr}
            margin={{ bottom: "20px" }}
            onChange={(e) => setSimpleIpv4cidr(e.target.value)}
            required
            label="Adresse IPv4"
          />
          <Button
            text="Calculer le masque"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!simpleIpv4cidr}
            onClick={(e) => {
              handleMask(e);
            }}
          />
          {simpleRescidr ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Résultat : {simpleRescidr}
              </Alert>
            </Box>
          ) : null}
        </form>
      </Space>
    </>
  );
};

export default CalculIpv4Sandbox;