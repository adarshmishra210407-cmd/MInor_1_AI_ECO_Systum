import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Filter
} from 'lucide-react';

export function ReportsPage({ reportMetrics }) {
  const [dateRange, setDateRange] = useState('Today (Oct 30, 2026)');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Filter Bar */}
      <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-heading text-lg">Performance Analytics & Reports</h3>
          <p className="text-xs text-muted">Comprehensive telemetry and call success metrics for NEXUS AI Caller Bots.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-muted" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-pageBg border border-subtleBorder px-4 py-2.5 rounded-xl text-xs font-semibold text-heading focus:outline-none focus:border-dusty"
          >
            <option value="Today (Oct 30, 2026)">Today (Oct 30, 2026)</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Calls</span>
            <PhoneCall className="w-4 h-4 text-dusty" />
          </div>
          <div className="text-2xl font-heading font-bold text-heading">{reportMetrics.totalCallsToday}</div>
          <div className="flex items-center space-x-1.5 text-[11px] text-successGreen font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs yesterday</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Duration</span>
            <Clock className="w-4 h-4 text-dusty" />
          </div>
          <div className="text-2xl font-heading font-bold text-heading">{reportMetrics.avgDuration}</div>
          <div className="text-[11px] text-muted">Optimal engagement window</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-successGreen" />
          </div>
          <div className="text-2xl font-heading font-bold text-successGreen">{reportMetrics.completionRate}</div>
          <div className="text-[11px] text-muted">118 successful resolutions</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Failure / Drop Rate</span>
            <AlertTriangle className="w-4 h-4 text-errorRed" />
          </div>
          <div className="text-2xl font-heading font-bold text-errorRed">{reportMetrics.failureRate}</div>
          <div className="text-[11px] text-muted">3 dropped carrier signals</div>
        </div>
      </div>

      {/* Charts & Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Hourly Call Activity */}
        <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-6">
          <div className="flex items-center justify-between border-b border-subtleBorder pb-3">
            <h4 className="font-heading font-bold text-heading text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-dusty" />
              <span>Hourly Call Volume Distribution</span>
            </h4>
            <span className="text-xs text-muted">Peak: 11:00 AM (31 calls)</span>
          </div>

          <div className="space-y-3 pt-2">
            {reportMetrics.hourlyActivity.map((item, idx) => {
              const maxCalls = 35;
              const pct = (item.calls / maxCalls) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium text-heading">
                    <span>{item.hour}</span>
                    <span className="font-bold">{item.calls} calls</span>
                  </div>
                  <div className="w-full bg-pageBg h-3 rounded-full overflow-hidden border border-subtleBorder">
                    <div
                      className="bg-dusty h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcome Breakdown & Agent Performance */}
        <div className="space-y-8">
          {/* Outcome Breakdown */}
          <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-4">
            <h4 className="font-heading font-bold text-heading text-sm border-b border-subtleBorder pb-3">
              Outcome Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-paleBlue/40 rounded-xl border border-subtleBorder space-y-1">
                <span className="text-muted">Completed</span>
                <div className="text-lg font-bold text-successGreen">{reportMetrics.outcomesBreakdown.Completed}</div>
              </div>
              <div className="p-4 bg-paleBlue/40 rounded-xl border border-subtleBorder space-y-1">
                <span className="text-muted">Missed</span>
                <div className="text-lg font-bold text-warningYellow">{reportMetrics.outcomesBreakdown.Missed}</div>
              </div>
              <div className="p-4 bg-paleBlue/40 rounded-xl border border-subtleBorder space-y-1">
                <span className="text-muted">Follow-up</span>
                <div className="text-lg font-bold text-heading">{reportMetrics.outcomesBreakdown.FollowUp}</div>
              </div>
              <div className="p-4 bg-paleBlue/40 rounded-xl border border-subtleBorder space-y-1">
                <span className="text-muted">Failed / Dropped</span>
                <div className="text-lg font-bold text-errorRed">{reportMetrics.outcomesBreakdown.Failed}</div>
              </div>
            </div>
          </div>

          {/* Agent Performance Comparison */}
          <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-4">
            <h4 className="font-heading font-bold text-heading text-sm border-b border-subtleBorder pb-3">
              AI Agent Performance Comparison
            </h4>
            <div className="space-y-3">
              {reportMetrics.agentPerformance.map((ag, idx) => (
                <div key={idx} className="p-3 bg-pageBg rounded-xl border border-subtleBorder flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-semibold text-heading">{ag.agent}</h5>
                    <p className="text-[11px] text-muted">{ag.calls} total calls handled</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-successGreen">{ag.successRate}</span>
                    <span className="block text-[10px] text-muted">Success Rate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
