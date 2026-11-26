import React from "react";

// Props
interface Themes {
  base: string[];
  alt: string[];
}

const themes: Themes = {
  base: ["text-zinc-900", "dark:text-zinc-100"],
  alt: ["text-red-600", "dark:text-red-400"],
};

export interface Props {
  target: "_blank" | "_self" | "_parent" | "_top";
  text: string;
  url?: string;
  size?: string;
  theme?: keyof Themes;
  flip?: boolean;
}

export interface Props {
  target: "_blank" | "_self" | "_parent" | "_top";
  text: string;
  url?: string;
  size?: string;
  theme?: keyof typeof themes; // Change the type of theme to keyof typeof themes
  flip?: boolean;
}

const Element: React.FC<Props> = ({ target, text, url, size = "text-base", theme = "base", flip = false }) => {
  const themes = {
    base: ["text-neutral-900", "dark:text-zinc-300"],
    alt: ["text-red-600", "dark:text-red-400"],
  };

  const ElementTag = url ? "a" : "div";
  return (
    <ElementTag
    target={target}
      href={url}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`group flex w-fit items-center gap-1 text-sm font-serif italic ${size} ${themes[theme].join(
        " "
      )} ${flip ? "flex-row-reverse" : "flex-row"}`}
    >
      {text}
      {flip ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-[.75em] w-auto transform transition duration-100 group-hover:-translate-x-1"
        >
          <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-[.75em] w-auto transform transition duration-100 group-hover:translate-x-1"
        >
          <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </ElementTag>
  );
};

export default Element;
