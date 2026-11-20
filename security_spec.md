# Security Specification: EPI & Health Care

## 1. Data Invariants
1. Every document in `/epi_users_backup/{userId}` belongs strictly to the authenticated user whose `request.auth.uid == userId` and `ownerId == request.auth.uid`.
2. Users must have a verified email (`request.auth.token.email_verified == true`) to create, update, or delete backup records.
3. Collection-level `list` queries on `/epi_users_backup` are strictly forbidden (`allow list: if false;`); clients access only their single document by UID.
4. `ownerId` is immutable after creation (`incoming().ownerId == existing().ownerId`).
5. `updatedAt` must always equal `request.time` (server timestamp).
6. Array fields `notes` and `history` are strictly bounded (`notes.size() <= 200`, `history.size() <= 100`) and map-typed on index 0.
7. Map fields `centerNames` and `overrides` are strictly bounded (`centerNames.keys().size() <= 20`, `overrides.keys().size() <= 150`).

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unauthenticated Read**: Anonymous client attempts `get(/epi_users_backup/userA)` -> `PERMISSION_DENIED`.
2. **Cross-User Read**: Authenticated `userB` attempts `get(/epi_users_backup/userA)` -> `PERMISSION_DENIED`.
3. **Collection Scrape (`list`)**: Authenticated `userA` attempts `list(/epi_users_backup)` -> `PERMISSION_DENIED`.
4. **Unverified Email Write**: `userA` with `email_verified: false` attempts `create` -> `PERMISSION_DENIED`.
5. **Identity Spoofing on Create**: `userA` attempts `create` on `/epi_users_backup/userA` with `ownerId: "userB"` -> `PERMISSION_DENIED`.
6. **Path-UID Mismatch**: `userA` attempts `create` on `/epi_users_backup/userB` with `ownerId: "userA"` -> `PERMISSION_DENIED`.
7. **Shadow / Ghost Field Injection**: `userA` sends valid fields plus `isAdmin: true` -> `PERMISSION_DENIED`.
8. **Client Timestamp Forgery**: `userA` sends a fixed client `Date` for `updatedAt` instead of `serverTimestamp()` -> `PERMISSION_DENIED`.
9. **Owner Transfer on Update**: `userA` attempts to update `ownerId` to `"userB"` -> `PERMISSION_DENIED`.
10. **Oversized Notes Array (DoW)**: `userA` sends `notes` with 201 items -> `PERMISSION_DENIED`.
11. **Invalid ID Poisoning**: Client attempts to access `/epi_users_backup/bad$id!@#` -> `PERMISSION_DENIED`.
12. **Type Poisoning**: `userA` sends `notes: "string-instead-of-list"` or `centerNames: []` -> `PERMISSION_DENIED`.
