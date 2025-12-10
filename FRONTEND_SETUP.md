# GreenBallot Frontend - Installation & Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git
- A Web3 wallet (MetaMask, etc.)

### 2. Clone & Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### 3. Configure Environment

Edit `.env.local` and update these values:

```env
# For local testing with Hardhat
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c45b65d30d51218e7
NEXT_PUBLIC_NETWORK_ID=31337
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545

# For Sepolia testnet
# NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
# NEXT_PUBLIC_NETWORK_ID=11155111
# NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Full Setup with Hardhat Backend

### 1. Start Hardhat Local Network

In a terminal at project root:

```bash
# Install dependencies (if not done)
npm install

# Run local Hardhat network
npx hardhat node
```

This will:
- Start a local blockchain on `http://127.0.0.1:8545`
- Display 20 test accounts with private keys
- Show the contract address (copy this!)

### 2. Deploy Contract

In another terminal:

```bash
# Compile contract
npx hardhat compile

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Setup Frontend

```bash
cd frontend

npm install

cp .env.example .env.local
```

Update `.env.local` with the contract address from deployment.

### 4. Run Frontend

```bash
npm run dev
```

## Using the dApp

### 1. Connect Wallet (MetaMask)

1. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
2. Click "Connect Wallet"
3. Approve connection in MetaMask
4. Switch to "Hardhat" network in MetaMask

**To add Hardhat to MetaMask:**
- Network Name: Hardhat
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Symbol: ETH

### 2. Register as Voter

Fill in the voter registration form:
- **Full Name**: Enter your name
- **Nationality**: e.g., "Nigerian"
- **Age**: Must be 18+ (enter a number)
- **LGA**: e.g., "Lagos State"

Click "Register as Voter"

### 3. Vote

1. Select any candidate
2. Click "Cast Your Vote"
3. Approve transaction in MetaMask
4. Watch vote count increase in real-time!

### 4. View Results

- See live vote tallying
- View percentage distribution
- Check current leader
- Monitor participation rates

## Features Walkthrough

### Home Page (`/`)
- Hero section with call-to-action
- Feature highlights
- Project statistics
- SEO optimized

### Dashboard (`/dashboard`)
- **Wallet Connection**: Secure Web3 integration
- **Voter Registration**: KYC form
- **Voting Sessions**: Browse active elections
- **Candidate Voting**: Vote with real-time updates
- **Live Results**: Charts and analytics

### About Page (`/about`)
- Mission and vision
- Why blockchain voting
- Technology stack
- Team information

## Component Architecture

### Page Components
- `app/page.tsx` - Home/Landing
- `app/dashboard/page.tsx` - Voting interface
- `app/about/page.tsx` - Information

### UI Components
- `Button.tsx` - Reusable button
- `Header.tsx` - Navigation
- `Footer.tsx` - Footer
- `CandidateCard.tsx` - Voting card
- `SessionCard.tsx` - Session info

### Styling
- Tailwind CSS for styling
- Custom animations
- Responsive design
- Dark/Light theme support

## Common Issues & Solutions

### Issue: "Cannot find module 'next/link'"
**Solution**: Run `npm install` to install all dependencies

### Issue: "MetaMask not found"
**Solution**: Install MetaMask browser extension from [metamask.io](https://metamask.io)

### Issue: "Wrong network"
**Solution**: 
1. Add Hardhat network to MetaMask
2. Switch to Hardhat network
3. Reload page

### Issue: "Contract not deployed"
**Solution**:
1. Check `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`
2. Verify contract is deployed: `npx hardhat run scripts/deploy.js --network localhost`
3. Get correct address and update `.env.local`

### Issue: "No accounts with balance"
**Solution**: Use one of the Hardhat test accounts with MetaMask

## Development Tips

### Add New Page
```bash
mkdir src/app/newpage
touch src/app/newpage/page.tsx
```

### Customize Colors
Edit `tailwind.config.ts` theme section

### Add Animations
Add CSS in `src/app/globals.css`

### Test Contract Interaction
Use Hardhat console:
```bash
npx hardhat console --network localhost
```

## Building for Production

```bash
# Build optimized version
npm run build

# Start production server
npm start
```

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Push code to GitHub
2. Connect GitHub to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Docker
```bash
docker build -t greenballot-frontend .
docker run -p 3000:3000 greenballot-frontend
```

## Performance Optimization

- Next.js Image optimization enabled
- CSS minification
- JavaScript code splitting
- Font optimization
- Automatic caching

## Security Best Practices

1. ✅ Never commit `.env.local`
2. ✅ Always use HTTPS in production
3. ✅ Validate all user inputs
4. ✅ Use environment variables for secrets
5. ✅ Regular security audits

## Testing

### Manual Testing
1. Connect wallet
2. Register voter
3. Cast vote
4. Check results
5. Verify transactions

### Browser Testing
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

## Troubleshooting Commands

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install

# Check for errors
npm run lint

# Debug mode
DEBUG=* npm run dev

# Check port availability
lsof -i :3000
```

## Getting Help

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🎨 [Tailwind Docs](https://tailwindcss.com/docs)
- ⛓️ [Ethers.js Docs](https://docs.ethers.org)
- 🏠 [GitHub Issues](https://github.com/Lamina-A/greenballot)

## Next Steps

1. ✅ Run frontend locally
2. ✅ Connect MetaMask wallet
3. ✅ Register as voter
4. ✅ Cast a vote
5. ✅ Deploy to testnet
6. ✅ Deploy to mainnet

---

Happy Voting! 🗳️✨
