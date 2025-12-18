import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { ResponsiveContainer, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface MonitoringTabProps {
  crimeData: Array<{ month: string; crimes: number; resolved: number }>;
  monitoringAlerts: Array<{
    id: number;
    type: string;
    source: string;
    content: string;
    keywords: string[];
    location: string;
    time: string;
  }>;
  regions: Array<{ name: string; risk: number; crimes: number; trend: string }>;
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  getRiskBadgeVariant: (level: string) => 'default' | 'destructive' | 'secondary';
}

export function MonitoringTab({
  crimeData,
  monitoringAlerts,
  regions,
  selectedRegion,
  setSelectedRegion,
  getRiskBadgeVariant,
}: MonitoringTabProps) {
  return (
    <div className="space-y-6">
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
            <CardTitle className="text-sm font-medium text-gray-400">Раскрываемость</CardTitle>
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
            <CardTitle className="text-sm font-medium text-gray-400">Активных дел</CardTitle>
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
                    <Badge variant={getRiskBadgeVariant(alert.type)} className="font-medium">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-government-card border-government-gold/20 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Интерактивная карта России</CardTitle>
            <CardDescription className="text-gray-400">
              Кликните на регион для детального анализа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-government-dark border border-government-gold/10 rounded-lg p-8 min-h-[500px] flex items-center justify-center">
              <svg viewBox="0 0 800 500" className="w-full h-auto">
                <g id="moscow-region">
                  <rect
                    x="200"
                    y="150"
                    width="100"
                    height="80"
                    fill="#dc2626"
                    opacity="0.7"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRegion('Московская обл.')}
                  />
                  <text x="250" y="195" textAnchor="middle" fill="white" fontSize="12">
                    Московская
                  </text>
                </g>
                <g id="spb-region">
                  <rect
                    x="180"
                    y="80"
                    width="90"
                    height="60"
                    fill="#ea580c"
                    opacity="0.7"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRegion('Санкт-Петербург')}
                  />
                  <text x="225" y="115" textAnchor="middle" fill="white" fontSize="12">
                    СПб
                  </text>
                </g>
                <g id="sverdlovsk-region">
                  <rect
                    x="420"
                    y="150"
                    width="110"
                    height="90"
                    fill="#d97706"
                    opacity="0.7"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRegion('Свердловская обл.')}
                  />
                  <text x="475" y="200" textAnchor="middle" fill="white" fontSize="12">
                    Свердловская
                  </text>
                </g>
                <g id="krasnodar-region">
                  <rect
                    x="250"
                    y="300"
                    width="100"
                    height="70"
                    fill="#ca8a04"
                    opacity="0.7"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRegion('Краснодарский край')}
                  />
                  <text x="300" y="340" textAnchor="middle" fill="white" fontSize="12">
                    Краснодар
                  </text>
                </g>
                <g id="rostov-region">
                  <rect
                    x="280"
                    y="380"
                    width="90"
                    height="60"
                    fill="#65a30d"
                    opacity="0.7"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRegion('Ростовская обл.')}
                  />
                  <text x="325" y="415" textAnchor="middle" fill="white" fontSize="12">
                    Ростов
                  </text>
                </g>
                <g id="other-regions">
                  <rect
                    x="320"
                    y="100"
                    width="80"
                    height="50"
                    fill="#4b5563"
                    opacity="0.5"
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  />
                  <rect
                    x="350"
                    y="250"
                    width="90"
                    height="60"
                    fill="#4b5563"
                    opacity="0.5"
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  />
                  <rect
                    x="540"
                    y="180"
                    width="120"
                    height="100"
                    fill="#4b5563"
                    opacity="0.5"
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  />
                  <rect
                    x="100"
                    y="200"
                    width="80"
                    height="70"
                    fill="#4b5563"
                    opacity="0.5"
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  />
                </g>
              </svg>
              <div className="absolute bottom-4 right-4 bg-government-navy/90 border border-government-gold/20 rounded-lg p-3">
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-white">Критический (80-100%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-600 rounded"></div>
                    <span className="text-white">Высокий (60-79%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                    <span className="text-white">Средний (40-59%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span className="text-white">Низкий (&lt;40%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-government-card border-government-gold/20">
          <CardHeader>
            <CardTitle className="text-white">Детали региона</CardTitle>
            <CardDescription className="text-gray-400">
              {selectedRegion || 'Выберите регион на карте'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRegion ? (
              <div className="space-y-4">
                {regions
                  .filter((r) => r.name === selectedRegion)
                  .map((region, idx) => (
                    <div key={idx}>
                      <div className="bg-government-dark border border-government-gold/10 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white font-semibold text-lg">{region.name}</span>
                          {region.trend === 'up' ? (
                            <Badge variant="destructive">
                              <Icon name="TrendingUp" size={14} className="mr-1" />
                              Рост
                            </Badge>
                          ) : region.trend === 'down' ? (
                            <Badge className="bg-green-600">
                              <Icon name="TrendingDown" size={14} className="mr-1" />
                              Снижение
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Icon name="Minus" size={14} className="mr-1" />
                              Стабильно
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-400">Уровень риска</span>
                              <span
                                className={`font-bold text-lg ${
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
                            <Progress value={region.risk} className="h-3" />
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-government-gold/10">
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Преступлений</div>
                              <div className="text-2xl font-bold text-white">{region.crimes}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Раскрыто</div>
                              <div className="text-2xl font-bold text-green-500">
                                {Math.round(region.crimes * 0.87)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-400 uppercase">
                          Основные категории:
                        </h4>
                        <div className="bg-government-dark border border-government-gold/10 rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">Наркопреступления</span>
                            <span className="text-red-500 font-semibold">
                              {Math.round(region.crimes * 0.28)}
                            </span>
                          </div>
                          <Progress value={28} className="h-2" />
                        </div>
                        <div className="bg-government-dark border border-government-gold/10 rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">Киберпреступления</span>
                            <span className="text-orange-500 font-semibold">
                              {Math.round(region.crimes * 0.24)}
                            </span>
                          </div>
                          <Progress value={24} className="h-2" />
                        </div>
                        <div className="bg-government-dark border border-government-gold/10 rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">Экономические</span>
                            <span className="text-yellow-500 font-semibold">
                              {Math.round(region.crimes * 0.16)}
                            </span>
                          </div>
                          <Progress value={16} className="h-2" />
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-government-gold text-government-navy hover:bg-government-gold/90">
                        <Icon name="FileBarChart" className="mr-2" size={16} />
                        Детальный отчет по региону
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Icon name="MousePointerClick" className="text-gray-600 mb-4" size={48} />
                <p className="text-gray-400 text-sm">
                  Кликните на регион на карте для просмотра детальной статистики
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
