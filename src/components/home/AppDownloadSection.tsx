export default function AppDownloadSection() {
  return (
    <section className="py-8 md:py-12" aria-label="Download our app">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            {/* Text content */}
            <div className="p-6 md:p-10">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
                Téléchargez l'application Tsena
              </h2>
              <p className="text-muted text-sm mb-6">
                Profitez d'offres exclusives, d'un paiement plus rapide et du suivi de vos commandes.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#google-play"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Download on Google Play"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.28 13l2.418-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-tight opacity-80">GET IT ON</div>
                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
                <a
                  href="#app-store"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Download on the App Store"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-tight opacity-80">Download on the</div>
                    <div className="text-sm font-semibold leading-tight">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="hidden md:flex justify-center p-6">
              <div className="relative">
                <div className="w-52 h-[420px] bg-gray-900 rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
                  <div className="w-full h-6 bg-gray-900 flex justify-center items-end pb-1">
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full" />
                  </div>
                  <div className="h-full bg-gradient-to-b from-primary to-primary-dark flex flex-col items-center justify-center p-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-2xl">NR</span>
                    </div>
                    <span className="text-white font-bold text-lg">Tsena</span>
                    <span className="text-white/60 text-xs tracking-wider">MARKETPLACE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
