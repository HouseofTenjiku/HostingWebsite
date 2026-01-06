import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="philosophy" class="relative py-24 bg-stone-900 text-stone-200 overflow-hidden">
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div class="container mx-auto px-6 relative z-10">
        
        <!-- Part 1: The Origin -->
        <div class="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div class="order-2 md:order-1">
            <h2 class="text-3xl md:text-5xl font-serif text-stone-50 mb-6 leading-tight">
              The Journey to <span class="text-rose-400 italic">Tenjiku</span>
            </h2>
            <div class="w-16 h-1 bg-rose-900 mb-8"></div>
            <p class="text-stone-400 text-lg leading-relaxed mb-6 font-light">
              In ancient lore, "Tenjiku" was the name given to the "Heavenly Land"—a mythical destination of wisdom and purity. It represents the ultimate journey for the seeker.
            </p>
            <p class="text-stone-400 text-lg leading-relaxed font-light">
              House of Tenjiku was born from this pursuit. We are not merely a beverage company; we are modern alchemists bridging the gap between ancient Eastern wellness rituals and cutting-edge nutritional science. Our first offering, a pristine marine collagen elixir, is designed to be the foundation of your daily renewal.
            </p>
          </div>
          <div class="order-1 md:order-2 relative">
             <div class="absolute inset-0 border border-rose-900/30 translate-x-4 translate-y-4 rounded-sm"></div>
             <img src="https://picsum.photos/id/431/600/500" alt="Tea Ceremony Ritual" class="w-full h-auto rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl relative z-10 opacity-90">
          </div>
        </div>

        <!-- Part 2: Co-Creation (Customer Interest) -->
        <div class="bg-stone-800/50 rounded-2xl p-8 md:p-12 border border-stone-700 backdrop-blur-sm mb-24">
           <div class="max-w-4xl mx-auto text-center">
              <span class="text-rose-400 tracking-[0.3em] uppercase text-xs font-bold mb-4 block">Our Philosophy</span>
              <h3 class="text-3xl md:text-4xl font-serif text-stone-100 mb-6">Designed by You, Crafted by Us</h3>
              <p class="text-stone-400 text-lg leading-relaxed mb-8">
                True wellness is personal. Unlike traditional houses that dictate what you need, we believe the cure lies within the desires of the seeker.
              </p>
              <div class="grid md:grid-cols-3 gap-8 text-left">
                <div class="bg-stone-900/50 p-6 rounded border border-stone-800">
                   <div class="text-2xl mb-3">👂</div>
                   <h4 class="font-serif text-rose-200 mb-2 text-lg">We Listen</h4>
                   <p class="text-sm text-stone-500">Every survey submission is analyzed. Your flavor preferences and wellness goals directly influence our final formula.</p>
                </div>
                <div class="bg-stone-900/50 p-6 rounded border border-stone-800">
                   <div class="text-2xl mb-3">⚗️</div>
                   <h4 class="font-serif text-rose-200 mb-2 text-lg">We Adapt</h4>
                   <p class="text-sm text-stone-500">Our potency levels and supply sizes are flexible, evolving based on the collective voice of our community.</p>
                </div>
                <div class="bg-stone-900/50 p-6 rounded border border-stone-800">
                   <div class="text-2xl mb-3">✨</div>
                   <h4 class="font-serif text-rose-200 mb-2 text-lg">We Deliver</h4>
                   <p class="text-sm text-stone-500">The result is a collagen shot that doesn't just work—it resonates with your lifestyle and tastes.</p>
                </div>
              </div>
           </div>
        </div>

        <!-- Part 3: Ingredients & Purity -->
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="relative">
             <div class="absolute -inset-4 bg-gradient-to-r from-rose-900/20 to-transparent rounded-full blur-xl"></div>
             <img src="https://picsum.photos/id/530/600/600" alt="Pure Ingredients" class="w-full h-auto rounded-full object-cover shadow-2xl grayscale border-4 border-stone-800 relative z-10">
          </div>
          <div>
            <h2 class="text-3xl md:text-5xl font-serif text-stone-50 mb-6 leading-tight">
              Uncompromising <span class="text-rose-400">Purity</span>
            </h2>
            <div class="w-16 h-1 bg-rose-900 mb-8"></div>
            <ul class="space-y-6">
              <li class="flex items-start">
                <span class="text-rose-500 mr-4 text-xl">✦</span>
                <div>
                  <h4 class="text-xl font-serif text-stone-200 mb-1">Wild-Caught Marine Source</h4>
                  <p class="text-stone-500">Sourced ethically from deep-sea waters, ensuring the highest bioavailability and zero antibiotic exposure.</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-rose-500 mr-4 text-xl">✦</span>
                <div>
                  <h4 class="text-xl font-serif text-stone-200 mb-1">Potent Hydrolysis</h4>
                  <p class="text-stone-500">Our advanced peptide structure ensures rapid absorption, targeting skin elasticity and joint health from within.</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-rose-500 mr-4 text-xl">✦</span>
                <div>
                  <h4 class="text-xl font-serif text-stone-200 mb-1">Flavor as Medicine</h4>
                  <p class="text-stone-500">We don't mask ingredients; we celebrate them. We use real botanicals like Yuzu and Matcha to create a sensory ritual, not just a supplement.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutUsComponent {}