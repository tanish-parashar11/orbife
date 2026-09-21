# Orbife

Orbife is a social learning network concept for college communities: an X-inspired federated activity feed, skill-gated campus hubs, and private conversations in one focused interface.

## What is included

- Dark, responsive feed UI inspired by the supplied reference screenshot.
- A native-style Expo React Native client under `mobile/`, including the supplied dark onboarding direction and five bottom tabs: Home, Explore, Hubs, Alerts, and Messages.
- **Global activity timeline** with For You / Following tabs, post composer, media card, likes, reposts, saves, and federated timeline indicator.
- **Headless college hubs** for Mathematics, Coding Lab, and Public Speaking with suggested hub cards and channel counts.
- **Test-to-enter gatekeeper** with a five-question skill quiz shell. The example gate uses an 80% pass rule and unlocks the hub on success.
- **Login / create-account modal** with email-password, Google, and GitHub entry points. The current managed scaffold supplies the working OAuth callback; Supabase variables are documented for the intended auth adapter.
- Responsive navigation that shifts from a three-column desktop workspace to a mobile bottom tab bar.

## Stack

- React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui primitives, Wouter
- Expo React Native 0.81 mobile client with a native dark surface, press feedback, bottom navigation, compose sheet, and skill-gate sheet
- Express + tRPC + Drizzle foundation from the WebDev full-stack scaffold
- Vitest for server/shared unit tests
- Lucide icons and CSS-first motion system

## Planned integration boundaries

The product is structured so each protocol can be connected behind a server-side adapter without changing the feed UI:

| Product area | Intended service | Current UI boundary |
| --- | --- | --- |
| Account auth and profiles | Supabase Auth + Postgres | Login modal and profile shell |
| Open timeline and follows | Mastodon / ActivityPub | Federated timeline indicator and feed model |
| Community discovery and threads | Misskey / Lemmy | Hubs, tags, and post/thread cards |
| Encrypted direct messages | Matrix | Messages navigation entry point |
| Skill gatekeeping | Orbife server logic | Quiz modal with a tested 80% pass rule |

The repo does **not** include production service credentials. Add them through your deployment secret manager or local environment configuration; never commit real keys.

## Local development

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm test
pnpm check
pnpm build
```

## Environment placeholders

Populate the following variables only in your deployment secret manager or local environment when you provision the adapters: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `MASTODON_BASE_URL`, `MASTODON_ACCESS_TOKEN`, `MISSKEY_BASE_URL`, `MISSKEY_API_TOKEN`, `LEMMY_BASE_URL`, `MATRIX_HOMESERVER_URL`, and `MATRIX_ACCESS_TOKEN`. The managed WebDev scaffold also supplies its own server-side auth and database variables.

## Design notes

The visual language intentionally stays close to the supplied dark social app reference while differentiating Orbife with an orbital wordmark, blue/cyan interaction states, soft protocol accents, and compact monospace metadata for federation and hub context.

## Mobile client note

The current environment provides Expo/React Native rather than a Flutter SDK. The production-ready mobile shell is therefore implemented in `mobile/` with a clean separation from the web client. The backend contracts remain client-agnostic, so a Flutter client can replace the Expo surface later without changing the Supabase, ActivityPub, hub, or Matrix integration boundaries.
