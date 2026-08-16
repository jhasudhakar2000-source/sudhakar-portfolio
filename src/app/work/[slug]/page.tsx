import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MutedVideo } from "@/components/ui/muted-video";
import { getProjectBySlug, projects } from "@/content/projects";
import { createProjectMetadata } from "@/lib/metadata";
import type { Project } from "@/types/project";

type ProjectPageProps = { params: Promise<{ slug: string }> };
type ProjectMedia = NonNullable<Project["media"]>;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createProjectMetadata(project);
}

function SoglCaseStudy({ project, media, nextProject }: { project: Project; media: ProjectMedia; nextProject?: Project }) {
  return (
    <article className="bg-black">
      <section className="border-b border-white/10" aria-labelledby="project-title">
        <div className="page-shell py-16 sm:py-24 lg:py-16">
          <div className="grid items-center gap-12 lg:items-start lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,0.72fr)] lg:gap-12">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Case Study / 01
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.15em] text-muted sm:text-base">
                {project.category}
              </p>
              <h1
                id="project-title"
                className="mt-4 font-display text-[clamp(4.25rem,10vw,9.5rem)] font-bold leading-[0.8] tracking-[-0.075em]"
              >
                {project.title}
              </h1>
              <p className="mt-7 font-display text-xl leading-tight tracking-[-0.035em] text-ink sm:text-3xl">
                {project.client}
              </p>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                {project.summary}
              </p>
            </div>

            <div className="justify-self-center lg:justify-self-end">
              <MutedVideo
                containerClassName="overflow-hidden rounded-[1.35rem] bg-editorial-secondary shadow-[0_2rem_5rem_rgba(33,27,23,0.5)]"
                className="block h-auto w-full max-w-[33rem]"
                width={1080}
                height={1920}
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster={media.thumbnail}
                aria-label={`${project.title} film preview`}
              >
                <source src={media.video} type="video/mp4" />
              </MutedVideo>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="introduction-title">
        <div className="page-shell py-24 sm:py-32 lg:py-40">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">The Film</p>
            <div className="max-w-4xl">
              <h2
                id="introduction-title"
                className="font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]"
              >
                Editing, motion and visual storytelling in one continuous film.
              </h2>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                SoGL brings an editorial approach to motion, using pacing and composition to carry
                the film from one idea to the next.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="project-details-title">
        <div className="page-shell py-20 sm:py-24 lg:py-28">
          <h2 id="project-details-title" className="sr-only">
            Project details
          </h2>
          <dl className="grid max-w-3xl gap-y-10 sm:grid-cols-2 sm:gap-x-12">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Client</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.client}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Category</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.category}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="approach-title">
        <div className="page-shell py-20 sm:py-28 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Creative Approach</p>
            <div className="max-w-4xl">
              <h2
                id="approach-title"
                className="font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.86] tracking-[-0.055em]"
              >
                <span className="block">Rhythm.</span>
                <span className="block text-muted">Typography.</span>
                <span className="block">Motion treatment.</span>
              </h2>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                The work stays focused on clear transitions, editorial pacing and a composed visual
                language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {nextProject ? (
        <nav className="page-shell py-20 sm:py-24 lg:py-28" aria-label="Project navigation">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Next project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mt-5 inline-flex items-center gap-4 font-display text-[clamp(2.75rem,6vw,6.5rem)] font-medium leading-none tracking-[-0.065em] transition-colors duration-300 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {nextProject.title}
            <span className="text-[0.65em] transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </Link>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">Haryanvi Music Edit</p>
        </nav>
      ) : null}
    </article>
  );
}

