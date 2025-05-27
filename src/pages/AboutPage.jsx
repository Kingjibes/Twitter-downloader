import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Zap, ShieldCheck, Users, Lightbulb, DownloadCloud, Twitter as TwitterIcon } from 'lucide-react';
    import Logo from '@/components/Logo';

    const AboutPage = () => {
      const teamMembers = [
        { name: "The TwitVid Team", role: "Developers & Video Enthusiasts", bio: "This application is dedicated to providing a simple and efficient way to download Twitter videos. We focus on user experience and reliability.", avatarSeed: <Logo className="h-10 w-10"/> },
      ];

      return (
        <motion.div 
          className="container mx-auto px-4 py-12 md:py-16 space-y-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <section className="text-center">
            <motion.div 
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            >
              <Logo className="h-20 w-20 sm:h-24 sm:w-24" />
            </motion.div>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About <span className="gradient-text-twitter">TwitVid Downloader</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              TwitVid Downloader is your go-to solution for quickly and easily saving videos from Twitter. We believe in providing a simple, fast, and reliable tool to help you keep your favorite moments, important news clips, or entertaining content right at your fingertips.
            </motion.p>
          </section>

          <section>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-card/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl sm:text-3xl text-primary">
                    <DownloadCloud className="mr-3 h-8 w-8" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg text-foreground/90">
                    Our mission is to simplify the process of downloading Twitter videos. In an age of fleeting digital content, we provide a stable bridge for users to archive and enjoy videos offline. We're committed to a user-friendly experience, prioritizing speed, ease-of-use, and respect for user privacy. This tool is designed for personal use, in accordance with Twitter's terms of service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          <section>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 gradient-text-twitter">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="h-8 w-8 text-primary" />, title: "Lightning Fast", description: "Download videos in seconds. No waiting, no complex steps." },
                { icon: <ShieldCheck className="h-8 w-8 text-green-500" />, title: "Secure & Private", description: "We don't store your URLs or downloaded videos. Your activity is yours." },
                { icon: <Lightbulb className="h-8 w-8 text-amber-400" />, title: "Simple Interface", description: "Clean, intuitive design. Downloading is as easy as paste and click." },
                { icon: <Users className="h-8 w-8 text-purple-400" />, title: "User-Focused", description: "Built with your needs in mind. We're always looking to improve." },
                 { icon: <DownloadCloud className="h-8 w-8 text-sky-500" />, title: "Multiple Qualities", description: "Often provides options for HD and SD video downloads when available." },
                 { icon: <TwitterIcon className="h-8 w-8 text-blue-500" />, title: "Twitter Focused", description: "Specifically designed and optimized for downloading videos from Twitter." },

              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                >
                  <Card className="text-center h-full bg-card/70 backdrop-blur-sm hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <motion.div 
                        className="mx-auto bg-muted p-4 rounded-full w-fit mb-4 border border-border"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {value.icon}
                      </motion.div>
                      <CardTitle className="text-xl text-foreground">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 gradient-text-twitter">The Creators</h2>
            <div className="max-w-2xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.15 + 0.8}}
                >
                  <Card className="bg-card/70 backdrop-blur-sm p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                      <motion.div 
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-white text-3xl font-bold mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {member.avatarSeed}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">{member.name}</h3>
                        <p className="text-primary font-medium text-lg">{member.role}</p>
                        <p className="text-muted-foreground mt-2">{member.bio}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
             <p className="text-center text-muted-foreground mt-8 text-sm">
              Enjoy downloading your favorite Twitter videos!
            </p>
          </section>
        </motion.div>
      );
    };

    export default AboutPage;