"use client";

import { useCallback } from "react";
import { useEditor } from "./editor-context";
import {
  ArrowRight,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Send,
  Code2,
  Palette,
  Server,
  Database,
  GitBranch,
  Terminal,
  Layers,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { state, dispatch } = useEditor();
  const isSelected = state.selectedSectionId === id;
  const isHovered = state.hoveredSectionId === id;
  const section = state.sections.find((s) => s.id === id);
  const isVisible = section?.visible !== false;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch({ type: "SELECT_SECTION", sectionId: id });
    },
    [dispatch, id]
  );

  const handleMouseEnter = useCallback(() => {
    dispatch({ type: "HOVER_SECTION", sectionId: id });
  }, [dispatch, id]);

  const handleMouseLeave = useCallback(() => {
    dispatch({ type: "HOVER_SECTION", sectionId: null });
  }, [dispatch]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: "SHOW_CONTEXT_MENU",
        x: e.clientX,
        y: e.clientY,
        sectionId: id,
      });
    },
    [dispatch, id]
  );

  if (!isVisible) return null;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
      className={`relative transition-all duration-100 ${
        isSelected
          ? "ring-2 ring-white ring-offset-2 ring-offset-background"
          : isHovered
          ? "ring-1 ring-neutral-400 ring-offset-1 ring-offset-background"
          : ""
      }`}
      data-section={id}
    >
      {/* Section label */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-6 left-0 z-30 flex items-center gap-1">
          <span
            className={`text-[9px] font-medium px-1.5 py-0.5 rounded-sm ${
              isSelected
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-300 border border-neutral-600"
            }`}
          >
            {section?.name ?? id}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

export function PortfolioCanvas() {
  return (
    <div className="min-h-screen bg-background text-ink">
      {/* Navbar */}
      <Section id="navbar">
        <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-hairline">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-sm font-semibold text-on-primary">A</span>
            </div>
            <span className="text-sm font-medium text-ink tracking-tight">
              Alex Chen
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Home", "About", "Work", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs text-ink-mute hover:text-ink transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <button className="text-xs font-medium bg-primary text-on-primary px-4 py-2 rounded-md hover:bg-primary-deep transition-colors">
            Let&apos;s Talk
          </button>
        </nav>
      </Section>

      {/* Hero */}
      <Section id="hero">
        <section className="px-6 lg:px-12 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
              Full-Stack Developer & UI Designer
            </p>
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="text-primary">Alex Chen</span>
            </h1>
            <p className="text-base lg:text-lg text-ink-mute leading-relaxed max-w-lg">
              I build exceptional digital experiences that live at the
              intersection of design and technology. Currently focused on
              creating accessible, human-centered products.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className="flex items-center gap-2 text-sm font-medium bg-primary text-on-primary px-5 py-2.5 rounded-md hover:bg-primary-deep transition-colors">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 text-sm font-medium border border-hairline-strong text-ink px-5 py-2.5 rounded-md hover:bg-canvas-soft transition-colors">
                Get In Touch
              </button>
            </div>
          </div>
          <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl bg-gradient-to-br from-canvas-soft to-canvas-night border border-hairline flex items-center justify-center shrink-0">
            <div className="text-6xl lg:text-7xl opacity-20">👨‍💻</div>
          </div>
        </section>
      </Section>

      {/* About */}
      <Section id="about">
        <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-hairline">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="flex-1 space-y-4">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                About Me
              </p>
              <h2 className="text-2xl lg:text-3xl font-medium tracking-tight">
                Crafting digital experiences with precision
              </h2>
              <p className="text-sm text-ink-mute leading-relaxed">
                I&apos;m a full-stack developer with 5+ years of experience
                building web applications. I specialize in React, Next.js, and
                Node.js, with a keen eye for UI/UX design. My passion is
                turning complex problems into simple, beautiful, and intuitive
                solutions.
              </p>
              <p className="text-sm text-ink-mute leading-relaxed">
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open source, or sharing knowledge
                through technical writing and mentoring.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-8">
              {[
                { value: "5+", label: "Years Experience" },
                { value: "50+", label: "Projects Completed" },
                { value: "30+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-medium text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-ink-mute mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* Skills */}
      <Section id="skills">
        <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-hairline">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                Skills
              </p>
              <h2 className="text-2xl lg:text-3xl font-medium tracking-tight">
                Technologies I work with
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: "React", icon: Code2 },
                { name: "Next.js", icon: Layers },
                { name: "TypeScript", icon: Terminal },
                { name: "Node.js", icon: Server },
                { name: "Python", icon: Code2 },
                { name: "PostgreSQL", icon: Database },
                { name: "Git", icon: GitBranch },
                { name: "Figma", icon: Palette },
                { name: "Tailwind CSS", icon: Palette },
                { name: "Docker", icon: Server },
                { name: "AWS", icon: Database },
                { name: "GraphQL", icon: Code2 },
              ].map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-hairline bg-canvas-soft hover:border-hairline-strong transition-colors"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-ink">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-hairline">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                Projects
              </p>
              <h2 className="text-2xl lg:text-3xl font-medium tracking-tight">
                Featured work
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "E-Commerce Platform",
                  description:
                    "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
                  tags: ["Next.js", "Stripe", "PostgreSQL"],
                  gradient: "from-primary/20 to-canvas-soft",
                },
                {
                  title: "Analytics Dashboard",
                  description:
                    "Interactive data visualization dashboard with real-time metrics, custom charts, and export capabilities.",
                  tags: ["React", "D3.js", "Node.js"],
                  gradient: "from-blue-500/20 to-canvas-soft",
                },
                {
                  title: "Task Management App",
                  description:
                    "Collaborative project management tool with drag-and-drop boards, team workspaces, and time tracking.",
                  tags: ["TypeScript", "Prisma", "Tailwind"],
                  gradient: "from-purple-500/20 to-canvas-soft",
                },
                {
                  title: "AI Content Generator",
                  description:
                    "AI-powered content creation tool with template library, SEO optimization, and multi-language support.",
                  tags: ["Python", "OpenAI", "FastAPI"],
                  gradient: "from-amber-500/20 to-canvas-soft",
                },
              ].map((project) => (
                <div
                  key={project.title}
                  className="group rounded-lg border border-hairline bg-canvas-soft overflow-hidden hover:border-hairline-strong transition-all"
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                  >
                    <div className="w-16 h-16 rounded-lg bg-background/50 border border-hairline flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6 text-ink-mute" />
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-ink">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button className="p-1 rounded text-ink-mute hover:text-ink hover:bg-canvas transition-colors">
                          <GithubIcon className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded text-ink-mute hover:text-ink hover:bg-canvas transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-ink-mute leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-canvas-night text-ink-mute"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-hairline">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                Experience
              </p>
              <h2 className="text-2xl lg:text-3xl font-medium tracking-tight">
                Where I&apos;ve worked
              </h2>
            </div>
            <div className="space-y-0">
              {[
                {
                  role: "Senior Frontend Developer",
                  company: "TechCorp Inc.",
                  period: "2022 — Present",
                  description:
                    "Leading the frontend architecture migration to Next.js, improving page load times by 40%. Mentoring junior developers and establishing code review practices.",
                },
                {
                  role: "Full-Stack Developer",
                  company: "StartupXYZ",
                  period: "2020 — 2022",
                  description:
                    "Built and shipped 3 major product features from concept to production. Designed the real-time collaboration system handling 10k+ concurrent users.",
                },
                {
                  role: "Frontend Developer",
                  company: "Digital Agency Co.",
                  period: "2019 — 2020",
                  description:
                    "Developed responsive web applications for 15+ client projects. Implemented design systems and component libraries for team efficiency.",
                },
              ].map((job, i) => (
                <div
                  key={job.role}
                  className="relative pl-8 pb-10 last:pb-0 group"
                >
                  {i < 2 && (
                    <div className="absolute left-[5px] top-3 bottom-0 w-px bg-hairline" />
                  )}
                  <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-primary bg-background" />
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="text-sm font-medium text-ink">
                        {job.role}
                      </h3>
                      <span className="text-xs text-ink-faint">{job.period}</span>
                    </div>
                    <p className="text-xs text-primary font-medium">{job.company}</p>
                    <p className="text-xs text-ink-mute leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials">
        <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-hairline">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                Testimonials
              </p>
              <h2 className="text-2xl lg:text-3xl font-medium tracking-tight">
                What people say
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  quote:
                    "Alex delivered exceptional work on our platform. His attention to detail and technical expertise made the project a huge success.",
                  name: "Sarah Johnson",
                  role: "CTO, TechCorp",
                },
                {
                  quote:
                    "Working with Alex was a pleasure. He understands both the technical and design aspects, creating products that are both beautiful and functional.",
                  name: "Michael Park",
                  role: "Founder, StartupXYZ",
                },
                {
                  quote:
                    "Alex's ability to translate complex requirements into clean, maintainable code is remarkable. Highly recommended for any web project.",
                  name: "Emily Davis",
                  role: "PM, Digital Agency",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="p-5 rounded-lg border border-hairline bg-canvas-soft space-y-4"
                >
                  <p className="text-xs text-ink-mute leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-canvas-night border border-hairline flex items-center justify-center">
                      <span className="text-xs font-medium text-ink-mute">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-ink">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] text-ink-faint">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-hairline">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                  Contact
                </p>
                <h2 className="text-2xl lg:text-3xl font-medium tracking-tight">
                  Let&apos;s work together
                </h2>
                <p className="text-sm text-ink-mute leading-relaxed">
                  Have a project in mind? I&apos;d love to hear about it.
                  Let&apos;s discuss how we can create something great together.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Mail, text: "alex@example.com" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MapPin, text: "San Francisco, CA" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-canvas-soft border border-hairline flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-ink-mute" />
                      </div>
                      <span className="text-sm text-ink-mute">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1">
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-canvas border border-hairline rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-hairline-strong transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-canvas border border-hairline rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-hairline-strong transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-canvas border border-hairline rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-hairline-strong transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 text-sm font-medium bg-primary text-on-primary px-5 py-2.5 rounded-md hover:bg-primary-deep transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </Section>

      {/* Footer */}
      <Section id="footer">
        <footer className="px-6 lg:px-12 py-8 border-t border-hairline">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-[9px] font-semibold text-on-primary">A</span>
              </div>
              <span className="text-xs text-ink-mute">
                &copy; 2026 Alex Chen. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: GithubIcon, label: "GitHub" },
                { icon: LinkedinIcon, label: "LinkedIn" },
                { icon: TwitterIcon, label: "Twitter" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.label}
                    className="p-2 rounded-md text-ink-mute hover:text-ink hover:bg-canvas-soft transition-colors"
                    title={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </footer>
      </Section>
    </div>
  );
}
