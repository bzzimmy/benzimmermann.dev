import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa6";
import { SiHackerone } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";

const socials = [
  { href: "https://github.com/bzzimmy", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/benzimm/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://hackerone.com/kernelrocks/", label: "HackerOne", Icon: SiHackerone },
  { href: "mailto:kernelrocks@proton.me", label: "Email", Icon: HiOutlineMail },
];

export function Socials({
  className = "",
  size = 19,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`flex items-center gap-4 text-foreground/40 ${className}`}>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
