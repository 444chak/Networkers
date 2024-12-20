import Title from "@/components/Title";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Space from "@/components/Space";
import React from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import Box from "@/components/Box";
import Cookies from "js-cookie";
import axios from "@/axiosConfig";
import { AxiosError } from "axios";
import { Code, solarizedLight } from "react-code-blocks";

const EthernetSandbox: React.FC = () => {
    const [masdst, setMacdst] = useState("");
    const [macsrc, setMacsrc] = useState("");
    const [typetrame, setTypetrame] = useState("");
    const [simpleRes, setSimpleRes] = useState("");

    const handleEthernet = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `/scapy/ethernet-frame/${masdst}/${macsrc}/${typetrame}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                }
            );
            const data = response.data;
            if (response.status === 200) {
                setSimpleRes(data.frame);
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 400) {
                const data = axiosError.response.data as { detail: string };
                setSimpleRes(data.detail || "Erreur lors de la création de la trame Ethernet");
            } else {
                setSimpleRes("Erreur inattendue lors de l'appel API");
            }
        }
    };


    return (
        <>
            <Space space="50px" direction="vertical" margin={{ bottom: "100px" }}>
                <form onSubmit={handleEthernet}>
                    <Title level={2}>Rédiger votre trame Ethernet :</Title>

                    <Input
                        type="text"
                        placeholder="FF:FF:FF:FF:FF:FF"
                        value={masdst}
                        margin={{ bottom: "20px" }}
                        onChange={(e) => setMacdst(e.target.value)}
                        required
                        label="Adresse mac destination"
                    />
                    <Input
                        type="text"
                        placeholder="00:11:22:33:44:55"
                        value={macsrc}
                        margin={{ bottom: "20px" }}
                        onChange={(e) => setMacsrc(e.target.value)}
                        required
                        label="Adresse mac source"
                    />
                    <Input
                        type="text"
                        placeholder="0x0800"
                        value={typetrame}
                        margin={{ bottom: "20px" }}
                        onChange={(e) => setTypetrame(e.target.value)}
                        required
                        label="Type de trame Ethernet"
                    />
                    <Button
                        text="Envoyer"
                        primary
                        form="submit"
                        type="input"
                        margin={{ top: "20px" }}
                        disabled={!masdst || !macsrc || !typetrame}
                        onClick={(e) => {
                            handleEthernet(e);
                        }}
                    />
                    {simpleRes ? (
                        <Box margin={{ top: "20px", bottom: "20px" }}>
                            <Alert
                                severity={simpleRes.includes("Erreur") ? "error" : "success"}
                                variant="outlined"
                                style={{ borderRadius: "10px" }}
                            >
                                Résultat :
                                <Code
                                    text={simpleRes}                                    
                                    language="JSON"
                                    theme={solarizedLight}
                                />
                            </Alert>
                        </Box>
                    ) : null}
                </form>
            </Space>
        </>
    );
};

export default EthernetSandbox;