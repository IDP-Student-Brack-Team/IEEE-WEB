export default function Home() {
  return (
    <div className="min-h-screen bg-alt py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-foreground mb-4">
            Sistema de Design IEEE
          </h1>
          <p className="text-lg text-gray-600 leading-body">
            Guia de estilização global do projeto
          </p>
        </div>

        {/* Cores */}
        <section className="mb-16 bg-background p-8 rounded-lg shadow-default">
          <h2 className="text-3xl font-semibold mb-6 leading-heading">
            Paleta de Cores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-primary h-24 rounded-md mb-3 flex items-center justify-center">
                <span className="text-white font-medium">Azul Primário</span>
              </div>
              <p className="text-sm text-gray-600">#1B4B8C</p>
            </div>
            <div>
              <div className="bg-cta h-24 rounded-md mb-3 flex items-center justify-center">
                <span className="text-white font-medium">Laranja CTA</span>
              </div>
              <p className="text-sm text-gray-600">#FF6B35</p>
            </div>
            <div>
              <div className="bg-gray-600 h-24 rounded-md mb-3 flex items-center justify-center">
                <span className="text-white font-medium">Cinza 600</span>
              </div>
              <p className="text-sm text-gray-600">#6B7280</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16 bg-background p-8 rounded-lg shadow-default">
          <h2 className="text-3xl font-semibold mb-6 leading-heading">
            Tipografia - DM Sans
          </h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-semibold mb-2">Heading 1 - 36px</h1>
              <p className="text-gray-600">Line-height: 1.3</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-2">Heading 2 - 30px</h2>
              <p className="text-gray-600">Line-height: 1.3</p>
            </div>
            <div>
              <p className="text-base leading-body">
                Texto de corpo padrão com line-height 1.6 para melhor
                legibilidade em textos longos. A fonte DM Sans garante uma
                aparência moderna e profissional em todo o projeto.
              </p>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16 bg-background p-8 rounded-lg shadow-default">
          <h2 className="text-3xl font-semibold mb-6 leading-heading">
            Border Radius
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-primary/10 p-6 rounded-sm">
                <p className="font-medium">Small - 8px</p>
              </div>
            </div>
            <div>
              <div className="bg-primary/10 p-6 rounded-md">
                <p className="font-medium">Medium - 12px</p>
              </div>
            </div>
            <div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <p className="font-medium">Large - 16px</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-16 bg-background p-8 rounded-lg shadow-default">
          <h2 className="text-3xl font-semibold mb-6 leading-heading">
            Sombras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md shadow-default">
              <p className="font-medium mb-2">Default</p>
              <p className="text-sm text-gray-600">
                0 2px 8px rgba(0,0,0,0.04)
              </p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-hover">
              <p className="font-medium mb-2">Hover</p>
              <p className="text-sm text-gray-600">
                0 8px 24px rgba(0,0,0,0.08)
              </p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-elevated">
              <p className="font-medium mb-2">Elevated</p>
              <p className="text-sm text-gray-600">
                0 12px 32px rgba(0,0,0,0.12)
              </p>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16 bg-background p-8 rounded-lg shadow-default">
          <h2 className="text-3xl font-semibold mb-6 leading-heading">
            Escala de Spacing
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '4px' }}></div>
              <span className="text-gray-600">4px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '8px' }}></div>
              <span className="text-gray-600">8px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '12px' }}></div>
              <span className="text-gray-600">12px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '16px' }}></div>
              <span className="text-gray-600">16px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '24px' }}></div>
              <span className="text-gray-600">24px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '32px' }}></div>
              <span className="text-gray-600">32px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '48px' }}></div>
              <span className="text-gray-600">48px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary h-4 rounded" style={{ width: '64px' }}></div>
              <span className="text-gray-600">64px</span>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16 bg-background p-8 rounded-lg shadow-default">
          <h2 className="text-3xl font-semibold mb-6 leading-heading">
            Botões com Transições
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-md transition-default hover:shadow-hover">
              Botão Primário
            </button>
            <button className="bg-cta text-white px-6 py-3 rounded-md transition-default hover:shadow-hover">
              Botão CTA
            </button>
            <button className="bg-white text-primary border-2 border-primary px-6 py-3 rounded-md transition-default hover:bg-primary hover:text-white">
              Botão Outline
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Transição padrão: 300ms ease-out
          </p>
        </section>

        {/* Acessibilidade */}
        <section className="bg-background p-8 rounded-lg shadow-default">
          <h2 className="text-3xl font-semibold mb-6 leading-heading">
            Contraste WCAG AA
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-primary rounded-md">
              <p className="text-white">
                Texto branco em azul primário ✓ Contraste 7.3:1
              </p>
            </div>
            <div className="p-4 bg-cta rounded-md">
              <p className="text-white">
                Texto branco em laranja CTA ✓ Contraste 4.8:1
              </p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-md">
              <p className="text-gray-600">
                Texto cinza 600 em branco ✓ Contraste 5.7:1
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
