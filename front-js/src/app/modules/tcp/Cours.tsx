import Title from "@/components/Title";
import Text from "@/components/Text";
import React from "react";
import Space from "@/components/Space";
import Box from "@/components/Box";

const Cours: React.FC = () => {
  return (
    <>
      <Space space="1rem">
        <Title level={2}>Introduction</Title>
        <Text>
          TCP (Transmission Control Protocol) est un protocole de communication
          qui assure la transmission de données entre deux machines. Il garantit
          que les données envoyées par une machine arrivent bien à l&rsquo;autre
          machine, dans le bon ordre et sans erreur.
        </Text>
        <Title level={2} margin={{ top: "2rem" }}>
          Fonctionnement TCP
        </Title>
        <Text>
          TCP fonctionne en établissant une connexion entre deux machines avant
          de transmettre des données. Cette connexion est appelée{" "}
          <b>connexion TCP</b>. Elle est établie en trois étapes :
          <Box margin={{ top: "1rem", left: "2rem" }}>
            <ol>
              <li>
                <b>Établissement de la connexion :</b> Les deux machines
                s&rsquo;échangent des paquets pour s&rsquo;assurer
                qu&rsquo;elles sont prêtes à communiquer.
              </li>
              <li>
                <b>Transfert des données :</b> Les données sont envoyées en
                plusieurs paquets, chacun étant numéroté pour être reconstitué
                dans le bon ordre.
              </li>
              <li>
                <b>Fin de la connexion :</b> Les deux machines s&rsquo;échangent
                des paquets pour clôturer la connexion.
              </li>
            </ol>
          </Box>
        </Text>
      </Space>
    </>
  );
};

export default Cours;
