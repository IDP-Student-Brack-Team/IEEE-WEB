import { BackButton } from '@/components/BackButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar simulado */}
      <nav className="bg-white shadow-sm py-4 px-6 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">IEEE</h1>
      </nav>

      {/* Botão Voltar - posicionado abaixo do navbar, antes do hero */}
      <BackButton href="/ieee" />

      {/* Hero / Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workshop de Inteligência Artificial Aplicada
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            15 de Dezembro, 2025 • Laboratório de Computação - Bloco A
          </p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Sobre o Workshop</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Aprenda a aplicar técnicas de IA em projetos reais. Neste
              workshop, você vai aprender sobre redes neurais, machine learning
              e deep learning com exemplos práticos e hands-on.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Uma experiência única para desenvolvedores e estudantes
              interessados em inteligência artificial. Contaremos com
              palestrantes renomados e exercícios práticos para fixação do
              conteúdo.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">
              O que você vai aprender
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Fundamentos de Machine Learning</li>
              <li>Redes Neurais e Deep Learning</li>
              <li>Frameworks como TensorFlow e PyTorch</li>
              <li>Projetos práticos hands-on</li>
              <li>Deployment de modelos em produção</li>
            </ul>
          </div>
        </div>

        {/* Demonstração do botão em diferentes contextos */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Demonstração do Botão Voltar
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">
                Com router.back() (padrão)
              </h3>
              <BackButton />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Com link customizado</h3>
              <BackButton href="/ieee" label="Voltar para IEEE" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Label personalizado</h3>
              <BackButton label="Voltar aos eventos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
