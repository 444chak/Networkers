"use client";

import Box from "@/components/Box";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ValidatePsw from "@/components/ValidatePsw";
import {validate_passwd} from "../../utils/validatePasswd";
import { useEffect, useState } from "react";
import Title from "@/components/Title";

export default function Profile() {
    const router = useRouter();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("")
    return (
        <Layout type="logged">
            <Box align="center" margin={{ top: "50px", bottom: "150px"}}>
                <Header
                    tabs={{
                    dashboard: "Tableau de bord",
                    modules: "Mes modules",
                    profile: "Mon profil",
                    }}
                    activeTab="profile"
                    onClick={(tab) => router.push(`/${tab.toLowerCase()}`)}
                    onClickLogout={() => router.push("/auth/logout")}
                    onClickLogo={() => router.push("/")}
                />
            </Box>
          <Box align="center">
            <Modal>
              <Title level={3}>Modifier mon mot de passe</Title>
              <Input
                type="password"
                placeholder="Password123&"
                value={password}
                margin={{ bottom: "20px" }}
                onChange={(e) => setPassword(e.target.value)}
                required
                label="Nouveau mot de passe"
              />
              <Input
                type="password"
                placeholder="Password123&"
                value={confirmPassword}
                margin={{ bottom: "20px" }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                label="Confirmer nouveau mot de passe"
              />
              <ValidatePsw
              password={password}
              />
              <Button
                text="Valider"
                primary
                type="input"
                margin={{ top: "20px" }}
                disabled={!password || !confirmPassword || password !== confirmPassword || !validate_passwd(password)}
              />
            </Modal>
          </Box>
        </Layout>
        
    )    
}