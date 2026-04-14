'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dog, CheckCircle, ArrowLeft, Clock, Star, AlertTriangle, Heart, Sparkles, ChevronRight, Trophy } from 'lucide-react';

const exercicios = [
  {
    titulo: 'Correção de Latido Excessivo',
    descricao: 'Ensine o cão a parar de latir por comando, identificando e tratando a causa.',
    duracao: '10 min',
    frequencia: '2x ao dia',
    dificuldade: 'Intermediário',
    passos: [
      'Identifique o gatilho: visita, barulho, isolamento ou carência?',
      'Quando latir, diga "silêncio" com voz firme mas calma — não grite',
      'Aguarde qualquer pausa no latido e recompense imediatamente',
      'Aumente gradualmente o tempo de silêncio exigido antes da recompensa',
    ],
  },
  {
    titulo: 'Lugar (Manda para a Cama)',
    descricao: 'Ensine o cão a ir para um lugar específico e ficar lá até ser liberado.',
    duracao: '15 min',
    frequencia: '2x ao dia',
    dificuldade: 'Intermediário',
    passos: [
      'Leve o cão até a cama ou tapete e recompense quando se deitar lá',
      'Adicione o comando "lugar" ao enviar para a cama',
      'Introduza distância: envie de 1m, depois 3m, depois de outra sala',
      'Use em situações reais: visitas chegando, hora da refeição da família',
    ],
  },
  {
    titulo: 'Largue (Drop It)',
    descricao: 'Comando essencial para segurança — soltar objetos perigosos ou roubados.',
    duracao: '10 min',
    frequencia: '2x ao dia',
    dificuldade: 'Intermediário',
    passos: [
      'Ofereça um brinquedo ao cão e deixe ele pegar na boca',
      'Aproxime um petisco saboroso do nariz — a maioria solta o brinquedo',
      'No momento que soltar, diga "larga!" e ofereça o petisco',
      'Devolva o brinquedo depois — o cão aprende que soltar não significa perder',
    ],
  },
  {
    titulo: 'Não Pule nas Pessoas',
    descricao: 'Ensine o cão a cumprimentar pessoas com as quatro patas no chão.',
    duracao: '10 min',
    frequencia: 'Toda vez que houver cumprimento',
    dificuldade: 'Intermediário',
    passos: [
      'Quando o cão pular, vire de costas completamente e ignore',
      'Assim que as quatro patas tocarem o chão, vire-se e cumpriemente carinhosamente',
      'Se pular de novo, vire de costas novamente',
      'Peça que visitas façam o mesmo — consistência de todos é fundamental',
    ],
  },
  {
    titulo: 'Truques Avançados (Rola, Dá a Pata, Cobra)',
    descricao: 'Truques estimulam mentalmente e fortalecem o vínculo entre cão e tutor.',
    duracao: '10-15 min',
    frequencia: '3x por semana',
    dificuldade: 'Avançado',
    passos: [
      'Comece pelo truque mais simples: "dá a pata" — toque a pata e recompense',
      'Use shaping: recompense pequenos passos em direção ao comportamento final',
      'Mantenha as sessões curtas e divertidas — 5-10 repetições por truque',
      'Encerre sempre com algo que o cão já sabe bem para terminar no sucesso',
    ],
  },
  {
    titulo: 'Enriquecimento Ambiental',
    descricao: 'Atividades mentais para prevenir comportamentos destrutivos por tédio.',
    duracao: '20-30 min',
    frequencia: 'Diariamente',
    dificuldade: 'Iniciante',
    passos: [
      'Use Kongs recheados, brinquedos de puzzles e esconde-esconde com petiscos',
      'Faça caminhadas de "sniffari" — deixe o cão farejar em ritmo próprio',
      'Apresente novos objetos, texturas e ambientes para explorar',
      'Varie os percursos do passeio para estimular o faro e a curiosidade',
    ],
  },
];

const alertas = [
  'Cães adultos podem ter hábitos antigos — exige mais paciência e repetições',
  'Nunca é tarde para treinar — cães adultos aprendem muito bem com reforço positivo',
  'Verifique se comportamentos problemáticos têm causa médica (dor, ansiedade)',
  'Exercício físico adequado reduz comportamentos indesejados por excesso de energia',
];

export default function AdultoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dog className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AdestraCao
            </span>
          </Link>
          <Link href="/login">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Criar Plano Grátis
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o início
        </Link>
      </div>

      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Trophy className="w-9 h-9 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3 h-3" /> Fase Madura
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Adestramento de Cães Adultos</h1>
            <p className="text-gray-500 mt-1">1 a 7 anos de idade</p>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          Cães adultos têm capacidade total de aprendizado e concentração. É o momento ideal para corrigir
          comportamentos indesejados, introduzir comandos avançados e enriquecer a vida do seu cão
          com desafios mentais e físicos.
        </p>

        <Card className="p-5 border-l-4 border-amber-400 bg-amber-50 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 mb-2">Pontos importantes para cães adultos:</p>
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

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Exercícios e Atividades</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {exercicios.map((ex, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">{ex.titulo}</h3>
                <span className="text-xs bg-orange-100 text-orange-700 font-medium px-2 py-1 rounded-full shrink-0 ml-2">
                  {ex.dificuldade}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{ex.descricao}</p>
              <div className="flex gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-400" /> {ex.duracao}
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

        <Card className="p-8 text-center bg-orange-500 text-white border-0 shadow-xl">
          <Heart className="w-12 h-12 mx-auto mb-4 text-orange-200" />
          <h3 className="text-2xl font-bold mb-2">Registre o progresso do seu cão adulto</h3>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Acompanhe cada sessão, monitore a evolução e celebre as conquistas do seu companheiro.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8">
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
            <Link href="/adestramento/idoso">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">Idosos (7+ anos)</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
