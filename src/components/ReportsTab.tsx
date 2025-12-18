import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export function ReportsTab() {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
