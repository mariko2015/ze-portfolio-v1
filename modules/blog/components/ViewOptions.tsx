import clsx from 'clsx'

type ViewOptionsProps = {
  option: 'grid' | 'list'
  setViewOption: (option: 'grid' | 'list') => void
  type: 'grid' | 'list'
  icon: JSX.Element
  label: string
}

export default function ViewOptions({ option, setViewOption, icon, type, label }: ViewOptionsProps) {
  const isActive = option === type

  return (
    <button
      className={clsx(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
        isActive
          ? 'bg-teal-500/10 text-teal-600 shadow-[0_0_0_1px_rgba(45,212,191,0.35)] dark:text-teal-300 dark:shadow-[0_0_0_1px_rgba(45,212,191,0.45)]'
          : 'bg-transparent'
      )}
      onClick={() => setViewOption(type)}
      data-umami-event={`Change Blog View to ${type}`}
  aria-label={label}
      type="button"
      aria-pressed={isActive}
    >
      {icon}
    </button>
  )
}
