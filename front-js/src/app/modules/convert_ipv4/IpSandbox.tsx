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
  const errors = {
    invalidIpv4: "Adresse IPv4 invalide",
    invalidCidr: "CIDR invalide",
    conversionError: "Erreur lors de la conversion",
  };

  const [ipv4toBinary, setIpv4toBinary] = useState("");
  const [ipv4toHex, setIpv4toHex] = useState("");
  const [binary2ipv4, setBinary2ipv4] = useState("");
  const [hex2ipv4, setHex2ipv4] = useState("");
  const [cidr, setCidr] = useState("");

  const [binaryRes, setBinaryRes] = useState("");
  const [hexRes, setHexRes] = useState("");
  const [ipv4fromBinRes, setIpv4fromBinRes] = useState("");
  const [ipv4fromHexRes, setIpv4fromHexRes] = useState("");
  const [cidrRes, setCidrRes] = useState("");

  const handleConvertToBinary = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/dec_to_bin/" + ipv4toBinary, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setBinaryRes(data.ipv4);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setBinaryRes(errors.invalidIpv4);
        } else {
          setBinaryRes(errors.invalidIpv4);
        }
      } else {
        setBinaryRes(errors.conversionError);
      }
    }
  };

  const handleConvertToHex = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/dec_to_hex/" + ipv4toHex, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setHexRes(data.ipv4);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setHexRes(errors.invalidIpv4);
        } else {
          setHexRes(errors.invalidIpv4);
        }
      } else {
        setHexRes(errors.conversionError);
      }
    }
  };

  const handleConvertFromBinary = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/bin_to_dec/" + binary2ipv4, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setIpv4fromBinRes(data.ipv4);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setIpv4fromBinRes(errors.invalidIpv4);
        } else {
          setIpv4fromBinRes(errors.invalidIpv4);
        }
      } else {
        setIpv4fromBinRes(errors.conversionError);
      }
    }
  };

  const handleConvertFromHex = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.get("/ipv4/hex_to_dec/" + hex2ipv4, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setIpv4fromHexRes(data.ipv4);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid IPv4") {
          setIpv4fromHexRes(errors.invalidIpv4);
        } else {
          setIpv4fromHexRes(errors.invalidIpv4);
        }
      } else {
        setIpv4fromHexRes(errors.conversionError);
      }
    }
  };

  const handleConvertCidr = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const ip = cidr.split("/")[0];
      const mask = cidr.split("/")[1];
      const response = await axios.get("/ipv4/cidr/" + ip + "?mask=" + mask, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setCidrRes(data.ipv4);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        const data = axiosError.response.data as { detail: string };
        if (data.detail === "Invalid CIDR") {
          setCidrRes(errors.invalidCidr);
        } else {
          setCidrRes(errors.invalidCidr);
        }
      } else {
        setCidrRes(errors.conversionError);
      }
    }
  };

  return (
    <>
      <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
        <form onSubmit={handleConvertToBinary}>
          <Title level={2}>Conversion d&rsquo;une IPv4 en binaire</Title>

          <Input
            type="text"
            placeholder="192.168.1.1"
            value={ipv4toBinary}
            margin={{ bottom: "20px" }}
            onChange={(e) => setIpv4toBinary(e.target.value)}
            required
            label="Adresse IPv4"
          />
          <Button
            text="Convertir en binaire"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!ipv4toBinary}
          />
          {binaryRes && (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity={
                  Object.values(errors).includes(binaryRes)
                    ? "error"
                    : "success"
                }
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {Object.values(errors).includes(binaryRes)
                  ? binaryRes
                  : `Résultat : ${binaryRes}`}
              </Alert>
            </Box>
          )}
        </form>

        <form onSubmit={handleConvertToHex}>
          <Title level={2}>Conversion d&rsquo;une IPv4 en hexadécimal</Title>

          <Input
            type="text"
            placeholder="192.168.1.1"
            value={ipv4toHex}
            margin={{ bottom: "20px" }}
            onChange={(e) => setIpv4toHex(e.target.value)}
            required
            label="Adresse IPv4"
          />
          <Button
            text="Convertir en hexadécimal"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!ipv4toHex}
          />
          {hexRes && (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity={
                  Object.values(errors).includes(hexRes) ? "error" : "success"
                }
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {Object.values(errors).includes(hexRes)
                  ? hexRes
                  : `Résultat : ${hexRes}`}
              </Alert>
            </Box>
          )}
        </form>
        <form onSubmit={handleConvertFromBinary}>
          <Title level={2}>
            Conversion d&rsquo;une IPv4 binaire en décimal
          </Title>

          <Input
            type="text"
            placeholder="11000000.10101000.00000001.00000001"
            value={binary2ipv4}
            margin={{ bottom: "20px" }}
            onChange={(e) => setBinary2ipv4(e.target.value)}
            required
            label="Adresse IPv4 binaire"
          />
          <Button
            text="Convertir en décimal"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!binary2ipv4}
          />
          {ipv4fromBinRes && (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity={
                  Object.values(errors).includes(ipv4fromBinRes)
                    ? "error"
                    : "success"
                }
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {Object.values(errors).includes(ipv4fromBinRes)
                  ? ipv4fromBinRes
                  : `Résultat : ${ipv4fromBinRes}`}
              </Alert>
            </Box>
          )}
        </form>
        <form onSubmit={handleConvertFromHex}>
          <Title level={2}>
            Conversion d&rsquo;une IPv4 hexadécimale en décimal
          </Title>

          <Input
            type="text"
            placeholder="C0.A8.01.01"
            value={hex2ipv4}
            margin={{ bottom: "20px" }}
            onChange={(e) => setHex2ipv4(e.target.value)}
            required
            label="Adresse IPv4 hexadécimale"
          />
          <Button
            text="Convertir en décimal"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!hex2ipv4}
          />
          {ipv4fromHexRes && (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity={
                  Object.values(errors).includes(ipv4fromHexRes)
                    ? "error"
                    : "success"
                }
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {Object.values(errors).includes(ipv4fromHexRes)
                  ? ipv4fromHexRes
                  : `Résultat : ${ipv4fromHexRes}`}
              </Alert>
            </Box>
          )}
        </form>
        <form onSubmit={handleConvertCidr}>
          <Title level={2}>Conversion d&rsquo;un CIDR en IPv4</Title>

          <Input
            type="text"
            placeholder="24"
            value={cidr}
            margin={{ bottom: "20px" }}
            onChange={(e) => setCidr(e.target.value)}
            required
            label="CIDR"
          />
          <Button
            text="Convertir en IPv4"
            primary
            form="submit"
            type="input"
            margin={{ top: "20px" }}
            disabled={!cidr}
          />
          {cidrRes && (
            <Box margin={{ top: "20px", bottom: "20px" }}>
              <Alert
                severity={
                  Object.values(errors).includes(cidrRes) ? "error" : "success"
                }
                variant="outlined"
                style={{ borderRadius: "10px" }}
              >
                {Object.values(errors).includes(cidrRes)
                  ? cidrRes
                  : `Résultat : ${cidrRes}`}
              </Alert>
            </Box>
          )}
        </form>
      </Space>
    </>
  );
};

export default IpSandbox;
