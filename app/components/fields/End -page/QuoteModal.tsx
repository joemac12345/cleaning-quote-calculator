/**
 * Quote Page (formerly QuoteModal)
 * 
 * Purpose:
 * - Displays the calculated cleaning quote to users after form submission
 * - Shows detailed pricing and time estimates for both first clean and ongoing maintenance
 * - Provides actions: "Book Now" button or "Edit Quote" to modify answers
 * 
 * When Rendered:
 * - Rendered by QuoteCalculator when isSubmitted state is true
 * - Shows full-page layout (not a modal overlay)
 * - Displays after all 8 form steps are completed
 * 
 * Data Displayed:
 * - Cleaning type/frequency (one-off, weekly, fortnightly, monthly)
 * - First clean price and estimated hours
 * - Maintenance price (if recurring cleaning)
 * - Company logo at top
 * 
 * User Actions:
 * - "Book Now": Navigates to /booking page
 * - "Edit Quote": Calls onEdit() to return to form for modifications
 */

'use client';

interface QuotePageProps {
  formData: Record<string, any>;
  quote: any;
  onEdit: () => void;
}

export default function QuotePage({ formData, quote, onEdit }: QuotePageProps) {

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-3 sm:pt-6 pb-6 sm:pb-12">
        {/* Logo Placeholder */}
        <div className="flex justify-start mb-1 -ml-4 sm:-ml-8">
          <img 
            src="/icons/WW635.jpg" 
            alt="Company Logo" 
            className="h-24 sm:h-40"
          />
        </div>
        
        <h3 className="text-lg sm:text-2xl font-bold mb-2 text-[#48546A]">Your Quote</h3>
        <p className="text-[#48546A] text-sm sm:text-base mb-6">Here's your personalised cleaning quote based on your requirements. Review the details below and contact us to proceed with your booking.</p>
        
        {/* Cleaning Type */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-[#48546A] mb-1">Cleaning Type</p>
          <p className="text-base sm:text-lg font-bold text-[#48546A] capitalize mb-2">
            {formData.frequency === 'one-off' ? 'One-off Cleaning' : 
             formData.frequency === 'weekly' ? 'Weekly Cleaning' :
             formData.frequency === 'fortnightly' ? 'Fortnightly Cleaning' :
             formData.frequency === 'monthly' ? 'Monthly Cleaning' : 'One-off Cleaning'}
          </p>
          <p className="text-xs sm:text-sm text-[#48546A]">
            {formData.frequency === 'one-off' ? 'A single cleaning visit to get your property spotless.' : 
             formData.frequency === 'weekly' ? 'Regular cleaning every week to maintain your space.' :
             formData.frequency === 'fortnightly' ? 'Cleaning every two weeks for consistent upkeep.' :
             formData.frequency === 'monthly' ? 'Monthly cleaning to keep your property fresh and clean.' : 'A single cleaning visit.'}
          </p>
        </div>

        {/* Maintenance Price - if recurring */}
        {quote.isRecurring && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex justify-between items-start sm:items-center gap-2 mb-3">
              <div>
                <span className="text-base sm:text-lg font-bold text-[#48546A]">Maintenance Price</span>
                <p className="text-xs sm:text-sm text-[#48546A] mt-2">Per clean going forward</p>
                <p className="text-xs text-[#48546A] mt-1">This is the regular price for each scheduled cleaning after your first appointment.</p>
                <p className="text-xs text-[#48546A] mt-3 font-medium">Estimated Maintenance Time: {quote.maintenanceHours}h {quote.maintenanceMinutes}m</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#48546A]">
                £{quote.maintenancePrice}
              </p>
            </div>
            <p className="text-xs text-[#48546A] mt-4 border-t border-blue-200 pt-3">Hours can be reduced for your Maintenance Cleans to suit your budget. Just ask and we can arrange.</p>
          </div>
        )}

        {/* Time Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex justify-between items-start gap-2 mb-3">
            <p className="text-base sm:text-lg font-bold text-[#48546A]">Your First Clean</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#48546A]">
              £{quote.firstCleanPrice}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#48546A] mb-2">Estimated Cleaning Time</p>
          <p className="text-lg sm:text-2xl font-bold text-[#48546A] mb-2">
            {quote.firstCleanHours}h {quote.firstCleanMinutes}m
          </p>
          <p className="text-xs sm:text-sm text-[#48546A]">This is our estimated time to complete your cleaning based on your requirements. Actual time may vary slightly.</p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        </div>

        <div className="flex gap-3 mb-4 sm:mb-6">
          <a
            href="/booking"
            className="flex-1 px-4 py-3 bg-[#48546A] text-white rounded-lg hover:bg-[#3a3f52] font-medium transition text-center"
          >
            Book Now
          </a>
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-3 bg-gray-200 text-[#48546A] rounded-lg hover:bg-gray-300 font-medium transition"
          >
            Edit Quote
          </button>
        </div>
      </div>
    </div>
  );
}
