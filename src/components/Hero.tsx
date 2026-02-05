import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import nftVideo from '@/assets/bop-nft-video.mp4';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Radial glow behind content */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(200 100% 50% / 0.3), transparent 60%)',
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Hand-Drawn XRP NFTs
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-foreground">Board of</span>
              <span className="gradient-text text-glow">Peace</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Unique hand-drawn NFTs on the XRP Ledger. Join the movement for 
              peace and own a piece of digital art history.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="glow-primary text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div>
                <div className="text-3xl font-bold text-foreground">1,000+</div>
                <div className="text-sm text-muted-foreground">Unique NFTs</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-muted-foreground">Holders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">50K+</div>
                <div className="text-sm text-muted-foreground">XRP Volume</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Video showcase */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 -m-4 rounded-3xl animated-border opacity-60" />
            
            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden glass-strong nft-card-hover">
              <div className="aspect-square">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={nftVideo} type="video/mp4" />
                </video>
              </div>
              
              {/* Video overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* NFT info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">BOP Genesis #001</h3>
                    <p className="text-sm text-muted-foreground">Featured Drop</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Current Price</div>
                    <div className="text-lg font-bold text-accent">250 XRP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div 
              className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-sm glow-accent"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🔥 Hot Drop
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
