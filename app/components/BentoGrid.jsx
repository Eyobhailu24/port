"use client";
import { cn } from '../util/utils';
import { useEffect, useRef, useState } from 'react';

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[14rem] md:grid-cols-3 px-2 sm:px-0',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  appearDelay,
  avatarSrc,
  info,
  skills,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delay =
    typeof appearDelay === 'number' ? appearDelay : id ? (id % 6) * 80 : 0;

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl overflow-hidden transform-gpu',
        'transition-all duration-700 ease-out',
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-[0.98]',
        'hover:-translate-y-0.5 hover:shadow-lg',
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {/* Clean, neutral card body (no lighting/gradient borders) */}
      <div className="relative z-10 h-full w-full rounded-2xl bg-black dark:bg-black-100 border border-white/10 dark:border-white/10 shadow-sm overflow-hidden">
        {/* Optional subtle watermark image (kept very low opacity, not a light effect) */}
        {spareImg && (
          <img
            src={spareImg}
            alt=""
            className={cn(
              'pointer-events-none absolute opacity-5 -top-4 -left-4 select-none max-w-[45%]',
              imgClassName
            )}
          />
        )}

        <div className="relative flex h-full flex-col justify-between p-5">
          <div
            className={cn(
              'font-semibold tracking-tight text-2xl md:text-3xl bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent',
              titleClassName
            )}
          >
            {title}
          </div>
          {description && (
            <p className="mt-3 text-base md:text-lg text-neutral-300 leading-relaxed">
              {description}
            </p>
          )}

          {/* Custom content blocks */}
          {typeof avatarSrc !== 'undefined' && (
            <div className="mt-4 flex flex-1 items-center justify-center">
              <div className="w-50 h-50 md:w-50 md:h-50 rounded-full overflow-hidden border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 flex items-center justify-center">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-neutral-400 dark:text-neutral-400"></span>
                )}
              </div>
            </div>
          )}

          {info && (
            <div className="mt-5 space-y-2 text-base md:text-lg text-neutral-300">
              {info.name && (
                <div>
                  <span className="font-medium text-neutral-100 dark:text-neutral-100">Name: </span>
                  <span>{info.name}</span>
                </div>
              )}
              {info.location && (
                <div>
                  <span className="font-medium text-neutral-100 dark:text-neutral-100">Location: </span>
                  <span>{info.location}</span>
                </div>
              )}
              {info.education && (
                <div>
                  <span className="font-medium text-neutral-100 dark:text-neutral-100">Education: </span>
                  <span>{info.education}</span>
                </div>
              )}
            </div>
          )}

          {Array.isArray(skills) && skills.length > 0 && (
            <div className="mt-4 space-y-4">
              {skills.map((s, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-base md:text-lg mb-1">
                    <span className="text-neutral-200 dark:text-neutral-200">{s.name}</span>
                    <span className="text-neutral-400 dark:text-neutral-400">{s.level}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-purple-500 transition-all duration-1000 ease-out"
                      style={{ width: visible ? `${s.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Feature image if provided */}
          {img && (
            <img
              src={img}
              alt=""
              className={cn(
                'pointer-events-none absolute bottom-0 right-0 max-w-[55%] md:max-w-[60%] object-contain select-none drop-shadow',
                imgClassName
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
