import Title from "@/components/Title";
import Text from "@/components/Text";
import React from "react";
import Space from "@/components/Space";
import { EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import { Code, solarizedLight } from "react-code-blocks";

const Cours: React.FC = () => {

    return (
        <>
        <EmojiProvider data={emojiData}>
        <Space space="1rem">
        <Title level={2}>Introduction</Title>
            <Text>
                L&apos;interface réseau est un composant logiciel ou matériel qui permet à un 
                ordinateur de se connecter à un réseau. 
                En utilisant la commande{" "}
                <Code
                  text="ifconfig"
                  language="bash"
                  theme={solarizedLight}
                />{" "}
                (ou{" "}
                <Code
                  text="ip addr"
                  language="bash"
                  theme={solarizedLight}
                />{" "}
                sur les systèmes Linux récents), 
                on peut obtenir des informations importantes comme :
            </Text>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                <li><Text>L&apos;adresse IP de l&apos;interface</Text></li>
                <li><Text>L&apos;adresse MAC (identifiant physique)</Text></li>
                <li><Text>Le masque de sous-réseau</Text></li>
                <li><Text>L&apos;état de l&apos;interface (active ou non)</Text></li>
            </ul>
            <Text>
                Sur les systèmes Windows, on peut utiliser la commande{" "}
                <Code
                  text="ipconfig"
                  language="batch"
                  theme={solarizedLight}
                />{" "}
                pour obtenir ces informations.
            </Text>
            <Title level={2} margin={{ top: "2rem" }}>
                Interface réseau
            </Title>
            <Text>
                Chaque interface a une adresse IP unique et une adresse MAC (identifiant physique). 
                <Space />
                L&apos;interface{" "}
                <Code
                  text="lo"
                  language="text"
                  theme={solarizedLight}
                />{" "}
                est une interface spéciale qui est utilisée pour les
                communications internes de la machine hôte.
                <Space />
                Sur la machine du site, l&apos;interface{" "}
                <Code
                  text="eth0"
                  language="text"
                  theme={solarizedLight}
                />{" "}
                est l&apos;interface principale
                de la machine hôte qui est connectée au réseau internet.
                Les autres interfaces sont des interfaces virtuelles qui sont
                utilisées pour Docker. Elles
                ne nous intéressent pas pour le moment.
            </Text>
        </Space>
        </EmojiProvider>
        </>
    );
};

export default Cours;
