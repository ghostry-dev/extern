<div align="center">

<picture><img src="https://docs.ghostry.dev/logo.png" alt="ghostry" width="96" height="96"></picture>

# @ghostry/extern-extension-fabricator-v0

**Blocks typed by a fabricator schema fabricate their own value, for `@ghostry/extern`.**

[![npm](https://img.shields.io/badge/npm-ffffff.svg?style=for-the-badge&color=000000&logo=npm&logoColor=CB3837)](https://www.npmjs.com/package/@ghostry/extern-extension-fabricator-v0)
[![npmx](https://img.shields.io/badge/npmx-ffffff.svg?style=for-the-badge&color=000000&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTMiIGhlaWdodD0iMTUzIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNTMgMTUzIj4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi43MDQgOS45ODI3KSI+CiAgICA8cGF0aCBkPSJtMC45MzQ3NiA5Ny4yMDVoMjQuMDgxdjIzLjY5M2gtMjQuMDgxeiIgZmlsbD0iI2ZmZiI+PC9wYXRoPgogICAgPHBhdGggZD0ibTEwMy4xMi05LjIzMDctMy42MjExIDEwLjI0Ni00Ni4zMDkgMTMxLTMuNjIxMSAxMC4yNDZoMTUuNTM3bDMuNjIxMS0xMC4yNDYgMTEuNzE3LTMzLjE0OCAzOC4yMTEtMTA4LjF6IiBmaWxsPSIjNTFjOGZjIj48L3BhdGg+CiAgPC9nPgo8L3N2Zz4K&logoColor=51C8FC)](https://npmx.dev/package/@ghostry/extern-extension-fabricator-v0)
[![jsr](https://img.shields.io/badge/jsr-ffffff?style=for-the-badge&color=000000&logo=jsr&logoColor=F7DF1E)](https://jsr.io/@ghostry/extern-extension-fabricator-v0)
[![github](https://img.shields.io/badge/github-ffffff?style=for-the-badge&color=000000&logo=github&logoColor=ffffff)](https://github.com/ghostry-dev/extern)
<picture><img alt="typescript" src="https://img.shields.io/badge/typescript-ffffff?style=for-the-badge&color=000000&logo=typescript&logoColor=3178C6"></picture>
<picture><img alt="bun" src="https://img.shields.io/badge/bun-ffffff?style=for-the-badge&color=000000&logo=bun&logoColor=FBF0DF"></picture>
<picture><img alt="node" src="https://img.shields.io/badge/node-ffffff?style=for-the-badge&color=000000&logo=nodedotjs&logoColor=5FA04E"></picture>
<picture><img alt="fabricator" src="https://img.shields.io/badge/fabricator-ffffff.svg?style=for-the-badge&color=000000&logo=data:image/webp;base64,UklGRowDAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSNwBAAABkEPbtqk9J7Zt27ZTpbJtO5VtO6ls27ZTObWd/MYde4yH+845N2gjwpHbtoFEVzO7e57ZRxB/mU8laCymo6Az0FhKT34ZT7juiE79/+eZwfzSH9BpuKB9f0Ym5suPJGeZB9NaF0xPlLX60FNJLjpTl2wrvjqB01hRCQMpahXvaLYDCe05j9FqzTCQWKvd0Lrqss6QwmSZuo7DPYel3QbPVIdtha+x60xux+FXWk/DWd48M2bNmtXYqugs5ibbwgfyjIc3TwqAyValwdwnW/gkk9lwpd2MsLj0Imm/ca23vlIFReg5Vwpsay1zRcNUmV0aTsks1xCTVWSkBnQlypjTmyent4x29VWck/0zxGgwVUXnlAbsEhmsIqW2RM6YsDsCuJFWctaGHOgtgdESBb8FvMxpNT9aXHXJ6ZAEIKYq2SykaHibX3LavgV6ks1C4sCtrKKHr3lb8ljiwZXsJF3XcFx4VFSqeyg+fGgrNDWYBMz6nCJnAtkwfxyanq9yip8Y8HZoZqbMd/w0AJ+WVubIe8FPCWCezWqY3i7ryHd+dvL9uLJ8YMuKBXPnL9967IEf8IugNmN7WRyxFcVBkfSLph6DdhzKsejGoxqTZlyKsenF5zr69EVl84mPAFZQOCCKAQAAsAsAnQEqQABAAD5hKo5FpCKhGv0WZEAGBLUAYP/7gbvkuL65RvkG0wb2ZvgH6Aehz+13WLPqoQLa5eoH2Va0EHUQ/4czFkGwHS1SADsG8YDH+DGIlFsrT2A2+qL95tOXN3WO6xIgAP7/COd/iBE/1l1T3wLGwB7vowaGH/lgWszIvnQUa7e5OGkvv280QsKCFFB84D4r+/uv60aIIHb0dn/3j+hZ6mkFgU/k4HuICwQ+n+OJPEZ0dP6Q6+shjs++1qiZ2gFXsIAOPvZ9lYhqYPmhfimHM3bb7i06blY/03VRs+XiBWbNShspo9f4N3//SdqyVvNPeb16avu0c8dc6rfwAylJQQs22odpaJv8aTJrXxZ16sO0x/hpUXyrYdHZVeeVJQXJk9hVQhTtCxR6hB9hqwG4vRMMfD6oj5nrEy/iUJCQzwz46+7c+5AAJ/1zDyIu2t08f2MnDNYuseBc4j15PhAFLyoAvWcfQzuAa1hwaa7NxsYP/8FPVf8hrBhhH1boCvkwbgAAAA=="></picture>

[**Documentation**](https://docs.ghostry.dev/extern) &nbsp;·&nbsp; [**Extern guide**](https://docs.ghostry.dev/fabricator/guides/extern) &nbsp;·&nbsp; [**API Reference**](https://docs.ghostry.dev/extern/reference/api)

</div>

> [!WARNING]
> v0 is in active development, and breaking changes occur frequently. Read the [changelog](https://docs.ghostry.dev/extern/changelog/extern-extension-fabricator-v0) before every update.

A `typed` [extern](https://docs.ghostry.dev/extern) block whose identity is a [fabricator](https://docs.ghostry.dev/fabricator) schema becomes self-mocking: inside a testing block with no mock written, it fabricates a value from its own schema instead of throwing `NotMockedError`.

## Install

```bash
npm install @ghostry/extern-extension-fabricator-v0 @ghostry/extern @ghostry/fabricator
```

## Example

```ts
import { initialize as initializeExtern } from "@ghostry/extern";
import { fabricatorExtension } from "@ghostry/extern-extension-fabricator-v0";
import { initialize as initializeFabricator } from "@ghostry/fabricator";
import { expect, test } from "bun:test";

const fabricator = initializeFabricator();
const { T } = fabricator;

const extern = initializeExtern({
  extensions: [fabricatorExtension({ instance: fabricator })],
});

const User = T.object({
  id: T.number,
  name: T.string.whereby({ length: { max: 10 } }),
});

declare function fetchUser(): { id: number; name: string };
const loadUser = () => extern.typed.by(User).will(() => fetchUser());

test("fabricates a user with no mock", async () => {
  await extern.testing(() => {
    expect(loadUser()).toMatchObject({ id: expect.any(Number) });
  });
});
```

A mock still wins where you write one, and `.produce()` shapes the fabricated value instead of replacing it. See the [Extern guide](https://docs.ghostry.dev/fabricator/guides/extern) in fabricator's docs for shaping, requiring explicit mocks, determinism across tests, and use with a test harness.

## License

[MIT](LICENSE) © Patrick Rebsch
