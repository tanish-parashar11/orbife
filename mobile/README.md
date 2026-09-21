# Orbife Mobile

A native-style Expo React Native app inside the Orbife repository.

## Five bottom tabs

1. **Home** — For You / Following federated timeline, composer, post actions.
2. **Explore** — Open discovery surface for ActivityPub and campus content.
3. **Hubs** — Discord-style college hubs, channels, and the skill-gate entry quiz.
4. **Alerts** — Mentions, replies, and hub activity.
5. **Messages** — Private conversation surface for the future Matrix adapter.

## Auth experience

The launch screen follows the supplied reference direction: dark full-screen onboarding, Orbife identity, Google/email buttons, phone CTA, username entry, and policy copy. Buttons currently continue into the app shell; production Supabase Auth wiring should be added through the shared adapter layer.

## Run

```bash
cd mobile
pnpm install
pnpm start
```

The environment supports Expo React Native rather than a native Flutter SDK. The mobile app is intentionally kept self-contained under `mobile/` so a Flutter rewrite can replace this client later without changing the Orbife backend contracts.
