# cosign-api

HelloSign "Go Paperless" Hackathon 2022

## Getting Started

Generally speaking, this is a standard Next.js app that authenticates with HelloSign and can perform CRUD operations on signature requests. Only the deep-link redirect is really `CoSign` specific. Also included is a validated `/events` endpoint in Next.js-speak, but to make it work you'll have to set up a socket or polling mechanism.

## System Architecture

![System architecture](./design.png)
