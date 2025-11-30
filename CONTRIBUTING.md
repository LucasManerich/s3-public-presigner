# How to contribute

Contributions are encouraged.

## Contribute with PRs

First of all, thanks for contributing! To contribute code, open a pull request with your changes.

I'd like to ask you not to format existing code, like adding semicolons or changing single quotes to double quotes everywhere. When contributing code, focus on your changes and nothing else.

For a PR to be mergeable, linting, tests, and the build must all pass. Every code change or addition must include corresponding tests.

Your code doesn't need to be perfect to be shipped, it just needs to provide value and be mergeable.

## Developing locally

You need to have Bun installed.

Install dependencies:

```
bun install
```

Run dev server:

```
bun dev
```

Run tests:

```
bun test
```

Lint with [Biome](https://biomejs.dev/):

```
bun lint
bun format
```
