import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sliders, Download, RefreshCw, Wand2, Check, Mail, Github, Twitter } from 'lucide-react';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        enhanceImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async (imageData: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEnhancedImage(imageData);
    setLoading(false);
  };

  const handleSettingChange = (setting: keyof typeof settings, value: number) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Header */}
      <header className="py-6 px-8 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2">
            <Wand2 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 text-transparent bg-clip-text">Re-Live</h1>
        </div>
        <nav className="flex gap-8">
          <a href="#features" className="hover:text-blue-300 transition-colors font-medium">Features</a>
          <a href="#pricing" className="hover:text-blue-300 transition-colors font-medium">Pricing</a>
          <a href="#contact" className="hover:text-blue-300 transition-colors font-medium">Contact</a>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        {!image && (
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl transform -skew-y-12"></div>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Breathe New Life into Your Images
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
              Transform grayscale images into vibrant masterpieces with our AI-powered enhancement technology
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&q=80" alt="Sample" className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-sm text-white">Nature Photography</span>
                </div>
              </div>
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80" alt="Sample" className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-sm text-white">Portrait Photography</span>
                </div>
              </div>
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80" alt="Sample" className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-sm text-white">Landscape Photography</span>
                </div>
              </div>
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300&q=80" alt="Sample" className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-sm text-white">Urban Photography</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {!image ? (
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-blue-400/50 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 transition-colors bg-gradient-to-br from-blue-500/10 to-purple-500/10"
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <p className="text-xl mb-2 font-medium">Drop your image here or click to upload</p>
              <p className="text-blue-300/80">Supports JPG, PNG files</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Original Image */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Original Image</h3>
                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Enhanced Image */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">Enhanced Image</h3>
                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
                    </div>
                  ) : (
                    enhancedImage && (
                      <img
                        src={enhancedImage}
                        alt="Enhanced"
                        className="w-full h-full object-cover"
                        style={{
                          filter: `
                            brightness(${settings.brightness}%)
                            contrast(${settings.contrast}%)
                            saturate(${settings.saturation}%)
                          `
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Controls */}
              {enhancedImage && !loading && (
                <div className="md:col-span-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-blue-300">Brightness</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={settings.brightness}
                        onChange={(e) => handleSettingChange('brightness', Number(e.target.value))}
                        className="w-full h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-purple-300">Contrast</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={settings.contrast}
                        onChange={(e) => handleSettingChange('contrast', Number(e.target.value))}
                        className="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3 text-indigo-300">Saturation</label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={settings.saturation}
                        onChange={(e) => handleSettingChange('saturation', Number(e.target.value))}
                        className="w-full h-2 bg-indigo-900 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={triggerFileInput}
                      className="px-6 py-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors mr-4 font-medium"
                    >
                      Upload New Image
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center gap-2 font-medium shadow-lg">
                      <Download className="w-5 h-5" />
                      Download Enhanced Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 blur-3xl transform -skew-y-12"></div>
          </div>
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-300">Grayscale to Color</h3>
                <p className="text-gray-300">Transform your black and white photos into vibrant, colorful images with our advanced AI technology</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Sliders className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-purple-300">Advanced Controls</h3>
                <p className="text-gray-300">Fine-tune your images with precise adjustment controls for the perfect result every time</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-indigo-300">Real-time Preview</h3>
                <p className="text-gray-300">See your enhancements in real-time as you make adjustments to your images</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-2 text-blue-300">Basic</h3>
                <div className="text-4xl font-bold mb-6">Free</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>5 Images per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Basic enhancement tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Standard processing speed</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-medium">
                  Get Started
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl relative transform scale-105 border border-purple-500/30">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-purple-300">Pro</h3>
                <div className="text-4xl font-bold mb-6">$9.99<span className="text-lg font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>100 Images per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Advanced enhancement tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Priority processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Batch processing</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-colors font-medium">
                  Get Started
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-300">Enterprise</h3>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Unlimited images</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Custom API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Custom integration</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition-colors font-medium">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Get in Touch
            </h2>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                    <input type="text" className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <input type="email" className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-colors"></textarea>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-colors font-medium">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white rounded-full p-2">
                  <Wand2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xl font-bold">Re-Live</span>
              </div>
              <p className="text-gray-400">Bringing your images to life with cutting-edge AI technology.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Re-Live. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;