function UniversalMusicCaseStudy({ project, media, nextProject }: { project: Project; media: ProjectMedia; nextProject?: Project }) {
  const projectName = "Haryanvi Music Edit";
  const category = "Music / Motion Film";

  return (
    <article className="bg-black">
      <section className="border-b border-white/10" aria-labelledby="project-title">
        <div className="page-shell py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Case Study / 02</p>
            <p className="mt-8 text-sm uppercase tracking-[0.15em] text-muted sm:text-base">{category}</p>
            <h1
              id="project-title"
              className="mt-5 font-display text-[clamp(3.6rem,9vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.075em]"
            >
              {project.title}
            </h1>
            <p className="mt-7 font-display text-xl leading-tight tracking-[-0.035em] text-ink sm:text-3xl">
              {projectName}
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              A music-focused edit shaped through image cutout animation, motion design and
              editorial rhythm.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-[44rem] sm:mt-20">
            <MutedVideo
              containerClassName="overflow-hidden rounded-[1.5rem] bg-editorial-secondary shadow-[0_2rem_5rem_rgba(33,27,23,0.5)]"
              className="block h-auto w-full"
              width={1080}
              height={1350}
              autoPlay
              loop
              playsInline
              preload="metadata"
              poster={media.thumbnail}
              aria-label={`${project.title} ${projectName} preview`}
            >
              <source src={media.video} type="video/mp4" />
            </MutedVideo>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="introduction-title">
        <div className="page-shell py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">The Edit</p>
            <h2
              id="introduction-title"
              className="mt-8 font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]"
            >
              Music-driven pacing with an image-led motion treatment.
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              The edit uses cutout imagery and motion to move with the music, keeping the visual
              language concise, composed and rhythm-led.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="project-details-title">
        <div className="page-shell py-20 sm:py-24 lg:py-28">
          <h2 id="project-details-title" className="sr-only">
            Project details
          </h2>
          <dl className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 lg:gap-x-16">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Client</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.client}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Project</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{projectName}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Category</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{category}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Year</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.year}</dd>
            </div>
          </dl>
          <div className="mt-12 border-t border-white/10 pt-7 sm:mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Role</p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink sm:text-lg">Editing</p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="approach-title">
        <div className="page-shell py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Creative Approach</p>
            <h2
              id="approach-title"
              className="mt-8 font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.86] tracking-[-0.055em]"
            >
              <span className="block">Image cutouts.</span>
              <span className="block text-muted">3D motion.</span>
              <span className="block">Editorial rhythm.</span>
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              A focused motion treatment gives each transition a visual pulse while keeping the
              music at the centre of the edit.
            </p>
          </div>
        </div>
      </section>

      {nextProject ? (
        <nav className="page-shell py-20 sm:py-24 lg:py-28" aria-label="Project navigation">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Next project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mt-5 inline-flex items-center gap-4 font-display text-[clamp(2.75rem,6vw,6.5rem)] font-medium leading-none tracking-[-0.065em] transition-colors duration-300 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {nextProject.title}
            <span className="text-[0.65em] transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}

function IndiaMartCaseStudy({ project, media, nextProject }: { project: Project; media: ProjectMedia; nextProject?: Project }) {
  return (
    <article className="bg-black">
      <section className="border-b border-white/10" aria-labelledby="project-title">
        <div className="page-shell py-16 sm:py-24 lg:py-24">
          <div className="grid items-center gap-12 lg:items-start lg:grid-cols-[minmax(0,0.88fr)_minmax(24rem,0.7fr)] lg:gap-12">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Case Study / 04
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.15em] text-muted sm:text-base">
                {project.client} <span aria-hidden="true">•</span> {project.year}
              </p>
              <h1
                id="project-title"
                className="mt-4 font-display text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.8] tracking-[-0.075em]"
              >
                {project.title}
              </h1>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Founder content edited into a high-retention social reel.
              </p>
            </div>

            <div className="justify-self-center lg:justify-self-end">
              <MutedVideo
                containerClassName="overflow-hidden rounded-[1.35rem] bg-editorial-secondary shadow-[0_2rem_5rem_rgba(33,27,23,0.5)]"
                className="block h-auto w-full max-w-[31rem]"
                width={1080}
                height={1920}
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster={media.thumbnail}
                aria-label={`${project.title} film preview`}
              >
                <source src={media.video} type="video/mp4" />
              </MutedVideo>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="introduction-title">
        <div className="page-shell py-24 sm:py-32 lg:py-40">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">The Edit</p>
            <div className="max-w-4xl">
              <h2
                id="introduction-title"
                className="font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]"
              >
                A founder-led story shaped into a concise, social-first reel.
              </h2>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                Editing keeps the speaker and narrative clear, using a focused rhythm for a concise
                social format.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="project-details-title">
        <div className="page-shell py-20 sm:py-24 lg:py-28">
          <h2 id="project-details-title" className="sr-only">
            Project details
          </h2>
          <dl className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 lg:gap-x-16">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Client</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.client}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Format</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">Social / Founder Content</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Year</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.year}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Role</dt>
              <dd className="mt-3 max-w-xs text-base leading-relaxed text-ink sm:text-lg">Editing</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="approach-title">
        <div className="page-shell py-20 sm:py-28 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Creative Approach</p>
            <div className="max-w-4xl">
              <h2
                id="approach-title"
                className="font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.86] tracking-[-0.055em]"
              >
                <span className="block">Clarity.</span>
                <span className="block text-muted">Pacing.</span>
                <span className="block">Social-first rhythm.</span>
              </h2>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                The edit stays close to the speaker, shaping the story for concise viewing without
                losing the thread.
              </p>
            </div>
          </div>
        </div>
      </section>

      {nextProject ? (
        <nav className="page-shell py-20 sm:py-24 lg:py-28" aria-label="Project navigation">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Next project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mt-5 inline-flex items-center gap-4 font-display text-[clamp(2.75rem,6vw,6.5rem)] font-medium leading-none tracking-[-0.065em] transition-colors duration-300 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {nextProject.title}
            <span className="text-[0.65em] transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}

function LeyshaCaseStudy({ project, media }: { project: Project; media: ProjectMedia }) {
  return (
    <article className="bg-black">
      <section className="border-b border-white/10" aria-labelledby="project-title">
        <div className="page-shell py-16 sm:py-24 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(20rem,0.56fr)_minmax(0,0.8fr)] lg:gap-20">
            <div className="order-2 justify-self-center lg:order-1 lg:justify-self-start">
              <div className="overflow-hidden rounded-[1.5rem] bg-editorial-secondary shadow-[0_2rem_5rem_rgba(33,27,23,0.5)]">
                <video
                  className="block h-auto w-full max-w-[32rem]"
                  width={720}
                  height={1280}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={media.thumbnail}
                  aria-label={`${project.title} film preview`}
                >
                  <source src={media.video} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="order-1 max-w-3xl lg:order-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Case Study / 04
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.15em] text-muted sm:text-base">
                {project.category} <span aria-hidden="true">•</span> {project.year}
              </p>
              <h1
                id="project-title"
                className="mt-5 font-display text-[clamp(4.25rem,10vw,9.5rem)] font-bold leading-[0.8] tracking-[-0.075em]"
              >
                {project.title}
              </h1>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="introduction-title">
        <div className="page-shell py-24 sm:py-32 lg:py-40">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">The Film</p>
            <div className="max-w-4xl">
              <h2
                id="introduction-title"
                className="font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]"
              >
                A brand story told through food imagery, rhythm and cinematic pacing.
              </h2>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                The edit brings an atmospheric visual language to the film, allowing food and
                cultural imagery to carry the emotional movement of the story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="project-details-title">
        <div className="page-shell py-20 sm:py-24 lg:py-28">
          <h2 id="project-details-title" className="sr-only">
            Project details
          </h2>
          <dl className="grid max-w-4xl gap-y-10 sm:grid-cols-3 sm:gap-x-12">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Client</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.client}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Category</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.category}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Year</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.year}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="approach-title">
        <div className="page-shell py-20 sm:py-28 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Creative Approach</p>
            <div className="max-w-4xl">
              <h2
                id="approach-title"
                className="font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.86] tracking-[-0.055em]"
              >
                <span className="block">Storytelling.</span>
                <span className="block text-muted">Food &amp; culture.</span>
                <span className="block">Cinematic rhythm.</span>
              </h2>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                A restrained edit lets the visual details settle, building a more human and
                emotionally paced brand film.
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav className="page-shell py-20 sm:py-24 lg:py-28" aria-label="Project navigation">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Explore more work</p>
        <Link
          href="/#archive"
          className="group mt-5 inline-flex items-center gap-4 font-display text-[clamp(2.75rem,6vw,6.5rem)] font-medium leading-none tracking-[-0.065em] transition-colors duration-300 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Archive
          <span className="text-[0.65em] transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">
            →
          </span>
        </Link>
      </nav>
    </article>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const media = project.media;

  if (project.slug === "sogl" && media) {
    return <SoglCaseStudy project={project} media={media} nextProject={getProjectBySlug("universal-music")} />;
  }

  if (project.slug === "universal-music" && media) {
    return <UniversalMusicCaseStudy project={project} media={media} nextProject={getProjectBySlug("lifelong")} />;
  }

  if (project.slug === "indiamart-raj-shamani" && media) {
    return <IndiaMartCaseStudy project={project} media={media} nextProject={getProjectBySlug("leysha")} />;
  }

  if (project.slug === "leysha" && media) {
    return <LeyshaCaseStudy project={project} media={media} />;
  }

  if (project.slug !== "lifelong" || !media) {
    return (
      <article className="page-shell py-16 sm:py-24">
        <p className="text-sm uppercase tracking-[0.16em] text-muted">
          {project.client}
          {project.year ? <span> · {project.year}</span> : null}
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-7xl">{project.title}</h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{project.summary}</p>
        <div className="mt-16 border-t border-line pt-8 text-sm text-muted">
          Case study content and media are intentionally deferred to the next phase.
        </div>
      </article>
    );
  }

  const projectIndex = projects.findIndex(({ slug: projectSlug }) => projectSlug === project.slug);
  const nextProject = projects[projectIndex + 1];

  return (
    <article className="bg-black">
      <section className="border-b border-white/10" aria-labelledby="project-title">
        <div className="page-shell py-16 sm:py-24 lg:py-24">
          <div className="grid items-center gap-12 lg:items-start lg:grid-cols-[minmax(0,0.88fr)_minmax(24rem,0.7fr)] lg:gap-12">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Case Study / 01
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.15em] text-muted sm:text-base">
                {project.category} <span aria-hidden="true">•</span> {project.year}
              </p>
              <h1
                id="project-title"
                className="mt-4 font-display text-[clamp(4.25rem,10vw,9.5rem)] font-bold leading-[0.8] tracking-[-0.075em]"
              >
                {project.title}
              </h1>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                A Lifelong commercial shaped through video editing, AI frame generation and
                animation.
              </p>
            </div>

            <div className="justify-self-center lg:justify-self-end">
              <MutedVideo
                containerClassName="overflow-hidden rounded-[1.35rem] bg-editorial-secondary shadow-[0_2rem_5rem_rgba(33,27,23,0.5)]"
                className="block h-auto w-full max-w-[31rem]"
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster={media.thumbnail}
                aria-label={`${project.title} film preview`}
              >
                <source src={media.video} type="video/mp4" />
              </MutedVideo>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="introduction-title">
        <div className="page-shell py-24 sm:py-32 lg:py-40">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">The Film</p>
            <div className="max-w-4xl">
              <h2
                id="introduction-title"
                className="font-display text-[clamp(2.35rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]"
              >
                A commercial edit shaped around the product, the rhythm and the image.
              </h2>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                Created as an in-house campaign inspired by the viral Kumar Edit trend, Lifelong
                brings cinematic editing and AI-generated visual work into a concise product story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" aria-labelledby="project-details-title">
        <div className="page-shell py-20 sm:py-24 lg:py-28">
          <h2 id="project-details-title" className="sr-only">
            Project details
          </h2>
          <dl className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 lg:gap-x-16">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Client</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.client}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Category</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.category}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Year</dt>
              <dd className="mt-3 font-display text-xl tracking-[-0.035em]">{project.year}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Role</dt>
              <dd className="mt-3 max-w-xs text-base leading-relaxed text-ink sm:text-lg">
                {project.roles?.join(" · ")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {nextProject ? (
        <nav className="page-shell py-20 sm:py-24 lg:py-28" aria-label="Project navigation">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Next project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mt-5 inline-flex items-center gap-4 font-display text-[clamp(2.75rem,6vw,6.5rem)] font-medium leading-none tracking-[-0.065em] transition-colors duration-300 hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {nextProject.title}
            <span className="text-[0.65em] transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
