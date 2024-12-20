import Title from "@/components/Title";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@/components/Box";

const InterfaceSandbox: React.FC = () => {
  const [interfaces, setInterfaces] = useState<
    Array<{ name: string; mac: string; ip: string }>
  >([]);
  const [command, setCommand] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleInterfaces = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (command != "ifconfig" && command != "ip a" && command != "ipconfig") {
      setError("Commande incorrecte");
      setInterfaces([]);
      return;
    }

    interface Details {
      mac: string;
      ip: string;
    }

    try {
      const response = await axios.get("/scapy/interfaces/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        const formattedInterfaces = Object.entries(data.interfaces).map(
          ([name, details]) => ({
            name,
            mac: (details as Details).mac,
            ip: (details as Details).ip,
          })
        );
        setInterfaces(formattedInterfaces);
        setError("");
      }
    } catch {}
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handleInterfaces}>
          <Title level={2}>Interface réseau</Title>

          <Input
            label="Commande de récupération des interfaces"
            type="text"
            placeholder="ifconfig, ip a, ipconfig"
            value={command}
            margin={{ bottom: "20px" }}
            onChange={(e) => setCommand(e.target.value)}
            required
          />

          <Button
            text="Obtenir les interfaces de la machine hôte"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!command}
            onClick={(e) => {
              handleInterfaces(e);
            }}
          />
          {interfaces.length > 0 ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Récupération des interfaces réussie
              </Alert>
              <TableContainer
                component={Paper}
                sx={{ marginTop: "20px", backgroundColor: "#f6f6f666" }}
              >
                <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <TableHead>
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell>Interface</TableCell>
                      <TableCell>Adresse IP</TableCell>
                      <TableCell>Adresse MAC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interfaces.map((iface, index) => (
                      <TableRow
                        key={index}
                        style={{ borderBottom: "1px solid black" }}
                      >
                        <TableCell>{iface.name}</TableCell>
                        <TableCell>{iface.ip}</TableCell>
                        <TableCell>{iface.mac}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : null}
          {error ? (
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

export default InterfaceSandbox;
