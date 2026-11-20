<div align="center">

<picture><img src="https://docs.ghostry.dev/logo.png" alt="ghostry" width="96" height="96"></picture>

# @ghostry/extern

**Mock calls to external systems without changing a signature.**

Wrap a network call, a query, or a metric where it happens. Outside tests it runs as written. Inside a testing block it returns the typed value you mocked, and records how it was called.

[![npm](https://img.shields.io/badge/npm-ffffff.svg?style=for-the-badge&color=000000&logo=npm&logoColor=CB3837)](https://www.npmjs.com/package/@ghostry/extern)
[![npmx](https://img.shields.io/badge/npmx-ffffff.svg?style=for-the-badge&color=000000&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTMiIGhlaWdodD0iMTUzIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNTMgMTUzIj4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi43MDQgOS45ODI3KSI+CiAgICA8cGF0aCBkPSJtMC45MzQ3NiA5Ny4yMDVoMjQuMDgxdjIzLjY5M2gtMjQuMDgxeiIgZmlsbD0iI2ZmZiI+PC9wYXRoPgogICAgPHBhdGggZD0ibTEwMy4xMi05LjIzMDctMy42MjExIDEwLjI0Ni00Ni4zMDkgMTMxLTMuNjIxMSAxMC4yNDZoMTUuNTM3bDMuNjIxMS0xMC4yNDYgMTEuNzE3LTMzLjE0OCAzOC4yMTEtMTA4LjF6IiBmaWxsPSIjNTFjOGZjIj48L3BhdGg+CiAgPC9nPgo8L3N2Zz4K&logoColor=51C8FC)](https://npmx.dev/package/@ghostry/extern)
[![jsr](https://img.shields.io/badge/jsr-ffffff?style=for-the-badge&color=000000&logo=jsr&logoColor=F7DF1E)](https://jsr.io/@ghostry/extern)
[![github](https://img.shields.io/badge/github-ffffff?style=for-the-badge&color=000000&logo=github&logoColor=ffffff)](https://github.com/ghostry-dev/extern)
<picture><img alt="typescript" src="https://img.shields.io/badge/typescript-ffffff?style=for-the-badge&color=000000&logo=typescript&logoColor=3178C6"></picture>
<picture><img alt="bun" src="https://img.shields.io/badge/bun-ffffff?style=for-the-badge&color=000000&logo=bun&logoColor=FBF0DF"></picture>
<picture><img alt="node" src="https://img.shields.io/badge/node-ffffff?style=for-the-badge&color=000000&logo=nodedotjs&logoColor=5FA04E"></picture>
<picture><img alt="standard schema" src="https://img.shields.io/badge/standard%20schema-ffffff.svg?style=for-the-badge&color=000000&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACb0lEQVR4Ae1bXUsbURA9s5uapPhRv0pBaet7KVhUpH/Bf+t7wRehUCm0gk9S2mIpKJFE4sfGZG/v+NC3uDvj5hLuzrzuPTvnnDm72SV36RCpQ40rqbH2B+lmgCWg5g7YJVDzAMASYAmouQONKvSTP0va9meiKs5W4hz+2XV0C7hhibUFS55kQGvdYWHLobnmQGlBp4oPuxGQ/SH0jgh3Z3rnSfsu8GI3x8K2H4W+dzWWeAq9L4TuZ939XIWafecnvzMF4tlCPwDmwpw0JTaAngGLH3NNr4limBNzk5bYgPZbh6QlbTP59cyJuUlLbMDMiryJlJR2vYab2AD+yZvW0nATGzCt4rW8zACtc7HgLAGxTFKrI9g9nZaaSN4vg+Yef1px3QHybx24q4FWkwgXxAB62UZj7zXQKL7i6NVzJBtzGO7/BJsx6SpmVAGDdHu1lPj/rZopkg8eE6CCGEBL8mdnvmRCVBADVK/MgV6zwxgQYpTKHmaA0rhoYJaAaEapFGIJUBoXDcwSEM0olUIsAUrjooFZAqIZpVKIJUBpXDQwS0A0o1QKsQQojYsGZgmIZpRKIZYApXHRwCwB0YxSKcQSoDQuGpglIJpRKoVYAqTGuUGg/62lxPx6p9hQIk5Adq5gFgiSncuHIzbg7jdh1BcqCrC9mDkxN2mJDeAvNS4PPEwgyl3fS3kBfcH3MJ4Lc2Ju0hIbwA1ufhA6n8o3zL9fynh5QaPjTikMi2YuzElT6m1y/RNC9jfF/GaO1huHxqxvP4ZDftoDEkKy6fcJzs+M5+mFu26G/OgC7uz60XVDjvwvwtXXBPfd8UuLjvwDwz2CtgCroKUAAAAASUVORK5CYII="></picture>

[**Documentation**](https://docs.ghostry.dev/extern) &nbsp;·&nbsp; [**Guides**](https://docs.ghostry.dev/extern/guides/values) &nbsp;·&nbsp; [**API Reference**](https://docs.ghostry.dev/extern/reference/api)

</div>

> [!WARNING]
> v0 is in active development, and breaking changes occur frequently. Read the [changelog](https://docs.ghostry.dev/extern/changelog/extern) before every update.

## Packages

This is the monorepo for `extern` and its companion packages.

| Package                                                                                   | Version                                                                                                                                                                                                 | Description                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [`@ghostry/extern`](pkg/extern/README.md)                                                 | [![npm version](https://img.shields.io/npm/v/%40ghostry%2Fextern?style=flat-square&color=000000&label=)](https://www.npmjs.com/package/@ghostry/extern)                                                 | The core library.                                                                                                             |
| [`@ghostry/extern-extension-fabricator-v0`](pkg/extern-extension-fabricator-v0/README.md) | [![npm version](https://img.shields.io/npm/v/%40ghostry%2Fextern-extension-fabricator-v0?style=flat-square&color=000000&label=)](https://www.npmjs.com/package/@ghostry/extern-extension-fabricator-v0) | Blocks typed by a [fabricator](https://docs.ghostry.dev/fabricator) schema fabricate their own value when no mock is written. |

## Install

```bash
npm install @ghostry/extern
```

## Example

```ts
import { initialize } from "@ghostry/extern";
import { expect, test } from "bun:test";

const extern = initialize();

type User = { id: number; name: string };
export const User = extern.T<User>();

// Source: the call is wrapped where it happens, and the signature is unchanged.
export const loadUser = (id: number) =>
  extern.typed
    .by(User)
    .given(id)
    .will(async (id) => {
      const response = await fetch(`https://api.example.com/users/${id}`);
      return (await response.json()) as User;
    });

// Test: no request is made, and the spy records the call.
test("loads a user", async () => {
  await extern.testing(async (mock) => {
    const spy = mock(User).with({ id: 1, name: "Ada" });

    expect((await loadUser(1)).name).toBe("Ada");
    expect(spy.executions[0]?.given).toBe(1);
  });
});
```

See the [docs site](https://docs.ghostry.dev/extern) for the full guide.

## No injected parameters

Dependency injection usually means threading a client through constructors and arguments so a test can swap it. With extern, a wrapped call keeps its function's signature, and the test swaps the value instead. See [Why extern?](https://docs.ghostry.dev/extern/start/why).

## Mocks typed by identity

A block names its result type with an identity, and its mock must be a value of that type, so TypeScript checks every mock against the code it replaces. An identity can also be any [Standard Schema](https://standardschema.dev), and `extern.validated` checks the real value against it at runtime. See [Values](https://docs.ghostry.dev/extern/guides/values).

## Nothing reaches out by accident

Inside a testing block, an unmocked value block throws, and a mock that's never used fails the test. Every external call in a test is accounted for. See [Mocking](https://docs.ghostry.dev/extern/guides/mocking).

## Every test, framed

With [`@ghostry/harness`](https://docs.ghostry.dev/harness), every test body is a testing block, and its mocker arrives on the test context:

```ts
it("reads the forecast", ({ extern: { mock } }) => {
  mock(Forecast).with({ high: 3, low: -2 });
  expect(forecast("Oslo").low).toBe(-2);
});
```

See [Harness](https://docs.ghostry.dev/extern/guides/harness).

## Values that mock themselves

With [`@ghostry/extern-extension-fabricator-v0`](pkg/extern-extension-fabricator-v0/README.md), a block whose identity is a [fabricator](https://docs.ghostry.dev/fabricator) schema fabricates its own value when no mock is written. See [Extensions](https://docs.ghostry.dev/extern/guides/extensions).

## License

[MIT](LICENSE) © Patrick Rebsch
