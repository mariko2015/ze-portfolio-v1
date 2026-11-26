import { STACKS, STACK_COLORS } from '@/common/constants/stacks'
import { SkillDefinition } from '@/common/constants/skills'
import { CSSProperties } from 'react'

type SkillCardProps = {
  skill: SkillDefinition
}

export default function SkillCard({ skill }: SkillCardProps) {
  const icon = STACKS[skill.name]

  const palette = (
      STACK_COLORS[skill.name] ?? {
        light: 'rgba(148, 163, 184, 0.15)',
        dark: 'rgba(30, 41, 59, 0.2)',
        accent: 'rgba(148, 163, 184, 0.35)'
      }
    )

  const cardStyle = ({
      '--stack-tint-light': palette.light,
      '--stack-tint-dark': palette.dark,
      '--stack-accent': palette.accent
    }) as CSSProperties

  return (
    <div
      style={cardStyle}
      className="relative mx-auto flex h-full w-full max-w-[140px] min-h-[150px] flex-col items-center justify-between gap-2 overflow-hidden rounded-[18px] border border-white/60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92)_0%,var(--stack-tint-light)_40%,rgba(255,255,255,0.88)_100%)] px-3 py-4 text-center shadow-[0_14px_32px_-24px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_-22px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,var(--stack-tint-dark)_12%,rgba(24,24,27,0.9)_60%,rgba(24,24,27,0.72)_100%)]"
    >
      <div
        className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-[16px] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.97)_0%,var(--stack-tint-light)_100%)] text-neutral-700 shadow-[0_10px_20px_-16px_var(--stack-accent)] dark:border-white/10 dark:bg-[linear-gradient(135deg,var(--stack-tint-dark)_0%,rgba(17,24,39,0.92)_100%)] dark:text-white"
      >
        {icon}
      </div>
      <div className="relative z-[1] flex min-h-[48px] flex-col items-center justify-center space-y-1">
        <h3 className="text-sm font-semibold text-neutral-800 dark:text-white">{skill.name}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {skill.category}
        </p>
      </div>
    </div>
  )
}
