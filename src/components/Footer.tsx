import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Globe } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: MessageCircle, label: 'Discord', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
];

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border/30">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">BOP NFTs</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Hand-drawn NFTs on the XRP Ledger, spreading peace one artwork at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Collection', 'Roadmap', 'About', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-4">Join the Community</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Board of Peace. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with 💙 on the <span className="text-primary">XRP Ledger</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
