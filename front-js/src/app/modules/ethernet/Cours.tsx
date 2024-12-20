import Space from "@/components/Space";
import Title from "@/components/Title";
import { EmojiProvider } from "react-apple-emojis";
import Text from "@/components/Text";
import emojiData from "react-apple-emojis/src/data.json";
import { CodeBlock, solarizedLight } from "react-code-blocks";

const CoursEthernet: React.FC = () => {
  return (
    <EmojiProvider data={emojiData}>
      <Space space="1rem">
        <Title level={1} margin={{ top: "2rem" }}>
          Trames Ethernet
        </Title>
        <Text>
          Bienvenue sur le module &quot;Trames Ethernet&quot;. Ce cours explore
          la structure des trames Ethernet, leur composition, et les types de
          protocoles qu&rsquo;elles supportent. Une trame Ethernet est le format
          standard utilisé pour transporter des données au sein d’un réseau
          local (LAN).
        </Text>

        <Title level={2} margin={{ top: "2rem" }}>
          Structure d&rsquo;une trame Ethernet :
        </Title>
        <Text>Une trame Ethernet est constituée des éléments suivants :</Text>
        <Text>・Préambule (7 octets) : Synchronisation du signal.</Text>
        <Text>
          ・SFD (Start Frame Delimiter, 1 octet) : Indique le début de la trame.
        </Text>
        <Text>
          ・Adresse MAC de destination (6 octets) : Identifie l&rsquo;appareil
          récepteur.
        </Text>
        <Text>
          ・Adresse MAC source (6 octets) : Identifie l&rsquo;appareil émetteur.
        </Text>
        <Text>
          ・Type/EtherType (2 octets) : Indique le protocole encapsulé (ex :
          IPv4, ARP).
        </Text>
        <Text>
          ・Données/Payload (46 à 1500 octets) : Contenu utile à transmettre.
        </Text>
        <Text>
          ・FCS (Frame Check Sequence, 4 octets) : Contrôle d&rsquo;erreur basé
          sur un CRC.
        </Text>

        <Title level={2} margin={{ top: "2rem" }}>
          Types de trames Ethernet :
        </Title>
        <Text>
          Le champ Type/EtherType est crucial pour identifier le protocole
          transporté. Voici quelques valeurs communes :
        </Text>
        <Text>・0x0800 : IPv4</Text>
        <Text>・0x0806 : ARP</Text>
        <Text>・0x86DD : IPv6</Text>
        <Text>・0x8100 : VLAN (802.1Q)</Text>

        <Title level={2} margin={{ top: "2rem" }}>
          Création d&rsquo;une trame Ethernet :
        </Title>
        <Text>
          Une trame Ethernet est construite en combinant les informations
          suivantes :
        </Text>
        <Text>
          ・Adresse MAC de destination, (ex : FF:FF:FF:FF:FF:FF pour un
          broadcast).
        </Text>
        <Text>
          ・Adresse MAC source, (ex : 00:11:22:33:44:55 pour un appareil
          spécifique).
        </Text>
        <Text>・Type/EtherType, (cf. liste des types ci-dessus).</Text>
        <Text>・Données utiles, avec un minimum de 46 octets.</Text>

        <Title level={2} margin={{ top: "2rem" }}>
          Exemple d&rsquo;une trame Ethernet :
        </Title>
        <Text>
          Une trame typique en format hexadécimal pourrait ressembler à ceci :
        </Text>
        <CodeBlock
          text={`FF:FF:FF:FF:FF:FF 00:11:22:33:44:55 08:00 [Données] [CRC]`}
          language="text"
          theme={solarizedLight}
        />

        <Title level={2} margin={{ top: "2rem" }}>
          Cas d&rsquo;utilisation :
        </Title>
        <Text>
          Les trames Ethernet sont utilisées dans divers contextes, notamment :
        </Text>
        <Text>・Transmission de paquets IP sur un réseau local.</Text>
        <Text>
          ・Envoi de requêtes ARP pour la résolution d&rsquo;adresses IP.
        </Text>
        <Text>
          ・Transport de données spécifiques à un VLAN dans des réseaux
          segmentés.
        </Text>

        <Title level={2} margin={{ top: "2rem" }}>
          Exemple de réponse JSON :
        </Title>
        <CodeBlock
          text={`{
    "Destination_MAC": "FF:FF:FF:FF:FF:FF",
    "Source_MAC": "00:11:22:33:44:55",
    "Type": "0x0800",
    "Data": "Payload (en hexadécimal)"
}`}
          language="json"
          theme={solarizedLight}
        />
      </Space>
    </EmojiProvider>
  );
};

export default CoursEthernet;
