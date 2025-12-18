import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const crimeData = [
  { month: 'Янв', crimes: 245, resolved: 198 },
  { month: 'Фев', crimes: 268, resolved: 215 },
  { month: 'Мар', crimes: 289, resolved: 234 },
  { month: 'Апр', crimes: 312, resolved: 267 },
  { month: 'Май', crimes: 298, resolved: 251 },
  { month: 'Июн', crimes: 334, resolved: 289 },
];

const crimeTypes = [
  { name: 'Наркопреступления', value: 342, color: '#dc2626' },
  { name: 'Киберпреступления', value: 287, color: '#ea580c' },
  { name: 'Экономические', value: 198, color: '#d97706' },
  { name: 'Коррупция', value: 156, color: '#ca8a04' },
  { name: 'Прочие', value: 234, color: '#65a30d' },
];

const regions = [
  { name: 'Московская обл.', risk: 87, crimes: 423, trend: 'up' },
  { name: 'Санкт-Петербург', risk: 76, crimes: 356, trend: 'down' },
  { name: 'Свердловская обл.', risk: 68, crimes: 289, trend: 'up' },
  { name: 'Краснодарский край', risk: 54, crimes: 198, trend: 'stable' },
  { name: 'Ростовская обл.', risk: 49, crimes: 167, trend: 'down' },
];

const monitoringAlerts = [
  {
    id: 1,
    type: 'critical',
    source: 'Telegram',
    content: 'Выявлена активность подозрительных групп по распространению запрещенных веществ',
    keywords: ['наркотики', 'закладки', 'телеграм'],
    location: 'Московская область',
    time: '14:23',
  },
  {
    id: 2,
    type: 'high',
    source: 'VK',
    content: 'Обнаружены объявления о продаже прекурсоров для синтеза ПАВ',
    keywords: ['химреактивы', 'синтез'],
    location: 'Санкт-Петербург',
    time: '13:47',
  },
  {
    id: 3,
    type: 'medium',
    source: 'Форумы',
    content: 'Повышенная активность в даркнет-сегменте, обсуждение криптовалютных схем',
    keywords: ['криптовалюта', 'отмывание'],
    location: 'Свердловская область',
    time: '12:15',
  },
];

const predictiveModels = [
  {
    name: 'Модель прогноза наркопреступлений',
    accuracy: 87,
    status: 'active',
    lastUpdate: '18.12.2025 10:30',
    prediction: 'Ожидается рост на 12% в течение 30 дней',
  },
  {
    name: 'Модель выявления финансовых схем',
    accuracy: 82,
    status: 'active',
    lastUpdate: '18.12.2025 09:15',
    prediction: 'Выявлено 7 подозрительных транзакций',
  },
  {
    name: 'Модель идентификации криминальных групп',
    accuracy: 79,
    status: 'training',
    lastUpdate: '17.12.2025 18:45',
    prediction: 'Обучение на новых данных',
  },
];

const riskIndicators = [
  {
    category: 'Наркотрафик',
    level: 'critical',
    score: 92,
    indicators: [
      'Всплеск микротранзакций через анонимные сервисы (+340%)',
      'Рост интернет-запросов по синтезу веществ (+156%)',
      'Закупки химреактивов малыми предприятиями (+78%)',
    ],
  },
  {
    category: 'Киберпреступность',
    level: 'high',
    score: 78,
    indicators: [
      'Увеличение фишинговых атак на госструктуры (+89%)',
      'Обнаружены новые вредоносные программы (12 шт.)',
      'Активность бот-сетей в регионе (+45%)',
    ],
  },
  {
    category: 'Экономические преступления',
    level: 'medium',
    score: 54,
    indicators: [
      'Подозрительные операции с недвижимостью (+23%)',
      'Аномалии в финансовых потоках компаний (34 случая)',
      'Схемы уклонения от налогов (18 выявлено)',
    ],
  },
];

