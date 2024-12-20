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
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@/components/Box";
import { AxiosError } from "axios";

interface Subnet {
  network: string;
  mask: string;
  broadcast: string;
  range: string;
}

const VlsmSandbox: React.FC = () => {
  const [baseIp, setBaseIp] = useState("");
  const [nombreAddr, setNombreAddr] = useState("");
  const [subnets, setSubnets] = useState<
    Array<{ network: string; mask: string; broadcast: string; range: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubnets = async (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    setError("");
    setSubnets([]);
    e.preventDefault();
    try {
      const response = await axios.get(
        "/ipv4/vlsm/" + baseIp + "/" + nombreAddr,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        const formattedSubnets = data.subnet.map((subnet: Subnet) => ({
          network: subnet.network,
          mask: subnet.mask,
          broadcast: subnet.broadcast,
          range: subnet.range,
        }));
        setSubnets(formattedSubnets);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        setError("Erreur interne");
      } else {
        setError("Erreur interne inconnue");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handleSubnets}>
          <Title level={2}>Création d&rsquo;un sous réseau</Title>

          <Input
            type="text"
            placeholder="192.168.1.0"
            value={baseIp}
            margin={{ bottom: "20px" }}
            onChange={(e) => setBaseIp(e.target.value)}
            required
            label="Adresse IP de base"
          />
          <Input
            type="text"
            placeholder="2,50,100"
            value={nombreAddr}
            margin={{ bottom: "20px" }}
            onChange={(e) => setNombreAddr(e.target.value)}
            required
            label="Nombre d&rsquo;adresses à attribuer (séparées par des virgules)"
          />
          <Button
            text="Trouver les sous-réseaux"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!baseIp || !nombreAddr}
            onClick={(e) => {
              handleSubnets(e);
            }}
          />
          {subnets.length > 0 ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Sous-réseaux créés avec succès !
              </Alert>
              <TableContainer
                component={Paper}
                sx={{ marginTop: "20px", backgroundColor: "#f6f6f666" }}
              >
                <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <TableHead>
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        Network
                      </TableCell>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        Mask
                      </TableCell>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        Broadcast
                      </TableCell>
                      <TableCell style={{ paddingRight: "1.5em" }}>
                        Range
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subnets.map((subnet, index) => (
                      <TableRow
                        key={index}
                        style={{ borderBottom: "1px solid black" }}
                      >
                        <TableCell>{subnet.network}</TableCell>
                        <TableCell>{subnet.mask}</TableCell>
                        <TableCell>{subnet.broadcast}</TableCell>
                        <TableCell>{subnet.range}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : isLoading ? (
            <Box align="center" margin={{ top: "20px", bottom: "20px" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
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

export default VlsmSandbox;
