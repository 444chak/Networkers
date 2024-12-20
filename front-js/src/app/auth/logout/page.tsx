"use client";

import Layout from "@/components/Layout";
import Box from "@/components/Box";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  router.push("/");

  return (
    <Layout type="home">
      <Box align="center" margin={{ top: "100px" }}>
        <CircularProgress />
      </Box>
    </Layout>
  );
}
