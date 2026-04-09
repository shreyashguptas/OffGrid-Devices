"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Link1Product() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Product Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--app-grid-line) 1px, transparent 1px),
                              linear-gradient(90deg, var(--app-grid-line) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-muted-light">Link 1</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
              >
                Stay Connected.
                <br />
                <span className="gradient-text">Go Anywhere.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-light max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                The world&apos;s first MagSafe-compatible LoRa mesh device.
                Off-grid communication that attaches to your phone and goes
                wherever you go.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link1CheckoutButton
                  defaultLabel="Buy Now"
                  loadingLabel="Opening Checkout..."
                  className="px-8 py-4 bg-accent text-on-accent font-semibold rounded-full hover:bg-accent-light transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                />
                <a
                  href="#features"
                  className="px-8 py-4 bg-fill-muted border border-border-emphasis rounded-full font-semibold text-foreground hover:bg-fill-hover hover:border-border-emphasis-hover transition-all duration-300"
                >
                  View Features
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: heroImageY, opacity: heroOpacity }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative"
              >
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
                <div className="relative animate-float">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037"
                    alt="OffGrid Link 1 Device"
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
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariant}
                className="group p-8 rounded-3xl glass hover:bg-fill-glass-elevated transition-all duration-300"
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
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInLeft} className="relative group">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009"
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

            <motion.div variants={fadeInRight} className="relative group">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042"
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
          </motion.div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
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

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="space-y-4"
              >
                {specs.map((spec) => (
                  <motion.div
                    key={spec.label}
                    variants={cardVariant}
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
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full" />
              <Image
                src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037"
                alt="OffGrid Link 1 specifications"
                width={600}
                height={800}
                className="relative rounded-3xl shadow-2xl shadow-black/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Don&apos;t Take Our Word.
              <br />
              <span className="text-muted">Take Theirs.</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex items-center gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg text-muted-light font-medium">
                5.0 from 28+ customers
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={cardVariant}
                className="p-6 rounded-2xl glass hover:bg-fill-glass-elevated transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-1 text-accent mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
                {testimonial.image && (
                  <div className="w-full h-48 rounded-xl overflow-hidden border border-border-subtle mb-4">
                    <Image
                      src={testimonial.image}
                      alt={`Review photo from ${testimonial.name}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                  <div>
                    <p className="font-display font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {testimonial.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Verified Buyer
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="p-12 md:p-16 rounded-[2.5rem] glass-strong relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Go Off-Grid?
              </h2>
              <p className="text-lg text-muted-light mb-10 max-w-xl mx-auto">
                Join the growing community of adventurers, preppers, and tech
                enthusiasts who never lose connection.
              </p>
              <Link1CheckoutButton
                defaultLabel="Buy Now"
                loadingLabel="Opening Checkout..."
                showArrow
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#F1641E] text-white font-semibold text-lg rounded-full hover:bg-[#D9571A] transition-all duration-300 hover:shadow-xl hover:shadow-[#F1641E]/30 hover:-translate-y-1"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

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

const testimonials = [
  {
    name: "Ryan",
    date: "February 2026",
    review:
      "Feels great in the hand.. strong attachment to the phone and would recommend.",
    image: "/reviews/ryan-review.webp",
  },
  {
    name: "Brazen",
    date: "March 2026",
    review:
      "This is my first step into Mesh networks, and this thing is perfect! The MagSafe works better than I'd hoped with the case on my Android, very sturdy and secure feel. The quality of the 3D print seems wonderful out of the box. Very responsive seller and very helpful.",
    image: null,
  },
  {
    name: "Christopher",
    date: "February 2026",
    review:
      "Great product, even included a personal handwritten note.",
    image: "/reviews/christopher-review.webp",
  },
  {
    name: "John",
    date: "March 2026",
    review:
      "Product works great as a drop-in case/battery solution for a node you've already purchased. Seller really cares about customer satisfaction and is very responsive. Magnets attach strong to my dbrand phone case. The 2000mAh battery lasts almost 2 weeks.",
    image: null,
  },
  {
    name: "Bob",
    date: "March 2026",
    review:
      "Nicely made product with a strong magnet. Would recommend or buy again. It should hold up better to a drop than those power bank versions from other companies especially with it being lightweight.",
    image: null,
  },
  {
    name: "Jesus",
    date: "January 2026",
    review:
      "Package arrived on time and in great condition. Shreyash is awesome, thank you.",
    image: null,
  },
];
