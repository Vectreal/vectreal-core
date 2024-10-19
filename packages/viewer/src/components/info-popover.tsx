import { useState } from 'react';

import VectrealLogo from './assets/vectreal-logo';
import InfoIcon from './assets/info-icon';
import CrossIcon from './assets/cross-icon';
import { cn } from '@vctrl/shared/lib/utils';

interface InfoPopoverProps {
  content?: JSX.Element | string;
}

const InfoPopover = ({ content }: InfoPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="vctrl-viewer-info-popover" className="absolute bottom-0 m-2">
      <div id="vctrl-viewer-button-wrapper" className="w-6 h-6">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-full z-10 rounded-full bg-black/40 hover:bg-zinc-700/40 p-1"
        >
          <InfoIcon className="text-white opacity-20 w-4 h-4" />
        </button>

        <div
          className={cn(
            'absolute w-64 h-fit flex-col flex bg-zinc-900 rounded-lg overflow-hidden transition-all ease-in-out bottom-0 left-0',
            isOpen
              ? 'translate-y-0 translate-x-0 opacity-100 visible'
              : 'translate-y-2 -translate-x-2 opacity-0 invisible ',
          )}
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close info popover"
            className="absolute right-0 top-0 m-2 p-2 rounded-md hover:bg-zinc-800 active:bg-zinc-700 transition-colors duration-300"
          >
            <CrossIcon />
          </button>
          <div className="grow p-4">
            {content || (
              <p className="text-sm text-zinc-400">No additional info</p>
            )}
          </div>
          <a
            className="h-full"
            href="https://core.vectreal.com"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex flex-row items-start justify-between gap-2 h-10 p-4 py-2 border-t border-zinc-800 text-zinc-800 hover:text-zinc-700 hover:bg-zinc-800/25 transition-colors duration-300">
              <small className="text-sm">Vectreal viewer</small>{' '}
              <VectrealLogo />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoPopover;
