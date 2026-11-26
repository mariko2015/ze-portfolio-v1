interface PageHeadingProps {
  title: string
  description?: string
}

export default function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <>
      <h1 className="text-neutral-800 text-center dark:text-neutral-300 text-3xl lg:text-5xl font-bold pb-5">{title}</h1>
      <p className="border-b border-solid border-neutral-600 pb-3 pt-2 text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </>
  )
}
