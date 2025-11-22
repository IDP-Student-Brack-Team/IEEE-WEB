import { EventCard } from "@/components/EventCard";

export default function Home() {
  const sampleEvents = [
    {
      id: "1",
      title: "Workshop de Inteligência Artificial Aplicada",
      description:
        "Aprenda a aplicar técnicas de IA em projetos reais. Neste workshop, você vai aprender sobre redes neurais, machine learning e deep learning com exemplos práticos e hands-on.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
      category: "WORKSHOP",
      date: "15 de Dezembro, 2025",
      location: "Laboratório de Computação - Bloco A",
      subscriberCount: 45,
      isFinished: false,
    },
    {
      id: "2",
      title: "Conferência Internacional de Robótica",
      description:
        "Participe da maior conferência de robótica do ano. Palestrantes renomados de todo o mundo compartilharão suas pesquisas e inovações na área.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
      category: "CONFERÊNCIA",
      date: "10 de Novembro, 2025",
      location: "Auditório Principal - Campus Central",
      subscriberCount: 120,
      isFinished: true,
    },
    {
      id: "3",
      title: "Hackathon IEEE 2025",
      description:
        "48 horas de pura inovação! Monte seu time e desenvolva soluções criativas para desafios reais. Prêmios incríveis para os vencedores.",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
      category: "WORKSHOP",
      date: "20 de Janeiro, 2026",
      location: "Centro de Inovação Tecnológica",
      subscriberCount: 78,
      isFinished: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Eventos IEEE
          </h1>
          <p className="text-lg text-gray-600">
            Confira os próximos eventos e inscreva-se agora
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
