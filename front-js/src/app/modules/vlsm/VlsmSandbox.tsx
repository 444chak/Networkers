import Title from "@/components/Title";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";
import Box from "@/components/Box";

const VlsmSandbox: React.FC = () => {
  const [baseIp, setBaseIp] = useState("");
  const [nombreAddr, setNombreAddr] = useState("");
  const [subnets, setSubnets] = useState<
    Array<{ network: string; mask: string; broadcast: string; range: string }>
  >([]);

  const handleSimplify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/vlsm/" + baseIp + "/" + nombreAddr, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        const formattedSubnets = data.subnet.map((subnet: any) => ({
          network: subnet.network,
          mask: subnet.mask,
          broadcast: subnet.broadcast,
          range: subnet.range,
        }));
        setSubnets(formattedSubnets);
      }
    } catch (error: unknown) {
    }
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handleSimplify}>
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
            text="Simplifier"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!baseIp || !nombreAddr}
            onClick={(e) => {
              handleSimplify(e);
            }}
          />
          {subnets.length > 0 ? (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                Résultat :
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th style={{ paddingRight: "1.5em" }}>Network</th>
                      <th style={{ paddingRight: "1.5em" }}>Mask</th>
                      <th style={{ paddingRight: "1.5em" }}>Broadcast</th>
                      <th style={{ paddingRight: "1.5em" }}>Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subnets.map((subnet, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid black" }}>
                        <td>{subnet.network}</td>
                        <td>{subnet.mask}</td>
                        <td>{subnet.broadcast}</td>
                        <td>{subnet.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Alert>
            </Box>
          ) : null}
        </form>
      </Space>
    </>
  );
};

export default VlsmSandbox;
