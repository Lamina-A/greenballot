# GreenBallot dApp - Frontend

A modern, fully-functional Web3 voting dApp built with Next.js, React, and Tailwind CSS.

## Features

### 🎨 Beautiful User Interface
- Modern, responsive design that works on all devices
- Smooth animations and transitions
- Intuitive navigation
- Dark/Light mode ready

### 🔐 Security & Access Control
- Wallet connection with MetaMask/RainbowKit
- KYC voter registration
- Vote verification
- Secure transaction handling

### 🗳️ Voting Features
- Real-time candidate voting
- Live vote tallying
- Voting session management
- Results visualization with charts
- Participation tracking

### 📊 Analytics & Insights
- Real-time voting statistics
- Candidate ranking
- Participation rates
- Vote distribution charts
- Session analytics

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm or yarn
- MetaMask or similar Web3 wallet

### Installation

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Create environment variables:**
```bash
cp .env.example .env.local
```

4. **Configure environment variables:**
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NETWORK_ID=1
NEXT_PUBLIC_RPC_URL=https://...
```

### Running the Application

**Development mode:**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Production build:**
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page with hero and features
│   │   ├── dashboard/         # Main voting dashboard
│   │   ├── about/             # About page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── providers.tsx      # App providers
│   ├── components/
│   │   ├── Button.tsx         # Reusable button component
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Footer component
│   │   ├── CandidateCard.tsx  # Candidate voting card
│   │   └── SessionCard.tsx    # Voting session card
│   └── hooks/
│       └── useContract.ts     # Smart contract interaction hook
├── public/                    # Static assets
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── next.config.js            # Next.js configuration
└── README.md                 # This file
```

## Key Components

### Button Component
Reusable button with multiple variants and sizes.

```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### CandidateCard Component
Displays candidate information and voting interface.

```tsx
<CandidateCard
  id={1}
  name="Alice Johnson"
  party="Democratic Party"
  platform="Education Reform"
  votes={1245}
  onVote={handleVote}
  isVoting={false}
  isDisabled={false}
/>
```

### SessionCard Component
Shows voting session details and participation stats.

```tsx
<SessionCard
  id={1}
  name="Presidential Election 2025"
  startTime={1234567890}
  endTime={1234654290}
  isActive={true}
  totalVotes={2886}
  totalVoters={5000}
  onClick={() => selectSession(1)}
/>
```

## Styling

The application uses Tailwind CSS for styling with custom colors and animations.

### Custom Color Scheme
- **Primary**: `#10b981` (Emerald Green)
- **Secondary**: `#059669` (Darker Green)
- **Accent**: `#34d399` (Light Green)
- **Dark**: `#1f2937` (Dark Gray)
- **Light**: `#f9fafb` (Off White)

### Custom Animations
- `fadeIn`: Fade in effect
- `slideIn`: Slide from left
- `pulse-glow`: Glowing pulse effect

## Usage Guide

### 1. Connect Wallet
Click "Connect Wallet" button to connect your Web3 wallet (MetaMask, WalletConnect, etc.)

### 2. Register as Voter
Fill in voter information:
- Full Name
- Nationality
- Age (minimum 18)
- Local Government Area

### 3. View Sessions
Browse available voting sessions and see live statistics

### 4. Vote
Select a candidate and cast your vote. Each wallet can vote once.

### 5. View Results
See real-time results and participate in the democratic process!

## API Integration

### Smart Contract Interaction
The dApp integrates with the GreenBallot smart contract for:
- Voter registration
- Candidate information
- Vote casting
- Results retrieval
- Session management

### Contract Methods Used
- `registerVoter()` - Register as eligible voter
- `castVote()` - Cast vote for candidate
- `getCandidateInfo()` - Get candidate details
- `getVotingSessionInfo()` - Get session information
- `getSessionResults()` - Get voting results

## Performance Optimization

- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ CSS-in-JS for minimal bundle size
- ✅ Responsive design for all devices
- ✅ SEO optimization with Next.js Metadata

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Web3 Wallet Support

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- Ledger Live
- Trezor

## Security Features

- ✅ Private key never exposed
- ✅ Smart contract audited
- ✅ Secure transaction signing
- ✅ Gas optimization
- ✅ Input validation
- ✅ XSS protection

## Troubleshooting

### Wallet Connection Issues
1. Ensure MetaMask is installed and enabled
2. Check that you're on the correct network
3. Clear browser cache and cookies
4. Try connecting again

### Voting Errors
1. Verify you're registered as a voter
2. Check that voting session is active
3. Ensure you have sufficient balance for gas fees
4. Try refreshing the page

### Display Issues
1. Check that JavaScript is enabled
2. Clear browser cache
3. Try a different browser
4. Check network connection

## Development

### Adding New Features

1. **Create component:**
```bash
touch src/components/NewComponent.tsx
```

2. **Add to layout:**
```tsx
import { NewComponent } from '@/components/NewComponent'
```

3. **Build and test:**
```bash
npm run dev
```

### Modifying Styles

Edit `tailwind.config.ts` to customize colors, fonts, and spacing.

### Testing

```bash
npm run test
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run build
# Deploy ./out directory
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=         # GreenBallot contract address
NEXT_PUBLIC_NETWORK_ID=               # Network ID (1 for mainnet)
NEXT_PUBLIC_RPC_URL=                  # RPC endpoint
NEXT_PUBLIC_ALCHEMY_API_KEY=          # Alchemy API key (optional)
```

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

## Support

For issues and questions:
- GitHub Issues: [greenballot/issues](https://github.com/Lamina-A/greenballot/issues)
- Discord: [Join Community](https://discord.gg/greenballot)
- Email: support@greenballot.com

## Roadmap

- [ ] Multi-chain support
- [ ] DAO governance integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Offline voting mode
- [ ] Accessibility improvements
- [ ] Internationalization (i18n)

---

Built with ❤️ for democracy
