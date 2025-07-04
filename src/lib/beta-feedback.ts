// Beta Feedback Collection System for Grace Church App
// Collects user feedback with name, email, and cell phone for follow-up

interface BetaFeedback {
  id?: string;
  name: string;
  email: string;
  cellPhone: string;
  feedbackType: 'bug' | 'feature' | 'general' | 'spiritual' | 'ui' | 'performance';
  rating: 1 | 2 | 3 | 4 | 5;
  message: string;
  currentPage?: string;
  userAgent?: string;
  timestamp: Date;
  followUpRequested: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface FeedbackSubmissionResponse {
  success: boolean;
  message: string;
  feedbackId?: string;
  error?: string;
}

interface FeedbackStats {
  totalFeedback: number;
  averageRating: number;
  feedbackByType: Record<string, number>;
  recentFeedback: BetaFeedback[];
}

class BetaFeedbackService {
  private apiEndpoint: string;

  constructor() {
    this.apiEndpoint = '/api/beta-feedback';
  }

  // Submit feedback to backend
  public async submitFeedback(feedback: Omit<BetaFeedback, 'id' | 'timestamp'>): Promise<FeedbackSubmissionResponse> {
    try {
      // Validate required fields
      const validation = this.validateFeedback(feedback);
      if (!validation.isValid) {
        return {
          success: false,
          message: validation.message || 'Please fill in all required fields.',
        };
      }

      // Prepare feedback data
      const feedbackData: BetaFeedback = {
        ...feedback,
        timestamp: new Date(),
        currentPage: window.location.pathname,
        userAgent: navigator.userAgent,
      };

      // Submit to backend
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show success message
      this.showFeedbackThankYou(feedback.name);

      return {
        success: true,
        message: 'Thank you for your feedback! We\'ll be in touch soon.',
        feedbackId: result.id,
      };

    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      // Fallback: store locally and show message
      this.storeFeedbackLocally(feedback);
      
      return {
        success: false,
        message: 'We\'re experiencing technical difficulties. Your feedback has been saved locally and we\'ll collect it soon.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Validate feedback data
  private validateFeedback(feedback: Omit<BetaFeedback, 'id' | 'timestamp'>): { isValid: boolean; message?: string } {
    if (!feedback.name || feedback.name.trim().length < 2) {
      return { isValid: false, message: 'Please enter your full name.' };
    }

    if (!feedback.email || !this.isValidEmail(feedback.email)) {
      return { isValid: false, message: 'Please enter a valid email address.' };
    }

    if (!feedback.cellPhone || !this.isValidPhoneNumber(feedback.cellPhone)) {
      return { isValid: false, message: 'Please enter a valid cell phone number.' };
    }

    if (!feedback.message || feedback.message.trim().length < 10) {
      return { isValid: false, message: 'Please provide more detailed feedback (at least 10 characters).' };
    }

    if (!feedback.rating || feedback.rating < 1 || feedback.rating > 5) {
      return { isValid: false, message: 'Please provide a rating from 1 to 5 stars.' };
    }

    return { isValid: true };
  }

  // Email validation
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone number validation (flexible format)
  private isValidPhoneNumber(phone: string): boolean {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it's a valid US phone number (10 digits) or international (7-15 digits)
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  }

  // Format phone number for storage
  public formatPhoneNumber(phone: string): string {
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length === 10) {
      // US format: (555) 123-4567
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      // US with country code: +1 (555) 123-4567
      return `+1 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
    } else {
      // International format: +XX XXXXXXXXX
      return `+${digitsOnly}`;
    }
  }

  // Store feedback locally as fallback
  private storeFeedbackLocally(feedback: Omit<BetaFeedback, 'id' | 'timestamp'>): void {
    try {
      const localFeedback = localStorage.getItem('grace_beta_feedback');
      const feedbackList = localFeedback ? JSON.parse(localFeedback) : [];
      
      feedbackList.push({
        ...feedback,
        id: `local_${Date.now()}`,
        timestamp: new Date().toISOString(),
        currentPage: window.location.pathname,
        userAgent: navigator.userAgent,
      });

      localStorage.setItem('grace_beta_feedback', JSON.stringify(feedbackList));
    } catch (error) {
      console.error('Error storing feedback locally:', error);
    }
  }

  // Get locally stored feedback (for admin/debugging)
  public getLocalFeedback(): BetaFeedback[] {
    try {
      const localFeedback = localStorage.getItem('grace_beta_feedback');
      return localFeedback ? JSON.parse(localFeedback) : [];
    } catch (error) {
      console.error('Error retrieving local feedback:', error);
      return [];
    }
  }

  // Clear local feedback (after successful sync)
  public clearLocalFeedback(): void {
    try {
      localStorage.removeItem('grace_beta_feedback');
    } catch (error) {
      console.error('Error clearing local feedback:', error);
    }
  }

  // Show thank you message
  private showFeedbackThankYou(name: string): void {
    // Create and show a beautiful thank you modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <div class="text-6xl mb-4">🙏</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Thank You, ${name}!</h3>
        <p class="text-gray-600 mb-6">
          Your feedback is precious to us and helps make Grace Church a better spiritual home for everyone. 
          We'll be in touch soon!
        </p>
        <button onclick="this.parentElement.parentElement.remove()" 
                class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
          God Bless ✨
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (modal.parentElement) {
        modal.remove();
      }
    }, 5000);
  }

  // Get feedback statistics (for admin dashboard)
  public async getFeedbackStats(): Promise<FeedbackStats | null> {
    try {
      const response = await fetch(`${this.apiEndpoint}/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching feedback stats:', error);
      return null;
    }
  }

  // Create feedback widget for easy access
  public createFeedbackWidget(): HTMLElement {
    const widget = document.createElement('div');
    widget.className = 'fixed bottom-6 right-6 z-40';
    widget.innerHTML = `
      <button id="feedback-trigger" 
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </button>
    `;

    // Add click handler
    widget.querySelector('#feedback-trigger')?.addEventListener('click', () => {
      this.showFeedbackModal();
    });

    return widget;
  }

  // Show feedback modal
  public showFeedbackModal(): void {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Share Your Feedback</h2>
            <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form id="feedback-form" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="name" required 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Your full name">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" name="email" required 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="your.email@example.com">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cell Phone *</label>
              <input type="tel" name="cellPhone" required 
                     class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="(555) 123-4567">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
              <select name="feedbackType" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="general">General Feedback</option>
                <option value="spiritual">Spiritual Experience</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="ui">User Interface</option>
                <option value="performance">Performance</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
              <div class="flex space-x-1" id="rating-stars">
                ${[1, 2, 3, 4, 5].map(i => `
                  <button type="button" data-rating="${i}" 
                          class="text-2xl text-gray-300 hover:text-yellow-400 transition-colors">
                    ⭐
                  </button>
                `).join('')}
              </div>
              <input type="hidden" name="rating" required>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Your Feedback *</label>
              <textarea name="message" required rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please share your thoughts, suggestions, or any issues you've encountered..."></textarea>
            </div>
            
            <div class="flex items-center">
              <input type="checkbox" name="followUpRequested" id="followUp" 
                     class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <label for="followUp" class="ml-2 text-sm text-gray-700">
                I'd like someone to follow up with me about this feedback
              </label>
            </div>
            
            <div class="flex space-x-3 pt-4">
              <button type="submit" 
                      class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                Submit Feedback 🙏
              </button>
              <button type="button" onclick="this.closest('.fixed').remove()" 
                      class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Add event listeners
    this.setupFeedbackModalHandlers(modal);
    document.body.appendChild(modal);
  }

  // Setup modal event handlers
  private setupFeedbackModalHandlers(modal: HTMLElement): void {
    const form = modal.querySelector('#feedback-form') as HTMLFormElement;
    const ratingStars = modal.querySelectorAll('#rating-stars button');
    const ratingInput = modal.querySelector('input[name="rating"]') as HTMLInputElement;

    // Rating stars handler
    ratingStars.forEach((star, index) => {
      star.addEventListener('click', () => {
        const rating = index + 1;
        ratingInput.value = rating.toString();
        
        ratingStars.forEach((s, i) => {
          s.textContent = i < rating ? '⭐' : '☆';
          s.className = i < rating ? 
            'text-2xl text-yellow-400 transition-colors' : 
            'text-2xl text-gray-300 hover:text-yellow-400 transition-colors';
        });
      });
    });

    // Form submission handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const feedback = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        cellPhone: this.formatPhoneNumber(formData.get('cellPhone') as string),
        feedbackType: formData.get('feedbackType') as BetaFeedback['feedbackType'],
        rating: parseInt(formData.get('rating') as string) as BetaFeedback['rating'],
        message: formData.get('message') as string,
        followUpRequested: formData.has('followUpRequested'),
        priority: 'medium' as const,
      };

      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;

      try {
        const result = await this.submitFeedback(feedback);
        
        if (result.success) {
          modal.remove();
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('Error submitting feedback. Please try again.');
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }
}

// Export singleton instance
export const betaFeedback = new BetaFeedbackService();

// Export types
export type { BetaFeedback, FeedbackSubmissionResponse, FeedbackStats };

