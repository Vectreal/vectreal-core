import { Suspense } from 'react';
import { Link } from 'react-router-dom';

import {
  EyeOpenIcon,
  GitHubLogoIcon,
  ImageIcon,
  Pencil2Icon,
  UpdateIcon,
} from '@radix-ui/react-icons';
import { MutatingDots } from 'react-loader-spinner';

import reactGraphic from '@/components/assets/react-graphic.png';

import useIsMobile from '@/lib/hooks/useIsMobile';

import TypographyMuted from '@/components/typography/typography-muted';
import TypographyLead from '@/components/typography/typography-lead';
import ModelScene from '@/components/title-model-scene';

import { Highlight } from '@/components/ui/hero-highlight';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const featureContent = [
  {
    icon: <EyeOpenIcon className="w-6 h-6 mb-4" />,
    title: 'React 3D Viewer',
    description:
      'A seamless 3D viewing experience, right in your browser. Perfect for showcasing and interacting with 3D models in real time.',
  },
  {
    icon: <UpdateIcon className="w-6 h-6 mb-4" />,
    title: 'Load and Convert',
    description:
      'Effortlessly convert 3D models into optimized, React-compatible formats. Use our tools or react-hooks for fast loading and smooth interactions in any React app.',
  },
  {
    icon: <ImageIcon className="w-6 h-6 mb-4" />,
    title: 'Docker Images',
    description:
      'Deploy Vectreal tools in your workflow quickly and efficiently with our Docker images. Designed to integrate seamlessly into your docker environment, making 3D content transformations hassle-free.',
  },
];

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <BackgroundBeams className="absolute z-0" />}
      <section className="flex flex-col items-center my-48 relative z-10">
        <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
          {/* <object
            aria-label="GitHub stars"
            data="https://img.shields.io/github/stars/vectreal/.github?style=flat&color=ff7518&link=https%3A%2F%2Fgithub.com%2Fvectreal"
          /> */}

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Unlock the Power of Open-Source 3D Optimization
          </h1>
          <h4 className=" md:text-2xl text-muted-foreground ">
            Contribute to <Highlight>the future of 3D content</Highlight> with
            Vectreal's community-driven tools.
          </h4>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/editor">
              <Button>
                <Pencil2Icon className="mr-3" /> Get Started with Our Editor
              </Button>
            </Link>
            <Link
              to="https://github.com/vectreal/vectreal-core"
              target="_blank"
            >
              <Button variant="outline">
                <GitHubLogoIcon className="mr-3" /> Join Our Community on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 items-center relative z-10 my-32">
        <div className="grid md:grid-cols-2 gap-8 max-w-screen-xl">
          <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-4xl font-bold tracking-tight">Our Mission</h2>
            <TypographyMuted>
              Welcome to Vectreal Core, your new home for open-source 3D tools
              optimized for the React ecosystem. Our mission is to empower
              developers, designers, and creators with the resources they need
              to integrate high-performance 3D content into React-based
              projects.
            </TypographyMuted>
            <TypographyLead>Starting with a focus on React</TypographyLead>
            <TypographyMuted>
              While we're starting with a strong focus on React, Vectreal's
              proprietary platform will soon extend to offer powerful solutions
              for a broader range of web technologies. But for now, we're
              dedicated to providing the React community with the best tools and
              resources to create stunning, interactive 3D experiences.
            </TypographyMuted>
          </div>

          <Card className="h-[50vh] max-h-[500px] w-full overflow-hidden border-zinc-700">
            <CardHeader className="p-3 border-b bg-zinc-900">
              {
                // These are meant to replicate the appearence of the mac os window controls
              }
              <span className="flex flex-row items-center gap-[12px]">
                <div className="w-3 h-3 rounded-full bg-zinc-600 m-0" />
                <div className="w-3 h-3 rounded-full bg-zinc-600 m-0" />
                <div className="w-3 h-3 rounded-full bg-zinc-600 m-0" />
              </span>
            </CardHeader>

            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <MutatingDots
                    height="100px"
                    width="100px"
                    color="white"
                    secondaryColor="white"
                  />
                </div>
              }
            >
              <Suspense>
                <ModelScene url="/assets/DamagedHelmet.glb" />
              </Suspense>
            </Suspense>
          </Card>
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 relative z-10 my-32">
        <div className="max-w-screen-xl">
          <h2 className="text-4xl font-bold tracking-tight mb-8">The Core</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureContent.map((feature, index) => (
              <Card className="bg-background" key={index}>
                <CardHeader>
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 relative z-10 my-32">
        <h2 className="text-4xl font-bold tracking-tight text-center">
          Try it out for yourself
        </h2>

        <TypographyMuted className="text-center">
          Test the power of our tools right here using our free online editor
          toolkit.
        </TypographyMuted>
        <Link to="/editor">
          <Button>
            <Pencil2Icon className="mr-3" /> Open the Editor
          </Button>
        </Link>
      </section>

      <section className="flex flex-col gap-8 items-center relative z-10 my-32">
        <div className="grid max-md:flex max-md:flex-col-reverse md:grid-cols-2 gap-8 max-w-screen-xl ">
          <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Why Vectreal for React?
            </h2>
            <TypographyMuted>
              Vectreal Core is crafted with React developers in mind. Whether
              you're building an e-commerce site, an interactive portfolio, or a
              cutting-edge web app, our tools are designed to integrate
              seamlessly into your React projects. We understand the React
              ecosystem's needs and are committed to providing resources that
              enhance your development process, not complicate it.
            </TypographyMuted>
            <TypographyMuted>
              Looking beyond React? Our proprietary Vectreal platform will soon
              offer solutions that cater to a wider array of web technologies.
              Stay tuned as we expand our offerings to meet the needs of
              developers working across various frameworks.
            </TypographyMuted>
          </div>

          <img src={reactGraphic} alt="" />
        </div>
      </section>

      <section className="flex flex-col gap-8 items-center relative z-10 my-32">
        <div className="flex flex-col-reverse md:grid md:grid-cols-4 gap-8 max-w-screen-xl">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Contribute on GitHub</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between grow">
              <CardDescription>
                Learn how to contribute to our project on GitHub. We're always
                looking for contributors who are passionate about React and
                three.js to help us build the future of 3D web content.
              </CardDescription>

              <Link
                to="https://github.com/vectreal"
                target="_blank"
                className="mt-4"
              >
                <Button>Visit GitHub</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Join the discussion on Discord</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between grow">
              <CardDescription>
                Join our Discord server for support, announcements, and more. We
                are constantly seeking new members to join our community. Let's
                discuss and build the future of 3D web content together.
              </CardDescription>

              <Link
                to="https://discord.gg/UHxPjGMH"
                target="_blank"
                className="mt-4"
              >
                <Button>Join Discord</Button>
              </Link>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-8 col-span-2 justify-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Built on Collaboration
            </h2>
            <TypographyMuted>
              Join our community of React developers and creators. At Vectreal,
              collaboration is at the heart of everything we do. Whether you
              want to contribute code, provide feedback, or collaborate on
              projects, we welcome your involvement. Together, we're building
              the future of 3D web content.
            </TypographyMuted>
            <TypographyMuted>
              Looking beyond React? Our proprietary Vectreal platform will soon
              offer solutions that cater to a wider array of web technologies.
              Stay tuned as we expand our offerings to meet the needs of
              developers working across various frameworks.
            </TypographyMuted>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
