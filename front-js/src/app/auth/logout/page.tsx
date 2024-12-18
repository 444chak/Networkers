"use client";

import Layout from "@/components/Layout";
import Box from "@/components/Box";
import Text from "@/components/Text";
import Cookies from "js-cookie";

export default function Home() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  window.location.href = "/";

  return (
    <Layout type="home">
      <Box align="center" margin={{ top: "100px" }}>
        <Text>Déconnexion ...</Text>
      </Box>
    </Layout>
  )
}
