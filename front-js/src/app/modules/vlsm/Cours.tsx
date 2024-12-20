import Title from "@/components/Title";
import Text from "@/components/Text";
import React from "react";
import Space from "@/components/Space";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";

const Cours: React.FC = () => {

  return (
    <>
      <EmojiProvider data={emojiData}>
        <Space space="1rem">
          <Title level={2}>Introduction</Title>
          <Text>
            VLSM (Variable Length Subnet Masking) est une technique de
            sous-réseautage qui permet de créer des sous-réseaux de différentes
            tailles. Cette technique est utilisée pour optimiser l&rsquot;utilisation
            des adresses IP.
          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Fonctionnement VLSM
          </Title>
          <Text>
            VLSM permet de diviser un réseau en sous-réseaux de différentes
            tailles. Chaque sous-réseau peut accueillir un nombre minimisé
            de machine. Cela permet d&rsquo;optimiser l&rsquo;utilisation
            des adresses IP.

          </Text>
          <Title level={2} margin={{ top: "2rem" }}>
            Essayez ! <Emoji name="test-tube" width={32} />
          </Title>
        </Space>
      </EmojiProvider>
    </>
  );
};

export default Cours;
