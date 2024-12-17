'use client';

import Box from '@/components/Box';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import Title from '@/components/Title';

export default function Home() {
  return (
    <Layout type="home">
      <Box align='center' margin={{ top: '100px', bottom: '50px' }}>
        <Title level={1}>Networkers</Title>
      </Box>
      <Box align='center'
      ><Modal>
          <Title level={3}>Connexion</Title>
        </Modal>
      </Box>

    </Layout>
  );
}
