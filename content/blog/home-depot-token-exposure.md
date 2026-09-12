---
title: "How a Single Leaked Token Exposed Home Depot's Internal Infrastructure for a Year"
date: "2026-01-16"
summary: "A leaked GitHub token granted access to 664 internal repositories for nearly a year. Home Depot never responded."
tags: ["security-research", "disclosure", "github", "token-exposure"]
draft: false
---

In early November 2025, I discovered a GitHub personal access token belonging to a Home Depot employee. The token had been publicly exposed since early 2024, and it granted far more access than "hundreds of private repositories."

This is the technical breakdown of what that access actually looked like.

![Repository Access Breakdown](/blog/home-depot-token-exposure/access-breakdown.svg)

Admin access means full control: delete repositories, modify branch protection, add collaborators, access secrets. Push access means the ability to modify code directly. This wasn't read-only access to archived projects, it was write access to production systems.

## What Was Exposed

The accessible repositories included critical internal systems:

**Authentication & User Access**

- `hdw-login-manager` - Core authentication system
- `hdw-user-access-config-core` - User access control
- `hdw-user-access-cron-job` - Scheduled access management

**Order Fulfillment**

- `hdw-fulfillment-core` - Order fulfillment logic
- `hdw-store-order-interface` - Store order processing
- `hdw-order-update-script` - Order management tooling

**Infrastructure & Configuration**

- `hdy-gcp-config-*` - Google Cloud Platform configuration
- `hdy-cockroachdb-config-*` - CockroachDB database configuration
- `scsre-infra-*` - Supply chain SRE infrastructure (40+ repos)

**Secrets Management**

- `cf-vault` - HashiCorp Vault secrets management
- `ci-cd-vault-unsealer` - Vault unsealing for CI/CD
- `artifact-registry-token` - Artifact registry authentication
- `java-trusted-certificates` - Certificate trust management

&nbsp;

![Exposure Timeline](/blog/home-depot-token-exposure/exposure-timeline.svg)

I attempted to report this responsibly:

- **Early November 2025** - Discovered the exposed token
- **Multiple emails sent** - No response from Home Depot security
- **LinkedIn message to CISO** - No response
- **December 3, 2025** - Contacted TechCrunch after exhausting options
- **December 9, 2025** - Token revoked (only after TechCrunch reached out)

Home Depot has no vulnerability disclosure program and no public way to report security issues. Their spokesperson acknowledged TechCrunch's email but did not respond to questions about whether anyone else accessed their systems during the year-long exposure.

&nbsp;

During the approximately one-year exposure window:

- **460 repositories** (69%) had commits during the exposure period
- **232 repositories** were pushed to in the last 90 days

Many systems were actively developed throughout:

| Repository             | Last Push    | Category          |
| ---------------------- | ------------ | ----------------- |
| `hdw-login-manager`    | Nov 24, 2025 | Authentication    |
| `hdw-fulfillment-core` | Nov 25, 2025 | Order Fulfillment |
| `scsre-infra-flesh`    | Nov 25, 2025 | Infrastructure    |
| `hdw-config-c1`        | Nov 25, 2025 | Configuration     |

## What Should Have Happened

1. **Vulnerability Disclosure Program** - A public security.txt or VDP would have allowed immediate reporting
2. **Don't Ignore Researchers** - Any acknowledgment would have been better than none
3. **Least Privilege** - A single employee token should not have admin access to 64 repositories
