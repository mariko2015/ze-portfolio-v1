// src/app/components/CardDetailClient.tsx

'use client';

import CardDetail from '@/app/components/detail-project';
import React from 'react';

interface CardDetailClientProps {
  id?: string | null;
}

const CardDetailClient: React.FC<CardDetailClientProps> = ({ id = null }) => {
  return <CardDetail id={id} />;
};

export default CardDetailClient;
