# The Recursive Grid 🎯

A Next.js implementation of an interactive 3x3 grid with recursive ripple effects and dynamic state management.

## 🎮 Live Demo

**Deployed URL:** [Will be added after Vercel deployment]

## 📋 Challenge Overview

This project implements a 3x3 interactive grid where:
- Each box starts at 0
- Clicking a box increments its value by 1
- Special rules create "ripple effects" across the grid
- Boxes can become "locked" when they reach certain values

## 🎯 Game Rules

### Click Interaction
- Click any unlocked box to increment its value by 1

### Ripple Rules
1. **Rule A (Divisible by 3):** When a box's value becomes divisible by 3, the box immediately to its RIGHT decrements by 1
   - Constraint: No effect if the box is in the last column
   
2. **Rule B (Divisible by 5):** When a box's value becomes divisible by 5, the box immediately BELOW it increments by 2
   - Constraint: No effect if the box is in the bottom row

### Locked State
- When any box reaches **15 or higher**:
  - Background turns **RED**
  - Box becomes **locked** (cannot be clicked)
  - Neighbors cannot modify its value

## 🎨 Visual Design

### Color Scheme
### Color Scheme
- **Even Numbers:** Light Gray (#e0e0e0) background, black text
- **Odd Numbers:** Navy Blue (#1a237e) background, white text
- **Locked (≥15):** Red (#ef5350) background, white text, not clickable

### Styling
- Rounded corners (4px border-radius)
- Distinct shadow (2px 2px 0px black)
- Clean, minimal background
- Responsive centered layout

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recursive-grid
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Deploy with default settings

## 🧪 Testing Edge Cases

The implementation handles all edge cases:

1. **Last Column:** Boxes in the last column (indices 2, 5, 8) don't affect boxes to the right when divisible by 3
2. **Bottom Row:** Boxes in the bottom row (indices 6, 7, 8) don't affect boxes below when divisible by 5
3. **Locked Boxes:** Once locked (value ≥ 15), boxes:
   - Cannot be clicked
   - Cannot be modified by neighbor ripple effects
   - Remain red permanently
4. **Combined Rules:** When a value is divisible by both 3 and 5 (e.g., 15), both rules apply simultaneously

## 📁 Project Structure

```
recursive-grid/
├── app/
│   ├── page.tsx          # Main grid component with all logic
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind configuration
└── next.config.ts        # Next.js configuration
```

## 🎓 Implementation Highlights

### State Management
- Uses React `useState` hook for grid state
- Each box tracks `value` and `locked` status
- Immutable state updates ensure React re-renders correctly

### Logic Implementation
```typescript
// Grid is represented as a 1D array of 9 boxes
// Index to position mapping:
// [0, 1, 2]  <- Row 0
// [3, 4, 5]  <- Row 1
// [6, 7, 8]  <- Row 2

// Calculate row: Math.floor(index / 3)
// Calculate column: index % 3
```

### Edge Case Handling
- Column check: `col < 2` ensures we don't access out-of-bounds indices
- Row check: `row < 2` ensures we don't access out-of-bounds indices
- Locked check: Prevents modification of locked boxes by ripple effects

## 🎨 Design Philosophy

This implementation goes beyond the basic requirements with:
- **Premium aesthetics:** Gradient background, smooth transitions, hover effects
- **Clear visual hierarchy:** Color-coded legend, descriptive title
- **User feedback:** Hover states, cursor changes, visual transitions
- **Responsive design:** Centered layout works on all screen sizes

## 📝 Code Quality

- **TypeScript:** Full type safety with proper interfaces
- **Clean code:** Well-commented, readable, maintainable
- **No external UI libraries:** Pure React + Tailwind as required
- **Performance:** Optimized re-renders with proper state management

## 📧 Submission

- **GitHub Repository:** [Repository URL]
- **Live Deployment:** [Vercel URL]
- **Email:** anurag@audacity.ltd

## 👨‍💻 Author

Built as part of the Audacity Frontend Challenge

## 📄 License

This project is created for the Audacity coding challenge.
