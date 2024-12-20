import Title from "@/components/Title";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { Alert, CircularProgress } from "@mui/material";
import Box from "@/components/Box";

const TcpSandbox: React.FC = () => {
  const [res, setRes] = useState("");
  const [ping, setPing] = useState<{
    rtt_ms: number;
    packet_size: number;
    ttl: number;
    source: string;
    destination: string;
  } | null>(null);
  const [command, setCommand] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePing = async (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    e.preventDefault();
    const parts = command.split(" ");
    if (parts.length < 2 || parts.length > 2) {
      setError("Commande invalide");
      setRes("");
      setIsLoading(false);
      return;
    }
    if (parts[0] !== "ping") {
      setError("Commande invalide");
      setRes("");
      setIsLoading(false);
      return;
    }
    try {
      const ip_port = parts[1].split(":");
      if (ip_port.length < 2 || ip_port.length > 2) {
        setError("Commande invalide");
        setRes("");
        setIsLoading(false);
        return;
      }
      const ip = ip_port[0];
      const port = ip_port[1];

      const response = await axios.get("/scapy/tcp-test/" + ip + "/" + port, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setRes(data.message);
        const formattedPing = {
          rtt_ms: data.details.rtt_ms,
          packet_size: data.details.packet_size,
          ttl: data.details.ttl,
          source: data.details.source,
          destination: data.details.destination,
        };
        setPing(formattedPing);
        setError("");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        setRes("");
        setError("Impossible de résoudre l'adresse");
      } else {
        setError("Erreur lors du ping TCP");
        setRes("");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handlePing}>
          <Title level={2}>Ping TCP</Title>

          <Input
            type="text"
            placeholder="ping 145.242.11.100:80 ou ping impots.gouv.fr:443"
            value={command}
            margin={{ bottom: "20px" }}
            onChange={(e) => setCommand(e.target.value)}
            required
            label="Commande ping"
          />
          <Button
            text="Ping"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!command}
            onClick={(e) => {
              handlePing(e);
            }}
          />
          {isLoading && (
            <Box align="center" margin={{ top: "20px" }}>
              {" "}
              <CircularProgress />
            </Box>
          )}
          {!isLoading && res && ping ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Résultat : {res}
                <Space />
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>Source</th>
                      <td>{ping.source}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>Destination</th>
                      <td>{ping.destination}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>TTL</th>
                      <td>{ping.ttl}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>RTT (ms)</th>
                      <td>{ping.rtt_ms}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>
                        Taille du paquet
                      </th>
                      <td>{ping.packet_size}</td>
                    </tr>
                  </tbody>
                </table>
              </Alert>
            </Box>
          ) : null}
          {!isLoading && error ? (
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
      </Space>
    </>
  );
};

export default TcpSandbox;
