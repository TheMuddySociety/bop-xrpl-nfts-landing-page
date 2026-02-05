import { motion } from 'framer-motion';
import { Check, Clock, Rocket } from 'lucide-react';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Genesis Launch',
    status: 'completed',
    items: ['Initial collection of 1,000 NFTs', 'Community building', 'Discord & Twitter launch'],
  },
  {
    phase: 'Phase 2',
    title: 'Community Growth',
    status: 'in-progress',
    items: ['Holder rewards program', 'Collaborations with artists', 'Exclusive airdrops'],
  },
  {
    phase: 'Phase 3',
    title: 'Expansion',
    status: 'upcoming',
    items: ['Second collection drop', 'Merchandise store', 'IRL peace events'],
  },
  {
    phase: 'Phase 4',
    title: 'Beyond',
    status: 'upcoming',
    items: ['DAO governance', 'Metaverse integration', 'Global peace initiatives'],
  },
];

const statusConfig = {
  completed: { icon: Check, color: 'text-secondary bg-secondary/20' },
  'in-progress': { icon: Clock, color: 'text-accent bg-accent/20' },
  upcoming: { icon: Rocket, color: 'text-muted-foreground bg-muted/50' },
};

export function Roadmap() {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">The </span>
            <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our journey to spread peace through the power of XRP and art.
          </p>
        </motion.div>

        {/* Roadmap timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden lg:block" />

          <div className="space-y-12">
            {phases.map((phase, index) => {
              const StatusIcon = statusConfig[phase.status as keyof typeof statusConfig].icon;
              const statusColor = statusConfig[phase.status as keyof typeof statusConfig].color;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={phase.phase}
                  className={`relative grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:direction-rtl'}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-primary hidden lg:block" />

                  {/* Content card */}
                  <div className={`${isEven ? 'lg:pr-16' : 'lg:pl-16 lg:col-start-2'}`}>
                    <div className="glass-strong rounded-2xl p-6 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl ${statusColor} flex items-center justify-center`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{phase.phase}</div>
                          <h3 className="font-semibold text-foreground">{phase.title}</h3>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  {isEven && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
