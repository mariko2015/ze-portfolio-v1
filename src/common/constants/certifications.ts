export type Certification = {
  title: string
  issuer: string
  issued: string
  expires?: string
  credentialId?: string
  skills: string[]
  description?: string
  url?: string
  linkLabel?: string
}

export const CERTIFICATION_GROUPS: { year: number; items: Certification[] }[] = [
  {
    year: 2026,
    items: [
      {
        title: 'NASA Space Apps Challenge',
        issuer: 'NASA - National Aeronautics and Space Administration',
        issued: 'Nov 2026',
        expires: 'Nov 2026',
        description: 'Outstanding Participant in the Lunar Landing Site Navigation Challenge Category.',
        skills: ['Data Pipelines', 'Back-end Operations'],
        url: 'https://www.linkedin.com/in/mohammad-ezzeddin-pratama/overlay/Certifications/1817565396/treasury/?profileId=ACoAAD9P9qIBpvuUv1v2Gu7yzFfvf4ZWhkAA3ic',
        linkLabel: 'View NASA certificate on LinkedIn',
      },
      {
        title: 'Introduction to Generative AI for Software Development',
        issuer: 'DeepLearning.AI',
        issued: 'Jul 2026',
        credentialId: '9cdacadb-7895-41a2-a7d0-7c0e588446de',
        skills: ['LLM-Assisted Development', 'Generative AI Development'],
        url: 'https://www.deeplearning.ai/certificates/9cdacadb-7895-41a2-a7d0-7c0e588446de',
      },
      {
        title: 'Retrieval Augmented Generation (RAG)',
        issuer: 'DeepLearning.AI',
        issued: 'Jul 2026',
        credentialId: 'd4994c9c-a0ea-45d6-a2a4-22d884f801b3',
        skills: ['Large Language Models (LLM)', 'Vector Databases'],
        url: 'https://learn.deeplearning.ai/certificates/d4994c9c-a0ea-45d6-a2a4-22d884f801b3',
      },
    ],
  },
  {
    year: 2025,
    items: [
      {
        title: 'JPMorgan Chase & Co - Software Engineering Job Simulation',
        issuer: 'Forage',
        issued: 'Jan 2025',
        credentialId: '4EXGQRKDGZRL',
        skills: ['Apache Kafka', 'Spring Boot', 'REST API'],
      },
    ],
  },
  {
    year: 2024,
    items: [
      { title: 'Data Science Course', issuer: 'Dicoding Academy', issued: 'Jun 2024', expires: 'Jun 2027', credentialId: 'GRX5Q3E22Z0M', skills: [] },
      { title: 'Project Management Course', issuer: 'Dicoding Academy', issued: 'Jan 2024', expires: 'Jan 2027', credentialId: '07Z6W3QMRZQR', skills: ['Project Management'] },
    ],
  },
]
