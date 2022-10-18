# cosign-api

🏆 HelloSign "Go Paperless" Hackaton 2022 winning submission

## Disclaimer

This code was written in haste in about 7 days and doesn't adhere to best practices. The coordinator implementation is especially poor and there's a lot of repeated code. None the less, the interesting bits work.

## Getting Started

Generally speaking, this is a standard Next.js app that authenticates with HelloSign and can perform CRUD operations on signature requests. Only the deep-link redirect is really `CoSign` specific. Also included is a validated `/events` endpoint in Next.js-speak, but to make it work you'll have to set up a socket or polling mechanism.

## System Architecture

![System architecture](./design.png)
