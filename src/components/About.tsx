import { motion } from 'framer-motion';
import { Palette, Shield, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Hand-Drawn Art',
    description: 'Every NFT is uniquely crafted by hand, ensuring no two pieces are alike.',
  },
  {
    icon: Shield,
    title: 'XRP Ledger',
    description: 'Built on the fast, eco-friendly, and low-cost XRP Ledger blockchain.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Join a movement dedicated to spreading peace through digital art.',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Near-zero fees and 3-5 second transaction times on XRPL.',
  },
];

export function About() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Why </span>
              <span className="gradient-text">BOP NFTs?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Board of Peace represents a fusion of art and blockchain technology. 
              Our hand-drawn NFT collection celebrates creativity, community, and 
              the power of the XRP Ledger to make digital ownership accessible to everyone.
            </p>
            <p className="text-muted-foreground mb-8">
              Each piece in our collection carries a message of peace and unity, 
              created by artists who believe in the power of art to bring people together.
            </p>

            {/* Mission statement card */}
            <div className="glass-strong rounded-2xl p-6 glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🕊️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Mission</h4>
                  <p className="text-sm text-muted-foreground">
                    To create a global community united by art, peace, and 
                    the innovative technology of the XRP Ledger.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right content - Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass rounded-2xl p-6 hover:bg-muted/30 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
