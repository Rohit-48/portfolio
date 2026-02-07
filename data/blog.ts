import type { BlogPost } from '@/types/blog'

export const blogPosts: BlogPost[] = [
    {
        slug: 'nixos-distro',
        title: 'Why I Think NixOS Is OG for Production and Development',
        date: '2025-12-08',
        excerpt:
          'In meme lang: The ultimate boss of distro fight. A deep dive into why Nix is changing the game.',
        tags: ['Nix', 'NixOS', 'Linux'],
        content: '',
    },
    {
        slug: 'cloudflared-tunnel',
        title: 'Cloudflare Tunnel: A Secure Way to Connect Your Resources to Cloudflare',
        date: '2026-01-30',
        excerpt:
          'A deep dive into how Cloudflare Tunnel works and how you can use it to secure your resources.',
        tags: ['Cloudflare', 'Tunnel', 'NixOS'],
        content: '',
    },
]