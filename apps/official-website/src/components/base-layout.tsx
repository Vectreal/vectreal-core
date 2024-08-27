import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { TypewriterEffect } from './ui/typewriter-effect';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';

import NavMenu from './nav-menu';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Footer from './footer';

const words = ['Make', 'your', '3D', 'models', 'Perfect.'];

const cta = words.map((word, i) => ({
  text: word,
  // make last word different color
  ...(i === words.length - 1 && {
    className: 'text-zinc-500 dark:text-orange',
  }),
}));

const BaseLayout = () => {
  const currentLocation = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentLocation.pathname]);

  return (
    <>
      <NavMenu />
      <main className="min-h-full h-full px-4">
        <Outlet />

        {!currentLocation.pathname.includes('editor') && (
          <div className="flex flex-col gap-48 py-48 w-full">
            <section className="flex flex-col items-center justify-center text-center gap-8 relative z-10">
              <p className="text-zinc-500 text-sm">
                Try out the one-click solution to web 3D efficiency
              </p>
              <TypewriterEffect words={cta} cursorClassName="bg-zinc-500" />
              <div className="flex flex-row gap-4">
                <Link to="/editor">
                  <Button variant="secondary">
                    <Pencil2Icon className="mr-3" /> Open the Free Editor
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        )}
      </main>

      {!currentLocation.pathname.includes('editor') && <Footer />}

      <Toaster position="bottom-right" />
    </>
  );
};

export default BaseLayout;
