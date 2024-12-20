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
          Une adresse IPV4 est un pilier fondamental des réseaux informatiques.
          Les adresses IPv4 sont divisées en classes pour organiser leur
          utilisation. Les masques de sous-réseaux permettent de diviser un
          réseau en sous-réseaux plus-petit.
        </Text>
        <Title level={2} margin={{ top: "2rem" }}>
          Classe
        </Title>
        <Text>
          Les adresses IPv4 sont divisées en classes pour organiser leur
          allocation. Voici comment différencier les classes A, B et C :
        </Text>
        <Title level={3} margin={{ top: "2rem" }}>
          Classe A
        </Title>
        <Title level={4}>Caractéristiques : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>
              Les adresses de classe A sont destinées aux réseaux de très grande
              taille.
            </Text>
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
            <Text>
              Adresse :
              <Code text="10.0.0.1" language="text" theme={solarizedLight} />
            </Text>
          </li>
          <li>
            <Text>
              Réseau :
              <Code text="10.0.0.0" language="text" theme={solarizedLight} />
            </Text>
          </li>
          <li>
            <Text>
              Plage :
              <Code text="1.0.0.0" language="text" theme={solarizedLight} /> à
              <Code
                text="126.255.255.255"
                language="text"
                theme={solarizedLight}
              />
            </Text>
          </li>
          <li>
            <Text>
              L’adresse{" "}
              <Code text="127.x.x.x" language="text" theme={solarizedLight} />{" "}
              est réservée pour les tests en boucle locale (localhost).
            </Text>
          </li>
        </ul>

        <Title level={3} margin={{ top: "2rem" }}>
          Classe B
        </Title>
        <Title level={4}>Caractéristiques : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>
              Les adresses de classe B conviennent aux réseaux de taille moyenne
              à grande.
            </Text>
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
            <Text>
              Adresse :
              <Code text="172.16.0.1" language="text" theme={solarizedLight} />
            </Text>
          </li>
          <li>
            <Text>
              Réseau :
              <Code text="172.16.0.0" language="text" theme={solarizedLight} />
            </Text>
          </li>
          <li>
            <Text>
              Plage :
              <Code text="128.0.0.0" language="text" theme={solarizedLight} /> à
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
            <Text>
              Les adresses de classe C sont utilisées pour de petits réseaux.
            </Text>
          </li>
          <li>
            <Text>Les 3 premiers bits sont toujours 110.</Text>
          </li>
          <li>
            <Text>
              Les 3 premiers octets déterminent le réseau (Network ID).
            </Text>
          </li>
          <li>
            <Text>Le dernier octet est réservé aux hôtes.</Text>
          </li>
        </ul>
        <Title level={4}>Exemples : </Title>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>
              Adresse :
              <Code text="192.168.1.1" language="text" theme={solarizedLight} />
            </Text>
          </li>
          <li>
            <Text>
              Réseau :
              <Code text="192.168.1.0" language="text" theme={solarizedLight} />
            </Text>
          </li>
          <li>
            <Text>
              Plage :
              <Code text="192.0.0.0" language="text" theme={solarizedLight} /> à
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
        <Text>
          Un masque de sous-réseau est un outil essentiel en réseau
          informatique. Il est utilisé pour diviser une adresse IPv4 en deux
          parties principales :
        </Text>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>
              La partie réseau : identifie le réseau auquel appartient une
              adresse.
            </Text>
          </li>
          <li>
            <Text>
              La partie hôte : identifie les appareils spécifiques (hôtes) sur
              ce réseau.
            </Text>
          </li>
        </ul>
        <Text>
          Le masque est représenté sous la forme de 4 octets (32 bits), comme
          une adresse IPv4. Exemple :{" "}
          <Code text="255.255.255.0" language="text" theme={solarizedLight} />
        </Text>
        <Title level={3} margin={{ top: "2rem" }}>
          Calculer un masque de sous-réseau depuis une notation CIDR
        </Title>
        <ol style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>
              Identifiez le nombre de bits réseau dans la notation CIDR.
            </Text>
          </li>
          <li>
            <Text>
              Complétez ces bits en binaire avec des 1 suivis de 0 jusqu&rsquo;à
              atteindre 32 bits.
            </Text>
          </li>
          <li>
            <Text>Convertissez chaque bloc de 8 bits (octet) en décimal.</Text>
          </li>
        </ol>
        <Title level={4} margin={{ top: "2rem" }}>
          Exemple :
        </Title>
        <Text>Exemple pour /20</Text>
        <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
          <li>
            <Text>20 bits pour le réseau. </Text>
          </li>
          <li>
            <Text>
              20 bits à 1 →{" "}
              <Code
                text="11111111.11111111.11110000.00000000"
                language="text"
                theme={solarizedLight}
              />
            </Text>
          </li>
          <li>
            <Text>
              En décimal :{" "}
              <Code
                text="255.255.240.0"
                language="text"
                theme={solarizedLight}
              />
            </Text>
          </li>
        </ul>
      </Space>
    </>
  );
};

export default Cours;
