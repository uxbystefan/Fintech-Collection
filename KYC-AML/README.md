# KYC/AML Mobile Verification Flow

A mobile prototype for a Know Your Customer (KYC) and Anti-Money Laundering (AML) identity verification flow, built with SvelteKit and Bits UI.

## Overview

This prototype demonstrates **Screen 1: Welcome / Verification Intro** with 4 different UI states:

1. **Default State** - Initial welcome screen with benefits list
2. **Pressed State** - Shows step progress (Step 1 of 5, 20% Complete) and requirements
3. **Loading State** - Animated loading screen with bottom navigation
4. **Accessibility State** - Enhanced accessibility with larger text and clearer layout

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Features

- **Mobile-First Design** - Optimized for mobile devices (390x844px)
- **Dark Theme** - Modern dark UI with blue accent colors
- **State Management** - Interactive state switcher for prototyping
- **Smooth Animations** - Loading animations and transitions
- **Accessibility** - Enhanced readability and larger touch targets

## Tech Stack

- SvelteKit 5
- TypeScript
- Lucide Icons
- Bits UI
