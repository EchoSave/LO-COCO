"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FCD5BB] text-[#171512]">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src="/shop-header-photo.png"
          alt="About Us"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          About Us
        </h1>
      </div>

      {/* About Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-semibold">
            Style Made Simple
          </h2>

          <p className="text-[#6e655d] mt-4 text-lg leading-relaxed">
            We believe great style doesn't have to be complicated. Our
            collection is built around timeless pieces, comfortable
            materials, and modern designs that fit effortlessly into
            everyday life.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center bg-[#FFE2CF] rounded-lg p-6 border border-[#aaa096]">
            <h3 className="text-xl font-semibold">
              Quality
            </h3>

            <p className="text-[#6e655d] mt-3 leading-relaxed">
              We focus on comfortable materials and thoughtfully made
              pieces designed to last.
            </p>
          </div>

          <div className="text-center bg-[#FFE2CF] rounded-lg p-6 border border-[#aaa096]">
            <h3 className="text-xl font-semibold">
              Simplicity
            </h3>

            <p className="text-[#6e655d] mt-3 leading-relaxed">
              Clean designs and versatile styles make it easy to build
              a wardrobe you actually enjoy wearing.
            </p>
          </div>

          <div className="text-center bg-[#FFE2CF] rounded-lg p-6 border border-[#aaa096]">
            <h3 className="text-xl font-semibold">
              Everyday Style
            </h3>

            <p className="text-[#6e655d] mt-3 leading-relaxed">
              From relaxed basics to statement pieces, our collection
              is designed for real everyday life.
            </p>
          </div>
        </section>

        <section className="mt-16 bg-[#facbac] rounded-lg p-8 md:p-12 text-center border border-[#aaa096]">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Wear What Feels Like You
          </h2>

          <p className="text-[#6e655d] mt-4 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for everyday essentials or something
            new to refresh your wardrobe, we're here to help you find
            pieces that fit your style.
          </p>
        </section>
      </main>
    </div>
  );
}