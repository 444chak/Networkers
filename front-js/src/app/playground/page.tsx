"use client";

import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Space from "@/components/Space";
import Box from "@/components/Box";
import ValidatePsw from "@/components/ValidatePsw";
//
export default function Playground() {
  return (
    <Layout type="playground">
      <Space direction="vertical" margin={{ top: "20px", left: "20px" }}>
        <Title level={1}>Playground</Title>

        <Box align="center" margin={{ top: "100px", bottom: "50px" }}>
          <ValidatePsw password="Password123" />
        </Box>
      </Space>
    </Layout>
  );
}
