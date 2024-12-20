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
  const [command, setCommand] = useState<string>("");
  const [simpleRes, setSimpleRes] = useState("");

  const [testPing, setTestPing] = useState<{
    rtt_ms: number;
    packet_size: number;
    ttl: number;
    source: string;
    destination: string;
  } | null>(null);

  const [error, setError] = useState<string>("");

  const handleSimplify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const parts = command.split(" ");
    if (parts.length < 2 || parts.length > 2) {
      setSimpleRes("Commande invalide");
      return;
    }
    if (parts[0] !== "ping") {
      setSimpleRes("Commande invalide");
      return;
    }
    try {
      const response = await axios.get("/scapy/ping/" + parts[1], {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setSimpleRes("Ping réussi");
        const formattedPing = {
          rtt_ms: data.rtt_ms,
          packet_size: data.packet_size,
          ttl: data.ttl,
          source: data.source,
          destination: data.destination,
        };

        setTestPing(formattedPing);
        setError("");
      }
    } catch (error: unknown) {
      setSimpleRes("");
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid ping") {
          setError("Ping échoué");
        } else {
          setError("Ping échoué");
        }
      } else {
        setError("Erreur lors de la tentative de ping");
      }
    }
  };

  return (
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <>
        <form onSubmit={handleSimplify}>
          <Title level={2}>Envoi de requête de ping</Title>

          <Input
            type="text"
            placeholder="ex : ping 127.0.0.1"
            value={command}
            margin={{ bottom: "20px" }}
            onChange={(e) => setCommand(e.target.value)}
            required
            label="Ping"
          />
          <Button
            text="Envoyer le ping"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!command}
            onClick={(e) => {
              handleSimplify(e);
            }}
          />
          {simpleRes && testPing ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Résultat : {simpleRes}
                <Space />
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>Source</th>
                      <td>{testPing.source}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>Destination</th>
                      <td>{testPing.destination}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>TTL</th>
                      <td>{testPing.ttl}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>RTT (ms)</th>
                      <td>{testPing.rtt_ms}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>Taille du paquet</th>
                      <td>{testPing.packet_size}</td>
                    </tr>
                  </tbody>
                </table>
              </Alert>
            </Box>
          ) : null}
          {error? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="error"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {error}
              </Alert>
            </Box>
          ) : null}
        </form>
        </>
        </Space>
  );
};

export default pingSandbox;
