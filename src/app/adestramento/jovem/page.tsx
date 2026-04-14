'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dog, CheckCircle, ArrowLeft, Clock, Star, AlertTriangle, Heart, Sparkles, ChevronRight, Bone } from 'lucide-react';

const exercicios = [
  {
    titulo: 'Fica (Stay)',
    descricao: 'Ensine o cão a permanecer no lugar mesmo com distrações ao redor.',
    duracao: '10 min',
    frequencia: '2x ao dia',
    dificuldade: 'Intermediário',
    passos: [
      'Peça para sentar e mostre a palma da mão aberta dizendo "fica"',
      'Aguarde 2-3 segundos, depois recompense sem o cão sair do lugar',
      'Aumente gradualmente o tempo (5s, 10s, 30s, 1min)',
      'Introduza distância: dê um passo para trás, retorne e recompense',
    ],
  },
  {
    titulo: 'Vem (Recall)',
    descricao: 'O comando mais importante para a segurança — o cão deve vir sempre que chamado.',
    duracao: '10 min',
    frequencia: '2x ao dia',
    dificuldade: 'Intermediário',
    passos: [
      'Comece dentro de casa com o cão a 1 metro de distância',
      'Chame pelo nome + "vem!" com voz animada e agachado',
      'Quando chegar, recompense GENEROSAMENTE — isso deve ser a melhor coisa do dia',
      'Nunca chame o cão para algo desagradável (banho, repreensão)',
    ],
  },
  {
    titulo: 'Deitar (Down)',
    descricao: 'Comando de relaxamento que auxilia no controle de impulsos.',
    duracao: '10 min',
    frequencia: '2x ao dia',
    dificuldade: 'Intermediário',
    passos: [
      'Com o cão sentado, segure o petisco na mão fechada na frente do nariz',
      'Mova lentamente para baixo em direção ao chão, entre as patas dianteiras',
      'Quando os cotovelos tocarem o chão, clique e recompense',
      'Adicione a palavra "deita" após o cão entender o movimento',
    ],
  },
  {
    titulo: 'Passeio sem Puxar',
    descricao: 'Ensine o cão jovem a andar ao lado sem tensão na guia.',
    duracao: '15-20 min',
    frequencia: 'Diariamente',
    dificuldade: 'Intermediário',
    passos: [
      'Comece o passeio; assim que a guia tensionar, pare completamente',
      'Aguarde o cão recuar e afrouxar a guia — então continue andando',
      'Recompense frequentemente quando andar ao lado com a guia folgada',
      'Seja consistente: nunca avance enquanto a guia estiver tensa',
    ],
  },
  {
    titulo: 'Controle de Impulsos — Aguarda pelo Alimento',
    descricao: 'Ensine o cão a esperar permissão antes de comer — disciplina e autocontrole.',
    duracao: '5 min',
    frequencia: '1x ao dia (na hora da comida)',
    dificuldade: 'Intermediário',
    passos: [
      'Coloque a tigela de comida no chão e, se o cão avançar, levante-a',
      'Repita até que o cão aguarde com as quatro patas no chão',
      'Diga "pode" e deixe comer',
      'Aumente gradualmente o tempo de espera',
    ],
  },
  {
    titulo: 'Socialização com Outros Cães',
    descricao: 'Encontros controlados com outros cães para desenvolver comunicação canina saudável.',
    duracao: '20-30 min',
    frequencia: '2-3x por semana',
    dificuldade: 'Intermediário',
    passos: [
      'Apresente cães calmos e vacinados em espaço neutro e aberto',
      'Deixe os cães se farejar livremente — não puxe a guia ao primeiro contato',
      'Se houver tensão, interrompa calmamente e tente novamente depois',
      'Recompense interações positivas e calmas',
    ],
  },
];

const alertas = [
  'Fase de "adolescência canina" — o cão pode testar limites e parecer ter esquecido comandos',
  'Consistência é fundamental: todos da família devem usar os mesmos comandos',
  'Aumente o desafio gradualmente — distrações, distância e duração',
  'Evite parques de cão livre se o cão ainda não tem recall confiável',
];

export default function JovemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Dog className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AdestraCao
            </span>
          </Link>
          <Link href="/login">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              Criar Plano Grátis
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o início
        </Link>
      </div>

      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Bone className="w-9 h-9 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3 h-3" /> Fase Intermediária
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Adestramento de Cães Jovens</h1>
            <p className="text-gray-500 mt-1">6 meses a 1 ano de idade</p>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          A fase jovem é marcada pela energia alta e pela "adolescência canina" — o cão começa a testar limites
          e explorar a independência. É o momento de solidificar os fundamentos e introduzir comandos de obediência
          intermediários com muita consistência.
        </p>

        <Card className="p-5 border-l-4 border-amber-400 bg-amber-50 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 mb-2">Pontos importantes para cães jovens:</p>
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
            <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">{ex.titulo}</h3>
                <span className="text-xs bg-pink-100 text-pink-700 font-medium px-2 py-1 rounded-full shrink-0 ml-2">
                  {ex.dificuldade}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{ex.descricao}</p>
              <div className="flex gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-pink-400" /> {ex.duracao}
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

        <Card className="p-8 text-center bg-pink-600 text-white border-0 shadow-xl">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-200" />
          <h3 className="text-2xl font-bold mb-2">Plano personalizado para seu cão jovem</h3>
          <p className="text-pink-100 mb-6 max-w-xl mx-auto">
            Cadastre seu cão e acompanhe o progresso de cada sessão de treinamento com métricas e conquistas.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 font-bold px-8">
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
