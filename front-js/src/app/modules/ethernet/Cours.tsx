import Space from "@/components/Space"
import Title from "@/components/Title"
import { EmojiProvider } from "react-apple-emojis"
import Text from "@/components/Text"
import emojiData from "react-apple-emojis/src/data.json";
import { Code, CodeBlock, solarizedLight } from "react-code-blocks";
import { text } from "stream/consumers";


const CoursEthernet: React.FC = () => {

    const example = `{
        "frame": {
            "dst_mac": "FF:FF:FF:FF:FF:FF",
            "src_mac": "00:11:22:33:44:55",
            "eth_type": "0x0800",
            "frame_hex": "FFFFFFFFFFFF0011223344550800"
        }
    }`;

    return (
        <EmojiProvider data={emojiData}>

            <Space space="1rem">
                <Title level={1} margin={{ top: "2rem" }}>Ethernet</Title>
                <Text>
                    Bienvenue sur le module Ethernet. Ce module génère une trame Ethernet basée sur les paramètres fournis.
                    Elle utilise les informations sur les adresses MAC source et destination ainsi que le type Ethernet (exprimé en hexadécimal).
                    La trame générée est renvoyée au format JSON.
                </Text>

                <Title level={2} margin={{ top: "2rem" }}>Entrées : </Title>
                <Text>・Adresse MAC de destination, (par exemple, FF:FF:FF:FF:FF:FF).</Text>
                <Text>・Adresse MAC source, (par exemple, 00:11:22:33:44:55).</Text>
                <Text>・Type de trame ethernet, (cf Types de trames).</Text>

                <Title level={2} margin={{ top: "2rem" }}>Types de trames Ethernet :</Title>
                <Text>・0x0800 pour IPv4</Text>
                <Text>・0x0806 pour ARP</Text>
                <Text>・0x86DD pour IPv6</Text>
                <Text>・0x8100 pour VLAN</Text>

                <Title level={2} margin={{ top: "2rem" }}>Exemple de réponse 200 OK</Title>
                <CodeBlock
                    text={(example)}
                    language="JSON"
                    theme={solarizedLight}
                />
            </Space>
        </EmojiProvider>
    )
}

export default CoursEthernet