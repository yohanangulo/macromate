# MacroMate

Offline-first meal and macro tracker built with **Expo / React Native**, **SQLite + Drizzle** and a small **NestJS** sync backend ([macromate-api](https://github.com/yohanangulo/macromate-api)).

> Single-user demo - **no authentication**. The point of the project is the offline-first sync model and a clean, framework-agnostic core, not multi-tenancy.

<!-- TODO: demo GIF - add a meal offline, go online, watch it land on the server -->

## What it does

- Log meals with calories, protein, carbs and fat. Validation with Zod (name length, numeric macros, at least one macro > 0).
- Home screen with live totals, a macro grid and the most recent meals. Everything updates reactively from SQLite - no manual refetch.
- Edit a meal in a native form sheet; long-press to delete; clear all.
- Share or copy a plain-text daily summary.
- Daily meal reminders (12:00 and 18:00) via local notifications, with permission handling for "denied" vs "blocked" states.
- Works fully offline. Syncs with the API in the background when it can.

## Offline-first sync

The app never blocks on the network. SQLite is the source of truth for the UI; the API is where devices reconcile.

Every local mutation (create / edit / delete) writes to SQLite with `synced = false`. That flag turns the `meals` table into a queue. A single `sync()` drains the queue and pulls remote changes, in two phases:

```
App (RN + SQLite)                              API (NestJS + Postgres)
──────────────────                             ───────────────────────
rows with synced = false  ── POST /meals/sync ──▶  upsert, Last-Write-Wins
                                                   by updatedAt
mark rows synced = true   ◀────────────────────    (stale writes ignored)

cursor = sync_states      ── GET /meals/sync?since= ─▶  delta since cursor
  .lastSyncedAt
                          ◀─────────────────────    { meals, syncTimestamp }
LWW per row, then write
advance cursor to syncTimestamp
```

- **Upsync (push).** All unsynced rows go to `POST /meals/sync` in one batch, deletes included. On success they are marked `synced = true`. The server resolves push conflicts with Last-Write-Wins by `updatedAt`, so the client does not check anything before pushing.
- **Downsync (pull).** The app stores a per-entity cursor in `sync_states` and asks for everything changed after it. For each remote row that also exists locally, LWW by `updatedAt` decides whether the local copy is overwritten (`resolveConflictLWW` in the domain). The cursor then advances to the server's `syncTimestamp` watermark.
- **Deletes are soft.** Deleting sets `isDeleted = true`, bumps `updatedAt` and flags the row unsynced, so a delete rides the same queue as any other change and propagates to every device. Live queries filter deleted rows out.
- **Client-generated UUIDs.** `id` is generated on the device (`expo-crypto`), so a meal created offline has a stable identity before it ever reaches the server.

### When sync runs

| Trigger | How |
| --- | --- |
| App start | `useSync` fires once migrations have succeeded |
| Network reconnect | `expo-network` state listener; fires on the offline -> online edge, not on every event |

`SyncService` holds an `isSyncing` guard so overlapping triggers cannot run two syncs at once. Sync is a trigger, never a gate: the UI is usable before, during and after it, and a failed sync just logs and waits for the next trigger.

## Architecture

Hexagonal layering with one hard rule: **`src/core/` must not depend on Expo or React Native**. Platform-specific implementations live outside it and are wired together in a single DI container.

```
src/
├── core/                         framework-agnostic
│   ├── meals/
│   │   ├── domain/               MealEntity, MealRepository port, Zod schema, LWW rule
│   │   ├── application/          use cases as factory functions (addMeal, updateMeal, ...)
│   │   └── infrastructure/       repository impl, data-source ports, DTOs, mapper, sync
│   └── shared/                   IdGenerator port, sync_states data source
├── infrastructure/               Expo/RN adapters: SQLite client, Drizzle tables, axios, UUIDs
├── di/container.ts               composition root
├── hooks/                        useLiveQuery wrappers, useSync
├── components/                   UI
└── app/                          expo-router screens (native tabs + form sheet)
```

Three shapes for a meal, one mapper between them:

| Shape | Lives in | Carries sync metadata? |
| --- | --- | --- |
| `MealEntity` | domain | No - the domain does not know about sync |
| `MealModel` | infrastructure (SQLite row) | Yes - `synced`, `isDeleted` |
| `MealDto` | infrastructure (wire) | `isDeleted` only, ISO dates |

Keeping `synced` and `isDeleted` off the entity was a deliberate decision: they are persistence and transport concerns, and the use cases should not have to think about them.

**Reactive reads.** Screens do not call use cases to read. They subscribe to SQLite through Drizzle's `useLiveQuery` (`useWatchMeals`, `useWatchMealsTotals`, `useWatchRecentMeals`), so a write anywhere - a form, a delete, a downsync - updates every screen without extra plumbing. Writes go through the use cases.

**Sync is pluggable.** `SyncService` takes a list of `Syncable`s and runs them in order. `MealSyncable` is the only one today; adding another entity means adding another `Syncable` and a row in `sync_states`.

## Known limitations

- **Watermark is client-controlled.** The downsync cursor is the server's `max(updatedAt)`, and `updatedAt` comes from devices. A row that reaches the server late with an older `updatedAt` can be skipped by a client whose cursor already moved past it. Fine for a single-user demo; the robust fix is a server-assigned monotonic cursor, documented on the API side.
- **Upsync is all-or-nothing.** One invalid row fails the whole batch and blocks the queue until it is fixed.
- **LWW on downsync is read-then-write**, not a conditional write in SQL. The window is tiny for one user, but a multi-writer setup would want `onConflictDoUpdate ... where updatedAt < excluded.updatedAt`.
- **The sync algorithm lives inside `MealSyncable`.** The next refactor is to lift it into a generic routine and have each `Syncable` provide only its primitives.
- No automated tests on the mobile side yet (the API has 41). `SyncService` and `MealSyncable` are first in line.

## Getting started

Prerequisites: Node.js, Xcode or Android Studio, and the [API](https://github.com/yohanangulo/macromate-api) running on `http://localhost:3000`.

```bash
npm install
npx expo run:ios        # or: npx expo run:android
```

The project targets a development build (`expo run:*`), not Expo Go.

- Migrations run automatically on launch (`useMigrations` gates rendering until the schema is ready).
- The API base URL is set in `src/infrastructure/http-client.ts`. On the Android emulator use `http://10.0.2.2:3000` instead of `localhost`.
- After changing a Drizzle table, regenerate the migration:

```bash
npm run db:generate
```

- Inspect the local database with Drizzle Studio from the Expo dev tools (`expo-drizzle-studio-plugin`).

## Tech stack

Expo SDK 56 · React Native 0.85 · React 19 · TypeScript · expo-router (native tabs, form sheet) · expo-sqlite + Drizzle ORM (live queries, migrations) · react-hook-form + Zod · axios · expo-network · expo-notifications · React Compiler

## Companion project

[macromate-api](https://github.com/yohanangulo/macromate-api) - the NestJS + PostgreSQL + Prisma backend. Its README documents the server side of the same sync model, the endpoints and the request/response shapes.
