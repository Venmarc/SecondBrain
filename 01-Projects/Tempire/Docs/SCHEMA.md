# SCHEMA.md - Database Schema & Data Architecture

> **One-line Summary**: Database schema definition for Supabase tables, relationships, indexes, storage buckets, and RLS policies.

**Last Updated:** June 25, 2026

## Purpose
This document defines the complete Supabase database schema, relationships, RLS policies, storage configuration, and data flow for **Tempire**.

**Reference Files:**
- PRD.md (Product vision and features)
- TRD.md (Tech stack, architecture decisions, coding standards)
- PAGE_SPECS.md (Page layouts and functionality)
- APP_FLOW.md (User journeys)
- PHASES.md (Implementation roadmap)
- NOTES.md (Development log and open issues)

**Update Rule:**  
Any change to schema, RLS policy, column, or relationship must be documented here with date and reasoning. Always keep this file synchronized with the actual Supabase database.

## Core Tables

### 1. `profiles` (Extension of Clerk users)
```sql
create table profiles (
  id text primary key,                                 -- Holds Clerk user ID (e.g. 'user_...')
  clerk_id text unique not null,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  is_seller boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### 2. `products` (Main digital products table)
```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price integer not null check (price >= 0),           -- stored in cents
  category text not null,                              -- e.g., "AI Prompts", "Notion Templates"
  tags text[],                                         -- array for easier filtering
  file_url text,                                       -- Supabase Storage path
  thumbnail_url text,
  creator_id text references profiles(id) not null,
  is_active boolean default true,
  sales_count integer default 0,
  average_rating numeric(3,2) default 0,
  metadata jsonb,                                      -- flexible extra data (file size, format, etc.)
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### 3. `orders` (Purchases / Transactions)
```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id text references profiles(id) not null,
  product_id uuid references products(id) not null,
  amount integer not null,                             -- in cents
  status text default 'completed' check (status in ('pending', 'completed', 'refunded')),
  download_access_granted boolean default true,
  created_at timestamp with time zone default now()
);
```

### 4. `cart_items` (Optional - for persistent cart)
```sql
create table cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id text references profiles(id) not null,
  product_id uuid references products(id) not null,
  created_at timestamp with time zone default now(),
  unique(user_id, product_id)
);
```

## Row Level Security (RLS) Policies

**Enable RLS on all tables.**

**Key Policies:**
- **profiles**: Users can only read/update their own profile.
- **products**:
  - Anyone can read active products.
  - Only the creator can update/delete their products.
- **orders**:
  - Buyers can only see their own orders.
  - Creators can see orders for their products.
- **cart_items**: Only the owner can manage their cart.

## Supabase Storage

**Buckets:**
1. `product-assets` (Private)
   - Files uploaded by creators (Notion templates, Figma files, prompt packs, etc.)
   - Access via signed URLs (generated server-side after purchase verification)

**RLS / Security Rule:**
- Only authenticated users can upload.
- Download access granted only to buyers (via signed URL from Server Action).

## Indexes & Performance

- Index on `products(category, is_active)`
- Index on `products(creator_id)`
- Index on `orders(buyer_id, product_id)`
- Index on `orders(created_at)`

## Realtime Subscriptions Strategy
- Use `postgres_changes` on `products` table (for live price/stock updates if added later).
- Private channels for seller-specific updates.

## Relationships Summary
- One Creator (`profiles`) → Many Products
- One Buyer (`profiles`) → Many Orders
- One Product → Many Orders
- One User → Many Cart Items