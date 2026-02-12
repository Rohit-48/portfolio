---
title: 'Cloudflare Tunnel (cloudflared): Expose Local Services Without Port Forwarding'
date: '2026-01-30'
excerpt: 'A quick mental model for how Cloudflare Tunnel works and why it’s safer than port forwarding.'
tags: ['Cloudflare', 'Tunnel', 'Self-hosting', 'Networking', 'NixOS']
---

If you’ve ever exposed a service from home, you know the classic approach:

- Open a port on your router (80/443/whatever)
- Point DNS at your public IP
- Hope your firewall rules are tight

Cloudflare Tunnel flips that entire model.

Instead of allowing inbound connections to your server, you run a lightweight connector (`cloudflared`) **inside your network** that makes **outbound-only** connections to Cloudflare’s edge. When someone visits your domain, Cloudflare sends that request _through the tunnel_ to your origin.

This gives you the two big wins most self-hosters want:

- **No inbound ports** on your router
- **Your origin stays hidden** (and Cloudflare can sit in front with WAF/DDoS, rate limits, Access, etc.)

## The mental model

Think of a tunnel as “Cloudflare has a private line into my network, but I dial it from the inside.”

- Your server **calls out** to Cloudflare
- Cloudflare **routes** requests to your tunnel
- Your origin never becomes a public IP target

## How it works (high level)

Source: [Cloudflare docs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/#how-it-works)

Cloudflare Tunnel establishes outbound connections (tunnels) between your resources and Cloudflare’s global network. A tunnel is a persistent object that routes traffic to DNS records. Within the same tunnel, you can run multiple connectors (for redundancy) and Cloudflare will send traffic to the nearest/healthy connector.

<img
  src="/blogs/Pasted%20image%2020260130120959.png"
  alt="How Cloudflare Tunnel works diagram"
  className="my-6 w-full rounded-xl border-4 border-black"
/>

## Outbound-only is the point

When you run `cloudflared`, it initiates outbound connections to Cloudflare. Once they’re established, traffic can flow both ways over that encrypted channel.

Because most networks allow outbound traffic by default, you can keep **all inbound ports closed** and still publish services.

### Why this beats port forwarding

- **No inbound ports**: your firewall stays closed.
- **Hidden origin IP**: your home/ISP public IP isn’t revealed to visitors.
- **WAF & DDoS protection**: Cloudflare absorbs a lot before it reaches your hardware.
- **CGNAT friendly**: works even if your ISP doesn’t give you a real public IP.

<img
  src="/blogs/Pasted%20image%2020260130102450.png"
  alt="Cloudflare Tunnel outbound-only connection diagram"
  className="my-6 w-full rounded-xl border-4 border-black"
/>

## Quickstart: publish one local service

Below is the “smallest useful setup” I reach for. It assumes:

- Your domain is on Cloudflare
- You have a local service running (example: `http://localhost:3000`)

### 1) Install `cloudflared`

Follow the official install for your OS. (On NixOS, see the Nix section below.)

### 2) Authenticate your machine

```bash
cloudflared tunnel login
```

This opens a browser, you pick the Cloudflare account/zone, and it stores credentials locally.

### 3) Create a tunnel

```bash
cloudflared tunnel create my-tunnel
```

Copy the tunnel UUID it prints (you’ll use it in config).

### 4) Create an ingress config

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: <YOUR_TUNNEL_UUID>
credentials-file: /home/<you>/.cloudflared/<YOUR_TUNNEL_UUID>.json

ingress:
  - hostname: app.example.com
    service: http://localhost:3000
  - service: http_status:404
```

That last rule is important: it prevents accidental “fallthrough routing” if you mistype a hostname.

### 5) Route DNS to the tunnel

```bash
cloudflared tunnel route dns my-tunnel app.example.com
```

Cloudflare will create the DNS record that points the hostname at your tunnel.

### 6) Run it

```bash
cloudflared tunnel run my-tunnel
```

Now `https://app.example.com` should reach your local service without opening inbound ports.

## Add multiple apps (one tunnel, many hostnames)

Once you have a tunnel, you can route lots of services through it:

```yaml
ingress:
  - hostname: grafana.example.com
    service: http://localhost:3001
  - hostname: immich.example.com
    service: http://localhost:2283
  - hostname: ssh.example.com
    service: ssh://localhost:22
  - service: http_status:404
```

## Put a login wall in front (Cloudflare Access)

If the service is “personal/admin”, don’t expose it to the whole internet—even behind Cloudflare.

Cloudflare Access lets you require identity (Google/GitHub/OTP, etc.) before traffic ever reaches your tunnel. The pattern is:

- Public hostname exists (`grafana.example.com`)
- Access policy says “only my email(s)”
- Your origin stays private and doesn’t need its own auth (though defense-in-depth is still wise)

## NixOS: declarative tunnel service

If you’re on NixOS, you can manage the connector as a systemd service. The exact module options differ by NixOS release, but the overall approach is:

- Put the tunnel credentials somewhere like `/var/lib/cloudflared/`
- Provide a `config.yml` (ingress + tunnel id)
- Run `cloudflared` as a long-running service

If you want, I can tailor a working snippet for your setup (where your credentials live, and which hostnames/services you’re exposing).

## Common gotchas (and quick fixes)

- **“502 / Bad Gateway”**: `cloudflared` can’t reach your local service. Confirm the service URL/port from the machine running `cloudflared` (not from your laptop).
- **Multiple machines for HA**: run multiple `cloudflared` connectors for the same tunnel on different hosts; Cloudflare will load-balance.
- **WebSockets/streaming**: usually fine, but check the app’s reverse-proxy expectations (some apps need `X-Forwarded-*` headers).
- **Don’t skip the `http_status:404` rule**: it prevents weird routing surprises.

## TL;DR

Cloudflare Tunnel is a clean way to publish services without port forwarding:

- Outbound-only connector (`cloudflared`)
- Cloudflare routes traffic through the tunnel
- Your origin stays private, works under CGNAT, and can be protected with WAF/Access

If you tell me what you’re exposing (Grafana? Immich? Home Assistant? SSH?), I can adjust the ingress examples and security posture for that exact stack.

## Ways to configure it

- **Cloudflare Dashboard path**: manage routes/ingress rules via the Cloudflare web UI.
- **Security layer**: add Cloudflare Access (Zero Trust) as a login wall in front of your apps.
- **Declarative (NixOS) path**: use `services.cloudflared` and manage the tunnel as a systemd service.
