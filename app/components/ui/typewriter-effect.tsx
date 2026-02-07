'use client'

import { cn } from '@/lib/utils'
import { motion, stagger, useAnimate, useInView } from 'motion/react'
import { useEffect } from 'react'

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(''),
    }
  })

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        {
          display: 'inline-block',
          opacity: 1,
          width: 'fit-content',
        },
        {
          duration: 0.5,
          delay: stagger(0.1),
          ease: 'easeInOut',
        },
      )
    }
  }, [isInView])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(`hidden text-black opacity-0`, word.className)}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              {idx < wordsArray.length - 1 && <span>&nbsp;</span>}
            </div>
          )
        })}
      </motion.div>
    )
  }
  return (
    <div
      className={cn(
        'text-center text-base font-bold text-black sm:text-xl md:text-3xl lg:text-5xl',
        className,
      )}
    >
      {renderWords()}
    </div>
  )
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(''),
    }
  })
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`text-black`, word.className)}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              {idx < wordsArray.length - 1 && <span>&nbsp;</span>}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('my-6 flex space-x-1 text-black', className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: '0%',
        }}
        whileInView={{
          width: 'fit-content',
        }}
        transition={{
          duration: 2,
          ease: 'linear',
          delay: 1,
        }}
      >
        <div
          className="lg:text:3xl text-xs font-bold sm:text-base md:text-xl xl:text-5xl"
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {renderWords()}{' '}
        </div>{' '}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 10,

          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'block h-4 w-[4px] rounded-sm bg-yellow-500 sm:h-6 xl:h-12',
          cursorClassName,
        )}
      ></motion.span>
    </div>
  )
}
