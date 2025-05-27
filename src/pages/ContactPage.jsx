import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const ContactPage = () => {
      const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const { toast } = useToast();

      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          const { error: dbError } = await supabase
            .from('contact_messages')
            .insert([{ ...formData, page_source: 'Contact Page' }]);

          if (dbError) throw dbError;

          const { data: functionData, error: functionError } = await supabase.functions.invoke('send-contact-email', {
            body: JSON.stringify({
              ...formData,
              formType: 'General Inquiry'
            }),
          });

          if (functionError) throw functionError;

          if (functionData && functionData.error) {
            throw new Error(functionData.message || 'Edge function returned an error.');
          }

          toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll be in touch shortly and a copy has been sent to support.",
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
          console.error('Error submitting contact message:', error);
          toast({
            title: "Error",
            description: `Could not send your message. ${error.message || 'Please try again.'}`,
            variant: "destructive",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      const contactInfo = [
        { icon: <Mail className="h-6 w-6 text-brand-blue" />, text: "support@example.com", href: "mailto:support@example.com" },
        { icon: <Phone className="h-6 w-6 text-brand-blue" />, text: "+1 (123) 456-7890", href: "tel:+11234567890" },
        { icon: <MapPin className="h-6 w-6 text-brand-blue" />, text: "123 Main Street, Anytown, USA", href: "#" },
      ];

      const socialLinks = [
        { icon: <Facebook size={24} />, href: '#', label: 'Facebook' },
        { icon: <Twitter size={24} />, href: '#', label: 'Twitter' },
        { icon: <Linkedin size={24} />, href: '#', label: 'LinkedIn' },
      ];

      return (
        <motion.div 
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-10 text-center gradient-text">Get In Touch</h1>
          
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>Have questions or feedback? We'd love to hear from you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Regarding..." value={formData.subject} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea id="message" placeholder="Let us know what's on your mind..." rows={5} value={formData.message} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <motion.div className="mr-2" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                              <Send className="h-4 w-4" />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                  <CardDescription>Here's how you can reach us directly or find us. You can edit these details in the <code>src/pages/ContactPage.jsx</code> file.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a key={index} href={info.href} className="flex items-center space-x-3 group">
                      <span className="flex-shrink-0">{info.icon}</span>
                      <span className="text-gray-300 group-hover:text-brand-orange transition-colors">{info.text}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Connect on Social Media</CardTitle>
                  <CardDescription>Follow us on our social channels for updates and news. Edit these links in <code>src/pages/ContactPage.jsx</code>.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-6">
                    {socialLinks.map(social => (
                      <a key={social.label} href={social.href} aria-label={social.label} className="text-gray-400 hover:text-brand-orange transition-colors">
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default ContactPage;