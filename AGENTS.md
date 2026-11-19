<!-- @ghostry:shared:start
     Managed by the @ghostry meta repo (.templates/blocks/agents.*.md); edit
     it there. -->

## @ghostry conventions

These apply to every @ghostry repo. This repo is checked out inside the @ghostry meta repo (its parent directory), which holds the shared config, workflows, and agent skills in `../.agents/skills/`. Change shared files there, never here.

- Bun only: `bun install`, `bun run …`, `bun test`, `bun x …`. Never `npm`, `npx`, or `node`.
- Format with oxfmt. Its config, `.oxfmtrc.jsonc`, is shared.
- Comments are TypeDoc-style `/** */` and explain _why_ (a constraint, an invariant, a workaround), never restate _what_ the code already says.
- AGENTS.md describes present-state facts and invariants, never change history. State the current behavior and the trap directly; git history holds the rest.

### Libraries

- Type-check under both TypeScript 7 (`check`) and TypeScript 5 (`check:ts5`, where a package defines it). Both must pass: TS7's type-instantiation budget is far larger than TS5's, and most consumers are on 5.x.
- `tsconfig.base.json` holds the shared compiler options. In particular, `verbatimModuleSyntax` is on, so type-only imports say `import type` (or `type` on individual specifiers), and `exactOptionalPropertyTypes` is on. A package's own `tsconfig.json` extends the base and adds only what is specific to it.
- Every relative import names its file, `.ts` extension included: `"./Types.ts"`, and `"./Thing/index.ts"` for a directory, never `"./Thing"`. Declaration emit copies imports as written, and a consumer on `moduleResolution: node16`/`nodenext` needs the extension.
- `jsr publish` ships every non-gitignored file in the package directory, dotfiles included. A package at the repo root therefore lists what to publish with `publish.include`, an allowlist, in `jsr.json`. A denylist there would leak `.github/`, `.bun-version`, `tsconfig*.json`, and the rest. Under `pkg/*`, the repo-level files sit outside the package, so a short `exclude` is enough. `bun run check:jsr`, where defined, prints the exact file list.
- Releasing: bumping a package's `version` in a commit to `main` publishes it to npm and JSR and creates its GitHub release, with an empty body. Write the release notes afterwards with the meta repo's `release-notes` skill, following its `.release-notes/FORMAT.md`.

<!-- @ghostry:shared:end -->
