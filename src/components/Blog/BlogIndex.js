import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from './BlogLayout';
import { POSTS } from './posts';

export default function BlogIndex() {
  useBlogSEO({
    title: 'Travel Blog — USA Road Trips, Itineraries, Maps & Bucket Lists | StampYourMap',
    description:
      'Data-rich USA travel guides, road-trip itineraries, bucket-list maps and interactive travel stats from StampYourMap. New long-form guides every week.',
    url: '/blog',
    image: '/felix-rostig-UmV2wr-Vbq8-unsplash.jpg',
    datePublished: '2026-04-21',
    keywords:
      'usa travel blog, usa road trip blog, travel itineraries, bucket list usa, ' +
      'route 66, american road trip guide, travel map blog, stampyourmap blog',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <header className="blog-index-hero">
        <span style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#6366f1',
        }}>
          StampYourMap Journal
        </span>
        <h1>Travel Guides, Built on Real Data.</h1>
        <p>
          Long-form USA travel stories, road-trip itineraries and interactive
          maps — written for travelers who want more than a top-10 list.
        </p>
      </header>

      <section className="blog-index-grid">
        {POSTS.map(p => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="blog-card blog-reveal"
          >
            <span className="cat">{p.category}</span>
            <h3>{p.heroEmoji} {p.title}</h3>
            <p>{p.description}</p>
            <div className="meta">
              {new Date(p.datePublished).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}{p.readMinutes} min read
            </div>
          </Link>
        ))}
      </section>
    </BlogShell>
  );
}
