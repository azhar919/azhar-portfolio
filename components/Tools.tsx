const tools = [
  { name: "Figma",        src: "/images/tool-figma.svg",      w: 209, h: 58 },
  { name: "Framer",       src: "/images/tool-framer.svg",     w: 58,  h: 58 },
  { name: "Photoshop",    src: "/images/tool-photoshop.svg",  w: 58,  h: 58 },
  { name: "Premiere Pro", src: "/images/tool-premiere.svg",   w: 58,  h: 58 },
  { name: "Miro",         src: "/images/tool-miro.svg",       w: 58,  h: 58 },
  { name: "Jira",         src: "/images/tool-jira.svg",       w: 58,  h: 58 },
];

export default function Tools() {
  const track = [...tools, ...tools];

  return (
    <section className="py-16 bg-surface overflow-hidden border-y border-dark/5">
      <div className="page-container overflow-hidden">
        <div className="flex gap-[148px] items-center animate-marquee w-max">
          {track.map((tool, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${tool.name}-${i}`}
              src={tool.src}
              alt={tool.name}
              width={tool.w}
              height={tool.h}
              className="shrink-0 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
