'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dog, CheckCircle, ArrowLeft, Clock, Star, AlertTriangle, Heart, Sparkles, ChevronRight } from 'lucide-react';

const exercicios = [
  {
    titulo: 'Nome e Contato Visual',
    descricao: 'Ensine o filhote a olhar para você quando chamado pelo nome.',
    duracao: '5 min',
    frequencia: '3x ao dia',
    dificuldade: 'Iniciante',
    passos: [
      'Pegue um petisco saboroso e coloque perto do seu rosto',
      'Diga o nome do filhote uma vez com voz alegre',
      'Assim que ele olhar para você, clique (ou diga "sim!") e ofereça o petisco',
      'Repita 5-10 vezes por sessão',
    ],
  },
  {
    titulo: 'Sentar',
    descricao: 'O primeiro comando formal — base para todo o treinamento futuro.',
    duracao: '5 min',
    frequencia: '3x ao dia',
    dificuldade: 'Iniciante',
    passos: [
      'Segure um petisco na mão fechada na altura do nariz do filhote',
      'Mova lentamente a mão para trás, em direção à cauda',
      'Assim que o traseiro tocar o chão, clique e recompense',
      'Adicione a palavra "senta" depois de algumas repetições bem-sucedidas',
    ],
  },
  {
    titulo: 'Socialização com Pessoas',
    descricao: 'Apresente o filhote a diferentes tipos de pessoas de forma positiva.',
    duracao: '15-30 min',
    frequencia: 'Diariamente',
    dificuldade: 'Iniciante',
    passos: [
      'Convide amigos e familiares para visitar (homens, mulheres, crianças)',
      'Peça que ofereçam petiscos ao filhote sem forçar o contato',
      'Deixe o filhote se aproximar no próprio ritmo',
      'Sempre encerre a interação em momento positivo',
    ],
  },
  {
    titulo: 'Lugar Certo para Fazer as Necessidades',
    descricao: 'Ensine onde e quando fazer xixi e cocô usando rotina e reforço positivo.',
    duracao: '2-3 min por saída',
    frequencia: 'A cada 2 horas',
    dificuldade: 'Iniciante',
    passos: [
      'Leve o filhote ao local desejado sempre nos mesmos horários (ao acordar, após comer, após brincar)',
      'Fique em silêncio e aguarde — não distraia com brincadeiras',
      'Assim que eliminar no local certo, celebre com muita alegria e petiscos',
      'Nunca punja acidentes dentro de casa — apenas limpe sem reação',
    ],
  },
  {
    titulo: 'Mordida Inibida',
    descricao: 'Ensine o filhote a controlar a força da mordida — essencial para a segurança.',
    duracao: '10 min',
    frequencia: '2x ao dia',
    dificuldade: 'Iniciante',
    passos: [
      'Durante a brincadeira, se o filhote morder com força, solte um "ai!" e pare a brincadeira por 10 segundos',
      'Retome a brincadeira calmamente',
      'Se morder forte novamente, repita a pausa',
      'Recompense com atenção e brincadeira quando brincar gentilmente',
    ],
  },
  {
    titulo: 'Familiarização com Colar e Guia',
    descricao: 'Acostume o filhote ao uso do colar e guia antes de sair para passear.',
    duracao: '10 min',
    frequencia: '2x ao dia',
    dificuldade: 'Iniciante',
    passos: [
      'Coloque o colar por alguns minutos, dando petiscos durante todo o tempo',
      'Após alguns dias, prenda a guia e deixe ela pendurada enquanto brinca',
      'Segure a guia levemente enquanto o filhote se move — não puxe',
      'Gradualmente comece a guiar com a guia dentro de casa antes de sair',
    ],
  },
];

const alertas = [
  'Sessões curtas de 5-10 minutos — filhotes têm atenção limitada',
  'Nunca use punição física ou voz agressiva',
  'Vacinas em dia antes de frequentar locais públicos',
  'Período crítico de socialização: 3 a 12 semanas — aproveite!',
];

export default function FilhotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dog className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AdestraCao
            </span>
          </Link>
          <Link href="/login">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Criar Plano Grátis
            </Button>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o início
        </Link>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Dog className="w-9 h-9 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3 h-3" /> Fase Inicial
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Adestramento de Filhotes</h1>
            <p className="text-gray-500 mt-1">0 a 6 meses de idade</p>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          Os primeiros meses são o período mais importante para formar a personalidade e os hábitos do seu cão.
          Com paciência, consistência e reforço positivo, você cria a base para um cão equilibrado e feliz para toda a vida.
        </p>

        {/* Alertas */}
        <Card className="p-5 border-l-4 border-amber-400 bg-amber-50 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 mb-2">Pontos importantes para filhotes:</p>
              <ul className="space-y-1">
                {alertas.map((a, i) => (
                  <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                    <span className="mt-0.5 text-amber-500">•</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Exercícios */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Exercícios e Atividades</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {exercicios.map((ex, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">{ex.titulo}</h3>
                <span className="text-xs bg-purple-100 text-purple-700 font-medium px-2 py-1 rounded-full shrink-0 ml-2">
                  {ex.dificuldade}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{ex.descricao}</p>

              <div className="flex gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-purple-400" /> {ex.duracao}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-pink-400" /> {ex.frequencia}
                </span>
              </div>

              <div className="space-y-2">
                {ex.passos.map((passo, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{passo}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="p-8 text-center bg-purple-600 text-white border-0 shadow-xl">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-200" />
          <h3 className="text-2xl font-bold mb-2">Quer um plano personalizado para seu filhote?</h3>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Cadastre seu cão e receba um plano de treinamento adaptado à raça, comportamento e personalidade dele.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8">
              Criar Plano Gratuito <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </Card>

        {/* Navegação para outras fases */}
        <div className="mt-10">
          <p className="text-center text-gray-500 text-sm mb-4">Veja também o treinamento para outras fases:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/adestramento/jovem">
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">Jovens (6m - 1 ano)</Button>
            </Link>
            <Link href="/adestramento/adulto">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">Adultos (1-7 anos)</Button>
            </Link>
            <Link href="/adestramento/idoso">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">Idosos (7+ anos)</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
