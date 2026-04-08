'use client';

export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-outfit font-thin mb-2">Font Test Page</h1>
        <p className="text-gray-600 mb-12">Compare different fonts and weights to choose the best for your design system.</p>

        {/* Outfit Font */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Outfit (Headings Font)</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-thin (100)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-thin text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-normal (400)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-normal text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-semibold (600)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-semibold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Outfit - font-bold (700)</p>
              <p className="text-3xl sm:text-4xl font-outfit font-bold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>

        {/* Inter Font */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Inter (Body Font)</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Inter - font-normal (400)</p>
              <p className="text-lg font-inter font-normal text-gray-700">
                The quick brown fox jumps over the lazy dog. This is a sample paragraph demonstrating body text readability and clarity.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Inter - font-medium (500)</p>
              <p className="text-lg font-inter font-medium text-gray-700">
                The quick brown fox jumps over the lazy dog. This is a sample paragraph demonstrating body text readability and clarity.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Inter - font-semibold (600)</p>
              <p className="text-lg font-inter font-semibold text-gray-700">
                The quick brown fox jumps over the lazy dog. This is a sample paragraph demonstrating body text readability and clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Poppins Font */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Poppins (Alternative Font)</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Poppins - font-normal (400)</p>
              <p className="text-3xl sm:text-4xl font-poppins font-normal text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Poppins - font-semibold (600)</p>
              <p className="text-3xl sm:text-4xl font-poppins font-semibold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Poppins - font-bold (700)</p>
              <p className="text-3xl sm:text-4xl font-poppins font-bold text-[#48546A]">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </section>

        {/* Heading Hierarchy Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Heading Hierarchy Examples</h2>
          
          <div className="space-y-8">
            <div className="border border-gray-300 p-6 rounded-lg">
              <p className="text-sm text-gray-500 mb-4">H1 - Outfit Thin (100) - 4xl</p>
              <h1 className="text-4xl font-outfit font-thin mb-4 text-[#48546A]">This is an H1 Heading</h1>
              <p className="text-base font-inter font-normal text-gray-700">
                This is body text using Inter font at normal weight. It should be easy to read and provide good contrast with the heading.
              </p>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <p className="text-sm text-gray-500 mb-4">H2 - Outfit Semibold (600) - 2xl</p>
              <h2 className="text-2xl font-outfit font-semibold mb-4 text-[#48546A]">This is an H2 Heading</h2>
              <p className="text-base font-inter font-normal text-gray-700">
                This is body text using Inter font at normal weight. It should be easy to read and provide good contrast with the heading.
              </p>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <p className="text-sm text-gray-500 mb-4">H3 - Outfit Semibold (600) - lg</p>
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">This is an H3 Heading</h3>
              <p className="text-base font-inter font-normal text-gray-700">
                This is body text using Inter font at normal weight. It should be easy to read and provide good contrast with the heading.
              </p>
            </div>
          </div>
        </section>

        {/* Side-by-side Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Font Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">Outfit (Current)</h3>
              <p className="text-sm text-gray-600 mb-4">Modern, geometric, great for headings</p>
              <div className="space-y-3">
                <p className="text-2xl font-outfit font-thin">Thin (100)</p>
                <p className="text-2xl font-outfit font-normal">Normal (400)</p>
                <p className="text-2xl font-outfit font-semibold">Semibold (600)</p>
                <p className="text-2xl font-outfit font-bold">Bold (700)</p>
              </div>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">Inter (Current)</h3>
              <p className="text-sm text-gray-600 mb-4">Clean, readable, excellent for body text</p>
              <div className="space-y-3">
                <p className="text-base font-inter font-normal">Normal (400)</p>
                <p className="text-base font-inter font-medium">Medium (500)</p>
                <p className="text-base font-inter font-semibold">Semibold (600)</p>
                <p className="text-base font-inter font-bold">Bold (700)</p>
              </div>
            </div>

            <div className="border border-gray-300 p-6 rounded-lg">
              <h3 className="text-lg font-outfit font-semibold mb-4 text-[#48546A]">Poppins (Alternative)</h3>
              <p className="text-sm text-gray-600 mb-4">Rounded, friendly, semi-geometric</p>
              <div className="space-y-3">
                <p className="text-2xl font-poppins font-normal">Normal (400)</p>
                <p className="text-2xl font-poppins font-medium">Medium (500)</p>
                <p className="text-2xl font-poppins font-semibold">Semibold (600)</p>
                <p className="text-2xl font-poppins font-bold">Bold (700)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Setup Summary */}
        <section>
          <h2 className="text-3xl font-outfit font-semibold mb-6 pb-3 border-b-2 border-gray-300">Current Design System</h2>
          
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <p className="font-outfit font-semibold text-[#48546A] mb-2">H1 Headings:</p>
                <p className="text-gray-700">Outfit, font-thin (100), responsive sizes (4xl→6xl)</p>
              </div>
              <div>
                <p className="font-outfit font-semibold text-[#48546A] mb-2">H2-H4 Headings:</p>
                <p className="text-gray-700">Outfit, font-semibold (600), responsive sizes</p>
              </div>
              <div>
                <p className="font-outfit font-semibold text-[#48546A] mb-2">Body Text:</p>
                <p className="text-gray-700">Inter, font-normal (400), line-height 1.2</p>
              </div>
              <div>
                <p className="font-outfit font-semibold text-[#48546A] mb-2">Emphasis:</p>
                <p className="text-gray-700">Inter, font-medium (500) for labels and emphasis</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
