'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dog, CheckCircle, ArrowLeft, Clock, Star, AlertTriangle, Heart, Sparkles, ChevronRight, PawPrint } from 'lucide-react';

const exercicios = [
  {
    titulo: 'Revisão de Comandos Básicos',
    descricao: 'Mantenha o cérebro ativo revisando os comandos que o cão já conhece.',
    duracao: '5-10 min',
    frequencia: 'Diariamente',
    dificuldade: 'Leve',
    passos: [
      'Pratique sentar, deitar, ficar e vir de forma suave e sem pressa',
      'Use recompensas de alto valor — cães idosos merecem os melhores petiscos',
      'Encerre a sessão antes que o cão demonstre cansaço',
      'Fique atento a sinais de desconforto: relutância em sentar pode indicar dor',
    ],
  },
  {
    titulo: 'Jogos de Faro (Nose Work)',
    descricao: 'Estimule mentalmente sem exigir esforço físico — ideal para cães idosos.',
    duracao: '10-15 min',
    frequencia: '2x ao dia',
    dificuldade: 'Leve',
    passos: [
      'Esconda petiscos em caixas ou ao redor da sala e deixe o cão encontrar',
      'Aumente a dificuldade gradualmente: debaixo de tapetes, atrás de móveis',
      'O jogo de faro é mentalmente cansativo mas fisicamente leve — perfeito',
      'Termine antes de o cão perder o interesse para manter a motivação alta',
    ],
  },
  {
    titulo: 'Caminhadas Adaptadas',
    descricao: 'Passeios mais curtos e lentos, no ritmo do cão, respeitando os limites físicos.',
    duracao: '15-20 min',
    frequencia: 'Diariamente',
    dificuldade: 'Leve',
    passos: [
      'Prefira superfícies macias: grama, terra batida — evite asfalto quente',
      'Permita que o cão fique mais tempo farejando — o faro é seu maior prazer',
      'Observe claudicação, respiração acelerada ou relutância em continuar',
      'Evite os horários de calor intenso — manhã cedo ou final da tarde',
    ],
  },
  {
    titulo: 'Enriquecimento Cognitivo Leve',
    descricao: 'Brinquedos interativos e puzzles para estimular sem sobrecarregar.',
    duracao: '15 min',
    frequencia: '1-2x ao dia',
    dificuldade: 'Leve',
    passos: [
      'Use brinquedos de nível fácil/médio — puzzles que o cão já conhece e consegue resolver',
      'Kongs recheados com comida úmida são excelentes e não exigem esforço articular',
      'Licquete de comidas favoritas em tapetes de lambida — relaxante e estimulante',
      'Rotacione os brinquedos para manter a novidade e o interesse',
    ],
  },
  {
    titulo: 'Massagem e Toque Terapêutico',
    descricao: 'Fortaleça o vínculo e ajude na circulação e conforto articular do cão idoso.',
    duracao: '10 min',
    frequencia: 'Diariamente',
    dificuldade: 'Leve',
    passos: [
      'Comece pelos ombros e pescoço com movimentos circulares suaves',
      'Vá em direção ao dorso e flancos, observando a reação do cão',
      'Evite áreas com inflamação, nódulos ou sensibilidade aparente',
      'Se o cão demonstrar prazer, expanda para as patas — excelente para circulação',
    ],
  },
  {
    titulo: 'Adaptação de Ambiente',
    descricao: 'Ajustes no lar para tornar o cotidiano mais fácil e seguro para o cão idoso.',
    duracao: 'Contínuo',
    frequencia: 'Ajuste progressivo',
    dificuldade: 'Leve',
    passos: [
      'Coloque tapetes antiderrapantes em superfícies escorregadias',
      'Ofereça cama ortopédica com memória de forma próxima a um local de fácil acesso',
      'Considere rampas em vez de escadas para subir em sofás ou carros',
      'Mantenha água sempre acessível em múltiplos pontos da casa',
    ],
  },
];

const alertas = [
  'Consulte o veterinário regularmente — mudanças de comportamento podem indicar dor ou doença',
  'Reduza a intensidade e duração dos exercícios conforme necessário',
  'Cães idosos podem desenvolver perda de audição ou visão — adapte os sinais de comando',
  'O conforto e a qualidade de vida têm prioridade sobre o aprendizado de novos comportamentos',
];

export default function IdosoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dog className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AdestraCao
            </span>
          </Link>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Criar Plano Grátis
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o início
        </Link>
      </div>

      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <PawPrint className="w-9 h-9 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3 h-3" /> Fase Sênior
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Adestramento de Cães Idosos</h1>
            <p className="text-gray-500 mt-1">7 anos ou mais de idade</p>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          Cães idosos merecem cuidado especial e um ritmo adaptado às suas necessidades. O foco nessa fase
          é manter a mente ativa, o corpo confortável e o vínculo com o tutor forte — com muito amor,
          paciência e respeito pelos limites físicos.
        </p>

        <Card className="p-5 border-l-4 border-amber-400 bg-amber-50 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 mb-2">Pontos importantes para cães idosos:</p>
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

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Atividades e Cuidados</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {exercicios.map((ex, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">{ex.titulo}</h3>
                <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded-full shrink-0 ml-2">
                  {ex.dificuldade}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{ex.descricao}</p>
              <div className="flex gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-400" /> {ex.duracao}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-purple-400" /> {ex.frequencia}
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

        <Card className="p-8 text-center bg-blue-600 text-white border-0 shadow-xl">
          <Heart className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h3 className="text-2xl font-bold mb-2">Cuide bem do seu companheiro sênior</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Registre as atividades, acompanhe o bem-estar e celebre cada momento especial com seu cão idoso.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8">
              Criar Plano Gratuito <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </Card>

        <div className="mt-10">
          <p className="text-center text-gray-500 text-sm mb-4">Veja também o treinamento para outras fases:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/adestramento/filhote">
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">Filhotes (0-6 meses)</Button>
            </Link>
            <Link href="/adestramento/jovem">
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">Jovens (6m - 1 ano)</Button>
            </Link>
            <Link href="/adestramento/adulto">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">Adultos (1-7 anos)</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
