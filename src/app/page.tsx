'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Brain, Trophy, Sparkles, Dog, Star, CheckCircle, TrendingUp, Bone, PawPrint } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Dog className="w-16 h-16 text-purple-600 animate-bounce" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dog className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AdestraCao
            </h1>
          </div>
          <Link href="/login">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Começar Agora
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Treinamento Inteligente com IA</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Adestre seu cão com amor, ciência e tecnologia
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Planos personalizados por idade, raça e comportamento. 
            IA adaptativa que evolui com seu melhor amigo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
                Criar Plano Personalizado
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              Ver Como Funciona
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">10k+</div>
              <div className="text-sm text-gray-600 mt-1">Cães Treinados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600">95%</div>
              <div className="text-sm text-gray-600 mt-1">Taxa de Sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">4.9</div>
              <div className="text-sm text-gray-600 mt-1">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher o AdestraCao?</h3>
          <p className="text-gray-600 text-lg">Tecnologia de ponta para resultados reais</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2">IA Adaptativa</h4>
            <p className="text-gray-600">
              Planos que evoluem automaticamente conforme o progresso do seu cão
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2">Métodos Positivos</h4>
            <p className="text-gray-600">
              100% baseado em reforço positivo e ciência comportamental
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2">Gamificação</h4>
            <p className="text-gray-600">
              Conquiste medalhas, suba de nível e mantenha a motivação alta
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-2">Acompanhamento</h4>
            <p className="text-gray-600">
              Relatórios detalhados de evolução e insights personalizados
            </p>
          </Card>
        </div>
      </section>

      {/* Training by Age */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Treinamento por Idade</h3>
          <p className="text-gray-600 text-lg">Cada fase da vida precisa de cuidados específicos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/adestramento/filhote" className="group">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:border-purple-300 group-hover:-translate-y-1 h-full cursor-pointer">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Dog className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">Filhotes</h4>
              <p className="text-sm text-gray-600 mb-4">0-6 meses</p>
              <ul className="text-left text-sm space-y-2 text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Socialização</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Xixi no lugar certo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Comandos básicos</span>
                </li>
              </ul>
              <span className="text-xs text-purple-600 font-semibold group-hover:underline">Ver guia completo →</span>
            </Card>
          </Link>

          <Link href="/adestramento/jovem" className="group">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:border-pink-300 group-hover:-translate-y-1 h-full cursor-pointer">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bone className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">Jovens</h4>
              <p className="text-sm text-gray-600 mb-4">6 meses - 1 ano</p>
              <ul className="text-left text-sm space-y-2 text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Obediência intermediária</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Controle de impulsos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Passeio sem puxar</span>
                </li>
              </ul>
              <span className="text-xs text-pink-600 font-semibold group-hover:underline">Ver guia completo →</span>
            </Card>
          </Link>

          <Link href="/adestramento/adulto" className="group">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:border-orange-300 group-hover:-translate-y-1 h-full cursor-pointer">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">Adultos</h4>
              <p className="text-sm text-gray-600 mb-4">1-7 anos</p>
              <ul className="text-left text-sm space-y-2 text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Correção comportamental</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Comandos avançados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Estímulo mental</span>
                </li>
              </ul>
              <span className="text-xs text-orange-600 font-semibold group-hover:underline">Ver guia completo →</span>
            </Card>
          </Link>

          <Link href="/adestramento/idoso" className="group">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group-hover:border-blue-300 group-hover:-translate-y-1 h-full cursor-pointer">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PawPrint className="w-10 h-10 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">Idosos</h4>
              <p className="text-sm text-gray-600 mb-4">7+ anos</p>
              <ul className="text-left text-sm space-y-2 text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Exercícios cognitivos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Treinos leves</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Qualidade de vida</span>
                </li>
              </ul>
              <span className="text-xs text-blue-600 font-semibold group-hover:underline">Ver guia completo →</span>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-12 text-center bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0">
          <Star className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Comece a transformação hoje
          </h3>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Junte-se a milhares de tutores que já transformaram a vida de seus cães
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
              Criar Meu Plano Grátis
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2024 AdestraCao. Adestramento com amor e ciência. 🐾</p>
        </div>
      </footer>
    </div>
  );
}
