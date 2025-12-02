"use client";

import React from 'react';
import { workExperience } from './../datas/files';
import { BentoGrid, BentoGridItem } from './BentoGrid';

function Experience() {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const titleRef = React.useRef(null);
  const [titleVisible, setTitleVisible] = React.useState(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTitleVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={
        'py-12 md:py-16 transform-gpu transition-all duration-700 ease-out ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')
      }
    >
      <h2
        ref={titleRef}
        className={
          'text-4xl md:text-5xl leading-tight font-normal mb-16 text-center bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent transform-gpu transition-all duration-700 ease-out ' +
          (titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')
        }
        style={{ transitionDelay: titleVisible ? '120ms' : '0ms' }}
      >
        Experience
      </h2>

      <BentoGrid className="w-full max-w-none px-4 sm:px-8 lg:px-12 gap-8 md:gap-10 md:auto-rows-[16rem]">
        {workExperience.map((item, index) => (
          <BentoGridItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.desc}
            className={item.className}
           appearDelay={index * 100}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

export default Experience;
