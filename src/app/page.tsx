"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-muted-light">
                  Trusted by adventurers worldwide
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
              >
                Stay Connected.
                <br />
                <span className="gradient-text">Go Anywhere.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-light max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                The world&apos;s first MagSafe-compatible LoRa mesh device.
                Off-grid communication that attaches to your phone and goes
                wherever you go.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://www.etsy.com/shop/offgriddevices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-accent text-background font-semibold rounded-full hover:bg-accent-light transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  Order Now
                </a>
                <a
                  href="#features"
                  className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-semibold text-foreground hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                >
                  Learn More
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex items-center gap-6 justify-center lg:justify-start"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-surface-elevated border-2 border-background flex items-center justify-center text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted">Loved by 50+ customers</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              style={{ y: heroImageY, opacity: heroOpacity }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />

                {/* Main product image */}
                <div className="relative animate-float">
                  <Image
                    src="https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg"
                    alt="OffGrid MagSafe LoRa Device"
                    width={600}
                    height={800}
                    className="relative z-10 rounded-3xl shadow-2xl shadow-black/50"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Never Forget It.
              <br />
              <span className="text-muted">Always Connected.</span>
            </h2>
            <p className="text-lg text-muted-light max-w-2xl mx-auto">
              Designed to solve a real problem: keeping your mesh device with
              you, always. No more leaving it at home.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-3xl glass hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transparent Design.
              <br />
              <span className="text-muted">Nothing to Hide.</span>
            </h2>
            <p className="text-lg text-muted-light max-w-2xl mx-auto">
              See the technology that keeps you connected. Our transparent back
              showcases the craftsmanship inside.
            </p>
          </motion.div>

          {/* Gallery grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="https://i.etsystatic.com/61623051/r/il/dac7cb/7509660894/il_fullxfull.7509660894_1nka.jpg"
                  alt="OffGrid device outdoor use"
                  width={800}
                  height={1000}
                  className="w-full h-auto image-hover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-display font-semibold">Built for Adventure</p>
                <p className="text-sm text-muted-light">
                  Take it anywhere—trails, mountains, or urban exploration.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="https://i.etsystatic.com/61623051/r/il/d606f2/7553086919/il_fullxfull.7553086919_pb5k.jpg"
                  alt="OffGrid device detail view"
                  width={800}
                  height={1000}
                  className="w-full h-auto image-hover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-display font-semibold">Transparent Beauty</p>
                <p className="text-sm text-muted-light">
                  See the RAK board, battery, and antenna that power your
                  connection.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Engineered for
                <br />
                <span className="text-accent">Off-Grid Excellence</span>
              </h2>
              <p className="text-lg text-muted-light mb-12">
                Every component chosen for reliability, range, and real-world
                performance. Compatible with Meshtastic and MeshCore firmware.
              </p>

              <div className="space-y-6">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl glass"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-accent font-mono text-sm font-bold">
                        {spec.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted">{spec.label}</p>
                      <p className="font-display font-semibold">{spec.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full" />
              <Image
                src="https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg"
                alt="OffGrid device specifications"
                width={600}
                height={800}
                className="relative rounded-3xl shadow-2xl shadow-black/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-12 md:p-16 rounded-[2.5rem] glass-strong relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />

            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Go Off-Grid?
              </h2>
              <p className="text-lg text-muted-light mb-10 max-w-xl mx-auto">
                Join the growing community of adventurers, preppers, and
                tech enthusiasts who never lose connection.
              </p>
              <a
                href="https://www.etsy.com/shop/offgriddevices"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#F1641E] text-white font-semibold text-lg rounded-full hover:bg-[#D9571A] transition-all duration-300 hover:shadow-xl hover:shadow-[#F1641E]/30 hover:-translate-y-1"
              >
                Shop on Etsy
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Data
const features = [
  {
    icon: "🧲",
    title: "MagSafe Compatible",
    description:
      "Attaches securely to any MagSafe-compatible phone or case. Your mesh device goes where your phone goes—no more forgetting it at home.",
  },
  {
    icon: "📡",
    title: "Long-Range LoRa",
    description:
      "Communicate miles away without cell service. LoRa technology provides reliable, long-range communication in any environment.",
  },
  {
    icon: "🔋",
    title: "All-Day Battery",
    description:
      "Built-in rechargeable battery keeps you connected throughout your adventures. Charge via USB-C when you're back at base.",
  },
  {
    icon: "👁️",
    title: "Transparent Design",
    description:
      "See the tech inside through our frosted transparent back. The RAK board, battery, and antenna—all visible, all beautiful.",
  },
  {
    icon: "⚙️",
    title: "Dual Firmware Support",
    description:
      "Run Meshtastic or MeshCore firmware. Choose the platform that fits your needs—or switch between them.",
  },
  {
    icon: "🌐",
    title: "Mesh Networking",
    description:
      "Connect with others on the network. Messages hop between devices, extending range and creating resilient communication.",
  },
];

const specs = [
  { icon: "RAK", label: "Core Module", value: "RAK WisBlock System" },
  { icon: "BT", label: "Connectivity", value: "Bluetooth 5.0 + LoRa" },
  { icon: "mAh", label: "Battery", value: "Rechargeable Li-Po" },
  { icon: "km", label: "Range", value: "Up to 10+ km line of sight" },
  { icon: "USB", label: "Charging", value: "USB-C Fast Charging" },
  { icon: "3D", label: "Enclosure", value: "Custom 3D Printed + MagSafe" },
];
