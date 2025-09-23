import React from "react";

/**
 * Deux widgets SVG simples : DonutChart et SmallBarChart
 * Pas de dépendances externes - facile à adapter.
 */

export const DonutChart = ({ size = 160, value = 65, color = "#1976d2" }) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="donutGrad" x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor="#42a5f5" stopOpacity="1" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} fill="none" stroke="#eee" strokeWidth="14" />
        <circle
          r={radius}
          fill="none"
          stroke="url(#donutGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          transform="rotate(-90)"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          style={{ fontSize: 20, fontWeight: 700, fill: "#333" }}
        >
          {value}%
        </text>
      </g>
    </svg>
  );
};

export const SmallBarChart = ({ width = 320, height = 120, data = [30, 55, 22, 70, 50], color = "#43a047" }) => {
  const max = Math.max(...data, 1);
  const barWidth = width / data.length - 10;
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const h = (d / max) * (height - 20);
        const x = i * (barWidth + 10) + 10;
        const y = height - h - 10;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={h} rx={6} fill={color} opacity={0.9} />
            <text x={x + barWidth / 2} y={height - 2} textAnchor="middle" style={{ fontSize: 11, fill: "#555" }}>
              {d}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default function ChartWidgets() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
      <div style={{ ...{ padding: 20, borderRadius: 16, background: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" } }}>
        <h4 style={{ margin: 0, marginBottom: 12 }}>Taux d'utilisation</h4>
        <DonutChart value={72} color="#1976d2" />
      </div>
      
    </div>
  );
}