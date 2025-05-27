import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { UploadCloud, Zap, ShieldCheck, Users, MessageSquare } from 'lucide-react';

    const LandingPage = () => {
      const features = [
        {
          icon: <UploadCloud className="h-10 w-10 text-brand-blue" />,
          title: 'Effortless Image Uploads',
          description: 'Simply drag and drop your image or click to select. We support popular formats like JPG, PNG, GIF, and WEBP.',
        },
        {
          icon: <Zap className="h-10 w-10 text-brand-orange" />,
          title: 'Instant & Unique Short URLs',
          description: 'Receive a unique, concise, and easy-to-share short URL for your image the moment it\'s uploaded.',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-green-500" />,
          title: 'Secure & Reliable Sharing',
          description: 'Your images are stored securely. Share with confidence knowing your data is protected.',
        },
      ];

      const testimonials = [
        {
          quote: "HACKERPRO'S IMG URL GENERATOR is a game-changer for sharing visuals quickly. The short URLs are incredibly convenient!",
          name: "Alex P.",
          role: "Freelance Designer",
          avatar: "AP"
        },
        {
          quote: "I use this daily for my social media posts. It's fast, reliable, and makes my links look much cleaner.",
          name: "Maria S.",
          role: "Content Creator",
          avatar: "MS"
        },
        {
          quote: "The simplicity of this tool is its greatest strength. Upload, get link, share. Perfect!",
          name: "John B.",
          role: "Photographer",
          avatar: "JB"
        }
      ];

      return (
        <div className="space-y-16 py-8">
          <motion.section
            className="text-center py-16 md:py-24 bg-cover bg-center rounded-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80"></div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold mb-6 text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="gradient-text">HACKERPRO'S</span> IMG URL GENERATOR
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Welcome! Effortlessly transform your images into secure, unique, and easily shareable short URLs. Perfect for social media, forums, or any online sharing. Get started in seconds!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-brand-orange to-yellow-500 hover:from-brand-orange/90 hover:to-yellow-500/90 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Link to="/upload">
                    <UploadCloud className="mr-2 h-5 w-5" /> Upload Your Image Now
                  </Link>
                </Button>
              </motion.div>
            </div>
            <img  
              alt="Abstract background representing digital connections" 
              class="absolute inset-0 w-full h-full object-cover opacity-10 -z-10"
             src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5" />
          </motion.section>

          <motion.section 
            className="container mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Key Features & Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                >
                  <Card className="text-center h-full bg-card text-card-foreground hover:shadow-brand-orange/30 dark:hover:shadow-brand-orange/20 transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <div className="mx-auto bg-muted p-4 rounded-full w-fit mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section 
            className="container mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Hear From Our Users</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                >
                  <Card className="h-full flex flex-col justify-between bg-card text-card-foreground">
                    <CardContent className="pt-6">
                      <MessageSquare className="h-8 w-8 text-brand-blue mb-4" />
                      <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center text-white font-bold mr-3">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="container mx-auto px-4 text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-brand-blue via-purple-600 to-brand-orange p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Simplify Your Image Sharing?</h2>
              <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
                Join countless users who rely on HACKERPRO'S IMG URL GENERATOR for quick, secure, and easy image sharing. Click below to upload your first image!
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link to="/upload">
                  Generate Your Short URL <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </Card>
          </motion.section>
        </div>
      );
    };

    export default LandingPage;