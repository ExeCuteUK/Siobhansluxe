import { Sparkles, Shirt, Building2, Phone, Mail, MapPin, Star, Percent, Clock, Banknote, CheckCircle, Bed, Bath, Sofa, UtensilsCrossed } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ServiceCard } from './components/ServiceCard';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import heroImage from '@assets/image_1766076130638.png';
import mapImage from '@assets/image_1766079517137.png';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

interface AppProps {
  serverHostname?: string;
}

export default function App({ serverHostname }: AppProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const sessionDetails: Record<string, { description: string; rooms: { icon: React.ReactNode; label: string }[] }> = {
    "2 Hour Session": {
      description: "Perfect for smaller homes or regular maintenance cleans",
      rooms: [
        { icon: <Bed className="text-primary" size={24} />, label: "2 Bedrooms" },
        { icon: <Bath className="text-primary" size={24} />, label: "1 Bathroom" },
        { icon: <UtensilsCrossed className="text-primary" size={24} />, label: "1 Kitchen" },
        { icon: <Sofa className="text-primary" size={24} />, label: "1 Living Room" },
      ]
    },
    "2.5 Hour Session": {
      description: "Ideal for adding laundry services to your clean",
      rooms: [
        { icon: <Bed className="text-primary" size={24} />, label: "2 Bedrooms" },
        { icon: <Bath className="text-primary" size={24} />, label: "1 Bathroom" },
        { icon: <UtensilsCrossed className="text-primary" size={24} />, label: "1 Kitchen" },
        { icon: <Sofa className="text-primary" size={24} />, label: "1 Living Room" },
        { icon: <Shirt className="text-primary" size={24} />, label: "Laundry Hung Out / Put Into Machine" },
      ]
    },
    "3 Hour Session": {
      description: "Great for larger homes with multiple bedrooms and bathrooms",
      rooms: [
        { icon: <Bed className="text-primary" size={24} />, label: "3 Bedrooms" },
        { icon: <Bath className="text-primary" size={24} />, label: "2 Bathrooms" },
        { icon: <UtensilsCrossed className="text-primary" size={24} />, label: "1 Kitchen" },
        { icon: <Sofa className="text-primary" size={24} />, label: "1 Living Room" },
      ]
    },
    "4 Hour Session": {
      description: "Comprehensive clean with ironing or for larger properties",
      rooms: [
        { icon: <Bed className="text-primary" size={24} />, label: "3-4 Bedrooms" },
        { icon: <Bath className="text-primary" size={24} />, label: "2-3 Bathrooms" },
        { icon: <UtensilsCrossed className="text-primary" size={24} />, label: "1 Kitchen" },
        { icon: <Sofa className="text-primary" size={24} />, label: "1 Living Room" },
        { icon: <Shirt className="text-primary" size={24} />, label: "In-House Ironing (optional)" },
      ]
    },
    "5 Hour Session": {
      description: "Full service for larger homes including in-house ironing",
      rooms: [
        { icon: <Bed className="text-primary" size={24} />, label: "4 Bedrooms" },
        { icon: <Bath className="text-primary" size={24} />, label: "3 Bathrooms" },
        { icon: <UtensilsCrossed className="text-primary" size={24} />, label: "1 Kitchen" },
        { icon: <Sofa className="text-primary" size={24} />, label: "1 Living Room" },
        { icon: <Shirt className="text-primary" size={24} />, label: "In-House Ironing" },
      ]
    },
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessPopup(true);
        form.reset();
        setIsHuman(false);
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const services = [
    {
      icon: <Sparkles size={48} />,
      title: "Premium Home Cleaning",
      description: "Transform your home with our professional cleaning service. We use premium products and techniques to ensure every corner sparkles.",
      features: [
        "5* Hotel Level cleaning services",
        "Everything has a place, just let us know!",
        "Dusting, vacuuming & mopping of all areas",
        "Premium grade professional products",
        "Flexible scheduling & Holiday return cleans"
      ]
    },
    {
      icon: <Shirt size={48} />,
      title: "In-House Ironing, Laundry & Pet Care",
      description: "Combined with an in home clean we can offer in home Ironing, Laundry and help with your pets.",
      features: [
        "Professional in home ironing with our equipment",
        "Loading / Unloading of your laundry ready for your return",
        "Laundry hung out to dry during dry days",
        "Feeding pets",
        "Cleaning cat litter trays / pet areas"
      ]
    },
    {
      icon: <Building2 size={48} />,
      title: "Office & Commercial Cleans",
      description: "Efficient office cleans suited to your companys schedule. Including unsociable hours so we do not get in your way.",
      features: [
        "Fully customised regular cleans for your business",
        "One off moving out/in deep cleans",
        "Computer equipment cleaning",
        "Early Morning, Late evening & weekends also avaliable"
      ]
    }
  ];

  const areas = [
    "Upminster",
    "Basildon",
    "Benfleet",
    "Rayleigh",
    "Southend",
    "Wickford",
    "Leigh On-Sea",
    "Brentwood"
  ];

  const getSiteConfig = () => {
    let hostname = serverHostname || "";
    let siteParam: string | null = null;
    
    if (typeof window !== 'undefined') {
      hostname = window.location.hostname;
      const searchParams = new URLSearchParams(window.location.search);
      siteParam = searchParams.get('site');
    }
    
    if (siteParam === 'southend' || hostname.includes('southendcleaner.co.uk')) {
      return {
        brandName: "Southend Cleaner",
        title: "Southend Cleaner",
        email: "hello@southendcleaner.co.uk",
        description: "Premium cleaning services in Southend and surrounding areas.",
        keywords: "Southend cleaner, cleaning services Southend, luxury cleaning Southend"
      };
    }
    
    if (hostname.includes('siobhansluxe.co.uk')) {
      return {
        brandName: "Siobhans Luxe",
        title: "Luxury Home Cleaning & Ironing Services in South East Essex",
        email: "hello@siobhansluxe.co.uk",
        description: "Luxury home cleaning & in-house ironing across South Essex. Serving Brentwood, Benfleet, Rayleigh, Canvey Island, Southend & more. First clean 50% off.",
        keywords: "luxury cleaning Essex, ironing service Essex, maid service Southend, house cleaning Basildon, domestic cleaner Benfleet, home cleaning Rayleigh, professional cleaner Wickford, cleaning service Leigh-on-Sea, office cleaning Essex"
      };
    }
    
    return {
      brandName: "Siobhans Luxe",
      title: "Luxury Home Cleaning & Ironing Services in South East Essex",
      email: "hello@siobhansluxe.co.uk",
      description: "Luxury home cleaning & in-house ironing across South Essex. Serving Brentwood, Benfleet, Rayleigh, Canvey Island, Southend & more. First clean 50% off.",
      keywords: "luxury cleaning Essex, ironing service Essex, maid service Southend, house cleaning Basildon, domestic cleaner Benfleet, home cleaning Rayleigh, professional cleaner Wickford, cleaning service Leigh-on-Sea, office cleaning Essex"
    };
  };

  const config = getSiteConfig();

  // Update document title and meta tags dynamically
  useEffect(() => {
    document.title = config.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = config.description;
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', config.description);

  }, [config]);

  const updateInfo = {
    title: "Availability Update",
    message: "We currently have no avalibility for regular cleans until the beginning of Feburary 2026. We are currently offering appointments to discuss these openings now."
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Success Popup */}
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="items-center">
            <CheckCircle className="text-primary w-16 h-16 mb-4" />
            <DialogTitle className="text-2xl">Thank You!</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Your email has been sent and we will get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <Button 
            onClick={() => setShowSuccessPopup(false)}
            className="mt-4 rounded-full"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-primary/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={32} />
              <span className="text-2xl tracking-wide">{config.brandName}</span>
            </div>
            
            <div className="lg:hidden">
              <a 
                href="#contact" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition-all"
              >
                Contact
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <a href="#services" className="hover:text-primary transition-colors">View Services Offered</a>
              <a href="#areas" className="hover:text-primary transition-colors">View Service Areas</a>
              <a href="#prices" className="hover:text-primary transition-colors">View Our Prices</a>
              <a 
                href="#contact" 
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-all"
              >
                Contact Us
              </a>
              <div className="flex flex-col items-end justify-center text-sm text-primary/80 gap-1 pl-4 border-l border-primary/20">
                <a href="tel:01708865010" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone size={14} />
                  <span>01708 865010</span>
                </a>
                <a href={`mailto:${config.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail size={14} />
                  <span>{config.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl mb-3 leading-tight">
                Luxury Cleaning
                <span className="block text-primary">At Your Service</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                Professional home cleaning & in-house ironing. Offering a full premium maid experience in your home, customised exactly your way. From chocolates on your pillow to in-house ironing, you set the criteria and we do our best to work around your wishes without worrying about looking too picky!
              </p>
              <div className="flex flex-nowrap gap-2 mb-4 justify-center">
                <a 
                  href="#services" 
                  className="border-2 border-primary text-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-all flex-1 text-center whitespace-nowrap"
                >
                  Services
                </a>
                <a 
                  href="#areas" 
                  className="border-2 border-primary text-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-all flex-1 text-center whitespace-nowrap"
                >
                  Areas
                </a>
                <a 
                  href="#prices" 
                  className="border-2 border-primary text-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-all flex-1 text-center whitespace-nowrap"
                >
                  Prices
                </a>
                <a 
                  href="#contact" 
                  className="bg-primary text-primary-foreground px-8 py-2 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hidden lg:inline-flex"
                >
                  Contact
                </a>
              </div>

              {/* Update Section */}
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-2 w-full backdrop-blur-sm px-4 sm:px-3">
                <h3 className="text-primary font-serif text-xl mb-1 flex items-center gap-2">
                  <Sparkles size={20} />
                  {updateInfo.title}
                </h3>
                <p className="text-white">
                  {updateInfo.message}
                </p>
              </div>

            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl"></div>
              <ImageWithFallback 
                src={heroImage}
                alt="Luxury home cleaning service" 
                className="rounded-2xl shadow-2xl relative z-10 w-full h-auto border-2 border-primary/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">Services We Offer</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Spotless homes & in-house Ironing/Laundry, we even cover commercial buildings (but will skip the chocolates!).
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section id="areas" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6">Service Areas</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We proudly serve communities across Essex, bringing premium cleaning 
                and laundry services right to your doorstep.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {areas.map((area, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-card border border-primary/20 rounded-lg p-4 hover:border-primary transition-all"
                  >
                    <MapPin className="text-primary flex-shrink-0" size={24} />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-6 text-sm">
                Don't see your area? <a href={`mailto:${config.email}`} className="text-primary hover:underline">Contact us</a> - we may still be able to help!
              </p>
            </div>
            <div className="relative h-full min-h-[400px] hidden md:block">
              <div className="absolute inset-0 bg-primary/20 blur-3xl"></div>
              <ImageWithFallback 
                src={mapImage}
                alt="Service Areas Map" 
                className="rounded-2xl shadow-2xl relative z-10 w-full h-full object-contain bg-black/40 border-2 border-primary/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">Our Prices</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Prices are quoted in sessions or blocks of time and are based on regular cleans. 
              One off cleans and business premises cleans are subject to prior discussion. These sessions can be used to combine all parts of our services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { time: "2 Hour Session", price: "£45.00", perHour: "£22.50" },
              { time: "2.5 Hour Session", price: "£55.00", perHour: "£22.00" },
              { time: "3 Hour Session", price: "£65.00", perHour: "£21.60" },
              { time: "4 Hour Session", price: "£85.00", perHour: "£21.25" },
              { time: "5 Hour Session", price: "£100.00", perHour: "£20.00" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-card border border-primary/20 rounded-xl p-6 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all group cursor-pointer"
                onClick={() => setSelectedSession(item.time)}
                data-testid={`pricing-card-${index}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Clock size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.time}</h3>
                <div className="text-3xl font-bold text-primary mb-2">{item.price}</div>
                <p className="text-xs text-muted-foreground">Equivalent to <br/>{item.perHour} per Hour</p>
                <p className="text-xs text-primary mt-2">Click for details</p>
              </div>
            ))}
          </div>

          {/* Session Details Popup */}
          <Dialog open={selectedSession !== null} onOpenChange={(open) => !open && setSelectedSession(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">{selectedSession}</DialogTitle>
                <DialogDescription className="text-center pt-2">
                  {selectedSession && sessionDetails[selectedSession]?.description}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <h4 className="text-sm font-semibold mb-4 text-center text-muted-foreground">What's typically included:</h4>
                <div className="grid grid-cols-1 gap-3">
                  {selectedSession && sessionDetails[selectedSession]?.rooms.map((room, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                      {room.icon}
                      <span className="text-sm">{room.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Sessions can be customised to your needs. Contact us to discuss your requirements.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">Why Choose Siobhans Luxe?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the premium difference
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 border-2 border-primary">
                <Star className="text-primary" size={32} />
              </div>
              <h3 className="mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground text-sm">
                100% satisfaction or we'll make it right
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 border-2 border-primary">
                <Sparkles className="text-primary" size={32} />
              </div>
              <h3 className="mb-2">Premium Products</h3>
              <p className="text-muted-foreground text-sm">
                Professional-grade supplies
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 border-2 border-primary">
                <Shirt className="text-primary" size={32} />
              </div>
              <h3 className="mb-2">Expert Team</h3>
              <p className="text-muted-foreground text-sm">
                Trained and vetted professionals
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 border-2 border-primary">
                <Percent className="text-primary" size={32} />
              </div>
              <h3 className="mb-2">Half Price Trial Clean</h3>
              <p className="text-muted-foreground text-sm">
                First regular clean 50% off
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary/30 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl mb-4">Interested in our services?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get in touch today via the below form or email link. We'll customize our services to meet your needs. We will always reply back via Email or Text first unless you request us to call!
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10 mb-10 max-w-2xl mx-auto shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="07123 456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your cleaning needs..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-3 py-2">
                    <Checkbox 
                      id="human-check" 
                      checked={isHuman}
                      onCheckedChange={(checked) => setIsHuman(checked === true)}
                      className="border-primary data-[state=checked]:bg-primary"
                    />
                    <label 
                      htmlFor="human-check" 
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      I confirm I am a real person (not a robot)
                    </label>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !isHuman}
                    className="w-full text-lg py-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <a 
                href={`mailto:${config.email}`}
                className="flex items-center justify-center gap-3 border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Mail size={20} />
                <span>Email Us Directly</span>
              </a>
            </div>
            
            <div className="text-muted-foreground space-y-2">
              <p className="flex items-center justify-center gap-2">
                <Phone size={18} className="text-primary" />
                01708 865010
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-primary/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-primary" size={28} />
                <span className="text-xl">{config.brandName}</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Luxury cleaning and laundry services across Essex.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-primary transition-colors">Home Cleaning</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Ironing, Laundry & Pet Care</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Office & Business Cleaning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Service Areas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {areas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>01708 865010</li>
                <li>{config.email}</li>
                <li>South Benfleet, Essex, United Kingdom</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Siobhans Luxe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}