"use client";

import Box from "@/components/Box";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import Title from "@/components/Title";
import axios from "@/axiosConfig";
import Cookies from "js-cookie";
import { Alert, MenuItem, Select } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Profile() {
  const router = useRouter();

  const [, setHasAccessToken] = useState(false);

  useEffect(() => {
    const checkTokens = async () => {
      const token = Cookies.get("access_token");
      const refresh = Cookies.get("refresh_token");
      if (!token && refresh) {
        try {
          const response = await axios.post("/auth/refresh", {
            refresh_token: refresh,
          });
          const data = response.data;
          if (response.status === 200) {
            Cookies.set("access_token", data.access_token);
            Cookies.set("refresh_token", refresh);
          }
        } catch {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
        }
      }
      setHasAccessToken(!!token);

      if (!token && !refresh) {
        router.push("/");
      }
    };

    checkTokens();
  }, [router]);

  const [, setRole] = useState("");

  const [currentUser, setCurrentUser] = useState<string>();

  const getAdminUser = async () => {
    try {
      const response = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      setCurrentUser(response.data.username);
    } catch {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      router.push("/");
    }
  };

  useEffect(() => {
    getAdminUser();
  }, []);

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        setRole(response.data.role);
        if (response.data.role !== "admin") {
          router.push("/");
        }
      } catch {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        router.push("/");
      }
    };

    getRole();
  }, [router]);

  const [users, setUsers] = useState<Array<string>>();

  const getUsers = async () => {
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = new Array<string>();
      for (const user of response.data) {
        data.push(user.username);
      }
      setUsers(data);
      console.log(data);
    } catch {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [selectedUser, setSelectedUser] = useState("");
  const [username, setUsername] = useState("");
  const [res, setRes] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `/users/${selectedUser}`,
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setRes("Utilisateur mis à jour");
        getUsers();
      }
    } catch {}
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/users/${selectedUser}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      if (response.status === 200) {
        setRes("Utilisateur supprimé");
        getUsers();
        setSelectedUser("");
      }
    } catch {}
  };

  return (
    <Layout type="logged">
      <Box align="center" margin={{ top: "50px", bottom: "100px" }}>
        <Header
          tabs={{
            dashboard: "Tableau de bord",
            profile: "Mon profil",
          }}
          activeTab="userManagement"
          onClick={(tab) => router.push(`/${tab.toLowerCase()}`)}
          onClickLogout={() => router.push("/auth/logout")}
          onClickLogo={() => router.push("/")}
        />
      </Box>
      <Box align="center" margin={{ bottom: "150px" }}>
        <Modal>
          <Title level={3}>Gestion des utilisateurs</Title>
          <form>
            <label htmlFor="user">Utilisateur : </label>
            <Select
              defaultValue=""
              value={selectedUser}
              onChange={(e) => {
                setSelectedUser(e.target.value);
                setUsername(e.target.value);
              }}
              sx={{ width: 200, height: 40, marginY: 1 }}
              required
            >
              {users?.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
            <Input
              disabled={selectedUser === "" || username === currentUser}
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              margin={{ bottom: "20px" }}
              onChange={(e) => setUsername(e.target.value)}
              required
              label="Nouveau nom d'utilisateur"
            />
            {res !== "" ? (
              <Alert
                severity="success"
                variant="outlined"
                style={{ borderRadius: "10px", marginBottom: "10px" }}
              >
                {res}
              </Alert>
            ) : null}
            <Button
              disabled={
                selectedUser === "" ||
                username === "" ||
                username === currentUser
              }
              text="Mettre à jour"
              primary
              type="input"
              onClick={() => {
                handleUpdate();
              }}
            />
            <Button
              disabled={selectedUser === "" || username === currentUser}
              text="Supprimer"
              secondary
              type="input"
              onClick={() => {
                handleDelete();
              }}
              margin={{ top: "20px" }}
            />
          </form>
        </Modal>
      </Box>
    </Layout>
  );
}
