import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative h-screen w-full flex items-center justify-center overflow-hidden bg-rose-50 text-stone-900">
      
      <!-- Background Image -->
      <div class="absolute inset-0 z-0 w-full h-full">
        <img 
          src="https://drive.google.com/file/d/15KxidQfmYNJZJKy7Q1EdBzgqsr5Xyi98/view?usp=sharing" 
          alt="House of Tenjiku Background" 
          class="w-full h-full object-cover opacity-90"
        >
        <!-- Soft Overlay to blend image with brand colors and ensure text readability -->
        <div class="absolute inset-0 bg-rose-50/40 mix-blend-overlay"></div>
        <div class="absolute inset-0 bg-white/30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-rose-50 via-transparent to-rose-50/20"></div>
      </div>

      <!-- Content Container -->
      <div class="relative z-20 text-center px-6 max-w-4xl fade-in pt-10 md:pt-0">
        <p class="text-rose-900 tracking-[0.3em] text-sm md:text-base mb-6 font-semibold uppercase drop-shadow-sm bg-white/40 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
          Launching May 2026
        </p>
        
        <h1 class="text-6xl md:text-8xl font-medium mb-8 leading-tight text-stone-900 drop-shadow-sm">
          <span class="block">House of</span>
          <span class="block italic text-rose-900">Tenjiku</span>
        </h1>
        
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-rose-900 to-transparent mx-auto mb-8"></div>

        <p class="text-xl md:text-2xl text-stone-800 font-normal max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
          We are crafting our signature collagen elixirs based on your voice. 
          Tell us what you desire, and we will create the formula based on your recommendations.
        </p>

        <button 
          (click)="scrollToSurvey()"
          class="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-200 bg-rose-900 font-serif tracking-widest hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900 shadow-xl"
        >
          DESIGN YOUR PERFECT BLEND
          <svg class="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>

    </section>
  `,
  styles: []
})
export class HeroComponent {
  scrollToSurvey() {
    document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' });
  }
}