# Component Documentation

## Core Components

### AnimatedBackground

Renders an animated background grid with floating particles.

**Props:** None

**Features:**
- Canvas-based animation
- 40px grid system
- 50 floating particles with glow effects
- Auto-resizes on window resize
- Runs at 60fps

**Usage:**
```svelte
<AnimatedBackground />
```

---

### FloatingPanel

Reusable panel component with parallax effect and hover states.

**Props:**
- `title: string` - Panel heading
- `delay: number` (default: 0) - Animation delay in ms
- `parallaxIntensity: number` (default: 0.02) - Mouse tracking sensitivity

**Features:**
- Subtle parallax on mouse movement
- Hover glow effect
- Fade-in animation
- Accessible focus states

**Usage:**
```svelte
<FloatingPanel title="Market Data" delay={400}>
  <YourContent />
</FloatingPanel>
```

---

### CommandConsole

AI command input with autocomplete suggestions.

**Props:** None

**Events:**
- `command` - Dispatched when user submits a command
  - `detail: { command: string }`

**Features:**
- Real-time suggestion filtering
- Keyboard navigation
- Processing state indicator
- Accessible ARIA implementation

**Usage:**
```svelte
<CommandConsole />

<script>
  onMount(() => {
    window.addEventListener('command', (e) => {
      console.log('Command:', e.detail.command);
    });
  });
</script>
```

---

### CentralVisualization

Animated SVG visualization of financial data flow.

**Props:** None

**Features:**
- Radial data point layout
- Animated connection lines
- Pulsing central node
- Rotating orbital rings
- Particle flow animation

**Usage:**
```svelte
<CentralVisualization />
```

---

### MetricCard

Displays a financial metric with trend indicator.

**Props:**
- `value: number` - The metric value
- `change: number` - Percentage change
- `prefix?: string` - Value prefix (e.g., "$")
- `suffix?: string` - Value suffix (e.g., "/mo")

**Features:**
- Animated trend line
- Color-coded change indicator
- Localized number formatting

**Usage:**
```svelte
<MetricCard value={247850} change={12.4} prefix="$" />
```

---

### MarketSentiment

Shows market sentiment breakdown with progress bars.

**Props:** None (uses internal data)

**Features:**
- Animated progress bars
- Color-coded sentiment categories
- Smooth transitions

**Usage:**
```svelte
<MarketSentiment />
```

---

### CryptoHeatmap

Grid display of cryptocurrency performance.

**Props:** None (uses internal data)

**Features:**
- Color intensity based on change
- Hover scale effect
- Responsive grid layout

**Usage:**
```svelte
<CryptoHeatmap />
```

---

## Chart Components

### PortfolioAreaChart

Large area chart showing portfolio value over time with gradient fill.

**Props:** None (uses generated data)

**Features:**
- 90-day portfolio history
- Gradient area fill
- Interactive tooltip with date and value
- Percentage change display
- Crosshair on hover

**Usage:**
```svelte
<PortfolioAreaChart />
```

---

### BarChart

Revenue breakdown by category with interactive bars.

**Props:** None (uses internal data)

**Features:**
- Animated bar entrance
- Color-coded bars with neon accent
- Hover effects
- Tooltip with value and change percentage

**Usage:**
```svelte
<BarChart />
```

---

### LineChart

Multi-series line chart for comparing crypto assets.

**Props:** None (uses generated data)

**Features:**
- Multiple data series
- Color-coded lines
- Interactive legend
- Smooth line rendering

**Usage:**
```svelte
<LineChart />
```

---

### DonutChart

Asset allocation donut chart with interactive segments.

**Props:** None (uses internal data)

**Features:**
- Animated segment appearance
- Center label with total value
- Interactive legend
- Hover effects on segments

**Usage:**
```svelte
<DonutChart />
```

---

### Sparkline

Compact line chart for showing trends in small spaces.

**Props:**
- `data?: Array` - Data points (auto-generated if not provided)
- `color?: string` (default: '#00FFA3') - Line color
- `showGradient?: boolean` (default: true) - Enable gradient fill

**Features:**
- Minimal design
- Gradient fill option
- Smooth animations
- Compact 60px height

**Usage:**
```svelte
<Sparkline color="#00FFA3" showGradient={true} />
```

---

## Utilities

### Motion Utils

Helper functions for animation and motion.

```typescript
import { 
  getAnimationDuration, 
  staggerDelay, 
  prefersReducedMotion 
} from '$lib/utils/motion';

// Check reduced motion preference
if (prefersReducedMotion()) {
  // Skip or simplify animation
}

// Get duration respecting user preferences
const duration = getAnimationDuration('normal');

// Calculate stagger delay
const delay = staggerDelay(index, 100);
```

---

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  background: '#0B0F14',
  card: '#11161D',
  // ... customize colors
}
```

### Animation Timing

Edit `src/lib/utils/motion.ts`:

```typescript
export const motionDurations = {
  micro: '150ms',
  normal: '250ms',
  large: '400ms'
};
```

### Panel Content

Create custom panel content components:

```svelte
<!-- CustomPanel.svelte -->
<script>
  // Your data and logic
</script>

<div class="custom-panel">
  <!-- Your content -->
</div>
```

Use in main page:

```svelte
<FloatingPanel title="Custom Data" delay={500}>
  <CustomPanel />
</FloatingPanel>
```
