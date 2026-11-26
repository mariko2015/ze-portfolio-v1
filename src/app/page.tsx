import React from 'react';
import Footer from './components/Footer/footer';
import ExpandableCardMain from '@/components/blocks/page';
import SkillMain from '@/home/page';
import IntroMain from './layouts';

const ProjectPage: React.FC = () => {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Zeddin's Portfolio",
    url: 'https://zeds.studio',
    description:
      "Explore Mohammad Ezzeddin Pratama's software engineering portfolio, featuring selected projects, experience, and learning resources.",
    publisher: {
      '@type': 'Person',
      name: 'Mohammad Ezzeddin Pratama',
    },
  } as const;

  return (
    <div className='relative z-40'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <IntroMain />
        <ExpandableCardMain />
        <SkillMain />
        {/* <Content /> */}
        <Footer />
    </div>
  );
};

export default ProjectPage;
