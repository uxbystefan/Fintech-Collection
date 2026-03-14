# Charts Page - Implementation Guide

## Overview

The Analytics Dashboard (`/charts`) features interactive financial charts built with LayerChart, maintaining the futuristic design aesthetic of the main hero page.

## Page Structure

### Header Section
- Page title and description
- "Back to Home" navigation button
- Animated entrance on load

### Quick Stats Cards (3)
- Revenue with sparkline
- Users with sparkline  
- Trading volume with sparkline
- Color-coded change indicators
- Staggered animation entrance

### Charts Grid
Responsive grid layout with 5 major charts:

1. **Portfolio Performance** (Full Width)
   - Area chart with gradient fill
   - 90-day historical data
   - Interactive crosshair tooltip
   - Percentage change display

2. **Revenue by Category** (Half Width)
   - Horizontal bar chart
   - 5 revenue categories
   - Animated bars on load
   - Hover tooltips with details

3. **Asset Allocation** (Half Width)
   - Donut chart
   - 5 asset categories
   - Interactive legend
   - Percentage breakdown

4. **Crypto Market Trends** (Full Width)
   - Multi-series line chart
   - 3 crypto assets (BTC, ETH, SOL)
   - Color-coded lines
   - Time-based x-axis

## Chart Components

### Shared Features
- Consistent color scheme (neon green accents)
- Dark theme (#0B0F14 background)
- Smooth animations
- Interactive tooltips
- Accessibility support
- Responsive design

### Data Flow
All charts use generated sample data that simulates realistic financial metrics. In production, replace with your API endpoints.

## Floating Panel Integration

All charts are wrapped in `<FloatingPanel>` components:
- Parallax mouse tracking
- Hover glow effects
- Staggered entrance animations
- Consistent spacing and padding

## Responsive Behavior

### Desktop (>1200px)
- 2-column grid for half-width charts
- Full-width for large charts
- 3-column quick stats

### Tablet/Mobile (<1200px)
- Single column layout
- Stacked quick stats
- Full-width charts
- Optimized font sizes

## Navigation

### Home → Charts
- "View Analytics" CTA button on hero page
- Neon green gradient background
- Icon + text label

### Charts → Home
- "Back to Home" button in header
- Accessible keyboard navigation
- Focus states

## Performance

### Optimizations
- Canvas rendering for complex charts
- CSS animations over JavaScript
- Lazy-loaded chart data
- Minimal re-renders
- Efficient SVG paths

### Load Sequence
1. Background fades in (0ms)
2. Header appears (100ms)
3. Quick stats cards slide in (staggered)
4. Charts float in from bottom (200-500ms)

## Customization

### Adding New Charts

```svelte
<!-- In /charts/+page.svelte -->
<div class="chart-section">
  <FloatingPanel title="Your Chart Title" delay={600}>
    <YourChartComponent />
  </FloatingPanel>
</div>
```

### Modifying Data

Edit the component files in `src/lib/components/charts/`:
- `PortfolioAreaChart.svelte` - Update `generatePortfolioData()`
- `BarChart.svelte` - Update `data` array
- `LineChart.svelte` - Update `generateMultiSeries()`
- `DonutChart.svelte` - Update `data` array

### Connecting to API

Replace generated data with API calls:

```typescript
onMount(async () => {
  const response = await fetch('/api/portfolio');
  const data = await response.json();
  // Update chart data
});
```

## Styling

### Global Chart Styles
Location: `src/lib/styles/charts.css`

Includes:
- Axis formatting
- Grid line styling
- Tooltip containers
- Interactive states
- Focus indicators

### Color Palette
- Primary: #00FFA3 (neon green)
- Secondary: #00D98C
- Background: #0B0F14
- Card: #11161D
- Border: #1F2630
- Text: #E6EDF3

## Accessibility

### Implemented
✅ Keyboard navigation
✅ Focus indicators
✅ ARIA labels on charts
✅ Color contrast compliance
✅ Screen reader support
✅ Reduced motion support

### Chart Accessibility
- Tooltips keyboard-accessible
- Alternative data tables (future enhancement)
- Descriptive labels
- Logical tab order

## Browser Support

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Future Enhancements

### Potential Features
- [ ] Real-time data updates via WebSocket
- [ ] Chart export (PNG/SVG)
- [ ] Date range selector
- [ ] Comparison mode
- [ ] Custom chart builder
- [ ] Print-friendly view
- [ ] Data drill-down
- [ ] Annotation tools

### Performance Improvements
- [ ] Virtual scrolling for large datasets
- [ ] Web Workers for calculations
- [ ] Progressive data loading
- [ ] Chart caching

## Troubleshooting

### Charts not rendering
1. Check console for LayerChart import errors
2. Verify D3 dependencies installed
3. Check data format matches expected structure

### Tooltips not showing
1. Ensure tooltip mode is set correctly
2. Check z-index conflicts
3. Verify pointer events not disabled

### Performance issues
1. Reduce particle count in background
2. Limit data points in charts
3. Disable parallax on lower-end devices
4. Check for memory leaks in animations
