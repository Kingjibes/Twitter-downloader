import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';
    import ImageDropzone from '@/components/image-upload/ImageDropzone';
    import UploadActions from '@/components/image-upload/UploadActions';
    import ShortUrlDisplay from '@/components/image-upload/ShortUrlDisplay';
    import ErrorDisplay from '@/components/image-upload/ErrorDisplay';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '@/config/imageUploadConfig';
    import { simpleCipher } from '@/lib/cipher';
    import { Info } from 'lucide-react';

    const ImageUploadPage = () => {
      const [selectedFile, setSelectedFile] = useState(null);
      const [fullShortUrl, setFullShortUrl] = useState('');
      const [displayShortUrl, setDisplayShortUrl] = useState('');
      const [isCopied, setIsCopied] = useState(false);
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const { toast } = useToast();

      const handleFileSelect = (file) => {
        setError('');
        setFullShortUrl('');
        setDisplayShortUrl('');
        if (file) {
          if (file.size > MAX_FILE_SIZE) {
            setError(`File is too large. Max size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
            setSelectedFile(null);
            return;
          }
          if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setError('Invalid file type. Only JPG, PNG, GIF, WEBP are allowed.');
            setSelectedFile(null);
            return;
          }
          setSelectedFile(file);
        }
      };
      
      const generateShortCode = () => {
        return Math.random().toString(36).substring(2, 8);
      }

      const handleSupabaseUpload = async () => {
        if (!selectedFile) {
          setError('Please select an image first.');
          return;
        }
        setIsLoading(true);
        setError('');

        try {
          const rawShortCode = generateShortCode();
          const encryptedShortCode = simpleCipher(rawShortCode);

          const fileName = `${rawShortCode}-${selectedFile.name}`;
          const filePath = `public/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, selectedFile, {
              cacheControl: '3600',
              upsert: false,
            });

          if (uploadError) {
            throw uploadError;
          }
          
          const { error: dbError } = await supabase
            .from('images')
            .insert([
              { 
                name: selectedFile.name, 
                short_code: rawShortCode, 
                storage_path: filePath,
                file_type: selectedFile.type,
                file_size: selectedFile.size
              }
            ]);

          if (dbError) {
            throw dbError;
          }
          
          const origin = window.location.origin;
          const fullUrl = `${origin}/s/cipher/${encryptedShortCode}`;
          setFullShortUrl(fullUrl);
          // Display a shorter version, e.g., just the domain + encrypted code
          // Or, if your domain is short, just the encrypted code.
          // For this example, we'll show domain/code
          const displayUrl = `${origin.replace(/^https?:\/\//, '')}/${encryptedShortCode}`;
          setDisplayShortUrl(displayUrl);

          toast({
            title: "Success!",
            description: "Your image has been uploaded and short URL generated.",
          });

        } catch (e) {
          console.error("Error during Supabase upload:", e);
          let errorMessage = "Failed to upload image or generate URL. Please try again.";
          if (e.message && e.message.includes('unique constraint')) {
            errorMessage = "A unique code conflict occurred. Please try generating the URL again.";
          } else if (e.message) {
            errorMessage = e.message;
          }
          setError(errorMessage);
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      const copyToClipboard = () => {
        navigator.clipboard.writeText(fullShortUrl).then(() => {
          setIsCopied(true);
          toast({ title: "Copied!", description: "Full Short URL copied to clipboard." });
          setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
          toast({ title: "Error", description: "Failed to copy URL.", variant: "destructive" });
          console.error('Failed to copy: ', err);
        });
      };

      return (
        <motion.div 
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Upload Your Image</CardTitle>
              <CardDescription className="text-center text-lg text-muted-foreground">
                Get a short, shareable URL for your image in seconds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageDropzone onFileSelect={handleFileSelect} />
              {error && <ErrorDisplay message={error} />}
              
              {selectedFile && !fullShortUrl && (
                <>
                  <motion.div 
                    className="bg-blue-900/30 border border-blue-700 text-blue-300 px-4 py-3 rounded-md flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Info className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Image selected: <strong>{selectedFile.name}</strong>. You can now generate your short URL.</span>
                  </motion.div>
                  <UploadActions 
                    onUpload={handleSupabaseUpload} 
                    isLoading={isLoading} 
                  />
                </>
              )}

              {fullShortUrl && (
                <ShortUrlDisplay 
                  url={displayShortUrl} 
                  fullUrl={fullShortUrl}
                  isCopied={isCopied} 
                  onCopy={copyToClipboard} 
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default ImageUploadPage;