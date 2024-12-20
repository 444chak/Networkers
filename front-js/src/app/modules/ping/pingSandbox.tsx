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

const pingSandbox: React.FC = () => {
  const [testPing, setTestPing] = useState("");
  const [simpleRes, setSimpleRes] = useState("");

  const handleSimplify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/scapy/ip/ " + testPing, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setSimpleRes(data.ping);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid ping") {
          setSimpleRes("Ping échoué");
        } else {
          setSimpleRes("Ping échoué");
        }
      } else {
        setSimpleRes("Erreur lors de la tentative de ping");
      }
    }
  };

  return (
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <>
        <form onSubmit={handleSimplify}>
          <Title level={2}>Simplification d&rsquo;une IPv6</Title>

          <Input
            type="text"
            placeholder="ex : ping 127.0.0.1"
            value={testPing}
            margin={{ bottom: "20px" }}
            onChange={(e) => setTestPing(e.target.value)}
            required
            label="Ping"
          />
          <Button
            text="Simplifier"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!testPing}
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
        </>
        </Space>
  );
};

export default pingSandbox;
