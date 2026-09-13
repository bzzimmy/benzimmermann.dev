export interface Disclosure {
  company: string;
  title: string;
  outcome: string;
  description: string;
  date: string;
  link?: string;
  linkText?: string;
}

export const disclosures: Disclosure[] = [
  {
    company: "Truffle Security",
    title: "CDE Secret Exposure Research",
    outcome: "Featured",
    description:
      "Scanned 22 million public projects across CodeSandbox, StackBlitz, CodePen, and JSFiddle, uncovering 8,792 verified live secrets.",
    date: "Apr 2026",
    link: "https://trufflesecurity.com/blog/thousands-live-secrets-found-across-four-cloud-dev-environments",
    linkText: "Published on Truffle Security",
  },
  {
    company: "OpenAI",
    title: "3,342 Leaked API Keys",
    outcome: "$500",
    description:
      "Discovered 3,342 active OpenAI API keys leaked in public repositories. Reported to OpenAI Security, who confirmed and revoked the keys.",
    date: "Mar 2026",
  },
  {
    company: "Pump",
    title: "Production Environment File Exposure",
    outcome: "$2,000",
    description:
      "Found a publicly exposed production environment file containing live AWS credentials with access to 57 S3 buckets, Auth0 management API tokens, and database credentials.",
    date: "Mar 2026",
    link: "https://www.linkedin.com/posts/stuart-lundberg_pump-terms-conditions-activity-7441951300302479360-iJO8",
    linkText: "Acknowledged by Pump",
  },
  {
    company: "TYPO3",
    title: "Slack Admin Token Exposure",
    outcome: "$700",
    description:
      "Found a leaked Slack token granting admin-level access to the TYPO3 workspace with 9,600+ members, including private channels and full message history.",
    date: "Mar 2026",
  },
  {
    company: "Algolia",
    title: "Leaked Netlify Token Exposure",
    outcome: "$700",
    description:
      "Discovered a leaked Netlify token granting access to Algolia's Enterprise account, 44 sites, and DNS records for yarnpkg.com.",
    date: "Mar 2026",
  },
  {
    company: "Algolia DocSearch",
    title: "39 Admin Keys Exposed",
    outcome: "Resolved",
    description:
      "Scraped 15,000 documentation sites and found 39 Algolia admin API keys with full write access to search indexes for projects like Home Assistant and KEDA.",
    date: "Mar 2026",
    link: "/blog/algolia-docsearch-admin-keys",
    linkText: "Read the full write-up",
  },
  {
    company: "Red Hat",
    title: "SSH Key Exposure",
    outcome: "Hall of Fame",
    description:
      "Discovered a leaked SSH private key granting write access to eclipse-che/che, the upstream repository for Red Hat OpenShift Dev Spaces.",
    date: "Feb 2026",
    link: "https://access.redhat.com/articles/66234",
    linkText: "Acknowledged by Red Hat Security",
  },
  {
    company: "Home Depot",
    title: "Internal Infrastructure Exposure",
    outcome: "Featured",
    description:
      "A leaked GitHub token granted access to hundreds of private repositories, cloud infrastructure, and order fulfillment systems.",
    date: "Dec 2025",
    link: "https://techcrunch.com/2025/12/12/home-depot-exposed-access-to-internal-systems-for-a-year-says-researcher/",
    linkText: "Featured in TechCrunch",
  },
  {
    company: "GitHub",
    title: "Critical Infrastructure Access",
    outcome: "$20,000",
    description:
      "Discovered a leaked OAuth token granting write access to github/github and 74,000+ private repositories.",
    date: "Nov 2025",
  },
  {
    company: "TripAdvisor",
    title: "Sensitive Data Exposure",
    outcome: "$1,500",
    description:
      "Identified a publicly exposed employee token with repo and workflow scopes, allowing access to source code and build pipelines.",
    date: "Nov 2025",
  },
  {
    company: "Vue.js",
    title: "Admin API Key Exposure",
    outcome: "Hall of Fame",
    description:
      "Found a leaked Algolia Admin API key with write access to the official documentation search index.",
    date: "Oct 2025",
    link: "https://github.com/vuejs/core/blob/main/SECURITY.md",
    linkText: "Acknowledged in the Vue.js Security Hall of Fame",
  },
  {
    company: "Chrome Extensions",
    title: "AI Auth Bypass",
    outcome: "Resolved",
    description:
      "Reverse-engineered popular AI extensions to bypass client-side authentication, enabling free access to premium LLM APIs.",
    date: "Sep 2025",
  },
  {
    company: "Margelo",
    title: "Exposed Credentials",
    outcome: "Resolved",
    description:
      "Discovered publicly exposed credentials that could compromise development infrastructure.",
    date: "Aug 2025",
  },
  {
    company: "Popsa",
    title: "Security Misconfiguration",
    outcome: "Resolved",
    description:
      "Identified misconfigurations that could lead to unauthorized access to user data.",
    date: "Jul 2025",
  },
  {
    company: "NPR",
    title: "Early Security Research",
    outcome: "Featured",
    description:
      "Discovered a Google Family Link security bypass at age 9, marking the beginning of my security research journey.",
    date: "Apr 2018",
    link: "https://www.npr.org/2018/06/18/620005246/a-guide-to-parental-controls-for-kids-tech-use",
    linkText: "Featured in NPR",
  },
];
