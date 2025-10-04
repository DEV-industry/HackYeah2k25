# Design Guidelines: Retirement Pension Simulator

## Design Approach
**System-Based Approach: Material UI**
This is a data-rich, utility-focused financial tool requiring clarity, trust, and efficient information processing. Material UI provides the necessary structure for forms, data visualization, and interactive elements while maintaining professional credibility.

## Core Design Principles
- **Educational First**: Every element teaches users about pension realities
- **Data Transparency**: Clear comparisons between expectations and reality
- **Interactive Learning**: Hover states reveal detailed information
- **Contained Experience**: All functionality within 100vh hero section

## Color Palette (Exact RGB Values)
- **Primary Orange**: 255 179 79 (Call-to-action, highlights)
- **Success Green**: 0 153 63 (Positive indicators, achievement markers)
- **Neutral Gray-Blue**: 190 195 206 (Background sections, dividers)
- **Interactive Blue**: 63 132 210 (Hover states, interactive elements)
- **Deep Navy**: 0 65 110 (Primary text, headers)
- **Alert Red**: 240 94 94 (Warning indicators, low pension alerts)
- **Black**: 0 0 0 (Body text, data labels)

## Typography
- **Headings**: Roboto Bold, 32px-24px (main question), 20px-16px (subsections)
- **Data Labels**: Roboto Medium, 14px-16px
- **Body Text**: Roboto Regular, 14px
- **Chart Values**: Roboto Medium, 12px-14px
- Polish language throughout

## Layout System (100vh Constraint)
**Single Hero Section Structure:**
- **Top Section (40vh)**: User input form + context display
  - Left: "Jaką chciałbyś mieć emeryturę?" input field (large, prominent)
  - Right: Current average pension comparison display
- **Middle Section (50vh)**: Interactive pension distribution chart
  - Dominant visual element showing pension groups
  - Hover tooltips with group characteristics
- **Bottom Section (10vh)**: Random pension fact banner

**Spacing**: Compact but breathable - use 16px, 24px, 32px consistently

## Component Specifications

### Input Section
- Large TextField with clear złoty (zł) formatting
- Material UI outlined variant with Primary Orange focus state
- Placeholder: "np. 4000 zł miesięcznie"
- Helper text comparing to current average in Gray-Blue

### Comparison Display
- Card component with subtle Gray-Blue background
- Split layout: "Twoja oczekiwana emerytura" vs "Średnia emerytura"
- Large number displays in Deep Navy
- Percentage difference indicator (Green for realistic, Red for unrealistic)

### Interactive Chart
- Bar chart or grouped column chart showing pension distribution
- Bars colored using the palette (gradient from Red for lowest to Green for highest)
- Hover interaction reveals:
  - Group name overlay
  - Characteristic description in tooltip (white background, black text)
  - Example: "Emerytury poniżej minimalnej: świadczeniobiorcy otrzymujący emeryturę w wysokości poniżej minimalnej wykazywali się niską aktywnością zawodową..."

### Random Fact Banner
- Full-width banner in Interactive Blue background
- Icon + text layout
- Rotating facts: "Czy wiesz, że najwyższą emeryturę w Polsce otrzymuje mieszkaniec województwa śląskiego..."
- Auto-refresh every 5 seconds or manual refresh button

## Visual Hierarchy
1. **Primary Focus**: User input field (largest, Primary Orange accents)
2. **Secondary Focus**: Interactive chart (50% of viewport height)
3. **Supporting Elements**: Comparison cards, fact banner

## Interaction Patterns
- **Hover States**: Chart bars expand slightly, show detailed tooltip
- **Input Feedback**: Real-time comparison updates as user types
- **Loading States**: Skeleton loaders during data fetch
- **Smooth Transitions**: 200ms ease-in-out for all state changes

## Data Visualization Style
- Clean, Material Design-aligned chart styling
- Grid lines in Gray-Blue at 20% opacity
- Data labels in Deep Navy
- No chart title (context provided by surrounding layout)
- Responsive bar widths based on data range

## Accessibility
- High contrast text (Deep Navy on white, white on Interactive Blue)
- Clear focus indicators using Primary Orange outline
- Tooltips appear on both hover and keyboard focus
- Minimum touch target size: 44x44px

## No Images Required
This is a data-driven interface. No hero images or decorative imagery needed. Visual interest comes from:
- Color-coded data visualization
- Dynamic comparison displays
- Interactive hover states
- Rotating educational facts

## Polish Language Specifics
- All labels, tooltips, and content in Polish
- Currency formatting: "4 000 zł" (space as thousands separator)
- Formal tone for educational content
- Casual tone for interesting facts ("Czy wiesz, że...")