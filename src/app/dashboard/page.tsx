'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dog,
  Plus,
  Trophy,
  TrendingUp,
  Calendar,
  LogOut,
  Sparkles,
  Target,
  Clock,
  Award,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Dog = {
  id: string;
  name: string;
  breed: string;
  age_months: number;
  behavior_issues: string[];
};

type TrainingSession = {
  id: string;
  exercise_name: string;
  duration_minutes: number;
  success_rate: number;
  completed_at: string;
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDog, setShowAddDog] = useState(false);
  const [showAddSession, setShowAddSession] = useState(false);

  const [newDog, setNewDog] = useState({
    name: '',
    breed: '',
    age_months: 0,
    behavior_issues: '',
  });

  const [newSession, setNewSession] = useState({
    exercise_name: '',
    duration_minutes: 0,
    success_rate: 0,
    notes: '',
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          loadDogs(session.user.id);
          setLoading(false);
        } else if (event === 'INITIAL_SESSION' && !session) {
          router.push('/login');
        } else if (event === 'SIGNED_OUT') {
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedDog) {
      loadSessions();
      loadAchievements();
    }
  }, [selectedDog]);

  const loadDogs = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar cachorros:', error);
      } else if (data && data.length > 0) {
        setDogs(data);
        setSelectedDog(data[0]);
      }
    } catch (err) {
      console.error('Erro de conexão:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSessions = async () => {
    if (!selectedDog) return;

    try {
      const { data, error } = await supabase
        .from('training_sessions')
        .select('*')
        .eq('dog_id', selectedDog.id)
        .order('completed_at', { ascending: false })
        .limit(10);

      if (!error && data) setSessions(data);
    } catch (err) {
      console.error('Erro ao carregar sessões:', err);
    }
  };

  const loadAchievements = async () => {
    if (!selectedDog) return;

    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('dog_id', selectedDog.id)
        .order('earned_at', { ascending: false });

      if (!error && data) setAchievements(data);
    } catch (err) {
      console.error('Erro ao carregar conquistas:', err);
    }
  };

  const handleAddDog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase
      .from('dogs')
      .insert({
        user_id: user.id,
        name: newDog.name,
        breed: newDog.breed,
        age_months: newDog.age_months,
        behavior_issues: newDog.behavior_issues
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      })
      .select()
      .single();

    if (data) {
      setDogs([data, ...dogs]);
      setSelectedDog(data);
      setShowAddDog(false);
      setNewDog({ name: '', breed: '', age_months: 0, behavior_issues: '' });

      // Criar plano de treinamento inicial
      await supabase.from('training_plans').insert({
        dog_id: data.id,
        name: 'Plano Inicial',
        description: 'Plano de treinamento personalizado baseado na idade e comportamento',
        difficulty: data.age_months < 6 ? 'beginner' : 'intermediate',
        duration_weeks: 8,
      });

      // Adicionar conquista de boas-vindas
      await supabase.from('achievements').insert({
        dog_id: data.id,
        title: 'Primeira Pata! 🐾',
        description: 'Cadastrou seu primeiro cachorro no AdestraCao',
        icon: '🐾',
      });

      loadAchievements();
    }
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDog) return;

    const { data, error } = await supabase
      .from('training_sessions')
      .insert({
        dog_id: selectedDog.id,
        exercise_name: newSession.exercise_name,
        duration_minutes: newSession.duration_minutes,
        success_rate: newSession.success_rate,
        notes: newSession.notes,
      })
      .select()
      .single();

    if (data) {
      setSessions([data, ...sessions]);
      setShowAddSession(false);
      setNewSession({
        exercise_name: '',
        duration_minutes: 0,
        success_rate: 0,
        notes: '',
      });

      // Verificar conquistas
      if (sessions.length + 1 === 5) {
        await supabase.from('achievements').insert({
          dog_id: selectedDog.id,
          title: 'Dedicação! 🎯',
          description: 'Completou 5 sessões de treinamento',
          icon: '🎯',
        });
        loadAchievements();
      }

      if (newSession.success_rate >= 90) {
        await supabase.from('achievements').insert({
          dog_id: selectedDog.id,
          title: 'Perfeição! ⭐',
          description: 'Alcançou 90% ou mais de sucesso em uma sessão',
          icon: '⭐',
        });
        loadAchievements();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const calculateStats = () => {
    if (sessions.length === 0) return { avgSuccess: 0, totalMinutes: 0, totalSessions: 0 };

    const avgSuccess =
      sessions.reduce((sum, s) => sum + s.success_rate, 0) / sessions.length;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);

    return {
      avgSuccess: Math.round(avgSuccess),
      totalMinutes,
      totalSessions: sessions.length,
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Dog className="w-16 h-16 text-purple-600 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
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
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dogs Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Meus Cachorros</h2>
            <Dialog open={showAddDog} onOpenChange={setShowAddDog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Cachorro
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Cachorro</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddDog} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={newDog.name}
                      onChange={(e) =>
                        setNewDog({ ...newDog, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="breed">Raça</Label>
                    <Input
                      id="breed"
                      value={newDog.breed}
                      onChange={(e) =>
                        setNewDog({ ...newDog, breed: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Idade (meses)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newDog.age_months}
                      onChange={(e) =>
                        setNewDog({
                          ...newDog,
                          age_months: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="issues">
                      Problemas de Comportamento (separados por vírgula)
                    </Label>
                    <Input
                      id="issues"
                      placeholder="Ex: pula nas pessoas, late muito"
                      value={newDog.behavior_issues}
                      onChange={(e) =>
                        setNewDog({ ...newDog, behavior_issues: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    Cadastrar
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {dogs.length === 0 ? (
            <Card className="p-8 text-center">
              <Dog className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Você ainda não cadastrou nenhum cachorro
              </p>
              <Button
                onClick={() => setShowAddDog(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Cadastrar Primeiro Cachorro
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dogs.map((dog) => (
                <Card
                  key={dog.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedDog?.id === dog.id
                      ? 'border-2 border-purple-600 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDog(dog)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Dog className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">{dog.name}</h3>
                      <p className="text-sm text-gray-600">
                        {dog.breed} • {Math.floor(dog.age_months / 12)}a{' '}
                        {dog.age_months % 12}m
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {selectedDog && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-purple-600" />
                  <span className="text-3xl font-bold text-purple-600">
                    {stats.avgSuccess}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">Taxa de Sucesso Média</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-pink-600" />
                  <span className="text-3xl font-bold text-pink-600">
                    {stats.totalMinutes}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Minutos de Treino</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-orange-600" />
                  <span className="text-3xl font-bold text-orange-600">
                    {stats.totalSessions}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Sessões Completas</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-8 h-8 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">
                    {achievements.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Conquistas</p>
              </Card>
            </div>

            {/* Training Sessions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Sessões de Treino</h2>
                  <Dialog open={showAddSession} onOpenChange={setShowAddSession}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Sessão
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Registrar Sessão de Treino</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddSession} className="space-y-4">
                        <div>
                          <Label htmlFor="exercise">Exercício</Label>
                          <Select
                            value={newSession.exercise_name}
                            onValueChange={(value) =>
                              setNewSession({ ...newSession, exercise_name: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o exercício" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Sentar">Sentar</SelectItem>
                              <SelectItem value="Deitar">Deitar</SelectItem>
                              <SelectItem value="Ficar">Ficar</SelectItem>
                              <SelectItem value="Vir quando chamado">
                                Vir quando chamado
                              </SelectItem>
                              <SelectItem value="Andar na guia">
                                Andar na guia
                              </SelectItem>
                              <SelectItem value="Não pular">Não pular</SelectItem>
                              <SelectItem value="Socialização">
                                Socialização
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="duration">Duração (minutos)</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={newSession.duration_minutes}
                            onChange={(e) =>
                              setNewSession({
                                ...newSession,
                                duration_minutes: parseInt(e.target.value),
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="success">Taxa de Sucesso (%)</Label>
                          <Input
                            id="success"
                            type="number"
                            min="0"
                            max="100"
                            value={newSession.success_rate}
                            onChange={(e) =>
                              setNewSession({
                                ...newSession,
                                success_rate: parseInt(e.target.value),
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Observações</Label>
                          <Textarea
                            id="notes"
                            value={newSession.notes}
                            onChange={(e) =>
                              setNewSession({ ...newSession, notes: e.target.value })
                            }
                            placeholder="Como foi a sessão?"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          Registrar Sessão
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {sessions.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Nenhuma sessão registrada ainda
                    </p>
                    <Button
                      onClick={() => setShowAddSession(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      Registrar Primeira Sessão
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <Card key={session.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{session.exercise_name}</h3>
                            <p className="text-sm text-gray-600">
                              {session.duration_minutes} min •{' '}
                              {new Date(session.completed_at).toLocaleDateString(
                                'pt-BR'
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-2xl font-bold ${
                                session.success_rate >= 80
                                  ? 'text-green-600'
                                  : session.success_rate >= 60
                                  ? 'text-orange-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {session.success_rate}%
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Conquistas</h2>
                {achievements.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Continue treinando para desbloquear conquistas!
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className="p-4 bg-gradient-to-r from-purple-50 to-pink-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{achievement.icon}</div>
                          <div>
                            <h3 className="font-bold">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(achievement.earned_at).toLocaleDateString(
                                'pt-BR'
                              )}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
