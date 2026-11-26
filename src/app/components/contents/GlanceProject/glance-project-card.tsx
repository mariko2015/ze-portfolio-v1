"use client";

import React from 'react';
import Container from "@/app/container";
import Image from "next/image";
import { SiGithub } from 'react-icons/si';
import Link from 'next/link';
import { BsLink45Deg } from 'react-icons/bs';
import SectionHeading from '@/common/components/elements/SectionHeading';
import SectionSubHeading from '@/common/components/elements/SectionSubHeading';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants for fade-in and bottom-to-top effect
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AnimatedSectionHeading: React.FC<{ title: string; className?: string }> = ({ title, className }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      <SectionHeading className='items-center justify-center' title={title} />
    </motion.div>
  );
};

const AnimatedSectionSubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={controls}
    >
      <SectionSubHeading>{children}</SectionSubHeading>
    </motion.div>
  );
};

const ProjectItem: React.FC<{
  src: string;
  alt: string;
  title: string;
  description: string;
  link?: string;
  gridProps: string;
  priority?: boolean;
  quality?: number;
  blurDataURL?: string;
  placeholder?: "blur" | "empty";
  loading?: "lazy" | "eager";
}> = ({
  src,
  alt,
  title,
  description,
  link,
  gridProps,
  priority = false,
  quality = 75,
  blurDataURL,
  placeholder = "blur",
  loading = "lazy"
}) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={controls}
      className={`relative group ${gridProps}`}
    >
      <Image
        className="h-full w-full object-cover shadow-xl sm:rounded-[3px] transition duration-500 group-hover:scale-105 group-hover:brightness-[0.3] dark:brightness-[.2] dark:group-hover:brightness-100"
        src={src}
        alt={alt}
        width={300}
        height={300}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={loading}
        sizes="(min-width: 768px) 25vw, 50vw"
      />
      <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
        {link ? (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <div className='flex flex-row items-center justify-center gap-2'>
              <h3 className="text-sm lg:text-lg font-bold">{title}</h3>
              {link.includes('github') ? <SiGithub size={20} /> : <BsLink45Deg size={20} />}
            </div>
          </Link>
        ) : (
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const GlanceProject: React.FC = () => {
  return (
    <>
      <Container>
        <div className='text-center items-center justify-center'>
          <AnimatedSectionHeading
            title="Github "
            className="text-3xl lg:pt-7"
          />
          <AnimatedSectionSubHeading>
            <p className="mb-[16px] text-md text-neutral-600 dark:text-neutral-400">
              More of Project
            </p>
          </AnimatedSectionSubHeading>
        </div>
      </Container>

      <div className="text-left grid lg:max-h-[550px] max-h-[550px] grid-cols-8 grid-rows-6 lg:grid-rows-4 py-4 px-2 lg:px-40 gap-2 sm:gap-2">
        <ProjectItem
          src="/distorsi.jpg"
          alt="Project 1"
          title="Soon"
          gridProps="col-span-4 row-span-2 md:col-span-2 lg:p-0"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkz8AAAgEBAFtqJpAAAAAASUVORK5CYII="
          description="-"
        />

        <ProjectItem
          src="/forumchat.png"
          alt="Project 2"
          title="Forum Chat"
          gridProps="col-span-4 row-span-2 md:col-span-2 lg:p-0"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkz8AAAgEBAFtqJpAAAAAASUVORK5CYII="
          
          description="Simple forum chat where users can chat globally"
          link="https://chat-delta-ruby-13.vercel.app/"
        />

        <ProjectItem
          src="/ribet.jpg"
          alt="Project 3"
          title="Notes App"
          gridProps="col-span-4 row-span-4 lg:p-0"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkz8AAAgEBAFtqJpAAAAAASUVORK5CYII="
          
          description="Build with React Native"
          link="https://github.com/ezzeddinp/notes-app-homepage"
        />

        <ProjectItem
          src="/disto.jpg"
          alt="Project 4"
          title="Soon"
          gridProps="col-span-4 row-span-4 md:row-span-2 md:row-start-3 lg:p-0"
          
          blurDataURL="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkz8AAAgEBAFtqJpAAAAAASUVORK5CYII="
          loading="eager"
          description="-"
        />
      </div>
    </>
  );
};

export default GlanceProject;
