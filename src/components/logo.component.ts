import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-4 cursor-pointer group select-none">
      <!-- Graphic Mark -->
      <div class="relative w-12 h-12 flex items-center justify-center">
        <!-- Decorative Glow -->
        <div class="absolute inset-0 bg-rose-100 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-125"></div>
        
        <!-- Icon -->
        <svg class="w-full h-full text-rose-900 relative z-10 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <!-- Outer Circle (Enso-style open ring) -->
          <path d="M50 5 C 25.147 5 5 25.147 5 50 C 5 74.853 25.147 95 50 95 C 74.853 95 95 74.853 95 50" 
                stroke-width="2" 
                stroke-linecap="round"
                class="opacity-80 group-hover:opacity-100 transition-opacity" />
          
          <!-- The Mountain (Tenjiku) -->
          <path d="M25 75 L 50 35 L 75 75" 
                stroke-width="2" 
                stroke-linejoin="round" 
                fill="currentColor" 
                class="text-rose-900/10 group-hover:text-rose-900/20 transition-colors" />
          
          <path d="M25 75 L 50 35 L 75 75" 
                stroke-width="2" 
                stroke-linejoin="round" 
                stroke-linecap="round"
                fill="none" />

          <!-- The Sun/Pearl (Wisdom) -->
          <circle cx="50" cy="25" r="4" fill="currentColor" stroke="none" />
          
          <!-- Cloud/Mist line crossing the mountain -->
          <path d="M15 60 Q 35 55, 50 60 T 85 60" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                class="text-rose-700" />
        </svg>
      </div>

      <!-- Wordmark -->
      <div class="flex flex-col">
        <span class="text-[10px] tracking-[0.4em] text-stone-500 uppercase leading-tight font-medium group-hover:text-rose-800 transition-colors duration-300 translate-y-[2px]">
          House of
        </span>
        <span class="text-2xl font-serif font-bold tracking-widest text-rose-900 leading-none group-hover:tracking-[0.12em] transition-all duration-500">
          TENJIKU
        </span>
      </div>
    </div>
  `
})
export class LogoComponent {}