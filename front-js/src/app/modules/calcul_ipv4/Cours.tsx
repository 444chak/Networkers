import Title from "@/components/Title";
import Text from "@/components/Text";
import React from "react";
import Space from "@/components/Space";
import { Code, solarizedLight } from "react-code-blocks";

const Cours: React.FC = () => {
  return (
    <>
      <Space space="1rem">
        <Title level={2}>Introduction</Title>
        <Text>
          Une adresse IPV4 est un pilier fondamental des réseaux informatiques. Les adresses IPv4 sont 
          divisées en classes pour organiser leur utilisation. Les masques de sous-réseaux permettent de diviser
          un réseau en sous-réseaux plus-petit. 
        </Text>
        <Title level={2} margin={{ top: "2rem" }}>
          Classe 
        </Title>
        <Text>
        Les adresses IPv4 sont divisées en classes pour organiser leur allocation. 
        Voici comment différencier les classes A, B et C :
        </Text>
        <Title level={3} margin={{ top: "2rem" }}>
          Classe A
        </Title>
        <Title level={4}>Caractéristiques : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>Les adresses de classe A sont destinées aux réseaux de très grande taille.</Text>
          </li>
          <li>
            <Text>Le premier bit de l’adresse est toujours 0.</Text>
          </li>
          <li>
            <Text>Le premier octet détermine le réseau (Network ID).</Text>
          </li>
          <li>
            <Text>Les 3 autres octets sont réservés aux hôtes.</Text>
          </li>
        </ul>
        <Title level={4}>Exemples : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>Adresse : 
            <Code
              text="10.0.0.1"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
          <li>
            <Text>Réseau : 
            <Code
              text="10.0.0.0"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
          <li>
            <Text>Plage : 
            <Code
              text="1.0.0.0"
              language="text"
              theme={solarizedLight}
            /> à 
            <Code
              text="126.255.255.255"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
          <li>
            <Text>L’adresse <Code
              text="127.x.x.x"
              language="text"
              theme={solarizedLight}
            /> est réservée pour les tests en boucle locale (localhost).</Text>
          </li>
        </ul>

        <Title level={3} margin={{ top: "2rem" }}>
          Classe B
        </Title>
        <Title level={4}>Caractéristiques : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>Les adresses de classe B conviennent aux réseaux de taille moyenne à grande.</Text>
          </li>
          <li>
            <Text>Les deux premiers bits de l’adresse est toujours 10.</Text>
          </li>
          <li>
            <Text>Les 2 premiers octets détermine le réseau (Network ID).</Text>
          </li>
          <li>
            <Text>Les 2 autres octets sont réservés aux hôtes.</Text>
          </li>
        </ul>
        <Title level={4}>Exemples : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>Adresse : 
            <Code
              text="172.16.0.1"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
          <li>
            <Text>Réseau : 
            <Code
              text="172.16.0.0"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
          <li>
            <Text>Plage : 
            <Code
              text="128.0.0.0"
              language="text"
              theme={solarizedLight}
            /> à 
            <Code
              text="191.255.255.255"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
        </ul>
        <Title level={3} margin={{ top: "2rem" }}>
          Classe C
        </Title>
        <Title level={4}>Caractéristiques : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>Les adresses de classe C sont utilisées pour de petits réseaux.</Text>
          </li>
          <li>
            <Text>Les 3 premiers bits sont toujours 110.</Text>
          </li>
          <li>
            <Text>Les 3 premiers octets déterminent le réseau (Network ID).</Text>
          </li>
          <li>
            <Text>Le dernier octet est réservé aux hôtes.</Text>
          </li>
        </ul>
        <Title level={4}>Exemples : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>Adresse : 
            <Code
              text="192.168.1.1"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
          <li>
            <Text>Réseau : 
            <Code
              text="192.168.1.0"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
          <li>
            <Text>Plage : 
            <Code
              text="192.0.0.0"
              language="text"
              theme={solarizedLight}
            /> à
            <Code
              text="223.255.255.255"
              language="text"
              theme={solarizedLight}
            />
            </Text>
          </li>
        </ul>

        <Title level={2} margin={{ top: "2rem" }}>
          Masque  
        </Title>


      </Space>
    </>
  );
};

export default Cours;
