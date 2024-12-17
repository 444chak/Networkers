'use client';

import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { Spacer } from "@nextui-org/spacer";
import Box from '@/components/Box';
import Space from '@/components/Space';
import Image from 'next/image';
import Title from '@/components/Title';

export default function Home() {
  const router = useRouter();
  return (
    <Layout type='home'>
      <Space spaceBetween direction='horizontal' margin={{ top: '20px', left: '20px', right: '20px' }}>
        <Image src="/logo.png" alt="logo" width={100} height={200} style={{ width: 'auto', height: 'auto' }} />
        <Box>
          <Button text="Inscription" onClick={() => console.log("test")} secondary />
          <Spacer x={4} />
          <Button text="Connexion" onClick={() => router.push('/auth/login')} primary />
        </Box>
      </Space>
      <Space direction='horizontal' margin={{ top: '100px', left: '20px', right: '20px' }}>
        <Box margin={{
          left: '20px',
          top: '100px'
        }}>
          <Title level={1} >Networkers</Title>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius metus magna, sit amet porta velit eleifend iaculis. Donec imperdiet rutrum lacus, luctus congue mauris iaculis ac. Suspendisse aliquet nibh vitae magna efficitur bibendum. Vivamus molestie, neque id feugiat fringilla, ante dui volutpat massa, non convallis erat mi eget urna. Integer feugiat, purus id porta semper, ipsum ex venenatis ante, ac rhoncus dolor sapien consequat nisi. Curabitur maximus sem ac tortor consequat posuere ac ac massa. Praesent imperdiet purus vel dui tempor finibus. Suspendisse arcu nunc, mattis at sapien in, rhoncus ultricies dui. Morbi luctus lorem quis aliquam dictum. Quisque porttitor mollis tellus, vel efficitur est pretium aliquet. Etiam ornare velit ac interdum lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vulputate vitae lorem a pulvinar. Curabitur ante mi, tempor at felis laoreet, ultrices venenatis turpis. Mauris scelerisque rhoncus diam sed ornare. Vestibulum at accumsan ligula, non blandit erat.
          </div>
        </Box>
        <Image src="/homeillustration.svg" alt="networkers" width={700} height={500} style={{ width: '100%', height: 'auto', maxWidth: '700px' }} />
      </Space>

    </Layout >
  );
}
