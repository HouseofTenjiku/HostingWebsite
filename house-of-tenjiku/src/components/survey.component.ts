import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="survey" class="py-24 px-6 bg-white min-h-[80vh] flex flex-col items-center justify-center">
      <div class="max-w-4xl w-full">
        
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Shape Our Essence</h2>
          <p class="text-stone-500 text-lg max-w-2xl mx-auto">
            We are crafting the ultimate wellness ritual. Share your desires, and help us create a formula that speaks to your needs.
          </p>
        </div>

        @if (isLoading()) {
          <div class="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
            <div class="w-16 h-16 border-4 border-rose-200 border-t-rose-900 rounded-full animate-spin"></div>
            <p class="text-xl font-serif text-rose-900">Consulting the Alchemist...</p>
          </div>
        } @else if (result()) {
          <!-- Result View -->
          <div class="bg-stone-50 border border-stone-200 p-8 md:p-12 rounded-sm shadow-xl relative overflow-hidden fade-in">
             <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-900 via-amber-500 to-rose-900"></div>
             
             <h3 class="text-sm font-bold tracking-widest text-stone-400 uppercase mb-4">The Oracle Speaks</h3>
             <div class="prose prose-stone prose-lg max-w-none font-serif leading-relaxed whitespace-pre-line text-stone-800">
                {{ result() }}
             </div>

             <div class="mt-12 pt-8 border-t border-stone-200 text-center">
               <p class="text-stone-500 mb-6 italic">
                 "Thank you, {{nameInput}}. Your preferences have been archived in the House of Tenjiku. 
                 We will notify {{emailInput}} when this creation comes to life."
               </p>
               <button (click)="reset()" class="text-rose-900 underline hover:text-rose-700 font-semibold transition-colors">
                 Submit Another Profile
               </button>
             </div>
          </div>
        } @else {
          <!-- Survey Form -->
          <div class="space-y-16">
            
            <!-- SECTION 1: The Seeker -->
            <div class="bg-stone-50 p-8 rounded-lg border border-stone-100">
              <h3 class="text-sm font-bold tracking-[0.2em] text-rose-900 uppercase mb-8 border-b border-rose-200 pb-2">I. The Seeker</h3>
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="block text-lg font-serif text-stone-800">Your Name</label>
                  <input 
                    [(ngModel)]="nameInput"
                    type="text" 
                    class="w-full p-3 bg-white border-b-2 border-stone-200 focus:border-rose-900 outline-none transition-colors"
                    placeholder="Enter your name"
                  >
                </div>
                <div class="space-y-2">
                   <label class="block text-lg font-serif text-stone-800">Email Address</label>
                   <input 
                    [(ngModel)]="emailInput"
                    type="email" 
                    class="w-full p-3 bg-white border-b-2 border-stone-200 focus:border-rose-900 outline-none transition-colors"
                    placeholder="For launch updates"
                  >
                </div>
              </div>
            </div>

            <!-- SECTION 2: The Vessel -->
            <div>
               <h3 class="text-sm font-bold tracking-[0.2em] text-rose-900 uppercase mb-8 border-b border-rose-200 pb-2">II. The Vessel</h3>
               
               <div class="grid md:grid-cols-2 gap-12">
                 <!-- Source -->
                 <div class="space-y-4">
                    <label class="block text-xl font-serif text-stone-800">Preferred Source</label>
                    <div class="flex flex-col gap-3">
                      @for (opt of sourceOptions; track opt) {
                        <label class="flex items-center space-x-3 cursor-pointer group">
                          <input type="radio" [name]="'source'" [value]="opt" [checked]="selectedSource() === opt" (change)="selectedSource.set(opt)" class="form-radio text-rose-900 focus:ring-rose-900 h-5 w-5">
                          <span class="text-stone-600 group-hover:text-stone-900 transition-colors">{{ opt }}</span>
                        </label>
                      }
                    </div>
                 </div>

                 <!-- Experience -->
                 <div class="space-y-4">
                    <label class="block text-xl font-serif text-stone-800">Experience Level</label>
                     <div class="flex flex-col gap-3">
                      @for (opt of experienceOptions; track opt) {
                        <label class="flex items-center space-x-3 cursor-pointer group">
                          <input type="radio" [name]="'exp'" [value]="opt" (change)="selectedExperience.set(opt)" class="form-radio text-rose-900 focus:ring-rose-900 h-5 w-5">
                          <span class="text-stone-600 group-hover:text-stone-900 transition-colors">{{ opt }}</span>
                        </label>
                      }
                    </div>
                 </div>
               </div>
            </div>

            <!-- SECTION 3: The Ritual -->
            <div>
               <h3 class="text-sm font-bold tracking-[0.2em] text-rose-900 uppercase mb-8 border-b border-rose-200 pb-2">III. The Ritual</h3>
               
               <div class="space-y-10">
                  <!-- Packaging -->
                  <div class="space-y-4">
                    <label class="block text-xl font-serif text-stone-800">Preferred Format</label>
                    <div class="flex flex-wrap gap-4">
                      @for (opt of packagingOptions; track opt) {
                        <button 
                          (click)="selectedPackaging.set(opt)"
                          [class.bg-stone-800]="selectedPackaging() === opt"
                          [class.text-stone-50]="selectedPackaging() === opt"
                          [class.bg-stone-100]="selectedPackaging() !== opt"
                          [class.text-stone-600]="selectedPackaging() !== opt"
                          class="py-3 px-6 rounded transition-all font-medium border border-transparent hover:border-stone-400"
                        >
                          {{ opt }}
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Dosage & Supply -->
                   <div class="grid md:grid-cols-2 gap-8">
                      <div class="space-y-4">
                        <label class="block text-xl font-serif text-stone-800">Potency (per serving)</label>
                        <div class="flex flex-wrap gap-3">
                          @for (opt of dosageOptions; track opt) {
                            <button 
                              (click)="selectedDosage.set(opt)"
                              [class.bg-stone-800]="selectedDosage() === opt"
                              [class.text-stone-50]="selectedDosage() === opt"
                              [class.bg-stone-100]="selectedDosage() !== opt"
                              [class.text-stone-600]="selectedDosage() !== opt"
                              class="py-3 px-5 rounded transition-all font-medium border border-transparent hover:border-stone-400 text-sm flex-grow md:flex-grow-0"
                            >
                              {{ opt }}
                            </button>
                          }
                        </div>
                      </div>

                      <div class="space-y-4">
                        <label class="block text-xl font-serif text-stone-800">Supply Size</label>
                        <div class="flex flex-wrap gap-3">
                          @for (opt of packSizeOptions; track opt) {
                            <button 
                              (click)="selectedPackSize.set(opt)"
                              [class.bg-stone-800]="selectedPackSize() === opt"
                              [class.text-stone-50]="selectedPackSize() === opt"
                              [class.bg-stone-100]="selectedPackSize() !== opt"
                              [class.text-stone-600]="selectedPackSize() !== opt"
                              class="py-3 px-5 rounded transition-all font-medium border border-transparent hover:border-stone-400 text-sm flex-grow md:flex-grow-0"
                            >
                              {{ opt }}
                            </button>
                          }
                        </div>
                      </div>
                   </div>
               </div>
            </div>


            <!-- SECTION 4: The Essence -->
            <div>
              <h3 class="text-sm font-bold tracking-[0.2em] text-rose-900 uppercase mb-8 border-b border-rose-200 pb-2">IV. The Essence</h3>

              <!-- Flavors -->
              <div class="space-y-6 mb-10">
                <label class="block text-2xl font-serif text-stone-800">Which flavors speak to your soul?</label>
                <p class="text-stone-500 text-sm italic">Select up to 3</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  @for (flavor of flavorOptions(); track flavor) {
                    <button 
                      (click)="toggleFlavor(flavor)"
                      [class.bg-rose-900]="selectedFlavors().includes(flavor)"
                      [class.text-white]="selectedFlavors().includes(flavor)"
                      [class.bg-stone-100]="!selectedFlavors().includes(flavor)"
                      [class.text-stone-600]="!selectedFlavors().includes(flavor)"
                      class="py-4 px-2 rounded transition-all duration-300 hover:shadow-md font-medium text-center relative overflow-hidden group"
                    >
                      <span class="relative z-10">{{ flavor }}</span>
                      <!-- Subtle glow for custom items if needed, but keeping it clean for now -->
                    </button>
                  }
                </div>
                
                <!-- Custom Flavor Input -->
                <div class="flex gap-3 mt-4 items-center">
                   <input 
                     [(ngModel)]="customFlavorInput" 
                     (keyup.enter)="addCustomFlavor()"
                     type="text" 
                     placeholder="Or create your own (e.g., Strawberry Basil)..." 
                     class="flex-grow p-3 bg-stone-50 border border-stone-200 rounded focus:border-rose-900 outline-none placeholder-stone-400"
                   >
                   <button 
                     (click)="addCustomFlavor()"
                     [disabled]="!customFlavorInput.trim()"
                     class="px-6 py-3 bg-stone-800 text-white font-serif tracking-wide rounded hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                   >
                     ADD
                   </button>
                </div>
              </div>

              <!-- Benefits -->
              <div class="space-y-6">
                <label class="block text-2xl font-serif text-stone-800">What is your primary goal?</label>
                <div class="flex flex-wrap gap-3">
                  @for (need of needOptions; track need) {
                     <button 
                      (click)="toggleNeed(need)"
                      [class.ring-2]="selectedNeeds().includes(need)"
                      [class.ring-rose-900]="selectedNeeds().includes(need)"
                      [class.bg-rose-50]="selectedNeeds().includes(need)"
                      class="px-6 py-3 rounded-full border border-stone-300 text-stone-700 hover:border-rose-900 transition-all"
                    >
                      {{ need }}
                    </button>
                  }
                </div>
              </div>
            </div>

            <!-- SECTION 5: The Dream -->
            <div class="space-y-4">
              <label class="block text-2xl font-serif text-stone-800">Final Wishes</label>
              <textarea 
                [(ngModel)]="openTextInput"
                rows="4"
                class="w-full p-4 bg-stone-50 border border-stone-200 rounded focus:ring-1 focus:ring-rose-900 focus:border-rose-900 outline-none transition-all placeholder-stone-400"
                placeholder="Describe your perfect morning ritual or specific dietary needs..."
              ></textarea>
            </div>

            <button 
              (click)="submit()"
              [disabled]="!isValid()"
              class="w-full py-5 bg-stone-900 text-stone-50 font-serif text-xl tracking-widest hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              SEND TO THE ALCHEMIST
            </button>

          </div>
        }
      </div>
    </section>
  `
})
export class SurveyComponent {
  private gemini = inject(GeminiService);

  // Options
  flavorOptions = signal(['Yuzu Citrus', 'Wild Berry', 'Matcha', 'Ginger & Turmeric', 'Lychee', 'Hibiscus', 'White Peach', 'Jasmine']);
  needOptions = ['Radiant Skin', 'Deep Sleep', 'Joint Health', 'Mental Clarity', 'Energy Boost', 'Digestive Harmony'];
  packagingOptions = ['Glass Vials (50ml)', 'Eco-Sachets', 'Large Bottle (500ml)'];
  dosageOptions = ['Light (3g)', 'Standard (5g)', 'Intense (10g)'];
  packSizeOptions = ['7-Day Trial', '14-Day Reset', '30-Day Ritual', 'Quarterly Box'];
  sourceOptions = ['Marine (Wild Caught)'];
  experienceOptions = ['New to Collagen', 'Occasional User', 'Daily Ritualist'];

  // State
  nameInput = '';
  emailInput = '';
  selectedFlavors = signal<string[]>([]);
  selectedNeeds = signal<string[]>([]);
  selectedPackaging = signal<string>('');
  selectedDosage = signal<string>('');
  selectedPackSize = signal<string>('');
  selectedSource = signal<string>('Marine (Wild Caught)');
  selectedExperience = signal<string>('');
  
  customFlavorInput = '';
  openTextInput = '';
  
  isLoading = signal(false);
  result = signal<string | null>(null);

  isValid = computed(() => {
    return this.nameInput.length > 0 &&
           this.emailInput.length > 0 &&
           this.selectedSource() !== '' &&
           this.selectedExperience() !== '' &&
           this.selectedFlavors().length > 0 &&
           this.selectedNeeds().length > 0 &&
           this.selectedPackaging() !== '' &&
           this.selectedDosage() !== '' &&
           this.selectedPackSize() !== '';
  });

  toggleFlavor(flavor: string) {
    this.selectedFlavors.update(current => {
      if (current.includes(flavor)) {
        return current.filter(f => f !== flavor);
      } else {
        if (current.length >= 3) return current;
        return [...current, flavor];
      }
    });
  }
  
  addCustomFlavor() {
    const val = this.customFlavorInput.trim();
    if (!val) return;
    
    // Check duplication
    const existing = this.flavorOptions().find(f => f.toLowerCase() === val.toLowerCase());
    
    if (existing) {
       // Just toggle it if it exists
       if (!this.selectedFlavors().includes(existing)) {
         this.toggleFlavor(existing);
       }
    } else {
       // Add new option and select it
       this.flavorOptions.update(opts => [...opts, val]);
       this.toggleFlavor(val);
    }
    
    this.customFlavorInput = '';
  }

  toggleNeed(need: string) {
    this.selectedNeeds.update(current => {
      if (current.includes(need)) {
        return current.filter(n => n !== need);
      } else {
        return [...current, need];
      }
    });
  }

  async submit() {
    if (!this.isValid()) return;

    this.isLoading.set(true);
    
    // In a real app, we would POST this data to a backend here.
    console.log('Submission:', {
       name: this.nameInput,
       email: this.emailInput,
       source: this.selectedSource(),
       experience: this.selectedExperience(),
       packaging: this.selectedPackaging(),
       dosage: this.selectedDosage(),
       packSize: this.selectedPackSize(),
       flavors: this.selectedFlavors(),
       needs: this.selectedNeeds(),
       note: this.openTextInput
    });

    const response = await this.gemini.analyzePreferences(
      this.nameInput,
      this.selectedFlavors(), 
      this.selectedNeeds(), 
      this.selectedSource(),
      this.selectedExperience(),
      this.selectedPackaging(),
      this.selectedDosage(),
      this.selectedPackSize(),
      this.openTextInput
    );

    this.result.set(response);
    this.isLoading.set(false);
  }

  reset() {
    this.nameInput = '';
    this.emailInput = '';
    this.selectedFlavors.set([]);
    this.selectedNeeds.set([]);
    this.selectedPackaging.set('');
    this.selectedDosage.set('');
    this.selectedPackSize.set('');
    this.selectedSource.set('Marine (Wild Caught)');
    this.selectedExperience.set('');
    this.openTextInput = '';
    this.result.set(null);
    this.flavorOptions.set(['Yuzu Citrus', 'Wild Berry', 'Matcha', 'Ginger & Turmeric', 'Lychee', 'Hibiscus', 'White Peach', 'Jasmine']);
  }
}