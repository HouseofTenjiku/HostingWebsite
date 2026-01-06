import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';

interface BrandConcept {
  conceptName: string;
  aesthetic: string;
  logoDescription: string;
  colors: string[];
}

@Component({
  selector: 'app-brand-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-24 px-6 bg-stone-100 border-t-4 border-rose-900">
      <div class="max-w-6xl mx-auto">
        
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif text-stone-900 mb-2">Founder's Lab: Identity Workshop</h2>
          <p class="text-stone-600">Generate creative directions for the visual identity of House of Tenjiku.</p>
        </div>

        <div class="max-w-2xl mx-auto mb-16 bg-white p-8 rounded shadow-sm">
          <label class="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Brand Vision / Context</label>
          <textarea 
            [(ngModel)]="visionInput"
            rows="3"
            class="w-full p-4 bg-stone-50 border border-stone-200 rounded focus:ring-1 focus:ring-rose-900 outline-none mb-6"
            placeholder="e.g., Minimalist, nature-focused, luxury, using gold and deep greens..."
          ></textarea>
          
          <button 
            (click)="generateConcepts()"
            [disabled]="isLoading()"
            class="w-full py-4 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            @if(isLoading()) {
              <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              GENERATING...
            } @else {
              GENERATE CONCEPTS
            }
          </button>
        </div>

        @if (concepts().length > 0) {
          <div class="grid md:grid-cols-3 gap-8">
            @for (concept of concepts(); track $index) {
              <div class="bg-white p-8 rounded shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                <h3 class="text-2xl font-serif text-rose-900 mb-4 border-b border-rose-100 pb-2">{{ concept.conceptName }}</h3>
                
                <div class="mb-6 flex-grow">
                  <h4 class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Aesthetic</h4>
                  <p class="text-stone-700 leading-relaxed text-sm">{{ concept.aesthetic }}</p>
                </div>

                <div class="mb-6 flex-grow">
                  <h4 class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Logo Concept</h4>
                  <p class="text-stone-700 leading-relaxed text-sm">{{ concept.logoDescription }}</p>
                </div>

                <div>
                  <h4 class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Palette</h4>
                  <div class="flex space-x-2">
                    @for (color of concept.colors; track color) {
                      <div class="group relative">
                        <div 
                          class="w-10 h-10 rounded-full shadow-sm border border-stone-100 cursor-pointer transition-transform hover:scale-110"
                          [style.background-color]="color"
                          [title]="color"
                        ></div>
                        <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] bg-stone-800 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {{ color }}
                        </span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class BrandLabComponent {
  private gemini = inject(GeminiService);
  
  visionInput = '';
  isLoading = signal(false);
  concepts = signal<BrandConcept[]>([]);

  async generateConcepts() {
    this.isLoading.set(true);
    const results = await this.gemini.generateBrandIdentity(this.visionInput);
    this.concepts.set(results);
    this.isLoading.set(false);
  }
}