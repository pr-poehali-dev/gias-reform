import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { MonitoringTab } from '@/components/MonitoringTab';
import { AnalyticsTab } from '@/components/AnalyticsTab';
import { RisksTab } from '@/components/RisksTab';
import { ReportsTab } from '@/components/ReportsTab';

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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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
            <MonitoringTab
              crimeData={crimeData}
              monitoringAlerts={monitoringAlerts}
              regions={regions}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              getRiskBadgeVariant={getRiskBadgeVariant}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab crimeTypes={crimeTypes} predictiveModels={predictiveModels} />
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <RisksTab
              riskIndicators={riskIndicators}
              getRiskColor={getRiskColor}
              getRiskBadgeVariant={getRiskBadgeVariant}
            />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Index;
