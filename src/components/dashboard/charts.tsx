"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { COST_CATEGORIES } from "@/lib/constants";
import { colors } from "@/lib/design-tokens";

const CHART_COLORS = [colors.primary, colors.inkMuted80, colors.inkMuted48, colors.hairline, colors.primaryFocus];

interface ChartsProps {
  revenueData: { month: string; revenue: number; cost: number }[];
  profitability: { projectName: string; profit: number; profitRate: number }[];
  customerGrowth: { month: string; count: number }[];
  costBreakdown: { category: string; amount: number }[];
}

export function DashboardCharts({ revenueData, profitability, customerGrowth, costBreakdown }: ChartsProps) {
  const costData = costBreakdown.map((c) => ({
    name: COST_CATEGORIES.find((cc) => cc.value === c.category)?.label ?? c.category,
    value: c.amount,
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>월별 매출 추이</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.hairline} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: colors.inkMuted48 }} />
              <YAxis tick={{ fontSize: 11, fill: colors.inkMuted48 }} tickFormatter={(v) => `${v / 10000}만`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />
              <Bar dataKey="revenue" name="매출" fill={colors.primary} radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" name="비용" fill={colors.inkMuted80} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>프로젝트별 수익성</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={profitability} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={colors.hairline} />
              <XAxis type="number" tick={{ fontSize: 11, fill: colors.inkMuted48 }} tickFormatter={(v) => `${v / 10000}만`} />
              <YAxis type="category" dataKey="projectName" tick={{ fontSize: 10, fill: colors.inkMuted48 }} width={100} />
              <Tooltip formatter={(v, name) => name === "profitRate" ? `${v}%` : formatCurrency(Number(v))} />
              <Bar dataKey="profit" name="수익" fill={colors.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>고객 증가 추세</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.hairline} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: colors.inkMuted48 }} />
              <YAxis tick={{ fontSize: 11, fill: colors.inkMuted48 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" name="고객 수" stroke={colors.primary} strokeWidth={2} dot={{ fill: colors.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>비용 분석</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={costData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {costData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
