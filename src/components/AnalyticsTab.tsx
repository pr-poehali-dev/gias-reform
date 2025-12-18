import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface AnalyticsTabProps {
  crimeTypes: Array<{ name: string; value: number; color: string }>;
  predictiveModels: Array<{
    name: string;
    accuracy: number;
    status: string;
    lastUpdate: string;
    prediction: string;
  }>;
}

export function AnalyticsTab({ crimeTypes, predictiveModels }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-government-card border-government-gold/20">
          <CardHeader>
            <CardTitle className="text-white">Структура преступности</CardTitle>
            <CardDescription className="text-gray-400">Распределение по категориям</CardDescription>
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
            <CardDescription className="text-gray-400">Преступления по категориям</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={crimeTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" angle={-15} textAnchor="end" height={80} />
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
                      <span className="font-semibold text-government-gold">{model.accuracy}%</span>
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
                <span className="text-white font-medium">Сильная корреляция (r = 0.87)</span>
              </div>
              <p className="text-gray-300 mb-2">
                Рост интернет-запросов по синтезу веществ → Увеличение изъятий наркотиков через
                14-21 день
              </p>
              <Badge variant="outline" className="border-green-600 text-green-600">
                Подтверждено 23 случаями
              </Badge>
            </div>

            <div className="bg-government-dark border border-government-gold/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Link" className="text-government-gold" size={20} />
                <span className="text-white font-medium">Умеренная корреляция (r = 0.64)</span>
              </div>
              <p className="text-gray-300 mb-2">
                Всплеск микротранзакций через анонимные сервисы → Активизация курьерских сетей
              </p>
              <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                Подтверждено 18 случаями
              </Badge>
            </div>

            <div className="bg-government-dark border border-government-gold/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Link" className="text-government-gold" size={20} />
                <span className="text-white font-medium">Сильная корреляция (r = 0.92)</span>
              </div>
              <p className="text-gray-300 mb-2">
                Закупки химреактивов малыми предприятиями → Обнаружение подпольных лабораторий
              </p>
              <Badge variant="outline" className="border-green-600 text-green-600">
                Подтверждено 31 случаем
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
