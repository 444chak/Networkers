import Title from "@/components/Title";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Box from "@/components/Box";

const PingSandbox: React.FC = () => {
  const [command, setCommand] = useState<string>("");
  const [simpleRes, setSimpleRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [testPing, setTestPing] = useState<{
    rtt_ms: number;
    packet_size: number;
    ttl: number;
    source: string;
    destination: string;
  } | null>(null);

  const [error, setError] = useState<string>("");

  const handleSimplify = async (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    setError("");
    setSimpleRes("");
    e.preventDefault();
    const parts = command.split(" ");
    if (parts.length < 2 || parts.length > 2) {
      setSimpleRes("");
      setIsLoading(false);
      setError("Commande invalide");
      return;
    }
    if (parts[0] !== "ping") {
      setSimpleRes("");
      setIsLoading(false);
      setError("Commande invalide");
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
    setIsLoading(false);
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
          {isLoading && (
            <Box align="center" margin={{ top: "20px" }}>
              <CircularProgress />
            </Box>
          )}
          {!isLoading && simpleRes && testPing ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Résultat : {simpleRes}
              </Alert>
              <TableContainer
                component={Paper}
                sx={{ marginTop: "20px", backgroundColor: "#f6f6f666" }}
              >
                <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <TableBody>
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        Source
                      </TableCell>
                      <TableCell>{testPing.source}</TableCell>
                    </TableRow>
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        Destination
                      </TableCell>
                      <TableCell>{testPing.destination}</TableCell>
                    </TableRow>
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        TTL
                      </TableCell>
                      <TableCell>{testPing.ttl}</TableCell>
                    </TableRow>
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        RTT (ms)
                      </TableCell>
                      <TableCell>{testPing.rtt_ms}</TableCell>
                    </TableRow>
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        Taille du paquet
                      </TableCell>
                      <TableCell>{testPing.packet_size}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
      </>
    </Space>
  );
};

export default PingSandbox;