function Index() {
  const [activeTab, setActiveTab] = useState('monitoring');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-600';
      case 'medium':
        return 'bg-yellow-600';
      default:
        return 'bg-green-600';
    }
  };

  const getRiskBadgeVariant = (level: string): 'default' | 'destructive' | 'secondary' => {
    switch (level) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-government-dark">
      <header className="bg-government-navy border-b border-government-gold/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-government-gold rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="text-government-navy" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ГИАС Прокурорского надзора</h1>
                <p className="text-sm text-gray-400">
                  Государственная информационно-аналитическая система
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-government-gold text-government-gold">
                <Icon name="Shield" className="mr-1" size={14} />
                Защищенный канал
              </Badge>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-government-card border border-government-gold/20">
            <TabsTrigger
              value="monitoring"
              className="data-[state=active]:bg-government-gold data-[state=active]:text-government-navy"
            >
              <Icon name="MonitorDot" className="mr-2" size={16} />
              Мониторинг
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-government-gold data-[state=active]:text-government-navy"
            >
              <Icon name="LineChart" className="mr-2" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger
              value="risks"
              className="data-[state=active]:bg-government-gold data-[state=active]:text-government-navy"
            >
              <Icon name="AlertTriangle" className="mr-2" size={16} />
              Риски
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-government-gold data-[state=active]:text-government-navy"
            >
              <Icon name="FileText" className="mr-2" size={16} />
              Отчетность
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-government-card border-government-gold/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Преступлений сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">342</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <Icon name="TrendingDown" size={14} className="mr-1" />
                    -8% от вчера
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-government-card border-government-gold/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Раскрываемость
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">87.3%</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    +2.1% от прошлого месяца
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-government-card border-government-gold/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Критических угроз
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">23</div>
                  <p className="text-xs text-red-500 flex items-center mt-1">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    Требуют внимания
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-government-card border-government-gold/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Активных дел
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">1,247</div>
                  <p className="text-xs text-gray-400 flex items-center mt-1">
                    <Icon name="FileText" size={14} className="mr-1" />
                    В производстве
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Динамика преступности</CardTitle>
                <CardDescription className="text-gray-400">
                  Зарегистрировано и раскрыто преступлений за последние 6 месяцев
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={crimeData}>
                    <defs>
                      <linearGradient id="colorCrimes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="crimes"
                      stroke="#d4af37"
                      fillOpacity={1}
                      fill="url(#colorCrimes)"
                      name="Зарегистрировано"
                    />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorResolved)"
                      name="Раскрыто"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      Мониторинг информационного пространства
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Обнаружение противоправного контента в соцсетях, форумах и мессенджерах
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-600">
                    <Icon name="Activity" className="mr-1" size={14} />
                    Активен
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitoringAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="bg-government-dark border border-government-gold/10 rounded-lg p-4 hover:border-government-gold/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              alert.type === 'critical'
                                ? 'bg-red-600 animate-pulse'
                                : alert.type === 'high'
                                  ? 'bg-orange-600'
                                  : 'bg-yellow-600'
                            }`}
                          />
                          <Badge
                            variant={getRiskBadgeVariant(alert.type)}
                            className="font-medium"
                          >
                            {alert.type === 'critical'
                              ? 'Критический'
                              : alert.type === 'high'
                                ? 'Высокий'
                                : 'Средний'}
                          </Badge>
                          <Badge variant="outline" className="border-government-gold/30">
                            {alert.source}
                          </Badge>
                          <span className="text-xs text-gray-500">{alert.time}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-government-gold">
                          <Icon name="ExternalLink" size={16} />
                        </Button>
                      </div>
                      <p className="text-white mb-3">{alert.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                          {alert.keywords.map((keyword, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-government-navy text-government-gold border border-government-gold/20"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Icon name="MapPin" size={14} />
                          {alert.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Региональная криминогенная обстановка</CardTitle>
                <CardDescription className="text-gray-400">
                  Тепловая карта и статистика по регионам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regions.map((region, idx) => (
                    <div
                      key={idx}
                      className="bg-government-dark border border-government-gold/10 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon name="MapPin" className="text-government-gold" size={20} />
                          <span className="text-white font-medium">{region.name}</span>
                          {region.trend === 'up' ? (
                            <Icon name="TrendingUp" className="text-red-500" size={16} />
                          ) : region.trend === 'down' ? (
                            <Icon name="TrendingDown" className="text-green-500" size={16} />
                          ) : (
                            <Icon name="Minus" className="text-gray-500" size={16} />
                          )}
                        </div>
                        <span className="text-sm text-gray-400">{region.crimes} преступлений</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Уровень риска</span>
                          <span
                            className={`font-semibold ${
                              region.risk >= 80
                                ? 'text-red-500'
                                : region.risk >= 60
                                  ? 'text-orange-500'
                                  : 'text-yellow-500'
                            }`}
                          >
                            {region.risk}%
                          </span>
                        </div>
                        <Progress value={region.risk} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-government-card border-government-gold/20">
                <CardHeader>
                  <CardTitle className="text-white">Структура преступности</CardTitle>
                  <CardDescription className="text-gray-400">
                    Распределение по категориям
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={crimeTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {crimeTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-government-card border-government-gold/20">
                <CardHeader>
                  <CardTitle className="text-white">Сравнительный анализ</CardTitle>
                  <CardDescription className="text-gray-400">
                    Преступления по категориям
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={crimeTypes}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        angle={-15}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="value" fill="#d4af37" name="Количество" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Прогнозные модели</CardTitle>
                <CardDescription className="text-gray-400">
                  Машинное обучение и предиктивная аналитика
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveModels.map((model, idx) => (
                    <div
                      key={idx}
                      className="bg-government-dark border border-government-gold/10 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{model.name}</h4>
                          <p className="text-sm text-gray-400">
                            Последнее обновление: {model.lastUpdate}
                          </p>
                        </div>
                        <Badge
                          variant={model.status === 'active' ? 'default' : 'secondary'}
                          className={model.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}
                        >
                          {model.status === 'active' ? 'Активна' : 'Обучается'}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-400">Точность модели</span>
                            <span className="font-semibold text-government-gold">
                              {model.accuracy}%
                            </span>
                          </div>
                          <Progress value={model.accuracy} className="h-2" />
                        </div>
                        <div className="bg-government-navy/30 border border-government-gold/20 rounded p-3">
                          <p className="text-sm text-white">
                            <Icon
                              name="TrendingUp"
                              className="inline mr-2 text-government-gold"
                              size={16}
                            />
                            {model.prediction}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Корреляционный анализ</CardTitle>
                <CardDescription className="text-gray-400">
                  Выявленные взаимосвязи между факторами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-government-dark border border-government-gold/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Link" className="text-government-gold" size={20} />
                      <span className="text-white font-medium">
                        Сильная корреляция (r = 0.87)
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">
                      Рост интернет-запросов по синтезу веществ → Увеличение изъятий наркотиков
                      через 14-21 день
                    </p>
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      Подтверждено 23 случаями
                    </Badge>
                  </div>

                  <div className="bg-government-dark border border-government-gold/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Link" className="text-government-gold" size={20} />
                      <span className="text-white font-medium">
                        Умеренная корреляция (r = 0.64)
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">
                      Всплеск микротранзакций через анонимные сервисы → Активизация курьерских
                      сетей
                    </p>
                    <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                      Подтверждено 18 случаями
                    </Badge>
                  </div>

                  <div className="bg-government-dark border border-government-gold/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Link" className="text-government-gold" size={20} />
                      <span className="text-white font-medium">
                        Сильная корреляция (r = 0.92)
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">
                      Закупки химреактивов малыми предприятиями → Обнаружение подпольных
                      лабораторий
                    </p>
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      Подтверждено 31 случаем
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Индикаторы угроз</CardTitle>
                <CardDescription className="text-gray-400">
                  Автоматическая квалификация потенциальных рисков
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {riskIndicators.map((risk, idx) => (
                    <div
                      key={idx}
                      className="bg-government-dark border border-government-gold/10 rounded-lg p-5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getRiskColor(risk.level)} ${
                              risk.level === 'critical' ? 'animate-pulse' : ''
                            }`}
                          />
                          <h3 className="text-xl font-semibold text-white">{risk.category}</h3>
                          <Badge variant={getRiskBadgeVariant(risk.level)} className="ml-2">
                            {risk.level === 'critical'
                              ? 'Критический'
                              : risk.level === 'high'
                                ? 'Высокий'
                                : 'Средний'}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-government-gold">
                            {risk.score}
                          </div>
                          <div className="text-xs text-gray-400">Балл риска</div>
                        </div>
                      </div>

                      <Progress value={risk.score} className="h-3 mb-4" />

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-400 uppercase">
                          Выявленные индикаторы:
                        </h4>
                        {risk.indicators.map((indicator, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 bg-government-navy/30 border border-government-gold/10 rounded p-3"
                          >
                            <Icon
                              name="AlertCircle"
                              className="text-government-gold flex-shrink-0 mt-0.5"
                              size={18}
                            />
                            <span className="text-white text-sm">{indicator}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button className="bg-government-gold text-government-navy hover:bg-government-gold/90">
                          <Icon name="FileText" className="mr-2" size={16} />
                          Сформировать протокол
                        </Button>
                        <Button variant="outline" className="border-government-gold/30">
                          <Icon name="Send" className="mr-2" size={16} />
                          Направить в подразделение
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Генерация отчетов</CardTitle>
                <CardDescription className="text-gray-400">
                  Автоматическое формирование сводок и протоколов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-government-dark border border-government-gold/10 rounded-lg p-5 hover:border-government-gold/30 transition-colors cursor-pointer">
                    <Icon name="BarChart3" className="text-government-gold mb-3" size={32} />
                    <h3 className="text-white font-semibold mb-2">
                      Сводка криминогенной обстановки
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Статистика, динамика и структура преступности за период
                    </p>
                    <Button className="w-full bg-government-gold text-government-navy hover:bg-government-gold/90">
                      Сформировать отчет
                    </Button>
                  </div>

                  <div className="bg-government-dark border border-government-gold/10 rounded-lg p-5 hover:border-government-gold/30 transition-colors cursor-pointer">
                    <Icon name="AlertTriangle" className="text-government-gold mb-3" size={32} />
                    <h3 className="text-white font-semibold mb-2">Протокол выявленных рисков</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Индикаторы угроз и рекомендации по реагированию
                    </p>
                    <Button className="w-full bg-government-gold text-government-navy hover:bg-government-gold/90">
                      Сформировать протокол
                    </Button>
                  </div>

                  <div className="bg-government-dark border border-government-gold/10 rounded-lg p-5 hover:border-government-gold/30 transition-colors cursor-pointer">
                    <Icon name="TrendingUp" className="text-government-gold mb-3" size={32} />
                    <h3 className="text-white font-semibold mb-2">Прогнозный анализ</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Математические модели и предиктивная аналитика
                    </p>
                    <Button className="w-full bg-government-gold text-government-navy hover:bg-government-gold/90">
                      Сформировать анализ
                    </Button>
                  </div>

                  <div className="bg-government-dark border border-government-gold/10 rounded-lg p-5 hover:border-government-gold/30 transition-colors cursor-pointer">
                    <Icon name="Database" className="text-government-gold mb-3" size={32} />
                    <h3 className="text-white font-semibold mb-2">Межведомственная сводка</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Консолидированные данные от всех участников системы
                    </p>
                    <Button className="w-full bg-government-gold text-government-navy hover:bg-government-gold/90">
                      Сформировать сводку
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-government-card border-government-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Последние сформированные отчеты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Сводка криминогенной обстановки за декабрь 2025',
                      date: '18.12.2025 14:30',
                      size: '2.4 МБ',
                    },
                    {
                      title: 'Протокол выявленных рисков наркопреступности',
                      date: '17.12.2025 16:15',
                      size: '1.8 МБ',
                    },
                    {
                      title: 'Прогнозный анализ киберпреступности на 30 дней',
                      date: '16.12.2025 10:00',
                      size: '3.1 МБ',
                    },
                  ].map((report, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-government-dark border border-government-gold/10 rounded-lg p-4 hover:border-government-gold/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="FileText" className="text-government-gold" size={24} />
                        <div>
                          <p className="text-white font-medium">{report.title}</p>
                          <p className="text-sm text-gray-400">
                            {report.date} • {report.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-government-gold hover:text-government-gold/80"
                      >
                        <Icon name="Download" size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Index;