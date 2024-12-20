import Title from "@/components/Title";
import Button from "@/components/Button";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";
import Box from "@/components/Box";

const InterfaceSandbox: React.FC = () => {
  const [interfaces, setInterfaces] = useState<
    Array<{ name: string; mac: string; ip: string }>
  >([]);

  const handleInterfaces = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/scapy/interfaces/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        const formattedInterfaces = Object.entries(data.interfaces).map(
          ([name, details]: [string, any]) => ({
            name,
            mac: details.mac,
            ip: details.ip,
          }),
        );
        setInterfaces(formattedInterfaces);
      }
    } catch (error: unknown) {}
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handleInterfaces}>
          <Title level={2}>Interface réseau</Title>

          <Button
            text="Obtenir les interfaces de la machine hôte"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
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
                Résultat :
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr style={{ borderBottom: "1px solid black" }}>
                    <th style={{ paddingRight: "1.5em" }}>Interface</th>
                    <th style={{ paddingRight: "1.5em" }}>Adresse IP</th>
                    <th style={{ paddingRight: "1.5em" }}>Adresse MAC</th>
                  </tr>
                  {interfaces.map((iface, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid black" }}>
                      <td>{iface.name}</td>
                      <td>{iface.ip}</td>
                      <td>{iface.mac}</td>
                    </tr>
                  ))}
                </table>
              </Alert>
            </Box>
          ) : null}
        </form>
      </Space>
    </>
  );
};

export default InterfaceSandbox;
