import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface RisksTabProps {
  riskIndicators: Array<{
    category: string;
    level: string;
    score: number;
    indicators: string[];
  }>;
  getRiskColor: (level: string) => string;
  getRiskBadgeVariant: (level: string) => 'default' | 'destructive' | 'secondary';
}

export function RisksTab({ riskIndicators, getRiskColor, getRiskBadgeVariant }: RisksTabProps) {
  return (
    <div className="space-y-6">
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
                    <div className="text-3xl font-bold text-government-gold">{risk.score}</div>
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
    </div>
  );
}
