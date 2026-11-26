// src/app/layouts/ui.tsx

import React from 'react';
import CardDetailClient from '@/app/components/CardDetailClient';

interface MainCardDetailProps {
  params?: {
    id?: string;
  };
}

const MainCardDetail: React.FC<MainCardDetailProps> = ({ params }) => {
  const id = params?.id ?? null;

  return (
    <div>
      <CardDetailClient id={id} />
    </div>
  );
};

export default MainCardDetail;
