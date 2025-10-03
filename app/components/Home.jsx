'use client';
import { FaLocationArrow } from 'react-icons/fa';
import { cn } from '../util/utils';
import MagicButton from './MagicButton';

import { Spotlight } from './Spotlight';
import { TextGenerateEffect } from './TextGenerateEffect';

function handleClick() {
  const link = document.createElement('a');
  link.href = '/Eyob CV.pdf'; // path is relative to public folder
  link.download = 'Eyob CV.pdf'; // filename for download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function Home() {
  return (
    <div id="Home" className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-20 md:-left-32 md:-top-20 h-screen"
          fill="purple"
        />
        <Spotlight
          className="top-10 left-[70%] h-[80vh] w-[50vw]"
          fill="blue"
        />
        <Spotlight
          className="top-39 left-20 h-[80vh] w-[50vw] md:-left-32 md:-top-20"
          fill="white"
        />
      </div>
      <div className="transparent-1 absolute left-0 flex h-screen w-full items-center justify-center bg-black-100 dark:bg-black-100">
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:20px_20px]',
            '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
            'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]'
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest test-xs text-center text-blue-100 max-w-80">
            Welcome to My Portfolio
          </h2>
          <TextGenerateEffect
            className="text-center text0[40px] md:text-4xl lg:text-4.5xl"
            words="Code, Design, Deploy —> I Bring Projects to Life."
          />
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi, I'm Eyob, A FullStack Developer
          </p>
          <a>
            <a href="#about">
              <MagicButton
                title="View Portfolio"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
            <a>
              <MagicButton
                title="Download CV"
                icon={<FaLocationArrow />}
                position="right"
                handleClick={handleClick}
              />
            </a>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
