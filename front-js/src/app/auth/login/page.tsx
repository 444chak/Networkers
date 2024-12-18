"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Title from "@/components/Title";
import Text from "@/components/Text";
import { useState } from "react";
import Link from "@/components/Link";

export default function Home() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  return (
    <Layout type="home">
      <Box align="center" margin={{ top: "100px", bottom: "50px" }}>
        <Title level={1}>Networkers</Title>
      </Box>
      <Box align="center">
        <Modal>
          <Title level={3}>Connexion</Title>
          <Input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            margin={{ bottom: "20px" }}
            onChange={(e) => setUsername(e.target.value)}
            required
            label="Nom d'utilisateur"
          />
          <Input
            type="password"
            placeholder="Password123&"
            value={password}
            margin={{ bottom: "20px" }}
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Mot de passe"
          />
          <Button
            text="Connexion"
            primary
            type="input"
            margin={{ top: "20px" }}
            disabled={!username || !password}
          />
          <Box align="right">
            <Text align="right" margin={{ top: "20px" }} size="15px">
              Pas encore de compte ?{" "}
              <Link href="/auth/signup">S’inscrire</Link>
            </Text>
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
}
