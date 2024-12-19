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
import ValidatePsw from "@/components/ValidatePsw";
import { validate_passwd } from "./validatePasswd";
import Backlink from "@/components/Backlink";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Layout type="home">
      <Backlink onClick={router.back} />
      <Box align="center" margin={{ top: "100px", bottom: "50px" }}>
        <Title level={1}>Networkers</Title>
      </Box>
      <Box align="center">
        <Modal>
          <Title level={3}>Inscription</Title>
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
          <Input
            type="password"
            placeholder="Password123&"
            value={confirmPassword}
            margin={{ bottom: "20px" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            label="Confimer mot de passe"
          />
          <ValidatePsw password={password} />
          <Button
            text="Connexion"
            primary
            type="input"
            margin={{ top: "20px" }}
            disabled={
              !username ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              !validate_passwd(password)
            }
          />
          <Box align="right">
            <Text align="right" margin={{ top: "20px" }} size="15px">
              Déjà un compte ? <Link href="/auth/login">Se connecter</Link>
            </Text>
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
}
