

'use client';

import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import Layout from '@/components/Layout';

export default function Home() {
  const router = useRouter();
  return (
    <Layout type='logged'></Layout>
  );
}
